const {
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
} = require("firebase/firestore");

const { db } = require("../config/firebase");

//Controller to add the unseen to db
const addUnseen = async (req, res) => {
  try {
    const unseenCollection = collection(db, "unseen"); //(db,collectionName)
    // takin the story from body
    const { unseen } = req.body;
    const docRef = await addDoc(unseenCollection, {
      unseen: unseen,
      createdAt: serverTimestamp(),
    });
    res.status(201).json({ message: "Unseen added successfully" });
  } catch (error) {
    console.log("Error posting story", error);
  }
};

// Controller to fetch stories
const getUnseen = async (req, res) => {
  try {
    const unseenCollection = collection(db, "unseen"); //(db,collectionName)
    const unseenSnapshot = await getDocs(unseenCollection);
    const unseenData = unseenSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(unseenData);
  } catch (error) {
    console.log("Error getting Data", error);
  }
};
module.exports = { addUnseen, getUnseen };
