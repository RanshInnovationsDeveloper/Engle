import  { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { signin } from '../services/operations/authServices';
import { setLoading } from '../slices/authSlice';
import { useDispatch, useSelector } from "react-redux"
import { IoMdMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { RiEyeFill,RiFacebookCircleFill, RiEyeOffFill } from 'react-icons/ri';
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import Spinner from './Spinner';

function Logincard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

    dispatch(setLoading(true));
    e.preventDefault();
    const { error } = await signin(useremail, password);
    if (error) {
      toast.error(error);
    } else {
    
      const previousPath = localStorage.getItem('path');
      navigate(previousPath||"/");
      toast.success("Login Successfully")
      
    }
    dispatch(setLoading(false));

  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


if(loading)
{
  return <Spinner/>
}

  return (

      <div className="z-10 mt-2 lg:w-[42%] w-[80%] rounded-[2.5rem] bg-white lg:px-12 px-6  lg:py-10 py-6 shadow-2xl ">
        <div className='mb-10'>
          <h2 className=" text-center text-3xl font-bold text-gray-900 tracking-widest">
            LOG IN
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6" action="#" method="POST">
          <div>
            <div className='flex flex-row flex-grow mb-5 shadow-md rounded-lg'>
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
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>
            <div className='flex flex-row shadow-md rounded-lg '>
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
            <div className="flex items-center justify-end">
              <a href="/forgotpass" className="text-pretty font-medium text-sm text-gray-600 hover:text-red-500 mt-3">
                Forgot password?
              </a>
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className="btn relative lg:w-[40%] w-full flex justify-center py-4 px-5  text-sm  rounded-md "
            >
              Log In
            </button>
          </div>
        </form>
        <div className='flex flex-col flex-grow'>
        <div className="inline-flex items-center justify-center ">
        <hr className="w-[100%] h-px my-6 bg-black opacity-20 border-0 " />
        <span className="absolute px-2 font-normal text-black -translate-x-1/2 bg-white left-1/2"><p className=' opacity-70 text-sm'>OR</p></span>
      </div>
      <div className='inline-flex items-center justify-center gap-1 mb-10'>
        <button><RiFacebookCircleFill className='w-[2.5rem] h-[2.5rem] text-[#34468A]'/></button>
        <button><AiFillGoogleCircle className='w-[2.5rem] h-[2.5rem] text-[#34468A]'/></button>
        <button><FaGithub className='w-[2.5rem] h-[2.5rem] text-[#34468A]'/></button>
      </div>
      <div className="flex items-center justify-center ">
              <p className="text-pretty font-medium text-sm text-gray-600 "> Don't have an account <a href="/register" className='text-red-500' >
                 Sign up?</a></p>
        
            </div>
        </div>
      </div>

  )
}

export default Logincard
