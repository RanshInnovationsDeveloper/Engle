// Notecard.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { notesEndpoints } from '../services/apis';
import { IoClose } from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';
import "../styles/Notecard.css";
import { Link } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

const Notecard = () => {
  // Fetching userid
  const { authUserId } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  // State object to store input values
  const [formData, setFormData] = useState({
    word: '',
    type: '',
    definitions: '',
    example: '',
    breakdown: '',
  });

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'unset'; // Enable scrolling
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'; // Make sure scrolling is enabled when component unmounts
    };
  }, [showModal]);
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
    
    <div>
      <button className='fixed bottom-4 right-4 z-10 bg-[#34468A] p-2 text-white rounded-[0.625rem] shadow-xl' onClick={toggleModal}><FaPlus className=" w-[1.5rem] h-[1.5rem]   " /></button>

      {showModal && (
   <div className="fixed inset-0 z-50 flex items-center justify-center">
   <div className={`absolute inset-0 ${!isMobile? "top-[8.5rem]" :""} bg-gray-900 opacity-50`} onClick={toggleModal}></div>
   <div className="fixed bottom-0 right-0 m-4 z-50">
   <div className="form-box   rounded-[0.625rem] flex  flex-col w-[23.5rem] h-[35.7rem] bg-white">
      <div className='top-0 bg-[#4A5995] flex px-4 justify-between h-[3rem] w-full rounded-t-[0.625rem]'>
      <h2 className='text-white font-mukta pt-3'>Add Words</h2>
      <div className='flex flex-col items-center justify-center'>
      <button onClick={toggleModal}>
      <IoClose className='bg-white rounded-[0.625rem] text-[#4A5995] w-7 h-7' />
      </button>
      </div>
      </div>
      <div className='p-3'>
      <form onSubmit={handleSubmit} className=' p-3 bg-[#F3F5FF] border border-[#5B7ADE] rounded-[0.625rem]'>
        {/* Input fields with placeholders only */}

        <div className='flex justify-center gap-4'>
        <div>
          <input
            type="text"
            name="word"
            value={formData.word}
            onChange={handleInputChange}
            placeholder="Word"
            className='border-[0.03rem] border-[#5B7ADE] rounded-[0.44rem] p-2 mb-3 '
          />
        </div>

        <div>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Type"
            className='border-[0.03rem] border-[#5B7ADE] rounded-[0.44rem] p-2 mb-3 w-full'
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
            className='pb-8 border-[0.03rem] border-[#5B7ADE] rounded-[0.44rem] p-2 w-full mb-3 '
          />
        </div>

        <div>
          <input
            type="text"
            name="example"
            value={formData.example}
            onChange={handleInputChange}
            placeholder="Example"
            className='pb-8 border-[0.03rem] border-[#5B7ADE] rounded-[0.44rem] p-2 w-full mb-3 '
          />
        </div>

        <div>
          <input
            type="text"
            name="breakdown"
            value={formData.breakdown}
            onChange={handleInputChange}
            placeholder="Word breakdown"
            className='pb-8 border-[0.03rem] border-[#5B7ADE] rounded-[0.44rem] p-2 w-full mb-3 '
          />
        </div>
        </div>

        {/* Submit button */}
        <div className='flex justify-between items-center'>
        <FaPlus className='text-[#4A5995] w-[0.875] h-[0.875] ml-1'/>
        <button type="submit" className='bg-customBlue px-20 text-white rounded-md py-2'>Save</button>
        </div>
      </form>
      </div>
    </div>
   </div>
 </div>

      )}
    </div>
  );
};

export default Notecard;
