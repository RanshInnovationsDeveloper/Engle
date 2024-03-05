import  { useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import "../styles/Header.css"
import { logout } from '../services/operations/authServices';
import {  useSelector,useDispatch } from "react-redux";
import { setauthUserData,setuserEmail, setuserName,setLoading } from '../slices/authSlice'
import { auth } from '../services/firebase'

const Header = ({val}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate()
  const {authUserData} = useSelector((state)=> state.auth)


  const dispatch = useDispatch();

  useEffect(() => {

    auth.onAuthStateChanged((userCrendential) => {      
        if(userCrendential!==null&&userCrendential?.emailVerified===true){
          dispatch(setauthUserData(userCrendential.uid));
          dispatch(setuserEmail(userCrendential.email));
          dispatch(setuserName(userCrendential.displayName));         
        }
        else{
          dispatch(setauthUserData(null));
          dispatch(setuserEmail(null));
          dispatch(setuserName(null));
        }       
      });
      
  }, [dispatch])


  const handlesignout = () => {
    dispatch(setLoading(true));
    logout();
    navigate('/');
    toast.success("logout successfully");
    dispatch(setLoading(false));
    
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";

    return (
        <>
      <ul className={listClassName}>
        <li>
          <NavLink to="/"      
          className={`${linkClassName} ${val === 0 ? "text-[#2E3D79]" : "text-black"}`}
           onClick={closeMobileMenu} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/flashcards"
            className={`${linkClassName} ${val === 1 ? "text-[#2E3D79]" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={`${linkClassName} ${val === 2 ? "text-[#2E3D79]" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={`${linkClassName} ${val === 3 ? "text-[#2E3D79]" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
        </li>
        </ul>
        <ul className={`${listClassName}  lg:mt-0 mt-3` }>
        {authUserData ? (
          <li>
          <button className='btn px-5 py-2' onClick={handlesignout}>
           Logout
          </button>
      </li>
        ):(<>
          <li>
          <NavLink
            to="/login"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            <button className="btn px-5 py-2">Log In</button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            <button className="btn px-5 py-2 ">Sign Up</button>
          </NavLink>
        </li>
        </>
        )}
      </ul>
      </>
    );
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__logo">
          ENGLE
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""} z-20`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
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

export default Header;
