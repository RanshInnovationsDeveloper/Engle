import React from 'react';
import { FaHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { MdOutlineFilterAlt } from "react-icons/md";
import Header from '../components/Header';
import CategoryHeader from '../components/CategoryHeader';

function FavouritesPage() {
  // Array of objects representing sections with headings and contents
  const sections = [
    {
      heading: "Today-31st January,2024 (Wednesday)",
      items: [
        { content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)", status: "Read" },
        { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" },
        { content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)", status: "Read" },
        { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" },
        { content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)", status: "Read" },
        { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" }
      ]
    },
    {
      heading: "Yesterday-30th January,2024 (Tuesday)",
      items: [
        { content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)", status: "Read" },
        { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" }
      ]
    }
  ];
  return (
    <>
    <Header/>
    <CategoryHeader/>
    <div className=" mx-12 p-4">
      <div className="flex md:justify-between justify-center flex-col md:flex-row items-center mb-8 md:mx-0 mx-4">
        <h2 className="text-3xl font-medium">FAVOURITES</h2>
        <div className="flex items-center">
          <div className='border border-gray-500 rounded-lg mr-2 flex'>
            <GoSearch className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] ' />
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
            />
          </div>
          <div className='border border-gray-500 rounded-lg mr-2'>
            <button>
              <MdOutlineFilterAlt className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem]' />
            </button>
          </div>
        </div>
      </div>

      {/* Rendering section divs */}
      <div  className="border border-[#5B7ADE] rounded-xl py-4 px-6 overflow-auto bg-[#F3F5FF] max-h-[80vh]">
        {sections.map((section, index) => (
          <div key={index} >
            <h6 className='font-semibold pl-4'>{section.heading}</h6>
            <br />
            <hr className='border border-[#5B7ADE] w-full' />
            <br />
            {/* Rendering section items */}
            {section.items.map((item, idx) => (
              <div key={idx} className="flex items-center px-4 py-1">
                <div className="flex-1 mr-2 overflow-hidden whitespace-nowrap relative w-60">
                  <p className="truncate font-light text-sm">{item.content}</p>
                </div>
                <div className='w-20'></div>
                <div className="flex-shrink-0 text-xs w-10">
                  <FaHeart className="text-red-500 " />
                </div>
                <div className=" w-10  flex justify-center">
                  <span className={`${item.status === "Read" ? "text-green-500" : "text-red-500"}  text-sm`}>{item.status}</span>
                </div>
                
              </div>
            ))}
            
            <hr className='border border-[#5B7ADE] w-full mt-3 mb-3' />
          </div>
        ))}

      </div>
    </div>
    </>

  )
}

export default FavouritesPage;