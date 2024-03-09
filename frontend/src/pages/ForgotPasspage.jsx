import { useState } from "react"
import ForgotPasscard from "../components/ForgotPasscard"
import VerifyOtpcard from "../components/VerifyOtpcard";
import Header from "../components/Header";


function ForgotPasspage() {

  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(true);
  }


  return (
    <>
    <Header/>
    <div className=" lg:h-[90vh] h-[85vh] w-full z-0 flex flex-col items-center justify-center bg-[#4A5995] ">
    <div className='w-[100%]  relative flex flex-row justify-center'>
  {clicked ? <VerifyOtpcard/>:<ForgotPasscard onClick={handleClicked}/>}
   
    </div>
     
    <img className='lg:h-[25%] h-[15%]  w-[100%] fixed bottom-0' src="design.png" alt=''/>
    </div>

    </>
  )
}

export default ForgotPasspage
