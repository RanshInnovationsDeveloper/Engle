const { db } = require("../config/firebase");
const {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    setDoc,
} = require("firebase/firestore");


//This is used to add new item to Remember list it takes 4 input from body
const addToSeen = async (req, res) => {
    try {
        //itemId is the index of object
        //type is the file name from which item to be fetched
        //userId is id of user
        // name is name of from which it is to be displayed in () at Remember page
        const { itemId, type, userId, name } = req.body;
        const docRef = doc(db, "seen", userId);
        const obj = {
            itemId,
            createdAt: new Date(),
            isSeen: true,
            name,
        };
        const docSnap = await getDoc(docRef);

        if (itemId) {
            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    [type]: arrayUnion(obj),
                });
            } else {
                await setDoc(docRef, {
                    [type]: [obj],
                });
            }
        }
        res.status(200).json({ status: "Item added to seen" });
    } catch (error) {
        console.log("There is error to add word in seen category-", error);
        res.status(500).json({ status: "error", error: error.message });
    }
};

module.exports = {
    addToSeen,
};