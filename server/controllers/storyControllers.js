const {
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
} = require("firebase/firestore/lite");

const { db } = require("../config/firebase");

//Controller to add the story to db
const addStory = async (req, res) => {
  try {
    const storyCollection = collection(db, "story"); //(db,collectionName)
    // takin the story from body
    const { story } = req.body;
    const docRef = await addDoc(storyCollection, {
      story: story,
      createdAt: serverTimestamp(),
    });
    res.status(201).json({ message: "Story added successfully" });
  } catch (error) {
    console.log("Error posting story", error);
  }
};

// Controller to fetch stories
const getStories = async (req, res) => {
  try {
    const storyCollection = collection(db, "story"); //(db,collectionName)
    const storySnapshot = await getDocs(storyCollection);
    const storiesData = storySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(storiesData);
  } catch (error) {
    console.log("Error getting Data", error);
  }
};

//Exporting the controllers
module.exports = { addStory, getStories };
