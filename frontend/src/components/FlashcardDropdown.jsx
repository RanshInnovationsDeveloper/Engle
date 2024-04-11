import { useState, useRef, useEffect } from 'react';
import "../styles/CategoryHeader.css";
const FlashcardDropdown = ({ isOpen, isMobile }) => {

  const dropdownRef = useRef(null);
  const options = ['Unseen Words', 'Seen Words', 'Easy Words', 'Favourite Words', 'Test Vocabulary', 'Idioms'];



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

          <div className="bg-white border w-[10rem]   flex flex-col rounded-b-xl">
            {options.map((option, index) => (
              <div className={` px-4 py-2 text-center hover:scale-y-105 hover:shadow-md  bg-[#EBEDFF]  hover:bg-[#FFFFFF] h-[3rem] ${index === options.length - 1 ? "rounded-b-xl": "border-b border-black border-opacity-20"}`}>
                <button
                key={index}
                
              >
                {option}
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
                   <button className={`text-black text-[1rem] `}>
                     {option}
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