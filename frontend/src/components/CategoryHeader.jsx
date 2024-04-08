import { NavLink } from 'react-router-dom';
import "../styles/CategoryHeader.css";
import { FaAngleDown } from "react-icons/fa6";


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
  
  

  return (<>
    <div className={`menu-transition ${isOpen ? "menu-open" : ''}`}>
      {(
        <div className={`flex flex-row justify-center ${isMobile ? "bg-transparent rounded-lg shadow-xl" : "bg-[#2E3D79]"} z-10`}>
          <ul className={`flex ${isMobile ? "flex-col mt-2 gap-1 justify-start items-start" : "py-2 flex-row gap-16 justify-center items-center"} `}>

            {options.map((option, index) => (
              <li key={index} className="py-1">
                {option.isButton ? (<>
                  <div className='flex items-center gap-2'>
                <NavLink to={option.link} className={`${isMobile ? "text-black" : "text-white"} text-[1rem] `}>
                    {option.text}
                  </NavLink>
                  <button className={` ${!isMobile ? 'text-white':'text-black'}`} id="flashcard-menu-button" >
                    <FaAngleDown/>
                  </button>
                  
                </div>
                </>
                
                ) : (
                  <NavLink to={option.link} className={`${isMobile ? "text-black" : "text-white"} text-[1rem] `}>
                    {option.text}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default CategoryHeader;

