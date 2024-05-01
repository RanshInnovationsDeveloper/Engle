//This controller is here to handle functionlaity of remember words
//Various Imports
const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  collection,
} = require("firebase-admin/firestore");



const axios = require("axios");

//TODO:Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
const keyArr = { words, sampleStory };

const { SINGLE_NOTE_FETCHING_API_URL, NOTES_FILE_NAME,FLASH_CARD_SEEN, FLASH_CARD_UNSEEN } = require("../constants/constants");



//This fetch the status of remember button
const fetchRememberButtonStatus = async (req, res) => {
    try {
      console.log("dfvdfv",req.query);
         //Taknig the input from query
        const { itemId, type, userId } = req.query;
        
        
    //Taking the reference to the document in firebase with remember as collection name and userId as document name
        // const docRef = doc(db, "remember", userId);
        // const docRef = db.doc("remember", userId);


    //Taking the reference to the subcollection in the document
        // const subCollectionRef = collection(docRef, type);

    //Taking the reference to the document in the subcollection  
        const subDocRef = db.doc(`remember/${userId}/${type}/${userId}`);
        if (userId) {
            //Looking for doc at firebase database
            //Fetching contents of doc and subdoc
            // const docSnap = await docRef.get();
            // const subDocSnap=await getDoc(subDocRef)
            const subDocSnap=await subDocRef.get();
            //If the document exists this block will be executed
            if (subDocSnap.exists && subDocSnap.data[type]&&subDocSnap.data[type].length>0) {
              const data = subDocSnap.data;
              //In the document if the type of item(notes,sampleStory etc..) is present then it will check if the item is present in the list or not
              const itemExists = data[type]?.some((item) => item == itemId );
              //if item is present status is returned as true else false
              if (itemExists) {
                res.status(200).json({ isRemember: true });
              } else {
                res.status(200).json({ isRemember: false });
              }
            } else {
              res.status(200).json({ isRemember: false });
            }
          }
        } catch (error) {
          res.status(500).json({ status: "error", message: error.message });
        }
      };




//This is used to add new item to remember list it takes 4 input from body
const addToRemember = async (req, res) => {
    try {
      const { itemId, type, userId, name  } = req.body;
      //Taking the reference to the document in firebase with remember as collection name and userId as document name
      const docRef = doc(db, "remember", userId);
      
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
    
        res.json({ status: "success", message: "Item added to remember" });
      } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
      }
    };
    



// This is used to remove item from remember list
const removeFromRemember = async (req, res) => {
    //this controller to be called when we want to remove item from remember list
    try {
        //These needed to be passed from frontend here we are taking from body
        //in type need to pass the name of file in which item is there originally
        const { itemId, type, userId } = req.body;
        const docRef = doc(db, "remember", userId); //Takng the reference to the document in firebase with remember s collection name and userId as document name 
        const subcollectionRef = collection(docRef, type); //Taking the reference to the subcollection in the document
        const subDocRef = doc(subcollectionRef, userId); //Taking the reference to the document in the subcollection
        const docSnap = await getDoc(docRef);  //Fetching the document from the db
        const subDocSnap = await getDoc(subDocRef); //Fetching the sub document from the db
        //If docSnap exist this block will be executed
        if (subDocSnap.exists() && subDocSnap.data()[type]&&subDocSnap.data()[type].length>0) {
          const data = subDocSnap.data();
          const newArray = data[type].filter((item) => item != itemId );
          //Remoinv the item from the db
          await updateDoc(subDocRef, {
            [type]: newArray,
          });
          res.status(200).json({ status:"success",message: "Item removed from remember" });
        }
      } catch (error) {
        // console.log(error);
        res.status(500).json({status:"error",message:error.message})
      }
    };

module.exports = {
    fetchRememberButtonStatus,
    addToRemember,
    removeFromRemember,
};
