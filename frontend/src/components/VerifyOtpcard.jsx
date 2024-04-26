import  { useState } from 'react'
import { IoMdMail } from 'react-icons/io';

function VerifyOtpcard() {


  const [otp, setOtp] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  }


  return (

      <div className="z-10 mt-2 lg:w-[43%] md:w-[60%] w-[80%] rounded-[2.5rem] bg-white md:px-12 px-8  md:py-10 py-8 shadow-2xl ">

        <div className=' md:mb-12 mb-8 '>
          <h2 className=" text-center text-3xl font-bold text-black">
            Enter OTP
          </h2>
          <p className=" text-center text-sm text-black opacity-60 ">
            Enter the verificaion code sent to your email
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className=" space-y-6" action="#" method="POST">
          <div>
            <div className='flex flex-row flex-grow md:mb-16 mb-10 shadow-md rounded-lg'>
              <label htmlFor="otp" className="flex flex-col justify-center rounded-l-lg px-4 py-4 bg-[#F4F6FC] ">
                <IoMdMail className=' opacity-40 w-[1.25rem] h-[1.25rem]' />
              </label>
              <input
                id="otp"
                name="otp"
                type="number"
                autoComplete="otp"
                required
                className="appearance-none rounded-r-lg  bg-[#F4F6FC] relative block w-full px-3 py-4  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className="btn relative md:w-[40%] w-full flex justify-center py-4 px-5  text-sm  rounded-md "
            >
              Verify
            </button>
          </div>
        </form>

      </div>

  )
}

export default VerifyOtpcard
