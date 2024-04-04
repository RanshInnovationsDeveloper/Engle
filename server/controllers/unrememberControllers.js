const { db } = require("../config/firebase");
const {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    setDoc,
} = require("firebase/firestore");
const axios = require("axios");

//Every time you add new json file add that over here as of now
const words = require("../resources/words.json");
const sampleStory = require("../resources/sampleStory.json");
// const { SINGLE_NOTE_FETCHING_API_URL } = require("../constants/constants");
const keyArr = { words, sampleStory };





const fetchUnrememberButtonStatus = async (req, res) => {
    //this is to fetch the status of Unremember button if item is in Unremember it will give true else false so can be used to set the status of button on frontend.
    try {
        const { itemId, type, userId } = req.query;
        if (userId) {
            //Looking for doc
            const docRef = doc(db, "unremember", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const itemExists = data[type]?.some((item) => item.itemId == itemId);
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
        res.status(500).json({ status: "error", error: error.message });
    }
};




//This is used to add new item to Unremember list it takes 4 input from body
const addToUnremember = async (req, res) => {
    try {
        //itemId is the index of object
        //type is the file name from which item to be fetched
        //userId is id of user
        // name is name of from which it is to be displayed in () at Unremember page
        const { itemId, type, userId, name } = req.body;
        const docRef = doc(db, "unremember", userId);
        const obj = {
            itemId,
            createdAt: new Date(),
            isUnremember: true,
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
        res.status(200).json({ status: "Item added to Unremembers" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", error: error.message });
    }
};




// This is used to remove item from Unremember list
const removeFromUnremember = async (req, res) => {
    //this controller to be called when we want to remove item from Unremember list
    try {
        //these needed to be passed from frontend by any means here using body for all can be changed as per conviencnece
        //int type need to pass the name of file in which item is there originally
        const { itemId, type, userId } = req.body;
        const docRef = doc(db, "unremember", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const newArray = data[type].filter((item) => item.itemId !== itemId);

            await updateDoc(docRef, {
                [type]: newArray,
            });
            res.status(200).json({ status: "Item removed from Unremembers" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error",error:error.message})
    }
};




//This is used to fetch all the contents of Unremember
const fetchAllUnrememberItems = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({status:"error",error: "No user ID provided" });
        }
        const docRef = doc(db, "unremember", userId);
        const docSnap = await getDoc(docRef);
        //Check if Unremember exists
        if (!docSnap.exists()) {
            await setDoc(docRef, { userId });
            return res
                .status(200)
                .json({ status: "No Unremember data found for this user" });
        }

        const data = docSnap.data();
        const result = [];
        const promises = [];

        for (const key in data) {
            // * Add your type name in and part if it isn't coming from firebase
            if (Array.isArray(data[key])) {
                data[key].forEach((item) => {
                    // Convert Firestore Timestamp to JavaScript Date
                    const createdAt = new Date(item.createdAt.seconds * 1000);
                    // Format date as needed
                    const createdAtFormatted = createdAt.toISOString();
                    //Checking as per the values of keys as different key have different data type some coming from firebase some from storage
                    if (key == "sampleStory" || key == "words") {
                        promises.push({
                            ...item,
                            type: key,
                            val: keyArr[key][Number(item.itemId)],
                            createdAt: createdAtFormatted,
                        });
                    }
                    if (key == "notes") {
                        const noteId = item?.itemId;
                        promises.push(
                            axios
                                .get(SINGLE_NOTE_FETCHING_API_URL + noteId)
                                .then((response) => {
                                    const data = response.data;
                                    return {
                                        ...item,
                                        type: key,
                                        val: data,
                                        createdAt: createdAtFormatted,
                                    };
                                })
                                .catch((error) => {
                                    console.error(error);
                                    res.status(500).json({status:"error",error:error.message})
                                    return null; // Return null to handle the error case
                                })
                        );
                    }
                });
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
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(400).json({error:error.message,status:"error"})
                console.error(error); // Handle errors from Promise.all()
            });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};


module.exports = {
    fetchUnrememberButtonStatus,
    addToUnremember,
    removeFromUnremember,
    fetchAllUnrememberItems,
};
