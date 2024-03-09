import React, { useState, useEffect } from 'react';
import { auth,db } from "../services/firebase";
import CategoryHeader from "../components/CategoryHeader";
import Words from "../resources/words.json";
import { generateRandomNumber, saveIndexToFirestore } from "../services/operations/dataServices";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/FlashCard.css";
import Header from '../components/Header';



function FlashCardpage() {
  const [words, setWords] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [numgenerated,SetNumgenerated]=useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);



  const handleFlip = async () => {
      setIsFlipped(!isFlipped);
      console.log(isFlipped);

  };
  const [isReactIcon, setIsReactIcon] = useState(true);

  const handleHeart = () => {
      setIsReactIcon(!isReactIcon);
  };
  


  useEffect(() => {
    setWords(Words);
    // if (currentIndex !== -1 && myArray[currentIndex] !== undefined) {
    //   setRandomNumber(myArray[currentIndex]);
    // }
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const snapshot = await db.collection("users").doc(user?.uid).get();
        setCurrentUser({ ...snapshot.data(), userId: user?.uid });
      } else {
        setCurrentUser(null);
      }
      setFetchingUser(false);
    });
  }, [myArray, currentIndex]);

  const handleSave = () => {
  }

  const handleClickRight = async () => {
    const number = await generateRandomNumber(currentUser);
    setMyArray(prevArray => {
      const updatedArray = [...prevArray, number];
      setCurrentIndex(currentIndex+1);
      return updatedArray;
    });
    setRandomNumber(myArray[currentIndex-1]);
  };

  const handleClickLeft = async () => {
    setCurrentIndex(currentIndex - 1);
    setRandomNumber(myArray[currentIndex-2]);
  };

  const handleSaveIndex = () => {
    saveIndexToFirestore(currentUser, randomNumber);
  };

  return (
    <>
    <Header val={1}/>
      <CategoryHeader/>
      <div className='h-[90vh] flex flex-col mt-10 gap-4 items-center '>    
      <h1 className='text-center text-4xl text-black'>FlashCards</h1>

        <div className='lg:w-[43%] w-[80%] h-[56%] rounded-2xl'>

            <div className={`card__inner ${isFlipped ? 'is-flipped' : ''} border border-blue-400 rounded-2xl` } onClick={handleFlip}>

                <div className="card__face p rounded-2xl ">
                    <div className="">
                    <div  className='flex justify-start p-3 ' >
                        {isReactIcon ? <FaHeart className='text-red-600 w-[1.5rem] h-[1.5rem]' onClick={handleHeart} /> : <CiHeart className='text-red-600 w-[1.5rem] h-[1.5rem]' onClick={handleHeart} />}
                    </div>
                    <div >
                        <div className='flex flex-col justify-center items-center'>
                        {randomNumber && <h2 className='text-black-800 pt-[4.75rem]  font-bold text-4xl flex justify-center items-center'>{words[randomNumber].word}</h2>}
                        
                        </div>
                        <div className="flex flex-col ml-3 pb-5 bottom-0 absolute">
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <h6 className=' text-gray-600'>Tap on Card to Flip it</h6>
                           
                            <div className='flex md:flex-row flex-col justify-center gap-2'>
                                <button className="bg-green-200 border-2 border-green-400 items-center flex flex-row justify-center rounded-md px-20 py-2" onClick={handleSave}>
                                <div className='flex flex-row'>
                                <TiTick className='h-6 w-6 text-green-600' />
                                <span className="text-green-600">I know this word</span>
                                </div>
                                
                                </button>
                                <button className="bg-red-200 border-2 border-red-400 items-center gap-1 flex flex-row rounded-md justify-center px-14 py-2" onClick={handleSave}>
                                <div className="flex flex-row items-center gap-1">
                                <ImCross className='h-4 w-4 text-red-600' />
                                <span className="text-red-600"> I don't know this word</span>
                                </div>
                                </button>
                                </div>
                            </div>
                        </div>
                        
                      
                    </div>
                    </div>
                    
                </div>
                <div className="card__face card__face--back p rounded-2xl">
                    <div className="">
                    <div  className='flex justify-start p-3'>
                        {isReactIcon ? <FaHeart className='text-red-600 w-[1.5rem] h-[1.5rem] ' onClick={handleHeart} /> : <CiHeart className='text-red-600 w-[1.5rem] h-[1.5rem]' onClick={handleHeart} />}
                    </div>
                        <div className="relative flex flex-col overflow-auto" onClick={handleFlip}>
                        {randomNumber && <h2 className='text-black flex flex-col items-center text-4xl font-bold mt-6 mb-6'>{words[randomNumber].word}</h2>}
                            

                            <div className=' mb-8 ml-6'>
                            {randomNumber &&     <p className='items-start flex flex-col font-semibold text-lg overflow-x-auto'>
                                    Definition: {words[randomNumber].definitions}
                                </p>}
                            
                                
                                <p className='items-start flex flex-col font-semibold text-lg'>Example:</p>
                          
                                <p className='items-start flex flex-col font-semibold text-lg'>Synonyms:</p>
                             
                                <p className='items-start flex flex-col font-semibold text-lg'>Antonyms:</p>
            
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-2 justify-center mt-6 relative mx-2'>
                            <button className='items-center  bg-green-200 gap-2 border-2 border-green-400 border-green flex flex-row justify-center rounded-md px-20' onClick={handleSave}>
                                <div className='flex flex-row'>
                                <TiTick className='h-6 w-6 text-green-600' />
                                <span className="text-green-600">I know this word</span>
                                </div>
                                
                            </button>
                            <button className='items-center bg-red-200 border-2 border-red-400 flex  flex-row border-red rounded-md justify-center px-14 py-2' onClick={handleSave}>
                                <div className="flex flex-row items-center gap-1">
                                <ImCross className='h-4 w-4 text-red-600' />
                                <span className="text-red-600"> I don't know this word</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className='flex flex-row gap-10'>
          <button onClick={handleClickLeft} disabled={currentIndex === 1} ><FaArrowAltCircleLeft className='text-blue-900 h-10 w-10'/></button>
          <button className='text-white text-lg font-mukta bg-blue-900 rounded-lg px-20 py-2' onClick={handleFlip}> Show </button>
          <button onClick={handleClickRight}><FaArrowAltCircleRight className='text-blue-900 h-10 w-10' /></button>
        </div>
        </div>

      {/* {randomNumber !== null && (
        <button onClick={handleSaveIndex}>Save Index to Firestore</button>
      )} */}
    </>
  );
}

export default FlashCardpage;
