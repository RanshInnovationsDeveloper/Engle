//This controller is used to handle favourite functionality
//Various Imports
const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  collection,
} = require("firebase/firestore");

const axios = require("axios");

//TODO:Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
const keyArr = { words, sampleStory };

const { SINGLE_NOTE_FETCHING_API_URL, NOTES_FILE_NAME,FLASH_CARD_SEEN, FLASH_CARD_UNSEEN } = require("../constants/constants");

//this is to fetch the status of favourite button if item is in favourite 
//it will give true else false so can be used to set the status of button on frontend
const fetchFavouriteButtonStatus = async (req, res) => {
  try {
    //Taknig the input from query
    const { itemId, type, userId } = req.query;
  
  //Taking the reference to the document in firebase with favourite as collection name and userId as document name
    const docRef = doc(db, "favourite", userId);
  //Taking the reference to the subcollection in the document
    const subCollectionRef = collection(docRef, type);
  //Taking the reference to the document in the subcollection  
    const subDocRef = doc(subCollectionRef, userId)

    if (userId) {
      //Looking for doc at firebase database
      //Fetching contents of doc and subdoc
      const docSnap = await getDoc(docRef);
      const subDocSnap=await getDoc(subDocRef)
      //If the document exists this block will be executed
      if (subDocSnap.exists() && subDocSnap.data()[type]&&subDocSnap.data()[type].length>0) {
        const data = subDocSnap.data();

        let itemExists=false;
        if(data[type]&&data[type].length>0)
         itemExists = data[type].some(item => item == itemId);
          
        //if item is present status is returned as true else false
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
    res.status(500).json({ status: "error", message: error.message });
  }
};
//This is used to add new item to favourite list 
//it takes 4 input from body
const addToFavourite = async (req, res) => {
  try {
    const { itemId, type, userId, name  } = req.body;
    //Taking the reference to the document in firebase with favourite as collection name and userId as document name
    const docRef = doc(db, "favourite", userId);
  
  //Fetching the doc and subdoc from the db
    const docSnap = await getDoc(docRef);
  
  //If docSnap does not exist this block will be executed and will create doc
    if (!docSnap.exists()) {
      await setDoc(docRef, { userId });
       //Taking the reference to the subcollection in the document
    const subCollectionRef = collection(docRef, type);
    //Taking the reference to the document in the subcollection
    const subDocRef = doc(subCollectionRef, userId)
      await setDoc(subDocRef, {
        [type]: [itemId],
      });
    }
     //Taking the reference to the subcollection in the document
     const subCollectionRef = collection(docRef, type);
     //Taking the reference to the document in the subcollection
     const subDocRef = doc(subCollectionRef, userId)
     const subDocSnap = await getDoc(subDocRef);

    if (!subDocSnap.exists()){
      await setDoc(subDocRef, {
        [type]: [itemId],
      });
    }
    //If both doc and subDoc exists this block will be executed
    else {
       //Taking the reference to the subcollection in the document
    const subCollectionRef = collection(docRef, type);
    //Taking the reference to the document in the subcollection
    const subDocRef = doc(subCollectionRef, userId)
      await updateDoc(subDocRef, {
        [type]: arrayUnion(itemId),
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
    //These needed to be passed from frontend here we are taking from body
    //in type need to pass the name of file in which item is there originally
    let { itemId, type, userId } = req.body;
    const docRef = doc(db, "favourite", userId); //Takng the reference to the document in firebase with favourite s collection name and userId as document name 
    const subcollectionRef = collection(docRef, type); //Taking the reference to the subcollection in the document
    const subDocRef = doc(subcollectionRef, userId); //Taking the reference to the document in the subcollection
    const docSnap = await getDoc(docRef);  //Fetching the document from the db
    const subDocSnap = await getDoc(subDocRef); //Fetching the sub document from the db
    //If docSnap exist this block will be executed
    if (docSnap.exists() && subDocSnap.exists()) {
      const data = subDocSnap.data();
      const newArray = data[type].filter((item) => item != itemId );
      //Remoinv the item from the db
      await updateDoc(subDocRef, {
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
    const docRef = doc(db, "seen", userId);
    const docSnap = await getDoc(docRef);
    const subCollectionRef = collection(docRef, type);
    const subDocRef = doc(subCollectionRef, userId);
    const subDocSnap = await getDoc(subDocRef);
    
    if (!docSnap.exists()){
      return false;
    }
    if (!subDocSnap.exists()){
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
    //Can take a particular reqType from quey to reduce read data at favourites
    const { userId} = req.query;
    //If userId is not provided this block will be executed
    if (!userId) {
      return res.status(400).json({ status: "error", message: "No userId is provided"});
    }
  //Taking the reference to the document in firebase with favourite as collection name and userId as document name
    const docRef = doc(db, "favourite", userId); //Taknig the reference to the document in firebase with favourite as collection name and userId as document name
    const docSnap = await getDoc(docRef); //Fetching the document from the db
    //If docSnap doesn't exist this block will be executed and doc will be created
    if (!docSnap.exists()) {
      await setDoc(docRef, { userId });
      res.status(200).send();
    }
    else{
    //Types of data that can be stored in favourite
    const types =['words','notes']; //TODO:Add more types as needed
    const result = []; //Initialized an empty array for further purposes
    const promises = []; //Initialized an empty array for further purposes

    //Using a loop to iterate over the data
    for (const type of types) {
      //If type is words this block will be executed
      if (type=="words"){
      //Taking the reference to the subcollection in the document
      const subCollectionRef = collection(docRef, type);
      //Taking the reference to the document in the subcollection
      const subDocRef = doc(subCollectionRef, userId);
      //Fetching the sub document from the db
      const subDocSnap = await getDoc(subDocRef);
      
      //If subDocSnap exists and it have data then this block will be executed
      if (subDocSnap.exists() && subDocSnap.data()) {
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
    //If type is notes this block will be executed
     else if (type==="notes"){
      //Taking the reference to the subcollection in the document
      const subCollectionRef = collection(docRef, type);
      //Taking the reference to the document in the subcollection
      const subDocRef = doc(subCollectionRef, userId);
      //Fetching the sub document from the db
      const subDocSnap = await getDoc(subDocRef);
      // If subDocSnap exists and it have data then this block will be executed
      if (subDocSnap.exists() && subDocSnap.data()) {

        const data = subDocSnap.data()[type];
        for (const item of data){
        const noteId=item;
        
        // this feature is used if we want to show Notes on favourite .   But there is some syntax error.

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
        // Now you can proceed with the rest of your code that depends on 'result'
        //Sorting the data as per the date
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