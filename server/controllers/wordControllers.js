const { db } = require("../config/firebase");
const { doc, getDoc, updateDoc, arrayUnion, collection, setDoc, Timestamp } = require("firebase/firestore/lite");


const wordsData = require("../resources/words.json");




const generateRandomNumber = (startingIndex, endingIndex) => {

    let number;
    number = Math.floor(Math.random() * (endingIndex - startingIndex + 1)) + startingIndex;
    return number;
}



exports.fetchWord = async (req, res) => {
    try {

        const { wordCategory, authUserId, wordIndex } = req.body;

        let newWordIndex = -1;

        // fetch data if wordCategory is unseen  .
        if (wordCategory === "unseen") {

            let wordCategorySizeInDatabase;
            const docRef = doc(db, "flashCard", authUserId);
            const docSnap = await getDoc(docRef);

            // fetch next word
            if (wordIndex === "-1") {
                wordCategorySizeInDatabase = 35492;

                // the proccess to generate random word is done in while loop so that random words index not present in seen word array (in  firestore database).
                newWordIndex = generateRandomNumber(0, wordCategorySizeInDatabase - 1);
                // console.log("our random word is ",nextWordIndex);

                if (docSnap.exists()) {
                    await updateDoc(docRef, {
                        ["seen"]: arrayUnion(newWordIndex),
                    });
                } else {
                    await setDoc(docRef, {
                        ["seen"]: (newWordIndex),
                    });
                }
            }
            // fetch previous word
            else {
                // console.log("the data is ",docSnap?.data);
                newWordIndex = parseInt(wordIndex);
            }

            //  console.log(newWordIndex);
        }



        // fetch word data if wordCategory is favourite
        else if (wordCategory === "favourite") {

        }


        // fetch word data if wordCategory is seen or remember or unrememneber
        else {

            let wordCategorySizeInDatabase = 0;
            const docRef = doc(db, "flashCard", authUserId);
            const docSnap = await getDoc(docRef);


            // fetch next word
            if (wordIndex === "-1") {

                // find the size of array in which we store the data of choose category from firestore.
                if (docSnap.exists()) {
                    // Document exists, get the data
                    const data = docSnap.data();
                    // Check if "wordCategory" field exists and is an array
                    if (data && Array.isArray(data[wordCategory])) {

                        wordCategorySizeInDatabase = data[wordCategory].length;

                    }

                }

                if (wordCategorySizeInDatabase !== 0) {


                    // the proccess to generate random word is done in while loop so that random words index not present in seen word array (in  firestore database).
                    const randomNumber = generateRandomNumber(0, wordCategorySizeInDatabase - 1);
                    const data = docSnap.data();
                    newWordIndex = data[wordCategory][randomNumber];


                };
            }

            // fetch previous word
            else {
                newWordIndex = parseInt(wordIndex);
            }

        }

        if (newWordIndex === -1)
            return res.status(202).json({
                data:null,
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
            message: "server error"
        });
    }

}


// add the words in their categories like remember , unremember 
exports.addWord = async (req, res) => {
    try {

        const { wordCategory, authUserId, wordIndex } = req.body;

        const docRef = doc(db, "flashCard", authUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                [wordCategory]: arrayUnion(wordIndex),
            });
        } else {
            await setDoc(docRef, {
                [wordCategory]: (wordIndex),
            });
        }

        return res.status(200).json({
            message: "word is successfully added in their category"
        })

    }
    catch (error) {
        console.log("error to add the word in particular category => ", error);
        return res.status(404).json({
            message: "server error "
        });
    }
}