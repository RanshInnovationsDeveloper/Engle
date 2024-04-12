import { useState, useRef, useEffect } from 'react';
import "../styles/CategoryHeader.css";
import { useDispatch } from 'react-redux';
import { setFlashCardCategory } from '../slices/flashCardSlice';

const FlashcardDropdown = ({ isOpen, isMobile }) => {

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const options = [
    {text:'Unseen Words', category: 'unseen'},
    {text:'Seen Words', category: 'seen'},
    {text:'Favourite Words', category: 'favourite'},
    {text:'Remember Words', category: 'remember'},
    {text:'Unremember Words', category: 'unremember'},
    // {text:'Idioms', category: 'idioms'},
    // {text:'Test Vocabulary', category: 'test'},
   ];



  useEffect(() => {
    if (isOpen && !isMobile) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'unset'; // Enable scrolling
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'; // Make sure scrolling is enabled when component unmounts
    };
  }, [isOpen, isMobile]);



  return (
    <div>
      {!isMobile ? (<>
        {isOpen && (<div className='flex flex-col  items-center'>
        <div className="absolute inset-0 top-[8.5rem] bg-gray-900 opacity-50 z-20"></div>
        <div ref={dropdownRef} className="absolute mt-3 z-20  ">

          <div className="bg-white border w-[11rem]   flex flex-col rounded-b-xl">
            {options.map((option, index) => (
              <div className={` flex flex-col justify-center px-2 text-center text-[1rem] hover:scale-y-105 hover:shadow-md  bg-[#EBEDFF]  hover:bg-[#FFFFFF] h-[3rem] ${index === options.length - 1 ? "rounded-b-xl": "border-b border-black border-opacity-20"}`}>
                <button
                key={index}
                onClick={()=> {
                  dispatch(setFlashCardCategory(option.category));
                  localStorage.setItem('flashCardCategory', option.category);
                  window.location.reload();
                }}
                
              >
                {option.text}
              </button>

              </div>
              
            ))}
          </div>
        </div>

      </div>
      )}
      </>
      ) : 
      (
        <>
         <div className={`menu-transition ${isOpen ? "menu-open" : ''}`}>
       {(
         <div className={`flex flex-row justify-center bg-transparent rounded-lg shadow-xl z-10`}>
           <ul className={`flex flex-col mt-2 gap-1 justify-start items-start `}>
 
             {options.map((option, index) => (
               <li key={index} className="py-1">
                   <button className={`text-black text-[1rem] `}
                   onClick={option.category}
                   >
                     {option.text}
                   </button>
               </li>
             ))}
           </ul>
         </div>
       )}
     </div>
        </>
      ) }
      
    </div>
  );
};

export default FlashcardDropdown;