import React from "react";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { MdOutlineFilterAlt } from "react-icons/md";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import FavouriteButton from "../components/FavouriteButton";
import Spinner from "../components/Spinner";
import { useParams ,useNavigate} from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Notecard from "../components/Notecard";
import { setCurrentCategoryWordIndex, setCurrentCategoryWordFileActualIndex, setFlashCardCategory } from '../slices/flashCardSlice';


const { GET_FAVOURITE_API } = favouriteEndpoints;
function FavouritesPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState('') //query to be searched
  const [filteredData, setFilteredData] = useState([]) //filtered data to be displayed
  //Auth authUserId to be sent to backend for API purpose from Redux Store
  const { authUserId } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [inputPage, setInputPage] = useState('');


  const { type } = useParams()
  const paramValue = type
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
          }
        );
        // console.log(response?.data)
        if (paramValue == "all") setData(response);
        else if (paramValue == "unseen-words") {
          let unseenWords = response?.data.filter((item) => item?.type == "words" && item?.name == "Flashcards-Unseen")
          setData({ data: unseenWords })
        }
        else if (paramValue == "seen-words") {
          let seenWords = response?.data.filter((item) => item?.type == "words" && item?.name == "Flashcards-Seen")
          setData({ data: seenWords })
        }
        else if (paramValue == "learn-with-story") {
          let learnWithStory = response?.data.filter((item) => item?.type == "sampleStory")
          setData({ data: learnWithStory })
        }

        //Just to handle the cases if somehow someone reaches here will be updated once other features are developed 
        else setData(response);

        setIsLoading(false);
      } catch (error) {

        // console.log(error);
        toast.error('Failed to fetch favourites.Server Error.');
        navigate("/error");
        
      }
    };
    fetchData();
  }, [authUserId]);

  //Filtering the data
  useEffect(() => {
    if (query === "") {
      setFilteredData(data?.data);
    } else {
      const dataArr = data?.data;
      let newData = [];
      // console.log("DataArr")
      // console.log(dataArr[0])
      for (let i = 0; i < dataArr?.length; i++) {
        if (
          dataArr[i]?.type === "words" &&
          (
            typeof dataArr[i]?.val?.word === 'string' && dataArr[i]?.val?.word.toLowerCase().includes(query.toLowerCase())
            //|| Array.isArray(dataArr[i]?.val?.definitions) && dataArr[i]?.val?.definitions.some(def => typeof def === 'string' && def.toLowerCase().includes(query.toLowerCase()))
          )
        ) {
          newData.push(dataArr[i]);
        }
        if (
          dataArr[i]?.type === "sampleStory" &&
          (
            typeof dataArr[i]?.val?.title === 'string' && dataArr[i]?.val?.title.toLowerCase().includes(query.toLowerCase())
            // || typeof dataArr[i]?.val?.content === 'string' && dataArr[i]?.val?.content.toLowerCase().includes(query.toLowerCase())
          )
        ) {
          newData.push(dataArr[i]);
        }
        if (
          dataArr[i]?.type == "notes" &&
          (
            typeof dataArr[i]?.val?.data?.word === 'string' && dataArr[i]?.val?.data?.word.toLowerCase().includes(query.toLowerCase())
            // || typeof dataArr[i]?.val?.data?.definitions === 'string' && dataArr[i]?.val?.data?.definitions.toLowerCase().includes(query.toLowerCase())
          )
        ) {
          newData.push(dataArr[i]);
        }

      }
      setFilteredData(newData);
    }
  }, [query, data]);



  // console.log(data)
  //If the length of returned data is 0, then display "No Item Favourite Items Added For this user"
  if (isLoading == false && filteredData?.length == 0 && query == "") {
    return (
      <div className="overflow-hidden" >
      <Header val={1} />
      <div className="flex items-center justify-center h-[90vh] bg-gray-100">
  <p className="text-xl text-gray-700">No Data Found</p>
</div>
      </div>
    );
  }

  //If the length of returned data is greater than 0, then display the data
  if (isLoading == false && filteredData?.length > 0 || query != "") {

    // setting the heading to be displayed on favourite page this is done on the basis of the type of favourite page
    const heading = paramValue
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // setting the comment to be displayed on favourite page this is done on the basis of the type of favourite page
    const comment = (paramValue == "all" || paramValue == "ambiguous-words" || paramValue == "learn-with-story") ? ""
      : (paramValue == "unseen-words" || paramValue == "seen-words" || paramValue == "test-vocabulary" || paramValue == "idioms" || paramValue == "easy-words") ? "(Flashcards)" : "(Play with friends)"


    // Calculate the total number of pages based on the number of rows in groupedData
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Calculate the starting index of the current page
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Calculate the ending index of the current page
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);


    const currentPageItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
      setInputPage('');
    };

    const handleInputChange = (e) => {
      setInputPage(e.target.value);
    };
  
      // Function to handle input submit on Enter key
  const handleInputSubmit = () => {
    const pageNumber = parseInt(inputPage);
    if (!isNaN(pageNumber)) {
      handlePageChange(pageNumber);
    }
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    handleInputSubmit();
  };
  
  

    return (
      <div>

        <Header val={1} />
        <div className=" mx-[5rem] ">
          <div className="flex flex-row justify-between items-center  mt-8 mb-8">
            <h1 className="text-[1.875rem] leading-4 text-center font-bold ">FAVOURITES</h1>
            <div className="flex items-center justify-center gap-3">
              <div className='border border-[#5B5B5B] rounded-lg  flex items-center w-[19.5rem]  h-[2.5rem]'>
                <div className=" mx-5 flex items-center gap-3">
                <RiSearch2Line className='fill-[#5B5B5B]  w-6 h-6 ' />
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-lg  focus:outline-none placeholder:text-[#5B5B5B] "
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                </div>
                
              </div>

              <div className='border border-[#5B5B5B] rounded-lg flex justify-center items-center h-[2.5rem] w-[2.5rem]'>
                <button>
                  <MdOutlineFilterAlt className='fill-[#5B5B5B] w-7 h-7 ' />
                </button>
              </div>
            </div>
          </div>

          <div className="  rounded-t-xl border-x border-t border-[#5B7ADE] ">
            <table className="table-auto w-full  rounded-t-xl mx-auto justify-center items-center  bg-[#F3F5FF]">
              <thead className='rounded-2xl'>
                <tr>
                  <th className=" px-4 py-4" colSpan={10}>
                    <div className="font-bold text-xl">{heading}</div>
                    <div className="font-normal text-sm text-gray-500">{comment}</div>
                  </th>
                </tr>
              </thead>
              <tbody className=' border-t border-[#5B7ADE]'>



                {/* Rendering section divs */}
                {/* {console.log(currentPageItems)} */}
                {currentPageItems.map((item, index) => (
                  <tr className="h-[3.5rem]">
                    <React.Fragment key={item?.itemId}>
                      {(() => {
                        if (item?.type === "words") {
                          return (
                            <>
                              {/* {console.log(item)} */}
                              <td className="text-center border-y border-r w-24  border-[#5B7ADE]">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
                              <td className="text-center border   border-[#5B7ADE] ">{item?.val?.word}</td>
                              {paramValue === "all" && 
                                <td className="text-center border w-[24rem]  border-[#5B7ADE] ">
                                <h1 className=" text-base font-normal ">
                                  {item?.name === "Flashcards-Seen" ? "Seen Words" : "Unseen Words"}
                                </h1>
                                <h3 className=" text-sm ">
                                  (Flashcards)
                                </h3></td>}


                              <td className="text-center border w-[18rem]  border-[#5B7ADE]">
                                <button className="bg-[#34468A] text-[#FAFAFA] rounded-md py-2 px-4 w-[4.75rem] h-9" onClick={
                                  () => {
                                    dispatch(setFlashCardCategory("favourite"));
                                    localStorage.setItem("flashCardCategory", "favourite");
                                    dispatch(setCurrentCategoryWordIndex(item?.viewIndex));
                                    localStorage.setItem("currentCategoryWordIndex_favourite", item?.viewIndex);
                                    dispatch(setCurrentCategoryWordFileActualIndex(item?.itemId));
                                    localStorage.setItem("currentCategoryWordFileActualIndex_favourite", item?.itemId);
                                    navigate("/flashcards");
                                  }
                                }>View</button>

                              </td>

                              <td className="text-center border-y brder-l w-32  border-[#5B7ADE]">

                                <FavouriteButton itemId={item?.itemId} type={item?.type} name={item?.name} />
                              </td>
                            </>
                          );
                        }

                        // if (item?.type === "sampleStory") {
                        //   return (
                        //     <>
                        //     <td className="text-center border w-20 px-4 py-4 border-[#5B7ADE]">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        //     <td className="text-center border w-64 px-4 py-4 border-[#5B7ADE]">{item?.val?.title}</td>
                        //     <td className="text-center border w-64 px-4 py-4 border-[#5B7ADE]">{item?.val?.content}</td>
                        //     <td className="text-center border px-4 py-4 border-[#5B7ADE]">{item?.name}</td>
                        //     <td className="text-center border w-40 px-4 py-4 border-[#5B7ADE]">
                        //           <button className="bg-[#34468A] text-[#FAFAFA] rounded-md py-2 px-4">View</button>

                        //         </td>
                        //         <td className="text-center border w-28 px-4 py-4 border-[#5B7ADE]">
                        //       <FavouriteButton itemId={item?.itemId} type={item?.type} name={item?.name}  />
                        //       </td> 

                        //     </>
                        //   );
                        // }

                         if (item?.type === "notes") {
                           return (
                             <>
                             <td className="text-center border w-20 px-4 py-4 border-[#5B7ADE]">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                             <td className="text-center border w-64 px-4 py-4 border-[#5B7ADE]">{item?.val?.data?.word}</td>
                             <td className="text-center border px-4 py-4 border-[#5B7ADE]">{item?.name}</td>
                             <td className="text-center border w-64 px-4 py-4 border-[#5B7ADE]">{item?.val?.data?.definitions}</td>

                             {/* <td className="text-center border w-40 px-4 py-4 border-[#5B7ADE]">
                                   <button className="bg-[#34468A] text-[#FAFAFA] rounded-md py-2 px-4">View</button>

                                 </td> */}
                                 <td className="text-center border w-28 px-4 py-4 border-[#5B7ADE]">

                               <FavouriteButton itemId={item?.itemId} type={item?.type} name={item?.name} />
                               </td>
                               </>
                           );
                         }
                      })()}
                    </React.Fragment>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-8 gap-4 ">
            <FaArrowAltCircleLeft
              onClick={() => {
                if (currentPage !== 1)
                  setCurrentPage(currentPage - 1)
              }
              }
              disabled={currentPage === 1}
              className={`text-blue-900 h-7 w-7 ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"} `}
            />
            <div className=" flex justify-center items-center gap-3">
              <h1 className=" font-normal">Page </h1>
              <input
          type="numeric"
          className="text-center placeholder:text-black w-[1.875rem] h-[1.875rem] rounded-[5px] border border-black"
          // min="1"
          max={totalPages}
          value={inputPage || currentPage} 
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleInputSubmit();
            }
          }}
        />
              <h1 className="text-center font-normal"> of {totalPages}</h1>
            </div>
            <FaArrowAltCircleRight
            onClick={() => {
              if (currentPage !== totalPages)
                setCurrentPage(currentPage + 1)
            }
            }
            disabled={currentPage === totalPages}
            className={`text-blue-900  h-7 w-7 ${currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"} `}
            />
          </div>




        </div>
        <Notecard />
      </div>
    );
  }
  return isLoading ? <Spinner /> : <></>

}

export default FavouritesPage;


