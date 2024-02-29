import React from 'react'
import Registercard from '../components/Registercard'

function Registerpage() {
  return (
    <>
    <div className="lg:h-[90vh] h-screen w-full flex lg:flex-col items-center justify-center bg-[#4A5995] ">
    <div className='w-[100%] absolute flex flex-row justify-center'>
    <Registercard />
   
    </div>
     
    <img className='lg:h-[25%] h-[15%] w-[100%] fixed bottom-0' src="design.png" alt=''/>
    </div>

    </>
  )
}

export default Registerpage
