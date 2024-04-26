import Header from "../components/Header";
import EmailVerifycard from "../components/EmailVerifycard";
import { useLocation } from "react-router-dom";

function EmailVerificationPage() {

  const loaction = useLocation();
  const {email} = loaction.state



  return (
    <>
    <Header data-testid="header"/>
    <div className=" lg:h-[90vh] h-[85vh] w-full z-0 flex flex-col items-center justify-center bg-[#4A5995] ">
    <div className='w-[100%]  relative flex flex-row justify-center'>
     <EmailVerifycard userEmail={email}/>
   
    </div>
     
    <img className='lg:h-[25%] h-[15%]  w-[100%] fixed bottom-0' src="design.png" alt=''/>
    </div>

    </>
  )
}

export default EmailVerificationPage
