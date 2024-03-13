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

const { GET_FAVOURITE_API, REMOVE_FAVOURITE_API } = favouriteEndpoints;
//*TODO:important comment at all place in code have used a test userId to be removed in production
//*TODO:also uncomment the authUserId coming from production to be used in production
function FavouritesPage() {
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
            // userId: String(authUserId), //this is the user Id of the logged in user use it in production
            userId: "qEMYBI4erFNruO1L0iHQknbxXdD2", //this is just a test userId to be removed in production
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

  //If the length of returned data is 0, then display "No Item Favourite Items Added For this user"
  if (isLoading == false && data?.data.length == 0) {
    return <>No Item Favourite Items Added For this user </>;
  }

  //If the length of returned data is greater than 0, then display the data
  if (isLoading == false && data?.data.length > 0) {
    //Arranging the data into key value pair with key being the data so all items with same data will be grouped together
    //We can even use state for group data and in that case when we will click remove button than it will be removed from
    //page immediately but
    //if we don;t want that to happen we can leve it like that and can call remove from favourite api
    //on first time click and add to favourite api on second time click we also can use fetch favourite button status
    //to dynamically display state of favourite button
    //FavouriteButton does this job only
    const groupedData = data.data.reduce((acc, item) => {
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
    console.log(groupedData); //console logged grouped data helpful for further development
    return (
      // traversing the grouped data and displaying it
      <div>
        {Object.keys(groupedData).map((dateKey) => (
          <React.Fragment key={dateKey}>
            <p>Date: {dateKey}</p>
            <ul>
              {groupedData[dateKey].map((value, index) => (
                <div key={index}>
                  <li>Type: {value.type}</li>
                  {/* //if type is words // * Type is the type of file from which
                  item value is coming */}
                  {value.type === "words" && (
                    <>
                      <li>Word: {value.val.word}</li>
                      <li>Definition: {value.val.definitions[0]}</li>
                      <FavouriteButton
                        type={value?.type}
                        itemId={value?.itemId}
                        name={value?.name}
                      />
                    </>
                  )}
                  {/* //if type is sampleStory // * Type is the type of file from
                  which item value is coming */}
                  {value.type === "sampleStory" && (
                    <>
                      <li>Title: {value.val.title}</li>
                      <li>Content: {value.val.content}</li>
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
    );
  }

  return isLoading ? <div>Loading.....</div> : <></>;
}

export default FavouritesPage;
