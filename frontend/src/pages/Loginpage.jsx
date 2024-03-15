import Header from '../components/Header';
import Logincard from '../components/Logincard';
function Loginpage() {
  return (
    <>
    <Header/>
    <div className=" lg:h-[90vh] h-[95vh] w-full z-0 flex flex-col items-center justify-center bg-[#4A5995] ">
    <div className='w-[100%]  relative flex flex-row justify-center'>
    <Logincard />
   
    </div>
     
    <img className='lg:h-[25%] h-[15%]  w-[100%] fixed bottom-0' src="design.png" alt=''/>
    </div>

    </>
  )
}

export default Loginpage
