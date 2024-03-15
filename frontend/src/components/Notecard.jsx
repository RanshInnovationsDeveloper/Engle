// Notecard.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { notesEndpoints } from '../services/apis';
import "../styles/Notecard.css";

const Notecard = () => {
   // Fetching userid
   const { authUserId } = useSelector((state) => state.auth);
   console.log(authUserId);

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
    <div className="form-box">
      <h2>Notecard</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields with placeholders only */}
        <div>
          <input
            type="text"
            name="word"
            value={formData.word}
            onChange={handleInputChange}
            placeholder="Word"
          />
        </div>

        <div>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Type"
          />
        </div>

        <div>
          <input
            type="text"
            name="definitions"
            value={formData.definitions}
            onChange={handleInputChange}
            placeholder="Definition"
          />
        </div>

        <div>
          <input
            type="text"
            name="example"
            value={formData.example}
            onChange={handleInputChange}
            placeholder="Example"
          />
        </div>

        <div>
          <input
            type="text"
            name="breakdown"
            value={formData.breakdown}
            onChange={handleInputChange}
            placeholder="Word breakdown"
          />
        </div>

        {/* Submit button */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Notecard;
