const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  collection,
} = require("firebase/firestore");

//This is used to add new item to Remember list it takes 4 input from body
const addToSeen = async (req, res) => {
    try {
      let { itemId, type, userId, name  } = req.body;
      //Taking the reference to the document in firebase with seen as collection name and userId as document name
      const docRef = doc(db, "seen", userId);
      // Convert all items from the body to strings
      itemId = parseInt(itemId);
      type = type.toString();
      userId = userId.toString();
      name = name.toString();
      
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
    
        res.json({ status: "success", message: "Item added to seen" });
      } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
      }
    };

module.exports = {
    addToSeen,
};