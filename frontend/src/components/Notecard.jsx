// Notecard.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { notesEndpoints } from '../services/apis';
import { IoClose } from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';
import "../styles/Notecard.css";
import { Link } from 'react-router-dom';

const Notecard = () => {
   // Fetching userid
   const { authUserId } = useSelector((state) => state.auth);
  // State object to store input values
  const [formData, setFormData] = useState({
    word: '',
    type: '',
    definitions: '',
    example: '',
    breakdown: '',
  });
  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add authUserId to formData
      const formDataWithUserId = {
        ...formData,
        UserId: authUserId,
      };
      // Prepare the request options
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUserId),
      };
      // Send the POST request to create a new note
      const response = await fetch(notesEndpoints.CREATENOTES_API, options);

      // Check the response status
      if (response.ok) {
        toast.success("Notes Created Successfully");
      } else {
        // Handle errors in the response
        const responseData = await response.json();
        if (responseData.errors && responseData.errors.length > 0) {
          // Display errors as alerts
          responseData.errors.forEach((error) => {
            toast.error(`Error in ${error.path}: ${error.msg}`);
          });
        } else {
          console.error('Failed to create note. Status:', response.status);
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  return (
    <div className="form-box max-w-sm rounded-lg flex justify-center items-center flex-col border border-black">
      <div className='bg-customBlue flex px-4 justify-between items-center w-full'>
      <h2 className='text-white font-mukta pt-3'>Add Words</h2>
      <div>
      <Link to = "/mynotes">
      <IoClose className='bg-white rounded-md text-customBlue h-8 w-8' />
      </Link>
      </div>
      </div>
      <div className='p-3'>
      <form onSubmit={handleSubmit} className=' p-4 bg-violet-100 border-2 border-customBlue rounded-md'>
        {/* Input fields with placeholders only */}

        <div className='flex justify-center gap-4'>
        <div>
          <input
            type="text"
            name="word"
            value={formData.word}
            onChange={handleInputChange}
            placeholder="Word"
            className='border border-customBlue p-2 mb-3 rounded-lg'
          />
        </div>

        <div>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Type"
            className='border border-customBlue p-2 mb-3 w-full rounded-lg'
          />
        </div>
        </div>
        <div>
        <div>
          <input
            type="text"
            name="definitions"
            value={formData.definitions}
            onChange={handleInputChange}
            placeholder="Definition"
            className='pb-8 border border-customBlue p-2 w-full mb-3 rounded-lg'
          />
        </div>

        <div>
          <input
            type="text"
            name="example"
            value={formData.example}
            onChange={handleInputChange}
            placeholder="Example"
            className='pb-8 border border-customBlue p-2 w-full mb-3 rounded-lg'
          />
        </div>

        <div>
          <input
            type="text"
            name="breakdown"
            value={formData.breakdown}
            onChange={handleInputChange}
            placeholder="Word breakdown"
            className='pb-8 border border-customBlue p-2 w-full mb-3 rounded-lg'
          />
        </div>
        </div>

        {/* Submit button */}
        <div className='flex justify-between items-center'>
        <FaPlus className='text-customBlue'/>
        <button type="submit" className='bg-customBlue px-20 text-white rounded-md py-2'>Save</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Notecard;
