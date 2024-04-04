import React from "react";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdOutlineFilterAlt } from "react-icons/md";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import FavouriteButton from "../components/FavouriteButton";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
const { GET_FAVOURITE_API } = favouriteEndpoints;
function FavouritesPage() {

  const [query,setQuery]=useState('') //query to be searched
  const [filteredData,setFilteredData]=useState([]) //filtered data to be displayed
  //Auth authUserId to be sent to backend for API purpose from Redux Store
  const { authUserId } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {type}=useParams()
  const paramValue=type
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
        if (paramValue=="all") setData(response);
        else if (paramValue=="unseen-words"){
          let unseenWords=response?.data.filter((item)=>item?.type=="words" && item?.isSeen==false)
          setData({data:unseenWords})
        }
        else if (paramValue=="seen-words"){
          let seenWords=response?.data.filter((item)=>item?.type=="words" && item?.isSeen==true)
          setData({data:seenWords})
        }
        else if (paramValue=="unseen-words"){
          let unseenWords=response?.data.filter((item)=>item?.type=="words" && item?.isSeen==false)
          setData({data:unseenWords})
        }

        else if (paramValue=="learn-with-story"){
          let learnWithStory=response?.data.filter((item)=>item?.type=="sampleStory")
          setData({data:learnWithStory})
        }

        else setData(response);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [authUserId]);

  //Filtering the data
  useEffect(() => {
      if (query == "") {
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
              typeof dataArr[i]?.val?.word === 'string' && dataArr[i]?.val?.word.toLowerCase().includes(query.toLowerCase()) 
              //|| Array.isArray(dataArr[i]?.val?.definitions) && dataArr[i]?.val?.definitions.some(def => typeof def === 'string' && def.toLowerCase().includes(query.toLowerCase()))
              )
          ) {
            newData.push(dataArr[i]);
          }
          if (
            dataArr[i]?.type == "sampleStory" && 
            (
              typeof dataArr[i]?.val?.title === 'string' && dataArr[i]?.val?.title.toLowerCase().includes(query.toLowerCase()) 
              // || typeof dataArr[i]?.val?.content === 'string' && dataArr[i]?.val?.content.toLowerCase().includes(query.toLowerCase())
            )
          )
           {
            newData.push(dataArr[i]);
          }
          if (
            dataArr[i]?.type == "notes" && 
            (
              typeof dataArr[i]?.val?.data?.word=== 'string' && dataArr[i]?.val?.data?.word.toLowerCase().includes(query.toLowerCase()) 
              // || typeof dataArr[i]?.val?.data?.definitions === 'string' && dataArr[i]?.val?.data?.definitions.toLowerCase().includes(query.toLowerCase())
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

    // setting the heading to be displayed on favourite page this is done on the basis of the type of favourite page
    const heading = paramValue
  .replace(/-/g, ' ')
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  // setting the comment to be displayed on favourite page this is done on the basis of the type of favourite page
  const comment=(paramValue=="all" || paramValue=="ambiguous-words"|| paramValue=="learn-with-story")?""
  :(paramValue=="unseen-words"|| paramValue=="seen-words" || paramValue=="test-vocabulary"|| paramValue=="idioms"|| paramValue=="easy-words")?"(Flashcards)":"(Play with friends)"

   
    return (
      <div>
      
        <Header val={1} />
        <CategoryHeader />
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
    <h3>{heading}</h3>
    <h3>{comment}</h3>
          {/* Rendering section divs */}
          {filteredData.map((item, index) => (
            <React.Fragment key={index}>
              {(() => {
                if (item?.type === "words") {
                  return (
                    <>
                      <h1>{index + 1}</h1>
                      <h1>{item?.val?.word}</h1>
                      <h1>{item?.isSeen ? "Seen Words" : "Unseen Words"}</h1>
                      <h1>{item?.name}</h1>
                      <button>View</button>
                      <FavouriteButton itemId={item?.itemId} type={item?.type} name={item?.name} />
                    </>
                  );
                }
    
                if (item?.type === "sampleStory") {
                  return (
                    <>
                    <h1>{index + 1}</h1>
                    <h1> {item?.val?.title}</h1>
                    <h1> {item?.name}</h1>
                      <button>View</button>
                      <FavouriteButton itemId={item?.itemId} type={item?.type} name={item?.name} />

                    </>
                  );
                }
    
                if (item?.type === "notes") {
                  return (
                    <>
                    <h1>{index + 1}</h1>
                    <h1> {item?.val?.data?.word}</h1>
                    <h1> {item?.name}</h1>
                      <button>View</button>
                      <FavouriteButton itemId={item?.itemId} type={item?.type} name={item?.name} />
                      </>
                  );
                }
              })()}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
}
  return isLoading ? <Spinner/> : <></>

}

export default FavouritesPage;
