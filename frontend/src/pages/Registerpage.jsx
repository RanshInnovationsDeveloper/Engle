import React from 'react'
import Registercard from '../components/Registercard'

function Registerpage() {
  return (
    <>
    <div className="h-[90vh] w-full z-0 flex flex-col items-center justify-center bg-[#4A5995] overflow-hidden">
    <div className='w-[100%]  absolute flex flex-row justify-center rounded'>
    <Registercard />
   
    </div>
     
    <img className='lg:h-[25%] h-[15%] w-[100%] fixed bottom-0' src="design.png" alt=''/>
    </div>

    </>
  )
}

export default Registerpage
