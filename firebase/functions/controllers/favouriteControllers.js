//This controller is used to handle favourite functionality
//Various Imports
const { db } = require("../config/firebase");
const admin = require("firebase-admin");


const axios = require("axios");

//TODO:Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
const keyArr = { words, sampleStory };

const { SINGLE_NOTE_FETCHING_API_URL, NOTES_FILE_NAME,FLASH_CARD_SEEN, FLASH_CARD_UNSEEN } = require("../constants/constants");
const { STORY_FILE_NAME } = require("../constants/constants");
//this is to fetch the status of favourite button if item is in favourite 
//it will give true else false so can be used to set the status of button on frontend
const fetchFavouriteButtonStatus = async (req, res) => {
  try {
    const { itemId, type, userId } = req.query;
    const docRef = db.collection("favourite").doc(userId);
    const subCollectionRef = docRef.collection(type);
    const subDocRef = subCollectionRef.doc(userId);

    if (userId) {
      const docSnap = await docRef.get();
      const subDocSnap=await subDocRef.get();

      //If the document exists this block will be executed
      if (subDocSnap.exists && subDocSnap.data()[type]&&subDocSnap.data()[type].length>0) {
        const data = subDocSnap.data();

        let itemExists=false;
        if(data[type]&&data[type].length>0)
         itemExists = data[type].some(item => item == itemId);
          
        if (itemExists) {
          res.status(200).json({ isFavourite: true });
        } else {
          res.status(200).json({ isFavourite: false });
        }
      } else {
        res.status(200).json({ isFavourite: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};


//This is used to add new item to favourite list 
const addToFavourite = async (req, res) => {
  try {
    const { itemId, type, userId, name  } = req.body;
    const docRef = db.collection("favourite").doc(userId);
    const docSnap = await docRef.get();
  
  //If docSnap does not exist this block will be executed and will create doc
    if (!docSnap.exists) {
      await docRef.set({ userId });
    const subCollectionRef = docRef.collection(type);
    const subDocRef = subCollectionRef.doc(userId);
    await subDocRef.set({
      [type]: [itemId],
    });
    }
     const subCollectionRef = docRef.collection(type);
     const subDocRef = subCollectionRef.doc(userId);
     const subDocSnap = await subDocRef.get();

     if (!subDocSnap.exists) {
      await subDocRef.set({
        [type]: [itemId],
      });
    }
    else {
    const subCollectionRef = docRef.collection(type);
    const subDocRef = subCollectionRef.doc(userId);
    await subDocRef.update({
      [type]: admin.firestore.FieldValue.arrayUnion(itemId),
    });
    }

    res.json({ status: "success", message: "Item added to favourite" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

//This controller to be called when we want to remove item from favourite list
const removeFromFavourite = async (req, res) => {
  try {
    let { itemId, type, userId } = req.body;
    const docRef = db.collection("favourite").doc(userId); 
    const subCollectionRef = docRef.collection(type); 
    const subDocRef = subCollectionRef.doc(userId); 
    const docSnap = await docRef.get();  
    const subDocSnap = await subDocRef.get(); 
    if (docSnap.exists && subDocSnap.exists) {
      const data = subDocSnap.data();
      const newArray = data[type].filter((item) => item != itemId );
      await subDocRef.update({
        [type]: newArray,
      });
      res.status(200).json({ status:"success",message: "Item removed from favourites" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({status:"error",message:error.message})
  }
};

//This is used to check the seen status of items
const isSeen=async(userId,itemId,type="words")=>{
  try {
    const docRef = db.collection("seen").doc(userId);
    const docSnap = await docRef.get();
    const subCollectionRef = docRef.collection(type);
    const subDocRef = subCollectionRef.doc(userId);
    const subDocSnap = await subDocRef.get();
    
    if (!docSnap.exists){
      return false;
    }
    if (!subDocSnap.exists){
      return false;
    }
    else{
      const data = subDocSnap.data();
      const itemExists = data[type]?.some((item) => item == itemId );
      return itemExists;
    }
    
  } catch (error) {
    console.log("Error in fetching seen Status",error.message)
  }
}


//This is used to fetch all the contents of favourite
const fetchFavouriteItems = async (req, res) => {
  try {
    const { userId} = req.query;
    if (!userId) {
      return res.status(400).json({ status: "error", message: "No userId is provided"});
    }
    const docRef = db.collection("favourite").doc(userId); 
    const docSnap = await docRef.get(); 
    if (!docSnap.exists) {
      await docRef.set({ userId });
      res.status(200).send();
    }
    else{
    //Types of data that can be stored in favourite
    const types =['words','notes','sampleStory']; //TODO:Add more types as needed
    const result = []; 
    const promises = []; 

    //Using a loop to iterate over the data
    for (const type of types) {
      //If type is words this block will be executed
      if (type=="words"){
      const subCollectionRef = docRef.collection(type);
      const subDocRef = subCollectionRef.doc(userId);
      const subDocSnap = await subDocRef.get();
      
      //If subDocSnap exists and it have data then this block will be executed
      if (subDocSnap.exists && subDocSnap.data()) {
        const data = subDocSnap.data()[type];
        let size=data.length-1 //Taking the size of the data will be used for viewIndex

        for (const item of data){
          const isSeenValue = await isSeen(userId,item); 
          const name = isSeenValue ? FLASH_CARD_SEEN : FLASH_CARD_UNSEEN;
          promises.push({
            itemId:item,
            name,
            type,
            val:keyArr[type][Number(item)],
            viewIndex:size
        })
        size-=1;
        }
      }
    }

    else if (type==="sampleStory"){
      const subCollectionRef = docRef.collection(type);
      const subDocRef = subCollectionRef.doc(userId);
      const subDocSnap = await subDocRef.get();
      if (subDocSnap.exists && subDocSnap.data()) {
        const data = subDocSnap.data()[type];
        for (const item of data){
          const storyId=item;
          promises.push({
            itemId:storyId,
            name:STORY_FILE_NAME,
            type,
            val: keyArr[type][Number(storyId)],
          })
        }
      }
    }
    //If type is notes this block will be executed
     else if (type==="notes"){
      const subCollectionRef = docRef.collection(type);
      const subDocRef = subCollectionRef.doc(userId);
      const subDocSnap = await subDocRef.get();
      if (subDocSnap.exists && subDocSnap.data()) {

        const data = subDocSnap.data()[type];
        for (const item of data){
        const noteId=item;
        
        // this feature is used if we want to show Notes on favourite .But there is some syntax error.

        // promises.push(
        //   axios
        //     .get(SINGLE_NOTE_FETCHING_API_URL + noteId)
        //     .then((response) => {
        //       const fetchedData = response.data;
        //       // return {
        //       //   itemId:item,
        //       //   name:NOTES_FILE_NAME,
        //       //   type,
        //       //   val: fetchedData,
        //       // }
        //     }
        //   ))
        }
      }
    }
  }

    // Wait for all promises to resolve
    Promise.all(promises)
      .then((results) => {
        // Filter out null results (for error handling)
        const filteredResults = results.filter((result) => result !== null);
        // Push filtered results into the final result array
        result.push(...filteredResults);
        res.status(200).json(result);
      })
      .catch((error) => {
        // console.error(error); // Handle errors from Promise.all()
        res.status(500).json({status:"error",message:error.message})
      });
    }
  }
 catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  fetchFavouriteButtonStatus,
  addToFavourite,
  removeFromFavourite,
  fetchFavouriteItems,
};