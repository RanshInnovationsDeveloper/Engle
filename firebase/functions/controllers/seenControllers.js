const { db } = require("../config/firebase");
const admin = require("firebase-admin");
//This is used to add new item to Remember list it takes 4 input from body
const addToSeen = async (req, res) => {
    try {
      let { itemId, type, userId, name  } = req.body;
      itemId = parseInt(itemId);
      const docRef = db.collection("seen").doc(userId);
      const docSnap = await docRef.get();
    //If docSnap does not exist this block will be executed and will create doc and subdoc
      if (!docSnap.exists) {
      await docRef.set({ userId });
      const subCollectionRef =docRef.collection(type);
      const subDocRef =subCollectionRef.doc(userId)
        await subDocRef.set({
          [type]: [itemId],
        });
      }
       const subCollectionRef = docRef.collection(type);
       const subDocRef = subCollectionRef.doc(userId)
       const subDocSnap = await subDocRef.get();
       //If subDocSnap does not exist this block will be executed and will create subDoc
      if (!subDocSnap.exists){
        await subDocRef.set({
          [type]: [itemId],
        });
      }
      //If both doc and subDoc exists this block will be executed
      else {
      const subCollectionRef = docRef.collection(type);
      const subDocRef = subCollectionRef.doc(userId)
      subDocRef.update({
        [type]: admin.firestore.FieldValue.arrayUnion(itemId),
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