import React from "react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { MdOutlineFilterAlt } from "react-icons/md";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import FavouriteButton from "../components/FavouriteButton";
const { GET_FAVOURITE_API } = favouriteEndpoints;
function FavouritesPage() {

  const [query,setQuery]=useState('') //query to be searched
  const [filteredData,setFilteredData]=useState([]) //filtered data to be displayed
  //Auth authUserId to be sent to backend for API purpose from Redux Store
  const { authUserId } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //fetching the data using axios
    const fetchData = async () => {
      try {
        const response = await apiConnector(
          "GET",
          GET_FAVOURITE_API,
          null,
          null,
          {
            userId: String(authUserId), //this is the user Id of the logged in user use it in production
            // userId: "qEMYBI4erFNruO1L0iHQknbxXdD2", //TODO:this is just a test userId to be removed in production it is here so you can better test out code
          }
        );
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [authUserId]);

  //Filtering the data
  useEffect(() => {
      if (query === "") {
        setFilteredData(data?.data);
      } else {
        const dataArr=data?.data;
        let newData = [];
        // console.log("DataArr")
        // console.log(dataArr[0])
        for (let i = 0; i < dataArr?.length; i++) {
          if (
            dataArr[i]?.type == "words" && 
            (
              typeof dataArr[i]?.val?.word === 'string' && dataArr[i]?.val?.word.toLowerCase().includes(query.toLowerCase()) ||
              Array.isArray(dataArr[i]?.val?.definitions) && dataArr[i]?.val?.definitions.some(def => typeof def === 'string' && def.toLowerCase().includes(query.toLowerCase()))
              )
          ) {
            newData.push(dataArr[i]);
          }
          if (
            dataArr[i]?.type == "sampleStory" && 
            (
              typeof dataArr[i]?.val?.title === 'string' && dataArr[i]?.val?.title.toLowerCase().includes(query.toLowerCase()) ||
              typeof dataArr[i]?.val?.content === 'string' && dataArr[i]?.val?.content.toLowerCase().includes(query.toLowerCase())
            )
          )
           {
            newData.push(dataArr[i]);
          }
          if (
            dataArr[i]?.type == "notes" && 
            (
              typeof dataArr[i]?.val?.data?.word=== 'string' && dataArr[i]?.val?.data?.word.toLowerCase().includes(query.toLowerCase()) ||
              typeof dataArr[i]?.val?.data?.definitions === 'string' && dataArr[i]?.val?.data?.definitions.toLowerCase().includes(query.toLowerCase())
            )
          )
           {
            newData.push(dataArr[i]);
          }
          
        }
        setFilteredData(newData);
      }
  }, [query, data]); 

 
  // Array of objects representing sections with headings and contents
  // const sections = [
  //   {
  //     heading: "Today-31st January,2024 (Wednesday)",
  //     items: [
  //       {
  //         content:
  //           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)",
  //         status: "Read",
  //       },
  //       { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" },
  //       {
  //         content:
  //           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)",
  //         status: "Read",
  //       },
  //       { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" },
  //       {
  //         content:
  //           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)",
  //         status: "Read",
  //       },
  //       { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" },
  //     ],
  //   },
  //   {
  //     heading: "Yesterday-30th January,2024 (Tuesday)",
  //     items: [
  //       {
  //         content:
  //           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a vel sequi in perferendis sed, temporibus mollitia nemo ea deserunt quo ipsa repudiandae provident recusandae minima praesentium ipsum consequatur. ...(Learn with story)",
  //         status: "Read",
  //       },
  //       { content: "Lorem (Flash cards-Unseen words) ", status: "Unread" },
  //     ],
  //   },
  // ];

  // return (
  //   <>
  //     <Header />
  //     <CategoryHeader />
  //     <div className=" mx-12 p-4">
  //       <div className="flex md:justify-between justify-center flex-col md:flex-row items-center mb-8 md:mx-0 mx-4">
  //         <h2 className="text-3xl font-medium">FAVOURITES</h2>
  //         <div className="flex items-center">
  //           <div className="border border-gray-500 rounded-lg mr-2 flex">
  //             <GoSearch className="fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] " />
  //             <input
  //               type="text"
  //               placeholder="Search..."
  //               className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
  //             />
  //           </div>

  //           <div className="border border-gray-500 rounded-lg mr-2">
  //             <button>
  //               <MdOutlineFilterAlt className="fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem]" />
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Rendering section divs */}
  //       <div className="border border-[#5B7ADE] rounded-xl py-4 px-6 overflow-auto bg-[#F3F5FF] max-h-[80vh]">
  //         {sections.map((section, index) => (
  //           <div key={index}>
  //             <h6 className="font-semibold pl-4">{section.heading}</h6>
  //             <br />
  //             <hr className="border border-[#5B7ADE] w-full" />
  //             <br />
  //             {/* Rendering section items */}
  //             {section.items.map((item, idx) => (
  //               <div key={idx} className="flex items-center px-4 py-1">
  //                 <div className="flex-1 mr-2 overflow-hidden whitespace-nowrap relative w-60">
  //                   <p className="truncate font-light text-sm">
  //                     {item.content}
  //                   </p>
  //                 </div>
  //                 <div className="w-20"></div>
  //                 <div className="flex-shrink-0 text-xs w-10">
  //                   <FaHeart className="text-red-500 " />
  //                 </div>
  //                 <div className=" w-10  flex justify-center">
  //                   <span
  //                     className={`${
  //                       item.status === "Read"
  //                         ? "text-green-500"
  //                         : "text-red-500"
  //                     }  text-sm`}
  //                   >
  //                     {item.status}
  //                   </span>
  //                 </div>
  //               </div>
  //             ))}

  //             <hr className="border border-[#5B7ADE] w-full mt-3 mb-3" />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );

  // console.log(data)
  // console.log(filteredData)
  //If the length of returned data is 0, then display "No Item Favourite Items Added For this user"
  if (isLoading == false && filteredData?.length == 0 && query == "") {
    return <>No Item Favourite Items Added For this user </>;
  }

  //If the length of returned data is greater than 0, then display the data
  if (isLoading == false && filteredData?.length > 0 || query!="") {
    //Arranging the data into key value pair with key being the data so all items with same data will be grouped together
    //We can even use state for group data and in that case when we will click remove button than it will be removed from
    //page immediately but
    //if we don;t want that to happen we can leave it like that and can call remove from favourite api
    //on first time click and add to favourite api on second time click we also can use fetch favourite button status
    //to dynamically display state of favourite button
    //FavouriteButton does this job only
    const groupedData = filteredData.reduce((acc, item) => {
      const date = item.createdAt.split("T")[0]; // Extract the date part from the createdAt string
      if (!acc[date]) {
        acc[date] = []; // Initialize the array for this date if it doesn't exist
      }
      acc[date].push({
        val: item?.val,
        name: item?.name,
        type: item?.type,
        itemId: item?.itemId,
      }); // Push the val into the array for this date
      return acc;
    }, {});
    //if data exists logging it as per group
    // console.log(groupedData); //console logged grouped data helpful for further development
    return (
     
      // traversing the grouped data and displaying it
     <>
      <Header val={1}/>
      <CategoryHeader/>
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h2 className="text-3xl font-medium mb-4 w-full sm:w-auto text-center">FAVOURITES</h2>
        <div className="flex items-center mb-4 w-full sm:w-auto justify-center">
          <div className='border border-gray-500 rounded-lg mr-2 mb-2 sm:mb-0 sm:mx-2 flex'>
            <GoSearch className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] ' />
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className='border border-gray-500 rounded-lg mr-2 mb-2 sm:mb-0 sm:mx-2 flex items-center'>
            <button>
              <MdOutlineFilterAlt className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem]' />
            </button>
          </div>
        </div>
      </div>

      {/* Rendering section divs */}
      <div className="border border-[#5B7ADE] rounded-xl py-4 px-6 overflow-auto bg-[#F3F5FF] max-h-[80vh]">
        {Object.keys(groupedData).map((dateKey) => (
          <React.Fragment key={dateKey}>

             <h6 className='font-semibold pl-4 mb-2' style={{ textAlign: 'left' }}>Date: {dateKey}</h6>
             
            <hr className=' mb-2 border border-[#5B7ADE] w-full ' />
            
            <ul>
  {groupedData[dateKey].map((value, index) => (
    <div key={index} className="flex flex-col sm:flex-row items-center mb-3"> {/* Add flex container and adjust for small screens */}
      <li className="mr-4 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Type: {value.name}</li> {/* Add margin and width to separate elements */}
      {/* //if type is words // * Type is the type of file from which
      item value is coming */ }
      {value.type === "words" && (
        <>
          <li className="mr-4 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Word: {value.val.word}</li> {/* Add margin and width to separate elements */}
          <li className="mr-10 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Definition: {value.val.definitions[0]}</li> {/* Add margin and width to separate elements */}
          <FavouriteButton
            type={value?.type}
            itemId={value?.itemId}
            name={value?.name}
            style={{ textAlign: 'right' }}
          />
        </>
      )}
      {/* //if type is sampleStory // * Type is the type of file from
      which item value is coming */}
      {value.type === "sampleStory" && (
        <>
          <li className="mr-4 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Title: {value.val.title}</li> {/* Add margin and width to separate elements */}
          <li className="mr-4 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Content: {value.val.content}</li> {/* Add margin and width to separate elements */}
          <FavouriteButton
            type={value?.type}
            itemId={value?.itemId}
            name={value?.name}
          />
        </>
      )}

      {value.type === "notes" && (
        <>
          <li className="mr-4 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Word: {value?.val?.data?.word}</li> {/* Add margin and width to separate elements */}
          <li className="mr-10 mb-2 sm:mb-0 sm:mr-10 w-full sm:w-80" style={{ textAlign: 'left' }}>Definition: {value?.val?.data?.definitions}</li> {/* Add margin and width to separate elements */}
          <FavouriteButton
            type={value?.type}
            itemId={value?.itemId}
            name={value?.name}
          />
        </>
      )}
    </div>
    
  ))}
  
</ul>

          </React.Fragment>
        ))}
      </div>
    </div>
    
     </>
     
    );
  }

  return isLoading ? <div>Loading.....</div> : <></>;
}

export default FavouritesPage;
