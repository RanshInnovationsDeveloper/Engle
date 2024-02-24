import React, { useState } from 'react'
import { IoPerson } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { RiEyeFill, RiEyeCloseFill, RiEyeOffFill } from 'react-icons/ri';


function Logincard() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="z-20 mt-10 lg:w-[40rem] w-[80%] space-y-8 rounded-3xl bg-white py-10 px-14">
      <div>
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div className='flex flex-row mb-5'>
            <label htmlFor="username" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
              <IoPerson />
            </label>
            <input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              className="appearance-none rounded-r-lg bg-[#F4F6FC] relative block w-full px-3 py-4  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-row '>
            <label htmlFor="password" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
              <MdLock />
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="appearance-none  relative block w-full bg-[#F4F6FC]  px-3 py-4  placeholder-gray-500 text-gray-900 rounded-r-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] '>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className=""
            >
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </button>
            </div>
         
          </div>
        </div>
        <div className="flex items-center justify-end">
          <a href="/" className="font-medium text-sm text-gray-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
        <div className='flex justify-center'>
          <button
            type="submit"
            className="btn relative w-[35%] flex justify-center py-4 px-5   text-sm font-medium rounded-md "
          >
            Log In
          </button>
        </div>
      </form>
    </div>

  )
}

export default Logincard
