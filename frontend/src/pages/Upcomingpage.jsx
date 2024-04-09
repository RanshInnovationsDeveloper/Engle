import React from 'react';
import Header from '../components/Header';

function Upcomingpage() {
  return (
    <div className='h-screen flex flex-col '>
    <Header/>
    <div className=" flex-1 flex flex-col justify-center md:justify-end items-center mt-60 lg:mt-80 xl:mt-60 ">
      <img
        src="UpcomingSoon.png"
        alt="Upcoming Soon"
        className='mt-10 max-w-[60%] md:max-w-[40%] '
      />
      
      <footer  className=" text-center bg-[#34468A] w-full h-full ">
        <div className='lg:max-h-48 xl:max-h-96 '>
        <h6 className="text-lg text-[#FFFFFF] mt-20  mb-2  lg:mt-96 xl:mt-20 lg:text-4xl xl:text-lg">People At Work</h6>
        <h1 className="text-4xl text-[#FFFFFF] font-semibold lg:text-7xl xl:text-4xl">- Coming Soon -</h1>
        </div>
      </footer>
      
      
    </div>
    
    </div>
    
  );
}

export default Upcomingpage;