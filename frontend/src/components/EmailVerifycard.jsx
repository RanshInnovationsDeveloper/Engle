
import { useNavigate } from "react-router-dom"


function EmailVerifycard({userEmail}) {

  const navigate = useNavigate();
  const maskedEmail = userEmail.replace(/^(.{2}).*@/, (_, firstThreeChars) => {
    return firstThreeChars.padEnd(userEmail.length - 10, '*') + '@'; // Mask characters before '@' with '*'
  });




  return (

      <div className="z-10 mt-2 lg:w-[43%] md:w-[60%] w-[80%] rounded-[2.5rem] bg-white md:px-12 px-8  md:py-10 py-8 shadow-2xl ">
        <div className='flex flex-row  '>
        <div className=' mb-2 md:w-full w-[75%] px-6'>
          <h2 className=" text-center text-3xl font-bold text-black mb-2">
            Thank you for Registration!
          </h2>
          <p className=" text-center text-lg text-black opacity-60 mb-3 break-words ">
            You're almost there! We sent an email to <strong>{maskedEmail}</strong>
          </p>
          <p className=" text-center text-lg text-black opacity-60 break-words  ">
            Just click on the link in that email to complete your signup.
            If you don't see it, you may need to check your spam folder.
          </p>
        </div>
        </div>
        
       <div className="flex flex-col flex-grow">
       <div className="inline-flex items-center justify-center ">
          <hr className="w-[100%] h-px my-8 bg-black opacity-20 border-0 " />
          <span className="absolute px-2 font-normal text-black -translate-x-1/2 bg-white left-1/2"><p className=' opacity-70 text-md'>Let's start Learning</p></span>
        </div>
       </div>
        
          <div className='flex justify-center'>
            <button
              onClick={(e)=> {navigate('/login')}}
              className="btn relative md:w-[40%] w-full flex justify-center py-4 px-5  text-sm  rounded-md "
            >
              Log In
            </button>
          </div>


      </div>

  )
}

export default EmailVerifycard
