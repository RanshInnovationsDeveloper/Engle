import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CategoryHeader from "../components/CategoryHeader";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/FlashCard.css";
import Header from '../components/Header';
import { apiConnector } from '../services/apiConnector';
import { flashCardEndpoints } from '../services/apis';


function FlashCardpage() {


    const { authUserId } = useSelector((state) => state.auth);
    const { FETCHWORD_API, ADDWORD_API } = flashCardEndpoints;
    
    // store word recieve from backend
    const [worddata, setWorddata] = useState({});

    const [flashCardCategory, setFlashCardCategory] = useState("unseen");

    const [currentwordIndex, setcurrentwordIndex] = useState("-1");


    // These state hook are used to control the flip functionality
    const [isFlipped, setIsFlipped] = useState(false);
    const [isReactIcon, setIsReactIcon] = useState(true);


    // This array is used to store the index of previous words .
    const [unseenPreviousIndex, setunseenPreviousIndex] = useState(JSON.parse(localStorage.getItem(flashCardCategory)) || []);


    // this function is used to fetch the data from the backend
    const fetchWord = async () => {
        try {
            const response = await apiConnector("POST", FETCHWORD_API,
                {
                    wordCategory: flashCardCategory,
                    authUserId: `${authUserId}`,
                    wordIndex: currentwordIndex
                })

            return response;

        } catch (err) {
            console.log("there is error to fetchWord => ", err);
        }
    }

    // add word for remember or unremember
    const addWord = async (categoryype) => {
        try {
            const response = await apiConnector("POST", ADDWORD_API,
                {
                    wordCategory: categoryype,            // remember or unrememeber 
                    authUserId: `${authUserId}`,
                    wordIndex: currentwordIndex
                })
            console.log("word is successfully added in category-", response?.data?.message);
            return;


        } catch (err) {
            console.log("there is error to addWord in its Category => ", err);
            return;
        }
    }



    useEffect(() => {
        async function callOnlyWhenPageReload() {
            const response = await fetchWord();
            if (response?.data !== null) {

                setWorddata(response?.data?.data);

                // update the previous word index
                updatelocalstoragearray(response?.data?.wordIndex);
                // console.log(response?.data);
                return;
            }
        }
        callOnlyWhenPageReload();
    }, [])


    // update local storage array to store the previous word indexies 
    const updatelocalstoragearray = (index) => {
        const updatedarray = [...unseenPreviousIndex, index];
        setunseenPreviousIndex(updatedarray);
        localStorage.setItem(flashCardCategory, JSON.stringify(updatedarray));
        return;
    }


    // handler function to fetch next word 
    const handleClickRight = async () => {

        // if currentwordindex isequal to -1 means we fetch any random from backend .
        setcurrentwordIndex("-1");
        const response = await fetchWord();
        if (response?.data !== null) {

            setWorddata(response?.data?.data);

            // update the previous word index
            updatelocalstoragearray(response?.data?.wordIndex);
        }

    };


    // handler function to fetch previous word
    const handleClickLeft = async () => {

        // get last index from the local storage
        setcurrentwordIndex(unseenPreviousIndex[unseenPreviousIndex.length - 1]);
        const response = await fetchWord();
        if (response?.data !== null) {

            setWorddata(response?.data?.data);

        }

    };



    const handleFlip = async () => {
        setIsFlipped(!isFlipped);
     
    };

    // handler funtion for favourite
    const handleHeart = () => {
        setIsReactIcon(!isReactIcon);
    };

    const handleSave=()=>{
    
    }

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
                    <button onClick={handleClickLeft} disabled={currentwordIndex === -1} ><FaArrowAltCircleLeft className='text-blue-900 h-10 w-10' /></button>
                    <button className='text-white text-lg font-mukta bg-blue-900 rounded-lg px-20 py-2' onClick={handleFlip}> Show </button>
                    <button onClick={handleClickRight}><FaArrowAltCircleRight className='text-blue-900 h-10 w-10' /></button>
                </div>
            </div>

        </>
    );
}

export default FlashCardpage;
