import React from 'react'
import Logincard from '../components/Logincard';
function Loginpage() {
  return (
    <>
    <div className="h-[90vh] w-full z-0 flex flex-col items-center justify-center bg-[#4A5995] overflow-hidden">
    <div className='w-[100%]  absolute flex flex-row justify-center'>
    <Logincard />
   
    </div>
     
    <img className='lg:h-[25%] h-[15%] w-[100%] fixed bottom-0' src="design.png" alt=''/>
    </div>

    </>
  )
}

export default Loginpage
