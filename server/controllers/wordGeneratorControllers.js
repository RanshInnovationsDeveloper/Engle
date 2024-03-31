const { db } = require("../config/firebase");
const { doc, getDoc, updateDoc, arrayUnion, setDoc } = require("firebase/firestore/lite");


const wordsData = require("../resources/words.json");

// generate random number between startingIndex and endingIndex
const generateRandomNumber = (startingIndex, endingIndex) => {

    let number;
    number = Math.floor(Math.random() * (endingIndex - startingIndex + 1)) + startingIndex;
    return number;
}



exports.fetchWord = async (req, res) => {
    try {

        let { wordCategory, authUserId, wordIndex } = req.body;
        let newWordIndex = -1;

        // fetch data if wordCategory is unseen  .
        if (wordCategory === "unseen") {

            let wordCategorySizeInDatabase;
            const docRef = doc(db, "seen", authUserId);
            const docSnap = await getDoc(docRef);

            // fetch next word
            if (wordIndex === "-1") {
                wordCategorySizeInDatabase = 35492;

                // the proccess to generate random word is done in while loop so that random words index not present in seen word array (in  firestore database).
                newWordIndex = generateRandomNumber(0, wordCategorySizeInDatabase - 1);

                if (authUserId !== "null") {
                    if (docSnap.exists()) {
                        await updateDoc(docRef, {
                            ["word"]: arrayUnion(newWordIndex),
                        });
                    } else {
                        await setDoc(docRef, {
                            ["word"]: (newWordIndex),
                        });
                    }
                }

            }
            // fetch previous word
            else {

                newWordIndex = parseInt(wordIndex);
            }

        }
        else if(wordCategory === "seen"){

            // wordIndex = "0";
            let wordCategorySizeInDatabase=0;
            const docRef = doc(db, "seen", authUserId);
            const docSnap = await getDoc(docRef);

            // find the size of array in which we store the data of choose category from firestore.
            if (docSnap.exists()) {
                // Document exists, get the data
                const data = docSnap.data();
                // Check if "wordCategory" field exists and is an array
                if (data && Array.isArray(data["word"])) {
                    wordCategorySizeInDatabase = data["word"].length;
                }
            }
            // checK the given index is exist or not 
            if (wordCategorySizeInDatabase !== 0 && (wordCategorySizeInDatabase - parseInt(wordIndex) - 1)>=0&&(wordCategorySizeInDatabase - parseInt(wordIndex) - 1)<wordCategorySizeInDatabase) {
                const data = docSnap.data();
                newWordIndex = data["word"][wordCategorySizeInDatabase - parseInt(wordIndex) - 1];
                // console.log("newWordIndex => ", newWordIndex);
            };
        }



        // fetch word data if wordCategory is favourite , rememeber or unremeber
        else if (wordCategory === "favourite"||wordCategory==="remember"||wordCategory==="unremember") {

            // here wordIndex is the index of favourite word array in dataBase .
            let wordCategorySizeInDatabase=0;
            const docRef = doc(db, wordCategory, authUserId);
            const docSnap = await getDoc(docRef);

            // find the size of array in which we store the data of choose category from firestore.
            if (docSnap.exists()) {
                // Document exists, get the data
                const data = docSnap.data();
                // Check if "wordCategory" field exists and is an array
                if (data && Array.isArray(data["words"])) {
                    wordCategorySizeInDatabase = data["words"].length;
                }
            }

            // checK the given index is exist or not 
            if (wordCategorySizeInDatabase !== 0 && (wordCategorySizeInDatabase - parseInt(wordIndex) - 1)>=0&&(wordCategorySizeInDatabase - parseInt(wordIndex) - 1)<wordCategorySizeInDatabase) {
                const data = docSnap.data();
                newWordIndex = data["words"][wordCategorySizeInDatabase - parseInt(wordIndex) - 1]?.itemId;
            };

        }

        
        else{
            return res.status(404).json({
                status:"error",
                data:null,
                // wordIndex: newWordIndex,
                error: "This category is not found!"
            });
            
        }


        if (newWordIndex === -1)
            return res.status(202).json({
                data: null,
                wordIndex: newWordIndex,
                message: "no data found !",
            });

        else
            return res.status(200).json({
                data: wordsData[newWordIndex],
                wordIndex: newWordIndex,
                message: "data fetch successfully"
            });


    } catch (err) {

        console.log("error to fetch word => ", err);
        return res.status(404).json({
            status:"error",
            error: "server error"
        });
    }

}


// // add the words in their categories like remember , unremember 
// exports.addWord = async (req, res) => {
//     try {

//         const { wordCategory, authUserId, wordIndex } = req.body;

//         const docRef = doc(db, "flashCard", authUserId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             await updateDoc(docRef, {
//                 [wordCategory]: arrayUnion(wordIndex),
//             });
//         } else {
//             await setDoc(docRef, {
//                 [wordCategory]: (wordIndex),
//             });
//         }

//         return res.status(200).json({
//             message: "word is successfully added in their category"
//         })

//     }
//     catch (error) {
//         console.log("error to add the word in particular category => ", error);
//         return res.status(404).json({
//             message: "server error "
//         });
//     }
// }