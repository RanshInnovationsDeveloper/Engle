import  { useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu, IoPerson } from "react-icons/io5";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import "../styles/Header.css"
import { logout } from '../services/operations/authServices';
import {  useSelector,useDispatch } from "react-redux";
import { setauthUserId,setuserEmail, setuserName,setLoading } from '../slices/authSlice'
import { auth } from '../services/firebase'
import { FaBell } from "react-icons/fa";

const Header = ({val}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate()
  const {authUserId} = useSelector((state)=> state.auth)


  const dispatch = useDispatch();

  useEffect(() => {

    auth.onAuthStateChanged((userCrendential) => {      
        if(userCrendential!==null&&userCrendential?.emailVerified===true){
          dispatch(setauthUserId(userCrendential.uid));
          dispatch(setuserEmail(userCrendential.email));
          dispatch(setuserName(userCrendential.displayName));         
        }
        else{
          dispatch(setauthUserId(null));
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
          className={`${linkClassName} ${val === 0 ? "text-[#2E3D79] font-[600]" : "text-black "}`}
           onClick={closeMobileMenu} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/flashcards"
            className={`${linkClassName} ${val === 1 ? "text-[#2E3D79] font-semibold" : "text-black font-normal"}`}
            onClick={closeMobileMenu}
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={`${linkClassName} ${val === 2 ? "text-[#2E3D79] font-semibold" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={`${linkClassName} ${val === 3 ? "text-[#2E3D79] font-semibold" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
        </li>
        </ul>
        {authUserId ? (
        <>
          {/* <li>
          <button className='btn2 pr-1 pl-3 py-3' >
           <FaBell className="w-[1.75rem] h-[1.75rem]"/>
          </button>
      </li>
          <li>
          <button className='btn pr-1 pl-3 py-3' onClick={handlesignout}>
           <IoPerson className="w-[1.75rem] h-[1.75rem]"/>
          </button>
      </li> */}
      </>
        ):(<ul className={`${listClassName}  lg:mt-0 mt-3` }>
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
        </ul>
        )}
      </>

    );
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__logo">
          ENGLE
        </NavLink>
        

        {isMobile && (<>
             
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        </>
        
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
{authUserId ? (  <div className="flex flex-row gap-4 justify-center">
              <div>
          <button className='btn2 pr-1 pl-3 py-3' >
           <FaBell className="w-[1.75rem] h-[1.75rem]"/>
          </button>
      </div>
          <div>
          <button className='btn pr-1 pl-3 py-3' onClick={handlesignout}>
           <IoPerson className="w-[1.75rem] h-[1.75rem]"/>
          </button>
      </div>
        </div>):(<></>)}
      
      </nav>
    </header>
  );
};

export default Header;
