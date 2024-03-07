const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  setDoc,
  Timestamp,
} = require("firebase/firestore");

// for better understanding of functioning of this you can check for this github repo
// https://github.com/whiteknight16/ENGLE-Stuff
const fetchFavouriteButtonStatus = async (req, res) => {
  try {
    const { itemId, type, userId } = req.body;
    console.log(userId, itemId, type);
    if (userId) {
      const docRef = doc(db, "favourite", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const itemInArray = data[type].find((item) => item.itemId === itemId);
        if (itemInArray) {
          res.status(200).json({ isFavourite: true });
        } else {
          res.status(200).json({ isFavourite: false });
        }
      } else {
        res.status(200).json({ isFavourite: false });
      }
    } else {
      res.status(200).json({ status: "No user ID provided" });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const addToFavourite = async (req, res) => {
  try {
    const { itemId, type, userId } = req.body;
    const docRef = doc(db, "favourite", userId);
    const obj = {
      itemId,
      createdAt: new Date(),
      isFavourite: true,
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

const removeFromFavourite = async (req, res) => {
  //this controller to be called when we want to remove item from favourite list
  try {
    //again these needed to be passed from frontend by any means here using body for all can be changed as per conviencnece
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
const fetchFavouriteItems = async (req, res) => {
  try {
    const userId = req.body.userId;
    const docRef = doc(db, "favourite", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      res.status(404).json({ status: "No favourite" });
    } else {
      const favouriteItems = [];
      const promises = [];

      for (let key in docSnap.data()) {
        const values = docSnap.data()[key];
        const collectionRef = collection(db, key);

        values.forEach((value) => {
          const createdAt = Timestamp.fromMillis(
            value.createdAt.seconds * 1000 +
              value.createdAt.nanoseconds / 1000000
          ).toDate();
          const itemDocRef = doc(collectionRef, value.itemId);

          const promise = getDoc(itemDocRef).then((itemDocSnap) => {
            if (itemDocSnap.exists()) {
              const final_object = {
                data: itemDocSnap.data()[key],
                createdAt: createdAt,
                type: key,
                id: value.itemId,
              };
              favouriteItems.push(final_object);
            }
          });

          promises.push(promise);
        });
      }

      Promise.all(promises)
        .then(() => {
          res.status(200).json({ favouriteItems });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ status: "Error", message: error.message });
        });
    }
    //A valid response will look like this
    /*{
   "favouriteItems":[
      {
         "data":"A new Story",
         "createdAt":"2024-03-03T02:44:38.117Z",
         "type":"story",
         "id":"P8Giul8tMqVIQnISFdg5"
      },
      {
         "data":"It is here to be part of unseen",
         "createdAt":"2024-03-03T02:45:34.294Z",
         "type":"unseen",
         "id":"ud2DERZWPzlEFhC4tsC7"
      }
   ]
}
     */
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};
module.exports = {
  fetchFavouriteButtonStatus,
  addToFavourite,
  removeFromFavourite,
  fetchFavouriteItems,
};
