import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { signup } from '../services/operations/authServices';


function Registercard() {

  const navigate = useNavigate();
 


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmpass) {

      const { error } = await signup(email, password, username);
      if (error) {
        toast.error(error);
      } else {


        navigate("/");
    
      }

    }
    else {
      toast.error("Both password do not match!")
    }

  }

  return (
    <div className="z-20 mt-10 lg:w-[35%] w-[80%] space-y-8 rounded-3xl bg-white p-10">
      <ToastContainer />
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              className="appearance-none rounded-lg bg-[#F4F6FC] relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg bg-[#F4F6FC] relative block mt-3 w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none  relative block w-full bg-[#F4F6FC] mt-3 px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="confirmpass"
              name="confirmpass"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-lg bg-[#F4F6FC] relative block mt-3 w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            type="submit"
            className="btn relative w-[35%] flex justify-center py-4 px-5   text-sm font-medium rounded-md "
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>


  )
}

export default Registercard