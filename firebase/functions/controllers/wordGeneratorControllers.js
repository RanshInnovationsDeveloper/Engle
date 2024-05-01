//This is to handel word genrator
const { db } = require("../config/firebase");
const { doc, getDoc, updateDoc, arrayUnion, setDoc,collection } = require("firebase-admin/firestore");


const words = require("../resources/words.json");

// generate random number between startingIndex and endingIndex
const generateRandomNumber = (startingIndex, endingIndex) => {

    let number;
    number = Math.floor(Math.random() * (endingIndex - startingIndex + 1)) + startingIndex;//Get a random number between startingIndex and endingIndex
    return number;
}


//Fetch the word for flashcard
exports.fetchWord = async (req, res) => {
    try {
        //Items coming from body
        let { wordCategory, authUserId, wordIndex } = req.body;
        authUserId.toString();
        let newWordIndex = -1;

        // fetch data if wordCategory is unseen  .
        //Handling if category is unseen
        let wordCategorySizeInDatabase;

        if (wordCategory === "unseen") {
            // fetch next word
            if (wordIndex === "-1") {
                wordCategorySizeInDatabase = words.length; //Size of words data in database
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
            let wordCategorySizeInDatabase=0
            const docRef = doc(db, wordCategory, authUserId);//get the reference of the document
            const subCollectionRef=collection(docRef,"words");
            const subDocRef = doc(subCollectionRef, authUserId)
            const docSnap=await getDoc(docRef);
            const subDocSnap=await getDoc(subDocRef);

            if (!docSnap.exists()){
                await setDoc(docRef,{authUserId});
            }
            if (!subDocSnap.exists()){
                await setDoc(subDocRef,{authUserId});
            }

            // find the size of array in which we store the data of choose category from firestore.
            if (docSnap.exists() && subDocSnap.exists()) {
                // Document exists, get the data
             const data = subDocSnap.data()["words"];
                //Length of the array wordCatrigry in the database
                wordCategorySizeInDatabase = data?.length;
            }
            // checK the given index is exist or not 
            if (wordCategorySizeInDatabase !== 0 && (wordCategorySizeInDatabase - parseInt(wordIndex) - 1)>=0&&(wordCategorySizeInDatabase - parseInt(wordIndex) - 1)<wordCategorySizeInDatabase) {
                const data = subDocSnap.data()["words"];
                newWordIndex = data[wordCategorySizeInDatabase - parseInt(wordIndex) - 1];
            };

        }

        //Block to handle error part
        else{
            return res.status(404).json({
                status:"error",
                data:null,
                // wordIndex: newWordIndex,
                message: "This category is not found!"
            });
            
        }

        //Block to handle exception part
        if (newWordIndex === -1)
            return res.status(202).json({
                data: null,
                wordIndex: newWordIndex,
                message: "no data found !",
            });

        //Block for success part
            else
        // console.log(words[newWordIndex])
    // console.log(words[newWordIndex])
    // console.log("index",newWordIndex)
    // console.log(words[25254])

            return res.status(200).json({
                data: words[newWordIndex],
                wordIndex: newWordIndex,
                message: "data fetch successfully"
            });

            //To handle error part
    } catch (err) {

        console.log("error to fetch word => ", err);
        return res.status(404).json({
            status:"error",
            message: "Server error"
        });
    }

}