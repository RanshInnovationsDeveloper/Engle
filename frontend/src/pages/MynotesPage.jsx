// Importing React components and icons
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RiFilter2Line, RiSearch2Line } from "react-icons/ri";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { notesEndpoints } from '../services/apis';
import { toast } from 'react-toastify';
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
  // State to store grouped notes
  const [groupedNotes, setGroupedNotes] = useState([]);
  const { authUserId } = useSelector((state) => state.auth);
  console.log(authUserId)
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
        setGroupedNotes(groupNotesByDate(sortedNotes));
      } catch (error) {
        // Log an error message if there is an issue with the fetch operation
        console.error('There was a problem with the fetch operation:', error);
        toast.error('Failed to fetch notes. Please try again later.');
      }
    };
    fetchNotes();
  }, []);
  // Rendering the component
  return (
    <>
      <Header />
      <CategoryHeader />

      <div className='mt-4'>
        {/* Search and filter bar */}
        <div className='flex justify-between mx-28 mb-6'>
          <h1 className='font-bold text-3xl'>My Notes</h1>
          <div className='flex max-w-sm mx-auto'>
            {/* Search input */}
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <div className='absolute text-gray-600 inset-y-0 start-0 flex items-center ps-5 pointer-events-none'>
                <RiSearch2Line className='w-7 h-7' />
              </div>
              <input
                type='text'
                id='simple-search'
                className='bg-white border border-gray-700 text-black text-sm rounded-lg block w-full ps-14 p-3'
                placeholder='Search'
                required
              />
            </div>
            {/* Filter button */}
            <button
              type='submit'
              className='p-2 ms-2 text-lg font-medium text-gray-600 bg-white rounded-lg border border-gray-700'
            >
              <RiFilter2Line className='w-7 h-7' />
            </button>
          </div>
        </div>

        {/* Displaying grouped notes */}
        <div className='flex flex-col bg-indigo-50 shadow-lg rounded-2xl border-2 mb-10 border-indigo-300 justify-center mx-28'>
          {Object.entries(groupedNotes).map(([date, notes]) => (
            <div key={date}>
              {/* Date header */}
              <h1 className='font-bold py-3 px-10'>{date}</h1>
              <hr className='border-t-2 border-indigo-300' />
              {/* List of notes for the date */}
              {notes.map((note) => (
                <div className='note-items' key={note.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className='list-none py-5 px-10'>
                    {/* Displaying note details */}
                    {`${note.word}, ${note.definitions}`}
                  </div>
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
