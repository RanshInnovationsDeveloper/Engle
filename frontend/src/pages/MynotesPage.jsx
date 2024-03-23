// Importing React components and icons
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { RiFilter2Line, RiSearch2Line } from "react-icons/ri";
import { FaSquarePlus } from "react-icons/fa6";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { notesEndpoints } from '../services/apis';
import { toast } from 'react-toastify';
import FavouriteButton from "../components/FavouriteButton";
import { NOTES_FILE_NAME, NOTES_FILE_TYPE } from "../constants/constants";
import { GoSearch } from "react-icons/go";
import { setLoading } from "../slices/authSlice";
import Spinner from "../components/Spinner";

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
  const [notes, setNotes] = useState([]);
  // State to store grouped notes
  const [groupedNotes, setGroupedNotes] = useState([]);
  const { authUserId, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
 
  // Fetching notes from the server
  useEffect(() => {
    const fetchNotes = async () => {
      try {
      dispatch(setLoading(true));
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
        dispatch(setLoading(false));
      } catch (error) {
        // Log an error message if there is an issue with the fetch operation
        console.error('There was a problem with the fetch operation:', error);
        toast.error('Failed to fetch notes. Please try again later.');
        dispatch(setLoading(false));
      }
    };
    fetchNotes();
  }, []);

  //Filtering
  useEffect(() => {
    if (query === "") {
      setGroupedNotes(groupNotesByDate(notes));
    } else {
      for (let i = 0; i < notes.length; i++) {
        let newData = [];
        if (notes[i].word.toLowerCase().includes(query.toLowerCase()) || notes[i].definitions.toLowerCase().includes(query.toLowerCase())) {
          newData.push(notes[i]);
        }
        setGroupedNotes(groupNotesByDate(newData));
      }
    }
  }, [query, notes]);

  if(loading===true)
  return <Spinner/>;
  // Rendering the component
  return (
    <>
      <Header />
      <CategoryHeader />
      <Link to="/notecard">
        <button><FaSquarePlus className="text-blue-800 w-8 h-8" /></button>
      </Link>
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
        <div className='lg:flex lg:flex-col bg-indigo-50 shadow-lg rounded-2xl border-2  border-indigo-300 overflow-y-auto lg:mx-28 mx-4 flex flex-col'>
          {Object.entries(groupedNotes).map(([date, notes]) => (
            <div key={date}>
              {/* Date header */}
              <h1 className='font-semibold text-xl py-3 mt-3 px-10 font-mukta'>{date}</h1>
              <hr className='border-t-2 border-indigo-300' />
              {/* List of notes for the date */}
              {notes.map((note) => (
                <div className='note-items mr-8 items-center' key={note.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className='list-none py-5 px-10'>
                    {/* Displaying note details */}
                    {`Word:${note.word},Definitions:${note.definitions}`}
                  </div>
                  <FavouriteButton
                    itemId={note.id}
                    type={NOTES_FILE_TYPE}
                    name={NOTES_FILE_NAME}
                  />
                  {/* Displaying note status */}
                  {note.read ? (
                    <p style={{ color: 'green' }}>Read</p>
                  ) : (
                    <p style={{ color: 'red' }}>Unread</p>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div>
            <hr className='border-t-2 border-indigo-300' />
          </div>
          {/* Scrollbar for overflow */}
          <div className='overflow-x-hidden scrollbar' id='style-2'>
            <div className='force-overflow scrollbar-custom'></div>
          </div>
        </div>
      </div>
    </>
  );
}
