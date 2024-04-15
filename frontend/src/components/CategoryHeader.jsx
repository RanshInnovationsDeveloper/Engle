import { NavLink } from 'react-router-dom';
import "../styles/CategoryHeader.css";
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import FlashcardDropdown from './FlashcardDropdown';

const CategoryHeader = ({ isOpen, isMobile }) => {

  const options = [
    { text: "Flashcards", link: "/flashcards", isButton: true },
    { text: "Ambiguous Words", link: "/ambiguous_words" },
    { text: "Learn with Context", link: "/learn_with_context" },
    { text: "Learn with story", link: "/learn_with_story" },
    { text: "Learn with Friends", link: "/learn_with_friends" },
    { text: "Favourites", link: "/favourites" },
    { text: "My Notes", link: "/mynotes" },
  ];

  const [isFlashOpen, setIsFlashOpen] = useState(false);
  const currentPath = window.location.pathname;

  const toggleModal = () => {
    setIsFlashOpen(!isFlashOpen);
  };
  const location = useLocation();
  const shouldRender = options.some(option => location.pathname.startsWith(option.link));


  useEffect(() => {
    function handleClickOutside(event) {
      const button = document.getElementById('flashdrop');
  
      if (button && !button.contains(event.target)) {
        setIsFlashOpen(false);
      }
   
    }
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


if (isMobile === undefined) {
  return null;
}



  return (
    <>
    {isMobile? (
       <div className={`menu-transition ${isOpen ? "menu-open" : ''}`}>
       {(
         <div className={`flex flex-row justify-center bg-transparent z-10 ml-10`}>
           <ul className={`flex flex-col mt-2 gap-1 justify-start items-start `}>
 
             {options.map((option, index) => (
               <li key={index} className="py-1">
                 {option.isButton ? (<>
                   <div className='flex items-center gap-2 ' onClick={toggleModal}>
                 <NavLink to={option.link} className={`text-black text-[1rem] `}>
                     {option.text}
                   </NavLink>
                   {isFlashOpen? <button className={` text-black`} id="flashcard-menu-button" >
                     <FaAngleUp/>
                   </button> : 
                   <button className={` text-black`} id="flashcard-menu-button" >
                     <FaAngleDown/>
                   </button>}
                 
                 </div>
                 {isMobile && <FlashcardDropdown isOpen={isFlashOpen} isMobile={isMobile}/>}
                 </>
                 
                 ) : (
                   <NavLink to={option.link} className={`text-black text-[1rem] `}>
                     {option.text}
                   </NavLink>
                 )}
               </li>
             ))}
           </ul>
         </div>
       )}
     </div>
    )
    :
    (<>{shouldRender && <>{(<>
      <div  className={`flex flex-row justify-center items-center bg-[#34468A]  h-[3rem] z-10`}>
        <ul className={`flex flex-row gap-20  `}>

          {options.map((option, index) => (
            <li key={index} className="py-1">
              {option.isButton ? (<>
                <div id='flashdrop' className='flex items-center gap-[0.5rem]' onClick={toggleModal}>
              <NavLink to={option.link} className={`text-white ${currentPath !== option.link ? "opacity-[80%]":"font-extrabold "}  text-[1rem] hover:opacity-100  tracking-wide  `}>
                  {option.text}
                </NavLink>
                {isFlashOpen ? <button className={` text-white ${currentPath !== option.link ? "opacity-[80%]":"font-extrabold "} text-[1rem] hover:opacity-100  `} id="flashcard-menu-button" >
                  <FaAngleUp/>
                </button>:
                <button className={` text-white ${currentPath !== option.link ? "opacity-[80%]":"font-extrabold "} text-[1rem] hover:opacity-100  `} id="flashcard-menu-button" >
                <FaAngleDown/>
              </button>}

                
              </div>
              {!isMobile && <FlashcardDropdown  isOpen={isFlashOpen} isMobile={isMobile}/>}
            
              </>
              
              ) : (
                <NavLink to={option.link} className={`text-white text-[1rem] ${currentPath !== option.link ? "opacity-[80%]":"font-extrabold "} hover:opacity-100 tracking-wide`}>
                  {option.text}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

      </div>
    
      </>
    )}</>
}
        </>)}
    </>
   
  );
};

export default CategoryHeader;

