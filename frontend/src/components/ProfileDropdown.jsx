import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { logout } from '../services/operations/authServices';
import { setLoading } from '../slices/authSlice'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const ProfileDropdown = ({ isOpen}) => {

  const options = ['Username', 'Logout'];
  const navigate = useNavigate()
  const { authUserId, userName } = useSelector((state) => state.auth)
  const dispatch = useDispatch();


  const handlesignout = () => {
    dispatch(setLoading(true));
    logout();
    navigate('/');
    toast.success("logout successfully");
    dispatch(setLoading(false));

  }


  return (
    <div>
 
        {isOpen && (<div className='flex flex-col  items-end'>
        <div  className="absolute mt-3 z-20  ">

          <div className="bg-white border w-[10rem] border-[#001F92]  flex flex-col ">
          <div className={` px-4 py-2 text-center bg-[#EBEDFF]  h-[3rem] border-b border-[#5B7ADE] `}>
                {userName}
              

              </div>
              <div onClick={handlesignout} className={` px-4 py-2 text-center cursor-pointer  hover:shadow-md  bg-[#EBEDFF]  hover:bg-[#FFFFFF] h-[3rem] `}>
                <button
                
              >
                Logout
              </button>

              </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
};

export default ProfileDropdown;