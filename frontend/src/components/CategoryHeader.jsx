import  { useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "../styles/CategoryHeader.css"
import { logout } from '../services/operations/authServices';
import {  useSelector } from "react-redux";

const CategoryHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate()
  const {authUserId} = useSelector((state)=> state.auth)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? "cat__list" : "cat__list__web";
    const linkClassName = "cat__link";

    return (
        <>
      <ul className={listClassName}>
        <li>
          <NavLink to="/flashcards"      
          className={`${linkClassName}`}
           onClick={closeMobileMenu} >
            FlashCards
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ambiguouswords"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            Ambigous Words
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/context"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            Learn with Context
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/story"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            Learn with Story
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            Learn with Friends
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
           Favourites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
           My Notes
          </NavLink>
        </li>
        </ul>

      </>
    );
  };

  return (
    <header className="cat_header">
      <nav className="cat">
        {isMobile && (
          <div className="cat__toggle" id="cat-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`cat__menu  ${isMenuOpen ? "show-menu" : ""} z-20`}
            id="cat-menu"
          >
            {renderNavLinks()}
            <div className="cat__close" id="cat-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default CategoryHeader;
