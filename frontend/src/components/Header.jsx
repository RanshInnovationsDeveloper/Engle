import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu, IoPerson } from "react-icons/io5";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import "../styles/Header.css"
import { logout } from '../services/operations/authServices';
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from '../slices/authSlice'
import { onFirebaseStateChanged } from '../services/operations/authServices'
import { FaBell } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import CategoryHeader from "./CategoryHeader";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ val }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate()
  const { authUserId, userName } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    onFirebaseStateChanged(dispatch);
  });

  useEffect(() => {
    function handleClickOutside(event) {
      const button = document.getElementById('profileButton');
 
      if (button && !button.contains(event.target)) {
        setIsProfileOpen(false);
      }
   
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  }

  const toggleCategoryMenu = () => {
    if(isMobile){
      setIsOpen(prevState => !prevState);
    }
    
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const listClassName = isMobile ? "nav__list" : "nav__list__web";
  const linkClassName = "nav__link";

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    return (
      <>
        <ul className={listClassName}>
          <li>
            <NavLink to="/"
              className={`${linkClassName} ${val === 0 ? "text-[#2E3D79] font-semibold" : "text-black"}`}
              onClick={() => {
                closeMobileMenu();
             
              }} >
              Home
            </NavLink>
          </li>
          <li >
            <div className={`${val === 1 ? "text-[#2E3D79]" : "text-black"} flex justify-start items-center gap-3`}>
              <NavLink
              to="/flashcards"
                className={`${linkClassName} ${val === 1 ? "font-semibold" : ""} `}
                onClick={() => {
                  toggleCategoryMenu();
                }}
                
              >
                Category
                
              </NavLink>
              {isMobile&& <button       onClick={() => {
                  toggleCategoryMenu();
                }}       > 
                <FaAngleDown />
              </button>}
            </div>

            {isMobile && (<CategoryHeader isOpen={isOpen} isMobile={isMobile}  />)}
          </li>
          <li>
            <NavLink
              to="/contact"
              className={`${linkClassName} ${val === 2 ? "text-[#2E3D79] font-semibold" : "text-black"}`}
              onClick={() => { closeMobileMenu(); }}
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={`${linkClassName}  ${val === 3 ? "text-[#2E3D79] font-semibold" : "text-black"}`}
              onClick={closeMobileMenu}
            >
              About Us
            </NavLink>
          </li>
          {isMobile ? (
            !authUserId ? (
              <>
                <li className="w-[100%] mt-10">
                  <NavLink to="/login" className={`${linkClassName}`} onClick={closeMobileMenu}>
                    <button className="btn w-[100%]  py-3">Log In</button>
                  </NavLink>
                </li>
                <li className="w-[100%] -mt-2">
                  <NavLink to="/register" className={`${linkClassName}`} onClick={closeMobileMenu}>
                    <button className="btn w-[100%] py-3">Sign Up</button>
                  </NavLink>
                </li>
              </>
            ) : (<>
              <li className="mt-10 flex flex-row justify-between items-center  w-[100%]">
                <div className=" flex flex-row gap-4 items-center ">
                  <button className='btn pr-1 pl-3 py-3'>
                    <IoPerson className="w-[1.75rem] h-[1.75rem]" />
                  </button>
                  <h2 className={`${linkClassName}`}>{userName}</h2>
                </div>
                <MdKeyboardArrowRight />
              </li>
              <li className="w-full">
                <hr className="border-t-2 border-gray-400 " />
              </li>


            </>

            )
          ) : (
            <></>
          )}

        </ul>

      </>
    );
  };

  return (
    <>
      <header className="header">
        <nav className="nav flex lg:flex-row flex-row-reverse lg:justify-between justify-evenly">
          <div className="flex flex-row justify-start lg:w-auto  md:w-[60%] w-[66%] ">
            <NavLink to="/" className="nav__logo lg:tracking-[0.175cm] tracking-[0.07cm]">
              ENGLE
            </NavLink>
          </div>

          {isMobile ? (
            <div
              className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}  z-20`}
              id="nav-menu"
            >

              <div className=" flex flex-row-reverse pb-20 gap-6" id="nav-close" onClick={toggleMenu}>

                <div className=" flex flex-col justify-center items-center   ">
                  <IoClose className=" text-black text-4xl cursor-pointer" /></div>
                <div className="flex flex-row justify-center lg:w-auto  md:w-[90%]  w-[66%]  ">
                  <NavLink to="/" className="nav__logo lg:tracking-[0.175cm] tracking-[0.07cm]">
                    ENGLE
                  </NavLink>
                </div>

              </div>
              {renderNavLinks()}
            </div>
          ) : (<>
            {renderNavLinks()}
          </>
          )}

          {isMobile ? (
            (
              <>
                <div className="nav__toggle md:w-[40%] w-[34%] lg:w-full  flex flex-row justify-start" id="nav-toggle" onClick={toggleMenu}>
                  <IoMenu className="text-4xl" />
                </div>

              </>
            )

          ) : (<>
            {!authUserId ? (<div className="flex flex-row justify-center items-center gap-2">

              <ul className={`${listClassName} flex flex-row justify-center items-center gap-2 lg:mt-0 mt-3`}>
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
            </div>) :
              (<div className="flex flex-row justify-center items-center gap-[0.3rem]">
                <ul className={`${listClassName} flex flex-row justify-center items-center gap-2 lg:mt-0 mt-3`}>
                  <li>
                    <button className='btn2 pr-1 pl-3 py-3 h-[3.125rem] w-[3.125rem]' >
                      <FaBell className="w-[1.25rem] h-[1.5rem]" />
                    </button>
                  </li>
                  <li>
                    <button id="profileButton" className='btn pr-1 pl-3 py-3' onClick={toggleProfile}>
                      <IoPerson className="w-[1.5rem] h-[1.5rem]" />
                      <FaAngleDown className="w-[1rem] h-[0.8rem] font-bold" />
                    </button>
                    {!isMobile && <ProfileDropdown isOpen={isProfileOpen}/>}
                  </li>
                </ul>
              </div>)}</>)}
        </nav>
      </header>
      {!isMobile && (<CategoryHeader isOpen={isOpen} isMobile={isMobile} />)}
    </>

  );
};

export default Header;
