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
import { flashCardEndpoints, seenEndpoints } from '../services/apis';
import FavouriteButton from "../components/FavouriteButton";
import { WORD_FILE_NAME, WORD_FILE_TYPE, FLASH_CARD_SEEN, FLASH_CARD_UNSEEN } from "../constants/constants";
import RememberButton from '../components/RememberButton';
import UnrememberButton from '../components/UnrememberButton';
import Notecard from '../components/Notecard';



function FlashCardpage() {

    //This is to set the first occurence of data where all data is present in words
    const [detailIndex, setDetailIndex] = useState(0);

    const { authUserId } = useSelector((state) => state.auth);
    const { FETCHWORD_API } = flashCardEndpoints;
    const { ADD_SEEN_API } = seenEndpoints;

    // store word recieve from backend
    const [worddata, setWorddata] = useState({});
    const [flashCardCategory, setFlashCardCategory] = useState(localStorage.getItem("flashCardCategory") || "unseen");


    // These state hook are used to control the flip functionality
    const [isFlipped, setIsFlipped] = useState(false);

    //State to check if item is seen
    const [isSeen, setIsSeen] = useState(false);


    // This State is used only in case of Unseen ( we do not store the data of unseen in backend So I store it in local storage)
    const [unseenArrayInStorage, setunseenArrayInStorage] = useState(JSON.parse(localStorage.getItem(`ArrayofWordFileActualIndex_${flashCardCategory}`)) || [-1]);
    const [unseenPreviousArrayIndex, setunseenPreviousArrayIndex] = useState(parseInt(localStorage.getItem("unseenPreviousArrayIndex"))-1||unseenArrayInStorage.length-1);

    // This state is used to store the current flashCardCategory data except unseen (Retrive from backend)
    const [currentCategoryWordIndex, setCurrentCategoryWordIndex] = useState(parseInt(localStorage.getItem(`currentCategoryWordIndex_${flashCardCategory}`)) || 0);
    const [currentCategoryWordFileActualIndex, setCurrentCategoryWordFileActualIndex] = useState(parseInt(localStorage.getItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`)) || 0);



    // this function is used to fetch the data from the backend
    const fetchWord = async (wordIndex) => {
        try {

            (isFlipped) ? setIsSeen(true) : setIsSeen(false); //if the card is flipped then it is seen

            if (flashCardCategory !== "unseen" && authUserId == null) {             // here it is a bug  ifauthUserId is null but it fetch as string "null" from session storage .
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
                response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex]));
            else
                response = await fetchWord(JSON.stringify(currentCategoryWordIndex));

            if (response?.data?.data !== null) {

                setWorddata(response?.data?.data);
                setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex);  
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);

                if (flashCardCategory === "unseen"&&unseenArrayInStorage[unseenPreviousArrayIndex]===-1) {

                    updatesessionstoragearray(response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex + 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex+1);
                }
                else {
                    setCurrentCategoryWordIndex(currentCategoryWordIndex + 1);
                    localStorage.setItem(`currentCategoryWordIndex_${flashCardCategory}`, currentCategoryWordIndex);
                }
            }
            else
                toast.error("No words found in this category!");
            return;
        }
        callOnlyWhenPageReload();
    }, [])





    // function to add the word in seen category if user is logged in and flip the word .
    useEffect(() => {
        async function addWordInSeen() {
            
            if (authUserId !== "null" && flashCardCategory === "unseen") {
                await apiConnector("POST", ADD_SEEN_API,
                    {
                        itemId: unseenArrayInStorage[unseenPreviousArrayIndex - 1],
                        userId: `${authUserId}`,
                        type: WORD_FILE_TYPE,
                        name: WORD_FILE_NAME,
                    })

            }
        }
        if (isFlipped)
            addWordInSeen();

    }, [isFlipped]);




    // update session storage array of unseenArray to store the previous word indexies 
    const updatesessionstoragearray = (index) => {
        const updatedarray = [...unseenArrayInStorage.slice(0, -1), index, -1];
        setunseenArrayInStorage(updatedarray);
        localStorage.setItem(`ArrayofWordFileActualIndex_${flashCardCategory}`, JSON.stringify(updatedarray));
        return;
    }




    // handler function to fetch next word 
    const handleClickRight = async () => {

        if (flashCardCategory === "unseen") {
            if (unseenArrayInStorage[unseenPreviousArrayIndex] === -1) {
                const response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex]));
                if (response?.data?.data !== null) {

                    setWorddata(response?.data?.data);
                    setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex);
                    localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                    updatesessionstoragearray(response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex + 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex+1);

                }
                else
                    toast.error("No more words!");
            }
            else {
                const response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex]));
                if (response?.data !== null) {

                    setWorddata(response?.data?.data);
                    setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex);
                    localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex + 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex+1);
                }
            }
        }
        // flashCardCategory is seen or favourite
        else {
 
            const response = await fetchWord(JSON.stringify(currentCategoryWordIndex));
            if (response?.data?.data !== null) {

                setWorddata(response?.data?.data);
                setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex);
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                setCurrentCategoryWordIndex(currentCategoryWordIndex+1);
                localStorage.setItem(`currentCategoryWordIndex_${flashCardCategory}`, currentCategoryWordIndex);
            }
            else {
                toast.error("No more words!");
            }
        }
        return;
    };




    // handler function to fetch previous word
    const handleClickLeft = async () => {

        if (flashCardCategory === "unseen") {
            if (unseenPreviousArrayIndex === 1) {
                toast.error("No more words!");
            }
            else {
                const response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex - 2]));
                if (response?.data?.data !== null) {

                    setWorddata(response?.data?.data);
                    setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex);
                    localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex - 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex-1);
                }
                else {
                    toast.error("No more words!");
                }
            }
        }
        // wordCategory is favourite or seen
        else {
            const response = await fetchWord(JSON.stringify(currentCategoryWordIndex - 2));
            if (response?.data?.data !== null) {

                setWorddata(response?.data?.data);
                setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex);
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                setCurrentCategoryWordIndex(currentCategoryWordIndex - 1);
                localStorage.setItem(`currentCategoryWordIndex_${flashCardCategory}`, currentCategoryWordIndex-2);
            }
            else {
                toast.error("No more words!");
            }
        }

        return;
    };




    const handleFlip = async () => {
        setIsFlipped(!isFlipped);
        if (isFlipped === true) setIsSeen(true);

    };



    //set Index where all data is present 
    const detailIndexSetterFunction = () => {
        for (let i = 0; i < worddata?.details?.length; i++) {
            // iterate over all for a suitable candidate
            if (
                worddata?.details?.[i]?.definition &&
                worddata?.details?.[i]?.examples?.length > 0 &&
                worddata?.details?.[i]?.synonyms?.length > 0 &&
                worddata?.details?.[i]?.antonyms?.length > 0
            ) {
                setDetailIndex(i);
                break;
            }
            // if it is the last index and we haven't found a suitable candidate then set the last index 
            else if (i === worddata?.details?.length - 1) {
                setDetailIndex(i);
            }
        }
    }
    useEffect(() => { detailIndexSetterFunction() }, [worddata])



    return (
        <>
            <Header val={1} />
            <div className='h-[90vh] flex flex-col mt-10  items-center '>
                <h1 className='text-center text-4xl text-black '>FlashCards</h1>
                <h3 className='text-center text-xl text-black mb-3'>{flashCardCategory}</h3>
                <div className='lg:w-[43%] w-[80%] h-[56%] rounded-2xl'>

                    <div className={`card__inner ${isFlipped ? 'is-flipped' : ''} border border-blue-400 rounded-2xl`} onClick={handleFlip}>

                        <div className="card__face p rounded-2xl ">
                            <div className="">
                                <div className='flex justify-start ' >
                                    {isSeen ? <FavouriteButton
                                        itemId={currentCategoryWordFileActualIndex}
                                        type={WORD_FILE_TYPE}
                                        name={FLASH_CARD_SEEN}
                                        isFlipped={isFlipped}
                                    /> :
                                        <FavouriteButton
                                            itemId={currentCategoryWordFileActualIndex}
                                            type={WORD_FILE_TYPE}
                                            name={FLASH_CARD_UNSEEN}
                                            isFlipped={isFlipped}
                                        />}
                                </div>
                                <div >
                                    <div className='flex flex-col justify-center items-center'>
                                        {<h2 className='text-black-800 pt-[4.75rem]  font-bold text-4xl flex justify-center items-center'>{worddata?.word && worddata.word.charAt(0).toUpperCase() + worddata.word.slice(1)}</h2>}

                                    </div>
                                    <div className="flex flex-col ml-3 pb-5 bottom-0 absolute">
                                        <div className='flex flex-col justify-center items-center gap-2'>
                                            <h6 className=' text-gray-600'>Tap on Card to Flip it</h6>

                                            <div className='flex md:flex-row flex-col justify-center gap-2'>
                                                {/* <button onClick={handleClickRight} className="bg-green-200 border-2 border-green-400 items-center flex flex-row justify-center rounded-md px-20 py-2" >
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
                                                </button> */}
                                                <RememberButton
                                                    itemId={currentCategoryWordFileActualIndex}
                                                    type={WORD_FILE_TYPE}
                                                    name={WORD_FILE_NAME}
                                                    isFlipped={isFlipped}
                                                    onClick={handleClickRight}
                                                />
                                                <UnrememberButton
                                                    itemId={currentCategoryWordFileActualIndex}
                                                    type={WORD_FILE_TYPE}
                                                    name={WORD_FILE_NAME}
                                                    isFlipped={isFlipped}
                                                    onClick={handleFlip}
                                                />
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
                                        itemId={currentCategoryWordFileActualIndex}
                                        type={WORD_FILE_TYPE}
                                        name={FLASH_CARD_SEEN} 
                                        isFlipped={isFlipped}
                                    />
                                </div>
                                <div className="relative flex flex-col overflow-auto" onClick={handleFlip}>
                                    <h2 className='text-black flex flex-col items-center text-4xl font-bold mt-6 mb-6'>
                                        {worddata?.word && worddata.word.charAt(0).toUpperCase() + worddata.word.slice(1)}
                                    </h2>



                                    <div className=' mb-8 ml-6'>
                                        <p className='items-start flex flex-col font-semibold text-lg'>
                                            Definition: {worddata?.details?.[detailIndex]?.definition && worddata.details[detailIndex].definition.charAt(0).toUpperCase() + worddata.details[detailIndex].definition.slice(1)}
                                        </p>

                                        <p className='items-start flex flex-col font-semibold text-lg'>
                                            Example: {worddata?.details?.[detailIndex]?.examples?.[0] && worddata.details[detailIndex].examples[0].charAt(0).toUpperCase() + worddata.details[detailIndex].examples[0].slice(1)}
                                        </p>

                                        <p className='items-start flex flex-col font-semibold text-lg'>
                                            Synonyms: {worddata?.details?.[detailIndex]?.synonyms && worddata.details[detailIndex].synonyms.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')}
                                        </p>

                                        <p className='items-start flex flex-col font-semibold text-lg'>
                                            Antonyms: {worddata?.details?.[detailIndex]?.antonyms && worddata.details[detailIndex].antonyms.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex md:flex-row flex-col gap-2 justify-center mt-6 relative mx-2'>
                                    <RememberButton
                                        itemId={currentCategoryWordFileActualIndex}
                                        type={WORD_FILE_TYPE}
                                        name={WORD_FILE_NAME}
                                        isFlipped={isFlipped}
                                    />
                                    <UnrememberButton
                                        itemId={currentCategoryWordFileActualIndex}
                                        type={WORD_FILE_TYPE}
                                        name={WORD_FILE_NAME}
                                        isFlipped={isFlipped}
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
        <Notecard/>
        </>
    );
}

export default FlashCardpage;