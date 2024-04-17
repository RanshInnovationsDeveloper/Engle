//This controller is used to handle favourite functionality
//Various Imports
const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} = require("firebase/firestore");

const axios = require("axios");

//TODO:Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
const keyArr = { words, sampleStory };

const { SINGLE_NOTE_FETCHING_API_URL } = require("../constants/constants");

//this is to fetch the status of favourite button if item is in favourite 
//it will give true else false so can be used to set the status of button on frontend
const fetchFavouriteButtonStatus = async (req, res) => {
  try {
    const { itemId, type, userId } = req.query;
    if (userId) {
      //Looking for doc at firebase database
      //it is looking for a doc with collection name favourite and document name as userId
      const docRef = doc(db, "favourite", userId);
      const docSnap = await getDoc(docRef);

      //If the document exists this block will be executed
      if (docSnap.exists()) {
        const data = docSnap.data();
        //In the document if the type of item(notes,sampleStory etc..) is present then it will check if the item is present in the list or not
        const itemExists = data[type]?.some((item) => item.itemId == itemId );
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
    //itemId is the index of object
    //type is the file name from which item to be fetched
    //userId is id of user
    // name is name of from which it is to be displayed in () at favourite page
    const { itemId, type, userId, name  } = req.body;
    const docRef = doc(db, "favourite", userId); //docRef is the reference to the document in firebase in favourote collection where document name is userId
    //Object which will be added to the db
    const obj = {
      itemId,
      createdAt: new Date(),
      isFavourite: true,
      name,
    };
    //Taking docSnap to check if document exists or not
    const docSnap = await getDoc(docRef);

    //If doc sanp exist then this block will be executed
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        //Adding the object to the array of type(here type is the name of file from which item is fetched) check db for better understainding
        [type]: arrayUnion(obj),
      });
    }
    //If docSanp don't exist then this block will be executed 
    //It is setting the document with the object
    else {
      await setDoc(docRef, {
        [type]: [obj],
      });
    }
    res.status(200).json({ status: "Item added to favourites" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

//This controller to be called when we want to remove item from favourite list
const removeFromFavourite = async (req, res) => {
  try {
    //These needed to be passed from frontend here we are taking from body
    //int type need to pass the name of file in which item is there originally
    const { itemId, type, userId } = req.body;
    const docRef = doc(db, "favourite", userId); //Takng the reference to the document in firebase with favourite s collection name and userId as document name 
    const docSnap = await getDoc(docRef); 

    //If docSnap exist this block will be executed
    if (docSnap.exists()) {
      const data = docSnap.data();
      const newArray = data[type].filter((item) => item.itemId !== itemId );
      //Remoinv the item from the db
      await updateDoc(docRef, {
        [type]: newArray,
      });
      res.status(200).json({ status: "Item removed from favourites" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error",message:error.message})
  }
};
//Check seen status
// async function checkSeenStatus(userId, key, item) {
//   try {
//     let isSeen = false;
//     const docRef = doc(db, "seen", userId);
//     const docSnap = await getDoc(docRef);
//     if (!docSnap.exists) {
//       console.log('No such document!');
//     } else {
//       let data = docSnap.data();
//       if (key == "words" && data.word) {
//         data.word.forEach((wordItem, index) => {
//           if (wordItem === item.itemId) {
//             isSeen = true;
//           }
//         });
//       }
//     }
//     return isSeen;
//   } catch(error) {
//     console.error(error.message);
//     return false;
//   }
// }

//This is used to fetch all the contents of favourite
const fetchFavouriteItems = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ status: "error", message: "No userId is provided"});
    }
    const docRef = doc(db, "favourite", userId); //Taknig the reference to the document in firebase with favourite as collection name and userId as document name
    const docSnap = await getDoc(docRef);
    //If docSnap exist this block will be executed
    if (!docSnap.exists()) {
      await setDoc(docRef, { userId });
      return res
        .status(200)
        .json({ status: "No favourite found for this user" });
    }

    const data = docSnap.data(); //The data which we fetched from db
    const result = []; //Initialized an empty array for further purposes
    const promises = []; //Initialized an empty array for further purposes

    //Using a loop to iterate over the data
    for (const key in data) {
      // checking if array an extra check
      if (Array.isArray(data[key])) {
    // const checkSeenPromises = data[key].map(item => checkSeenStatus(userId, key, item));
    // const isSeenResults = await Promise.all(checkSeenPromises);
      let wordsArrayLength=data["words"]?.length;
      //Iterating over the array
      for (let i = 0; i < data[key].length; i++) {
        const item = data[key][i];
      // const isSeen = isSeenResults[i];
          // Convert Firestore Timestamp to JavaScript Date
          const createdAt = new Date(item.createdAt.seconds * 1000);
          // Format date as needed
          const createdAtFormatted = createdAt.toISOString();

          //TODO: Every time you are trying to add a new datatype handle it over here too 
          //Checking as per the values of keys as different key have different data type some coming from firebase some from storage
          if (key == "sampleStory") {
            promises.push({
              ...item,
              type: key,
              val: keyArr[key][Number(item.itemId)],
              createdAt: createdAtFormatted,
              // isSeen
            });
          }


          else if (key =="words"){
            wordsArrayLength=wordsArrayLength-1;
            promises.push({
              ...item,
              type: key,
              val: keyArr[key][Number(item.itemId)],
              createdAt: createdAtFormatted,
              viewIndex:wordsArrayLength
          })
        }
          else if (key == "notes") {
            const noteId = item?.itemId;
            promises.push(
              //Using axios to fetch notes data 
              axios
                .get(SINGLE_NOTE_FETCHING_API_URL + noteId)
                .then((response) => {
                  const data = response.data;
                  return {
                    ...item,
                    type: key,
                    val: data,
                    createdAt: createdAtFormatted,
                    // isSeen

                  };
                })
                .catch((error) => {
                  // console.error(error.message);
                  res.status(500).json({status:"error",message:error.message})
                  return null; // Return null to handle the error case
                })
            );
          }
        };
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
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(result);
      })
      .catch((error) => {
        // console.error(error); // Handle errors from Promise.all()
        res.status(500).json({status:"error",message:error.message})
      });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  fetchFavouriteButtonStatus,
  addToFavourite,
  removeFromFavourite,
  fetchFavouriteItems,
};