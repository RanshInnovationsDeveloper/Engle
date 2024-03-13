const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  setDoc,
  Timestamp,
} = require("firebase/firestore/lite");

//Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
const keyArr = { words, sampleStory };

const fetchFavouriteButtonStatus = async (req, res) => {
  //this is to fetch the status of favourite button if item is in favourite it will give true else false so can be used to
  //set the status of button on frontend
  try {
    const { itemId, type, userId } = req.query;
    if (userId) {
      //Looking for doc
      const docRef = doc(db, "favourite", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data[type]);
        const itemExists = data[type].some((item) => item.itemId == itemId);
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
    res.status(500).json({ status: "Error", message: error.message });
  }
};
//This is used to add new item to favourite list it takes 4 input from body
const addToFavourite = async (req, res) => {
  try {
    //itemId is the index of object
    //type is the file name from which item to be fetched
    //userId is id of user
    // name is name of from which it is to be displayed in () at favourite page
    const { itemId, type, userId, name } = req.body;
    const docRef = doc(db, "favourite", userId);
    const obj = {
      itemId,
      createdAt: new Date(),
      isFavourite: true,
      name,
    };
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [type]: arrayUnion(obj),
      });
    } else {
      await setDoc(docRef, {
        [type]: [obj],
      });
    }
    res.status(200).json({ status: "Item added to favourites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// This is used to remove item from favourite list
const removeFromFavourite = async (req, res) => {
  //this controller to be called when we want to remove item from favourite list
  try {
    //these needed to be passed from frontend by any means here using body for all can be changed as per conviencnece
    //int type need to pass the name of file in which item is there originally
    const { itemId, type, userId } = req.body;
    const docRef = doc(db, "favourite", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const newArray = data[type].filter((item) => item.itemId !== itemId);

      await updateDoc(docRef, {
        [type]: newArray,
      });
      res.status(200).json({ status: "Item removed from favourites" });
    }
  } catch (error) {
    console.log(error);
  }
};
//This is used to fetch all the contents of favourite
const fetchFavouriteItems = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ status: "No user ID provided" });
    }
    const docRef = doc(db, "favourite", userId);
    const docSnap = await getDoc(docRef);
    //Check if favourite exists
    if (!docSnap.exists()) {
      await setDoc(docRef, { userId });
      return res
        .status(200)
        .json({ status: "No favourite found for this user" });
    }

    const data = docSnap.data();
    const result = [];

    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          // Convert Firestore Timestamp to JavaScript Date
          const createdAt = new Date(item.createdAt.seconds * 1000);
          // Format date as needed
          const createdAtFormatted = createdAt.toISOString();
          result.push({
            ...item,
            type: key,
            val: keyArr[key][Number(item.itemId)],
            createdAt: createdAtFormatted,
          });
        });
      }
    }
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
module.exports = {
  fetchFavouriteButtonStatus,
  addToFavourite,
  removeFromFavourite,
  fetchFavouriteItems,
};
