import React, { useState, useEffect } from 'react';
import { auth,db } from "../services/firebase";
import CategoryHeader from "../components/CategoryHeader";
import Words from "../resources/words.json";
import { generateRandomNumber, saveIndexToFirestore } from "../services/operations/dataServices";

function FlashCardpage() {
  const [words, setWords] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWords(Words);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const snapshot = await db.collection("users").doc(user.uid).get();
        setCurrentUser({ ...snapshot.data(), userId: user.uid });
      } else {
        setCurrentUser(null);
      }
      setFetchingUser(false);
    });
  }, []);

  const handleClick = async () => {
    const number = await generateRandomNumber(currentUser);
    setRandomNumber(number);
  };

  const handleSaveIndex = () => {
    saveIndexToFirestore(currentUser, randomNumber);
  };

  return (
    <>
      <CategoryHeader/>
      <h1 className='text-center mt-10 text-4xl text-black'>FlashCards</h1>

      <button onClick={handleClick}>Generate Random Word</button>
      {randomNumber && <p>{words[randomNumber].word} : {words[randomNumber].definitions}</p>}

      {randomNumber !== null && (
        <button onClick={handleSaveIndex}>Save Index to Firestore</button>
      )}
    </>
  );
}

export default FlashCardpage;
