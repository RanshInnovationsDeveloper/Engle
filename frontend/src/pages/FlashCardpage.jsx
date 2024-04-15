import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { setCurrentCategoryWordIndex, setCurrentCategoryWordFileActualIndex, setFlashCardCategory } from '../slices/flashCardSlice';
import RememberButton from '../components/RememberButton';
import UnrememberButton from '../components/UnrememberButton';
import Notecard from '../components/Notecard';



function FlashCardpage() {

   
    const { authUserId } = useSelector((state) => state.auth);

    // This state is used to store the current flashCardCategory data except unseen (Retrive from backend)
    const { flashCardCategory, currentCategoryWordIndex, currentCategoryWordFileActualIndex } = useSelector((state) => state.flashCard);

    const { FETCHWORD_API } = flashCardEndpoints;
    const { ADD_SEEN_API } = seenEndpoints;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // store word recieve from backend
    const [worddata, setWorddata] = useState({});

    //This is to set the first occurence of data where all data is present in words
    const [detailIndex, setDetailIndex] = useState(0);

    // These state hook are used to control the flip functionality
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSide, setIsSide] = useState("front");
    //State to check if item is seen
    const [isSeen, setIsSeen] = useState(false);
    const options = [
        {text:'Unseen Words', category: 'unseen'},
        {text:'Seen Words', category: 'seen'},
        {text:'Favourite Words', category: 'favourite'},
        {text:'Remember Words', category: 'remember'},
        {text:'Unremember Words', category: 'unremember'},
        // {text:'Idioms', category: 'idioms'},
        // {text:'Test Vocabulary', category: 'test'},
       ];

       const selectedoption = options.find(option => option.category === flashCardCategory)


    // This State is used only in case of Unseen ( we do not store the data of unseen in backend So I store it in local storage)
    const [unseenArrayInStorage, setunseenArrayInStorage] = useState(JSON.parse(localStorage.getItem("ArrayofWordFileActualIndex_unseen")) || [-1]);
    const [unseenPreviousArrayIndex, setunseenPreviousArrayIndex] = useState(parseInt(localStorage.getItem("unseenPreviousArrayIndex")) - 1 || unseenArrayInStorage.length - 1);

    function ExpandableParagraph({ text }) {
        const [expanded, setExpanded] = useState(false);
    
        const toggleExpanded = (e) => {
            e.stopPropagation();
            setExpanded(!expanded);
        };
    
        return (
            
                <p
                    className={`scrollable-p text-left ${expanded ? 'expanded' : ''}`}
                    onClick={toggleExpanded}
                >
                    {text}
                </p>
        );
    }

    // this function is used to fetch the data from the backend
    const fetchWord = async (wordIndex) => {
        try {

            const response = await apiConnector("POST", FETCHWORD_API,
                {
                    wordCategory: flashCardCategory,
                    authUserId: `${authUserId}`,
                    wordIndex: wordIndex
                })
            return response;

        } catch (err) {
            console.log("there is error to fetchWord => ", err);
            toast.error("There is some server error!");
            return;
        }
    }




    useEffect(() => {
        async function callOnlyWhenPageReload() {
          try{
            let response;
            if (flashCardCategory === "unseen")
                response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex]));

            else if (flashCardCategory !== "unseen" && authUserId == null) {
                navigate("/login");
                dispatch(setFlashCardCategory("unseen"));
                localStorage.setItem("flashCardCategory", "unseen");
                return;
            }

            else {
                response = await fetchWord(JSON.stringify(currentCategoryWordIndex));
            }

            if (response?.data?.data !== null) {

                isFlipped ? setTimeout(() => setWorddata(response?.data?.data), 500) : setWorddata(response?.data?.data);

                dispatch(setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex));
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);

                if (flashCardCategory === "unseen" && unseenArrayInStorage[unseenPreviousArrayIndex] === -1) {
                    updatesessionstoragearray(response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex + 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex + 1);
                }
                else {
                    dispatch(setCurrentCategoryWordIndex(currentCategoryWordIndex));
                    localStorage.setItem(`currentCategoryWordIndex_${flashCardCategory}`, currentCategoryWordIndex);
                }
            }
            else {
                toast.error("No words found in this category!");
                dispatch(setCurrentCategoryWordIndex(0));
                localStorage.setItem(`currentCategoryWordIndex_${flashCardCategory}`, 0);
                dispatch(setCurrentCategoryWordFileActualIndex(0));
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, 0);
            }
          }
          catch(err){
            console.log("error in fetching word",err);
            toast.error("There is some server error!");
            navigate("/error");
          }
            return;
        }
        callOnlyWhenPageReload();
    }, [flashCardCategory])





    // function to add the word in seen category if user is logged in and flip the word .
    useEffect(() => {
        async function addWordInSeen() {

            if (authUserId != null && flashCardCategory === "unseen") {
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

        if(isSide === "back")
        {
           handleFlip();
        }

        if (flashCardCategory === "unseen") {
            if (unseenArrayInStorage[unseenPreviousArrayIndex] === -1) {
                const response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex]));
                if (response?.data?.data !== null) {

                    isFlipped ? setTimeout(() => setWorddata(response?.data?.data), 500) : setWorddata(response?.data?.data);

                    dispatch(setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex));
                    localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                    updatesessionstoragearray(response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex + 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex + 1);

                }
                else
                    toast.error("No more words!");
            }
            else {
                const response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex]));
                if (response?.data !== null) {

                    isFlipped ? setTimeout(() => setWorddata(response?.data?.data), 500) : setWorddata(response?.data?.data);

                    dispatch(setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex));
                    localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex + 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex + 1);
                }
            }
        }
        // flashCardCategory is seen or favourite
        else {

            const response = await fetchWord(JSON.stringify(currentCategoryWordIndex));
            if (response?.data?.data !== null) {
                
               isFlipped ? setTimeout(() => setWorddata(response?.data?.data), 500) : setWorddata(response?.data?.data);

                dispatch(setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex));
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                dispatch(setCurrentCategoryWordIndex(currentCategoryWordIndex + 1));
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
         if(isSide === "back")
         {
            handleFlip();
         }

        if (flashCardCategory === "unseen") {
            if (unseenPreviousArrayIndex === 1) {
                toast.error("No more words!");
            }
            else {
                const response = await fetchWord(JSON.stringify(unseenArrayInStorage[unseenPreviousArrayIndex - 2]));
                if (response?.data?.data !== null) {

                    isFlipped ? setTimeout(() => setWorddata(response?.data?.data), 500) : setWorddata(response?.data?.data);

                    dispatch(setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex));
                    localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                    setunseenPreviousArrayIndex(unseenPreviousArrayIndex - 1);
                    localStorage.setItem("unseenPreviousArrayIndex", unseenPreviousArrayIndex - 1);
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

                isFlipped ? setTimeout(() => setWorddata(response?.data?.data), 500) : setWorddata(response?.data?.data);

                dispatch(setCurrentCategoryWordFileActualIndex(response?.data?.wordIndex));
                localStorage.setItem(`currentCategoryWordFileActualIndex_${flashCardCategory}`, response?.data?.wordIndex);
                dispatch(setCurrentCategoryWordIndex(currentCategoryWordIndex - 1));
                localStorage.setItem(`currentCategoryWordIndex_${flashCardCategory}`, currentCategoryWordIndex - 2);
            }
            else {
                toast.error("No more words!");
            }
        }

        return;
    };




    const handleFlip = async () => {
        setIsFlipped(!isFlipped);
        if(isSide ==="front"){
            setIsSide("back");
            // setExpanded(false);
        } 
        else
        setIsSide("front");
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
            <div className='h-[34rem] flex flex-col mt-10  items-center '>
                <h1 className='text-center text-[1.875rem] leading-4 font-[700px] mb-2 tracking-wider text-black '>FLASHCARDS</h1>
                <h3 className='text-center text-base text-black mb-4'>{selectedoption.text}</h3>
                   <div className="cube-container">
                   <div className="cube flex flex-row justify-center items-center">
                   
                   <div
                       className={`flip-card ${isFlipped ? "flipped" : ""
                           }  shadow-xl rounded-2xl  cube-face-front`}
                       onClick={handleFlip}
                   >
                       <div className="flip-card-inner ">
                           <div className="flip-card-front border border-[#5B7ADE] rounded-2xl">
                               <div className="card-content flex flex-col justify-center  h-full">
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
                                   <div className=' flex flex-col justify-between h-full ' >
                                       <div className='flex flex-col justify-center items-center h-[70%]'>
                                           <div className="">
                                               {<h2 className='text-[#212121]  font-bold text-4xl flex justify-center items-center'>{worddata?.word && worddata.word.charAt(0).toUpperCase() + worddata.word.slice(1)}</h2>}
                                           </div>

                                       </div>
                                       <div className="flex flex-col justify-end gap-2 items-center h-[30%]">

                                           <h6 className=' text-[#757575]'>Tap on Card to Flip it</h6>

                                           <div className='flex flex-row justify-center gap-3'>
                                               <div className="" onClick={(e)=> {
                                                   setTimeout(handleClickRight, 1000); // 1500 milliseconds = 1.5 seconds
                                                   e.stopPropagation();

                                               }}>
                                               <RememberButton
                                                   itemId={currentCategoryWordFileActualIndex}
                                                   type={WORD_FILE_TYPE}
                                                   name={WORD_FILE_NAME}
                                                   isFlipped={isFlipped}
                                                   side="front"
                                               />

                                               </div>



                                               <div className="" onClick={(e)=> {
                                                setTimeout(handleFlip,1000);
                                                   e.stopPropagation();
                                               }}>
                                               <UnrememberButton
                                                   itemId={currentCategoryWordFileActualIndex}
                                                   type={WORD_FILE_TYPE}
                                                   name={WORD_FILE_NAME}
                                                   isFlipped={isFlipped}
                                                   side="front"
                                               />

                                               </div>
                                               
                                           </div>
                                       </div>


                                   </div>
                               </div>

                           </div>
                           <div className="flip-card-back border border-[#5B7ADE] rounded-2xl">
                               <div className="card-content flex flex-col justify-center  h-full">
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
                                   <div className=' flex flex-col justify-between h-full ' >
                                       <div className='flex flex-col gap-2  items-center  h-[80%]'>
                                           <div className="">
                                               {<h2 className='text-[#212121]  font-bold text-4xl flex justify-center items-center'>{worddata?.word && worddata.word.charAt(0).toUpperCase() + worddata.word.slice(1)}</h2>}
                                           </div>
                                           <div className='text-[#212121]  h-full gap-2 flex flex-col justify-center items-start font-medium text-base w-full  '>
                                              
                                                 <ExpandableParagraph text={`Definition: ${worddata?.details?.[detailIndex]?.definition && worddata.details[detailIndex].definition.charAt(0).toUpperCase() + worddata.details[detailIndex].definition.slice(1)}`} />
                                                      
                                                 <ExpandableParagraph text={`Example: ${worddata?.details?.[detailIndex]?.examples?.[0] && worddata.details[detailIndex].examples[0].charAt(0).toUpperCase() + worddata.details[detailIndex].examples[0].slice(1)}`}/>
                                                        
                                                 <ExpandableParagraph text={`Synonyms: ${worddata?.details?.[detailIndex]?.synonyms && worddata.details[detailIndex].synonyms.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')}`}/>

                                                 <ExpandableParagraph  text={`Antonyms: ${worddata?.details?.[detailIndex]?.antonyms && worddata.details[detailIndex].antonyms.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')}`} />

                                           </div>

                                       </div>
                                       <div className="flex flex-col justify-end items-center   h-[20%]">



                                           <div className='flex flex-row justify-center gap-3'>
                                               <div className="" onClick={(e)=> {
                                                   e.stopPropagation();
                                               }}>
                                                   <RememberButton
                                                   itemId={currentCategoryWordFileActualIndex}
                                                   type={WORD_FILE_TYPE}
                                                   name={WORD_FILE_NAME}
                                                   isFlipped={isFlipped}
                                                   side="back"
                                               />
                                               </div>

                                               <div className="" onClick={(e)=> {
                                                   e.stopPropagation();
                                               }}>
                                                   <UnrememberButton
                                                   itemId={currentCategoryWordFileActualIndex}
                                                   type={WORD_FILE_TYPE}
                                                   name={WORD_FILE_NAME}
                                                   isFlipped={isFlipped}
                                                 
                                                   side="back"
                                               />

                                               </div>
                                               
                                           </div>
                                       </div>


                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="cube-face cube-face-right shadow-xl rounded-2xl border border-[#5B7ADE] items-center flex flex-row justify-center text-lg font-normal text-[#757575] ">Tap to Prev</div>
           <div className="cube-face cube-face-left shadow-xl rounded-2xl border border-[#5B7ADE] items-center flex flex-row justify-center text-[#757575] text-lg font-normal">
            Tap to Next
           </div>
               </div>

                   </div>
                


                <div className='flex flex-row gap-10 mt-8'>
                    <button onClick={handleClickLeft}><FaArrowAltCircleLeft className='text-blue-900 h-10 w-10' /></button>
                    <button className='text-white text-lg font-mukta bg-blue-900 rounded-lg px-20 py-2' onClick={handleFlip}> Show </button>
                    <button onClick={handleClickRight}><FaArrowAltCircleRight className='text-blue-900 h-10 w-10' /></button>
                </div>
            </div>
            <Notecard />
        </>
    );
}

export default FlashCardpage;