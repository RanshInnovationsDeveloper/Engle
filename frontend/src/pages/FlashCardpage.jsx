import React, { useState, useEffect } from 'react';
import { auth, db } from "../services/firebase";
import CategoryHeader from "../components/CategoryHeader";
import Words from "../resources/words.json";
import { generateRandomNumber, saveIndexToFirestore } from "../services/operations/dataServices";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/FlashCard.css";
import Header from '../components/Header';
import { apiConnector } from '../services/apiConnector';
import { flashCardEndpoints } from '../services/apis';

function FlashCardpage() {
    const { authUserId } = useSelector((state) => state.auth);
    const { FETCHWORD_API, ADDWORD_API } = flashCardEndpoints;

    const [worddata, setWorddata] = useState({});
    const [flashCardCategory, setFlashCardCategory] = useState("unseen");
    const [isFlipped, setIsFlipped] = useState(false);
    const [isReactIcon, setIsReactIcon] = useState(true);
    const [unseenPreviousIndex, setUnseenPreviousIndex] = useState(JSON.parse(localStorage.getItem(flashCardCategory)) || []);
    const [previousArrayIndex, setPreviousArrayIndex] = useState(unseenPreviousIndex.length); // 1 based indexing

    const fetchWord = async (wordIndex) => {
        try {
            const response = await apiConnector("POST", FETCHWORD_API, {
                wordCategory: flashCardCategory,
                authUserId: `${authUserId}`,
                wordIndex: wordIndex
            });
            return response;
        } catch (err) {
            console.log("Error fetching word: ", err);
        }
    }

    const addWord = async ({ categoryType, wordIndex }) => {
        try {
            const response = await apiConnector("POST", ADDWORD_API, {
                wordCategory: categoryType,
                authUserId: `${authUserId}`,
                wordIndex: wordIndex
            });
            return response;
        } catch (err) {
            console.log("Error adding word to category: ", err);
        }
    }

    useEffect(() => {
        async function callOnlyWhenPageReload() {
            const response = await fetchWord("-1");
            if (response?.data !== null) {
                setWorddata(response?.data?.data);
                updatelocalstoragearray(response?.data?.wordIndex);
                setPreviousArrayIndex(previousArrayIndex + 1);
            }
        }
        callOnlyWhenPageReload();
    }, [flashCardCategory])

    const updatelocalstoragearray = (index) => {
        const updatedArray = [...unseenPreviousIndex, index];
        setUnseenPreviousIndex(updatedArray);
        localStorage.setItem(flashCardCategory, JSON.stringify(updatedArray));
    }

    const handleClickRight = async () => {
        if (previousArrayIndex === unseenPreviousIndex.length) {
            const response = await fetchWord("-1");
            if (response?.data !== null) {
                setWorddata(response?.data?.data);
                updatelocalstoragearray(response?.data?.wordIndex);
                setPreviousArrayIndex(previousArrayIndex + 1);
            }
        } else {
            const response = await fetchWord(JSON.stringify(unseenPreviousIndex[previousArrayIndex]));
            if (response?.data !== null) {
                setWorddata(response?.data?.data);
                setPreviousArrayIndex(previousArrayIndex + 1);
            }
        }
    };

    const handleClickLeft = async () => {
        if (previousArrayIndex === 1) {
            toast.error("No more words");
            return;
        } else {
            const response = await fetchWord(JSON.stringify(unseenPreviousIndex[previousArrayIndex - 2]));
            if (response?.data !== null) {
                setWorddata(response?.data?.data);
                setPreviousArrayIndex(previousArrayIndex - 1);
            }
        }
    };

    const addToRemember = async () => {
        addWord({ categoryType: "remember", wordIndex: unseenPreviousIndex[previousArrayIndex - 1] });
        toast.success("Word added to remember list");
    }

    const addToUnremember = async () => {
        addWord({ categoryType: "unremember", wordIndex: unseenPreviousIndex[previousArrayIndex - 1] });
        toast.success("Word added to unremember list");
    }

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleHeart = () => {
        setIsReactIcon(!isReactIcon);
    };

    return (
        <>
            <Header val={1} />
            <CategoryHeader />
            <div className='h-[90vh] flex flex-col mt-10 gap-4 items-center '>
                <h1 className='text-center text-4xl text-black'>FlashCards</h1>
                <div className='lg:w-[43%] w-[80%] h-[56%] rounded-2xl'>
                    <div className={`card__inner ${isFlipped ? 'is-flipped' : ''} border border-blue-400 rounded-2xl`} onClick={handleFlip}>
                        <div className="card__face p rounded-2xl ">
                            <div className="">
                                <div className='flex justify-start p-3 ' >
                                    {isReactIcon ? <FaHeart className='text-red-600 w-[1.5rem] h-[1.5rem]' onClick={handleHeart} /> : <CiHeart className='text-red-600 w-[1.5rem] h-[1.5rem]' onClick={handleHeart} />}
                                </div>
                                <div >
                                    <div className='flex flex-col justify-center items-center'>
                                        {<h2 className='text-black-800 pt-[4.75rem]  font-bold text-4xl flex justify-center items-center'>{worddata?.word}</h2>}
                                    </div>
                                    <div className="flex flex-col ml-3 pb-5 bottom-0 absolute">
                                        <div className='flex flex-col justify-center items-center gap-2'>
                                            <h6 className=' text-gray-600'>Tap on Card to Flip it</h6>
                                            <div className='flex md:flex-row flex-col justify-center gap-2'>
                                                <button onClick={addToRemember} className="bg-green-200 border-2 border-green-400 items-center flex flex-row justify-center rounded-md px-20 py-2">
                                                    <div className='flex flex-row'>
                                                        <TiTick className='h-6 w-6 text-green-600' />
                                                        <span className="text-green-600">I know this word</span>
                                                    </div>
                                                </button>
                                                <button onClick={addToUnremember} className="bg-red-200 border-2 border-red-400 items-center gap-1 flex flex-row rounded-md justify-center px-14 py-2">
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
                                <div className='flex justify-start p-3'>
                                    {isReactIcon ? <FaHeart className='text-red-600 w-[1.5rem] h-[1.5rem] ' onClick={handleHeart} /> : <CiHeart className='text-red-600 w-[1.5rem] h-[1.5rem]' onClick={handleHeart} />}
                                </div>
                                <div className="relative flex flex-col overflow-auto" onClick={handleFlip}>
                                    {<h2 className='text-black flex flex-col items-center text-4xl font-bold mt-6 mb-6'>{worddata?.word}</h2>}
                                    <div className=' mb-8 ml-6'>
                                        {<p className='items-start flex flex-col font-semibold text-lg overflow-x-auto'>
                                            Definition: {worddata?.definitions}
                                        </p>}
                                        <p className='items-start flex flex-col font-semibold text-lg'>Example:</p>
                                        <p className='items-start flex flex-col font-semibold text-lg'>Synonyms:</p>
                                        <p className='items-start flex flex-col font-semibold text-lg'>Antonyms:</p>
                                    </div>
                                </div>
                                <div className='flex md:flex-row flex-col gap-2 justify-center mt-6 relative mx-2'>
                                    <button onClick={addToRemember} className='items-center  bg-green-200 gap-2 border-2 border-green-400 border-green flex flex-row justify-center rounded-md px-20'>
                                        <div className='flex flex-row'>
                                            <TiTick className='h-6 w-6 text-green-600' />
                                            <span className="text-green-600">I know this word</span>
                                        </div>
                                    </button>
                                    <button onClick={addToUnremember} className='items-center bg-red-200 border-2 border-red-400 flex  flex-row border-red rounded-md justify-center px-14 py-2'>
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
                    <button onClick={handleClickLeft} disabled={previousArrayIndex === 1}><FaArrowAltCircleLeft className='text-blue-900 h-10 w-10' /></button>
                    <button className='text-white text-lg font-mukta bg-blue-900 rounded-lg px-20 py-2' onClick={handleFlip}> Show </button>
                    <button onClick={handleClickRight}><FaArrowAltCircleRight className='text-blue-900 h-10 w-10' /></button>
                </div>
            </div>
        </>
    );
}

export default FlashCardpage;
