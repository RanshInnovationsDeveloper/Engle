const { db } = require("../config/firebase");
const { doc, getDoc, updateDoc, arrayUnion, setDoc } = require("firebase/firestore");


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
            // fetch next word
            if (wordIndex === "-1") {
                wordCategorySizeInDatabase = 35492;

                // the proccess to generate random word is done in while loop so that random words index not present in seen word array (in  firestore database).
                newWordIndex = generateRandomNumber(0, wordCategorySizeInDatabase - 1);

            }
            // fetch previous word
            else {

                newWordIndex = parseInt(wordIndex);
            }

        }
    

        // fetch word data if wordCategory is favourite , rememeber or unremeber or seen
        else if (wordCategory === "favourite"||wordCategory==="remember"||wordCategory==="unremember"||wordCategory==="seen") {

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