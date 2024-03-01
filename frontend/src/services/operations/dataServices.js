import { auth,db } from "../firebase"

export const generateRandomNumber = async (currentUser) => {
    let randomNumber;
    const numbersCollection = db.collection('users').doc(currentUser.userId).collection('randomNumbers');
    const min = 1; // Minimum value for the random number
    const max = 35492; // Maximum value for the random number
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random number
    const docRef = numbersCollection.doc(randomNumber.toString());
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      await docRef.set({});
      break;
    }
  } while (true);
  return randomNumber;
  };

export const saveIndexToFirestore = async (currentUser, randomNumber) => {
    if (currentUser && randomNumber !== null) {
      try {
        await db.collection("users").doc(currentUser.userId).collection('saved_index').doc(randomNumber.toString()).set({})
        console.log("Random index saved to Firestore.");
      } catch (error) {
        console.error("Error saving random index to Firestore: ", error);
      }
    }
  };

