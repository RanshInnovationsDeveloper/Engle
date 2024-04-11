// Importing React components and icons
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { RiFilter2Line, RiSearch2Line } from "react-icons/ri";
import { FaSquarePlus } from "react-icons/fa6";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { notesEndpoints } from '../services/apis';
import { toast } from 'react-toastify';
import FavouriteButton from "../components/FavouriteButton";
import { NOTES_FILE_NAME,NOTES_FILE_TYPE } from "../constants/constants";
import { GoSearch } from "react-icons/go";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Notecard from "../components/Notecard";

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
  const { authUserId } = useSelector((state) => state.auth);
  // console.log(authUserId)
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
        // console.log(response)
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
    // console.log('Running useEffect hook');
    // console.log('Current query:', query);
    // console.log('Current notes:', notes);
  
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

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = notes.slice(startIndex, endIndex);

  console.log(notes)
  // Rendering the component
  return (
    <>
    {/* {console.log("groupedNotes",groupedNotes)} */}
      <Header />

      <div className='mt-4'>
        {/* Search and filter bar */}
        <div className='flex flex-col gap-8 justify-between mx-3 lg:mx-28 mb-10 gap-{10rem} lg:flex lg:justify-between lg:flex-row'>
                <h1 className='lg:font-bold lg:text-3xl flex justify-center font-bold text-3xl'>
                    My Notes
                </h1>
                <div>
                  {/* Search Input */}
                    <div className="flex max-w-sm mx-auto">
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
                        {/* Filter */}
                        <button type="submit" className="p-2 ms-2 text-lg font-medium text-gray-600 bg-white rounded-lg border border-gray-700">
                            <RiFilter2Line className='w-7 h-7' />
                        </button>
                    </div>
                </div>
            </div>

        {/* Displaying grouped notes */}
        <div className='mx-28'>
  <table className="table-auto w-full border mx-auto border-blue-900 justify-center items-center rounded-lg">
    <thead className='bg-customBg rounded-lg'>
      <tr>
        <th className="border border-blue-700 px-4 py-4">Sr. No</th>
        <th className="border border-blue-700 px-4 py-4">Word</th>
        <th className="border border-blue-700 px-4 py-4">Notes</th>
        <th className="border border-blue-700 px-4 py-4">Empty</th>
        <th className="border border-blue-700 px-4 py-4">Favourite</th>
      </tr>
    </thead>
    <tbody className='bg-customBg border-blue-700 border'>
      {/* {console.log("notes",notes)}  */}

      {Object.keys(groupedNotes).map(date => (
        groupedNotes[date].map((note,index) => (
          <tr key={startIndex + index}>
            <td className="text-center border w-20 px-4 py-4 border-blue-700">{startIndex + index + 1}</td>
            <td className="text-center border w-64 px-4 py-4 border-blue-700">{note.word}</td>
            <td className="text-center border px-4 py-4 border-blue-700">{note.definitions}</td>
            <td className="text-center border w-40 px-4 py-4 border-blue-700">Empty</td>
            <td className="text-center border w-28 px-4 py-4 border-blue-700">
              <FavouriteButton
                itemId={note.id}
                type={NOTES_FILE_TYPE}
                name={NOTES_FILE_NAME}
              />
            </td>
          </tr>
        ))
      ))}
    </tbody>
  </table>
</div>
            <div className="flex justify-center mt-8 gap-4 ">             
                    <FaArrowAltCircleLeft 
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='text-blue-900 h-6 w-6'
                    />
                <div>
                    <h1 className="text-center">
                        page {currentPage} of {totalPages}
                    </h1>
                </div>        
                    <FaArrowAltCircleRight 
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}       
                    className='text-blue-900 h-6 w-6'
                    />
            </div>
            </div>
            <Notecard/>
    </>
  );
}