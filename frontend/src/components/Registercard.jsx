import { useState } from 'react'
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { signup } from '../services/operations/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { IoPerson } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { RiEyeFill,RiFacebookCircleFill, RiEyeOffFill } from 'react-icons/ri';
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { setLoading } from '../slices/authSlice';
import Spinner from './Spinner';


function Registercard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.auth);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpass, setShowConfirmpass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if(password === confirmpass){
      const { error } = await signup(email, password, username);
      
      if (error) {
        toast.error(error);
      } else {

        navigate("/");
        toast.success("check your email for verification")
     
    }
  } else {
    toast.error("Password doesn't match");
  }
    dispatch(setLoading(false));
  }

  // useEffect(()=> {
  //   if(authUserData){
  //     navigate("/");
  //   }
  // },[authUserData, navigate])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmpassVisibility = () => {
    setShowConfirmpass(!showConfirmpass);
  };

  if(loading)
{
  return <Spinner/>
}

  return (

    <div className="z-10 lg:mt-0 mt-2 mb-4 lg:w-[42%] lg:h-[50%] w-[80%] rounded-3xl bg-white lg:py-8 py-6 lg:px-12 px-6">
 
      <div className=''>
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          SIGN UP
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="rounded-md shadow-sm ">
        <div className='flex flex-row flex-grow mb-4 shadow-md rounded-lg'>
              <label htmlFor="username" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
                <IoPerson className=' opacity-40 w-[1.25rem] h-[1.25rem]' />
              </label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none rounded-r-lg  bg-[#F4F6FC] relative block w-full px-3 py-4  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='flex flex-row flex-grow mb-4 shadow-md rounded-lg'>
              <label htmlFor="useremail" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
                <IoMdMail className=' opacity-40 w-[1.25rem] h-[1.25rem]' />
              </label>
              <input
                id="useremail"
                name="useremail"
                type="useremail"
                autoComplete="useremail"
                required
                className="appearance-none rounded-r-lg  bg-[#F4F6FC] relative block w-full px-3 py-4  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-row shadow-md mb-4 rounded-lg '>
              <label htmlFor="password" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
                <MdLock className=' opacity-40 w-[1.25rem] h-[1.25rem]' />
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none  relative block w-full bg-[#F4F6FC]  px-3 py-4  placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='flex flex-col justify-center rounded-r-lg px-4 py-4 bg-[#F4F6FC] '>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className=""
                >
                  {showPassword ? <RiEyeFill className=' opacity-40 w-[1.25rem] h-[1.25rem]' /> : <RiEyeOffFill className=' opacity-40 w-[1.25rem] h-[1.25rem]' />}
                </button>
              </div>

            </div>
            <div className='flex flex-row shadow-md mb-4 rounded-lg '>
              <label htmlFor="confirmpass" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
                <MdLock className=' opacity-40 w-[1.25rem] h-[1.25rem]' />
              </label>
              <input
                id="confirmpass"
                name="confirmpass"
                type={showConfirmpass ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none  relative block w-full bg-[#F4F6FC]  px-3 py-4  placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmpass}
                onChange={(e) => setConfirmpass(e.target.value)}
              />
              <div className='flex flex-col justify-center rounded-r-lg px-4 py-4 bg-[#F4F6FC] '>
                <button
                  type="button"
                  onClick={toggleConfirmpassVisibility}
                  className=""
                >
                  {showConfirmpass ? <RiEyeFill className=' opacity-40 w-[1.25rem] h-[1.25rem]' /> : <RiEyeOffFill className=' opacity-40 w-[1.25rem] h-[1.25rem]' />}
                </button>
              </div>

            </div>
        </div>
        <div className='flex justify-center'>
          <button
            type="submit"
            className="btn relative lg:w-[35%] w-full flex justify-center py-4 px-5   text-sm font-medium rounded-md "
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className='flex flex-col flex-grow'>
        <div className="inline-flex items-center justify-center ">
        <hr className="w-[100%] h-px my-8 bg-black opacity-20 border-0 " />
        <span className="absolute px-2 font-normal text-black -translate-x-1/2 bg-white left-1/2"><p className=' opacity-70 text-sm'>OR</p></span>
      </div>
      <div className='inline-flex items-center justify-center gap-1 mb-6'>
        <button><RiFacebookCircleFill className='w-[2.5rem] h-[2.5rem] text-[#34468A]'/></button>
        <button><AiFillGoogleCircle className='w-[2.5rem] h-[2.5rem] text-[#34468A]'/></button>
        <button><FaGithub className='w-[2.5rem] h-[2.5rem] text-[#34468A]'/></button>
      </div>
      <div className="flex items-center justify-center ">
              <p className="text-pretty font-medium text-sm text-gray-600 "> Already have an account <a href="/login" className='text-red-500' >
                 Log In?</a></p>
        
            </div>
        </div>
    </div>
    )
}

export default Registercard