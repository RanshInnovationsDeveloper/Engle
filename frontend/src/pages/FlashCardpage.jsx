import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CategoryHeader from "../components/CategoryHeader";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/FlashCard.css";
import Header from '../components/Header';
import { apiConnector } from '../services/apiConnector';
import { flashCardEndpoints,seenEndpoints } from '../services/apis';

import FavouriteButton from "../components/FavouriteButton";
import { WORD_FILE_NAME, WORD_FILE_TYPE } from "../constants/constants";
import RememberButton from '../components/RememberButton';
import UnrememberButton from '../components/UnrememberButton';



function FlashCardpage() {


    // const { authUserId } =useSelector((state) => state.auth);
    const authUserId = localStorage.getItem('authUserId');
    const { FETCHWORD_API } = flashCardEndpoints;
    const { ADD_SEEN_API } = seenEndpoints;

    // store word recieve from backend
    const [worddata, setWorddata] = useState({});
    const [flashCardCategory, setFlashCardCategory] = useState("unseen");


    // These state hook are used to control the flip functionality
    const [isFlipped, setIsFlipped] = useState(false);


    // This array is used to store the index of previous words .
    const [unseenPreviousIndex, setunseenPreviousIndex] = useState(JSON.parse(sessionStorage.getItem(flashCardCategory)) || []);
    const [previousarrayindex, setpreviousarrayindex] = useState(unseenPreviousIndex.length);   // 1 based indexing



    // this function is used to fetch the data from the backend
    const fetchWord = async (wordIndex) => {
        try {
             
            if (flashCardCategory !== "unseen" && authUserId==="null") {             // here it is a bug  ifauthUserId is null but it fetch as string "null" from session storage .
                toast.error("please login!");
                return;
            }
            else {
                const response = await apiConnector("POST", FETCHWORD_API,
                    {
                        wordCategory: flashCardCategory,
                        authUserId: `${authUserId}`,
                        wordIndex: wordIndex
                    })

                return response;
            }

        } catch (err) {
            console.log("there is error to fetchWord => ", err);
        }
    }

    useEffect(() => {
        async function callOnlyWhenPageReload() {
            let response;
            if (flashCardCategory === "unseen")
                response = await fetchWord("-1");
            else
                response = await fetchWord(JSON.stringify(previousarrayindex));

            if (response?.data?.data !== null) {

                setWorddata(response?.data?.data);
                updatesessionstoragearray(response?.data?.wordIndex);
                setpreviousarrayindex(previousarrayindex + 1);
            }
            else
                toast.error("no words found");
            return;
        }
        callOnlyWhenPageReload();
    }, [flashCardCategory, authUserId])


    // function to add the word in seen category if user is logged in and flip the word .
    useEffect(()=>{
        async function addWordInSeen(){
            if(authUserId!=="null"&&flashCardCategory==="unseen"){
                await apiConnector("POST", ADD_SEEN_API,
                    {
                        itemId: unseenPreviousIndex[previousarrayindex-1],
                        userId: `${authUserId}`,
                        type: WORD_FILE_TYPE,
                        name: WORD_FILE_NAME,
                    })

            }
        }
        if(isFlipped)
            addWordInSeen();

    },[isFlipped]);


    // update session storage array to store the previous word indexies 
    const updatesessionstoragearray = (index) => {
        const updatedarray = [...unseenPreviousIndex, index];
        setunseenPreviousIndex(updatedarray);
        sessionStorage.setItem(flashCardCategory, JSON.stringify(updatedarray));
        return;
    }


    // handler function to fetch next word 
    const handleClickRight = async () => {
       
        if (flashCardCategory === "unseen") {
            // if currentwordindex isequal to "-1" means we fetch any random word from backend .
            if (previousarrayindex === unseenPreviousIndex.length) {
                const response = await fetchWord("-1");
                if (response?.data?.data !== null) {

                    setWorddata(response?.data?.data);                
                    updatesessionstoragearray(response?.data?.wordIndex);
                    setpreviousarrayindex(previousarrayindex + 1);

                }
                else
                    toast.error("no words found");
            }
            else {
                const response = await fetchWord(JSON.stringify(unseenPreviousIndex[previousarrayindex]));
                if (response?.data !== null) {

                    setWorddata(response?.data?.data);
                    setpreviousarrayindex(previousarrayindex + 1);
                }
            }
        }
        // flashCardCategory is seen or favourite
        else {
            if (previousarrayindex === unseenPreviousIndex.length) {
                const response = await fetchWord(JSON.stringify(previousarrayindex));
                if (response?.data?.data !== null) {

                    setWorddata(response?.data?.data);
                    updatesessionstoragearray(response?.data?.wordIndex);
                    setpreviousarrayindex(previousarrayindex + 1);

                }
                else{
                    toast.error("no words found");
                }
            }
            else {
                const response = await fetchWord(JSON.stringify(previousarrayindex));
                if (response?.data?.data !== null) {

                    setWorddata(response?.data?.data);
                    setpreviousarrayindex(previousarrayindex + 1);

                }
                else{
                    toast.error("no words found");
                }
            }
        }
        return;
    };




    // handler function to fetch previous word
    const handleClickLeft = async () => {

        if (flashCardCategory === "unseen") {
            // get index from the session storage 
            if (previousarrayindex === 1) {
                toast.error("no more words");
            }
            else {
                const response = await fetchWord(JSON.stringify(unseenPreviousIndex[previousarrayindex - 2]));
                if (response?.data?.data !== null) {

                    setWorddata(response?.data?.data);
                    setpreviousarrayindex(previousarrayindex - 1);

                }
                else{
                    toast.error("no more words");
                }
            }
        }
        // wordCategory is favourite or seen
        else {
            const response = await fetchWord(JSON.stringify(previousarrayindex - 2));
            if (response?.data?.data !== null) {

                setWorddata(response?.data?.data);
                setpreviousarrayindex(previousarrayindex - 1);

            }
            else{
                toast.error("no words found");
            }
        }

        return;
    };


    const handleFlip = async () => {
        setIsFlipped(!isFlipped);

    };


    return (
        <>
            <Header val={1} />
            <CategoryHeader />
            <div className='h-[90vh] flex flex-col mt-10  items-center '>
                <h1 className='text-center text-4xl text-black '>FlashCards</h1>
                <h3 className='text-center text-xl text-black mb-3'>{flashCardCategory}</h3>
                <div className='lg:w-[43%] w-[80%] h-[56%] rounded-2xl'>

                    <div className={`card__inner ${isFlipped ? 'is-flipped' : ''} border border-blue-400 rounded-2xl`} onClick={handleFlip}>

                        <div className="card__face p rounded-2xl ">
                            <div className="">
                                <div className='flex justify-start ' >
                                    <FavouriteButton
                                        itemId={unseenPreviousIndex[previousarrayindex - 1]}
                                        type={WORD_FILE_TYPE}
                                        name={WORD_FILE_NAME}      // "Flashcards-unseen"
                                    />
                                </div>
                                <div >
                                    <div className='flex flex-col justify-center items-center'>
                                        {<h2 className='text-black-800 pt-[4.75rem]  font-bold text-4xl flex justify-center items-center'>{worddata?.word}</h2>}

                                    </div>
                                    <div className="flex flex-col ml-3 pb-5 bottom-0 absolute">
                                        <div className='flex flex-col justify-center items-center gap-2'>
                                            <h6 className=' text-gray-600'>Tap on Card to Flip it</h6>

                                            <div className='flex md:flex-row flex-col justify-center gap-2'>
                                                <button onClick={handleClickRight} className="bg-green-200 border-2 border-green-400 items-center flex flex-row justify-center rounded-md px-20 py-2" >
                                                    <div className='flex flex-row'>
                                                        <TiTick className='h-6 w-6 text-green-600' />
                                                        <span className="text-green-600">I know this word</span>
                                                    </div>

                                                </button>
                                                <button onClick={handleFlip} className="bg-red-200 border-2 border-red-400 items-center gap-1 flex flex-row rounded-md justify-center px-14 py-2">
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
                                <div className='flex justify-start'>
                                    <FavouriteButton
                                        itemId={unseenPreviousIndex[previousarrayindex - 1]}
                                        type={WORD_FILE_TYPE}
                                        name={WORD_FILE_NAME}    // "Flashcards-seen"
                                    />
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
                                    <RememberButton
                                        itemId={unseenPreviousIndex[previousarrayindex - 1]}
                                        type={WORD_FILE_TYPE}
                                        name={WORD_FILE_NAME}
                                    />
                                    <UnrememberButton
                                        itemId={unseenPreviousIndex[previousarrayindex - 1]}
                                        type={WORD_FILE_TYPE}
                                        name={WORD_FILE_NAME}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row gap-10'>
                    <button onClick={handleClickLeft}><FaArrowAltCircleLeft className='text-blue-900 h-10 w-10' /></button>
                    <button className='text-white text-lg font-mukta bg-blue-900 rounded-lg px-20 py-2' onClick={handleFlip}> Show </button>
                    <button onClick={handleClickRight}><FaArrowAltCircleRight className='text-blue-900 h-10 w-10' /></button>
                </div>
            </div>

        </>
    );
}

export default FlashCardpage;