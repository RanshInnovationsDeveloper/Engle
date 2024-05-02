//This controller is here to handle functionlaity of unremember words
//Various Imports
const { db } = require("../config/firebase");
const admin = require("firebase-admin");



const axios = require("axios");

//TODO:Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
const keyArr = { words, sampleStory };

const { SINGLE_NOTE_FETCHING_API_URL, NOTES_FILE_NAME,FLASH_CARD_SEEN, FLASH_CARD_UNSEEN } = require("../constants/constants");


//This fetch the status of unremember button
const fetchUnrememberButtonStatus = async (req, res) => {
  try {
      const { itemId, type, userId } = req.query;
      const docRef=db.collection('unremember').doc(userId);
      const subcollectionRef = docRef.collection(type);
      const subDocRef=subcollectionRef.doc(userId);
      
      if (userId) {
          //Fetching contents of doc and subdoc
          const docSnap=await docRef.get();
          const subDocSnap=await subDocRef.get();
          
          //If the document exists this block will be executed
          if (subDocSnap.exists && subDocSnap.data()[type]&&subDocSnap.data()[type].length>0) {
            const data = subDocSnap.data();
            //In the document if the type of item(notes,sampleStory etc..) is present then it will check if the item is present in the list or not
            const itemExists = data[type]?.some((item) => item == itemId );
            //if item is present status is returned as true else false
            if (itemExists) {
              res.status(200).json({ isUnremember: true });
            } else {
              res.status(200).json({ isUnremember: false });
            }
          } else {
            res.status(200).json({ isUnremember: false });
          }
        }
      } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
      }
    };




//This is used to add new item to remember list it takes 4 input from body
const addToUnremember = async (req, res) => {
  try {
    const { itemId, type, userId, name  } = req.body;
    const docRef = db.collection("unremember").doc(userId);
    const docSnap=await docRef.get();
  
  //If docSnap does not exist this block will be executed and will create doc
    if (!docSnap.exists) {
      await docRef.set({userId});
      const subCollectionRef = docRef.collection(type);
      const subDocRef = subCollectionRef.doc(userId)
      await subDocRef.set({
       [type]: [itemId],
     });
    }
     const subCollectionRef = docRef.collection(type);
     const subDocRef = subCollectionRef.doc(userId)
     const subDocSnap = await subDocRef.get();

    if (!subDocSnap.exists){
      await subDocRef.set({
        [type]: [itemId]
      })
    }
    //If both doc and subDoc exists this block will be executed
    else {
       await subDocRef.update({
        [type]: admin.firestore.FieldValue.arrayUnion(itemId),
    });
    }
  
      res.json({ status: "success", message: "Item added to unremember" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };
  



// This is used to remove item from unremember list
const removeFromUnremember = async (req, res) => {
  try {
      const { itemId, type, userId } = req.body;
      const docRef = db.collection('unremember').doc(userId);
      const subcollectionRef = docRef.collection(type); 
      const subDocRef = subcollectionRef.doc(userId); 
      const docSnap = await docRef.get();  
      const subDocSnap = await subDocRef.get(); 
      //If docSnap exist this block will be executed
      if (subDocSnap.exists && subDocSnap.data()[type]&&subDocSnap.data()[type].length>0) {
        const data = subDocSnap.data();
        const newArray = data[type].filter((item) => item != itemId );
        //Removing the item from the db
        await subDocRef.update({
          [type]: newArray,
      });
        res.status(200).json({ status:"success",message: "Item removed from unremember" });
      }
    } catch (error) {
      // console.log(error);
      res.status(500).json({status:"error",message:error.message})
    }
  };

module.exports = {
    fetchUnrememberButtonStatus,
    addToUnremember,
    removeFromUnremember,
};
