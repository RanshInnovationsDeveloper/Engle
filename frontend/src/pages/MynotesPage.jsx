// Importing React components and icons
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RiSearch2Line } from "react-icons/ri";
import Header from "../components/Header";
import { notesEndpoints } from '../services/apis';
import { toast } from 'react-toastify';
import FavouriteButton from "../components/FavouriteButton";
import { NOTES_FILE_NAME,NOTES_FILE_TYPE } from "../constants/constants";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Notecard from "../components/Notecard";
import { MdOutlineFilterAlt } from "react-icons/md";

// Function to group notes by date
const groupNotesByDate = (notes) => {

  // Initialized an empty object to store grouped notes
  const grouped = {};
  
  // Get the current date
  const today = new Date();

  // Iterated through each note
  notes.forEach((note) => {
    // Extracted the date from the note's timestamp
    const noteDate = new Date(note.timestamp);
    // Check if the note's date is today
    const isToday = (
      noteDate.getDate() === today.getDate() &&
      noteDate.getMonth() === today.getMonth() &&
      noteDate.getFullYear() === today.getFullYear()
    );
    // Define a variable to store the formatted date
    let formattedDate;
    // Set the formatted date based on whether it's today or not
    if (isToday) {
      formattedDate = 'Today';
    } else {
      const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
      formattedDate = noteDate.toLocaleDateString('en-US', options);
    }
    // If the formatted date is not present in the grouped object, create an empty array
    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }
    // Push the current note into the array corresponding to its formatted date
    grouped[formattedDate].push(note);
  });

  return grouped;
};

// MynotesPage component
export default function MynotesPage() {
  //States for search   
  const [query, setQuery] = useState('');
  const [notes,setNotes] = useState([]);

  // State to store grouped notes
  const [groupedNotes, setGroupedNotes] = useState([]);
  const { authUserId ,loading } = useSelector((state) => state.auth);
  
  // Fetching notes from the server
  useEffect(() => {
    const fetchNotes = async () => {
    
      try {
        // Define the options for the fetch request
        const options = { method: 'GET' };
        
        // Make the fetch request to the specified API
        const resp = await fetch(`${notesEndpoints.GETNOTES_API}/${authUserId}`, options);
        // Check if the response is successful; otherwise, display an error toast
        if (!resp.ok) {
          toast.error('Network response was not ok');
        }

        // Parse the response as JSON
        const response = await resp.json();
        // Sort the notes by timestamp in descending order
        const sortedNotes = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setNotes(sortedNotes)
        setGroupedNotes(groupNotesByDate(sortedNotes));
      } catch (error) {
        // Log an error message if there is an issue with the fetch operation
        console.error('There was a problem with the fetch operation:', error);
        toast.error('Failed to fetch notes. Please try again later.');
      }
      
    };
    fetchNotes();
  }, []);

  //Filtering
  useEffect(() => {

  
    if (query === "") {
      setGroupedNotes(groupNotesByDate(notes));
    } else {
      let newData = [];
      for (let i = 0; i < notes.length; i++) {
        if (notes[i]?.word.toLowerCase().includes(query.toLowerCase()) || notes[i]?.definitions.toLowerCase().includes(query.toLowerCase())) {
          newData.push(notes[i]);
        }
      }
      setGroupedNotes(groupNotesByDate(newData));
    }
  }, [query, notes]);
  //number of pages
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(notes.length / itemsPerPage);
    const [inputPage, setInputPage] = useState('');

    const startIndex = (currentPage -1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = notes.slice(startIndex, endIndex);

    
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
  

  // Rendering the component
  return (
    <>
      <Header val={1} />

      <div className=" mx-[5rem] ">
          <div className="flex flex-row justify-between items-center  mt-8 mb-8">
            <h1 className="text-[1.875rem] leading-4 text-center font-bold ">MY NOTES</h1>
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

        {/* Displaying grouped notes */}
        <div className='rounded-t-xl border-x border-t border-[#5B7ADE] '>
  <table className="table-auto w-full  rounded-t-xl mx-auto justify-center items-center  bg-[#F3F5FF] ">
    <thead className='rounded-2xl'>
      <tr className="h-[3.5rem]">
        <th className="border-r border-[#5B7ADE]">Sr. No</th>
        <th className="border-r border-[#5B7ADE]">Word</th>
        <th className="border-r border-[#5B7ADE] ">Notes</th>
        {/* <th className="border border-blue-700 ">Empty</th> */}
        <th className="">Favourite</th>
      </tr>
    </thead>
    <tbody className='border-t border-[#5B7ADE]'>
      {/* {console.log("notes",notes)}  */}

      
        {currentItems.map((note,index) => (
          <tr key={startIndex + index} className="h-[3.5rem]">
            <td className="text-center border-y border-r w-24 border-[#5B7ADE]">{startIndex + index + 1}.</td>
            <td className="text-center border w-64 border-[#5B7ADE]">{note.word}</td>
            <td className="text-center border  border-[#5B7ADE]">{note.definitions}</td>
            {/* <td className="text-center border w-40  border-blue-700">Empty</td> */}
            <td className="text-center border-y brder-l w-32  border-[#5B7ADE]">
              <FavouriteButton
                itemId={note.id}
                type={NOTES_FILE_TYPE}
                name={NOTES_FILE_NAME}
              />
            </td>
          </tr>
        ))
      }
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
            <Notecard/>
    </>
  );
}