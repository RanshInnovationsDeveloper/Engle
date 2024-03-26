import React from 'react';
import Header from '../components/Header';

function Upcomingpage() {
  return (
    <div className=''>
    <Header/>
    <div className=" h-[83vh] flex flex-col justify-center items-center">
      <img
        src="UpcomingSoon.png"
        alt="Upcoming Soon"
        className='mt-10'
      />
      
      <footer  className=" text-center bg-[#34468A] w-full h-full ">
        <div>
        <h6 className="text-lg text-[#FFFFFF] mt-20  mb-2">People At Work</h6>
        <h1 className="text-4xl text-[#FFFFFF] font-semibold">- Coming Soon -</h1>
        </div>
      </footer>
      
      
    </div>
    
    </div>
    
  );
}

export default Upcomingpage;
