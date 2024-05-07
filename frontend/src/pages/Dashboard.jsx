import React from 'react'
import { genres } from '../constants/constants';
import { useState } from 'react';
import { apiConnector } from '../services/apiConnector';
import { dashboardEndpoints } from '../services/apis';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
function Dashboard() {
    const initialFilters = genres.reduce((acc, genre) => ({ ...acc, [genre]: false }), {});
    const [filters, setFilters] = useState(initialFilters); //Initializing filter useState
    const {ADD_STORY_PREFERENCE,FETCH_STORY_PREFERENCE}=dashboardEndpoints;

    const { authUserId } = useSelector((state) => state.auth);


    const Submit=async()=>{
        try {
          const response=await apiConnector(
            "POST",
            ADD_STORY_PREFERENCE,
            {
                userId:authUserId,
                filters:filters
            },
            null,
            null
        )
        if (response?.data?.status==="success"){
          toast.success("Preference Updated Successfully")
        }
        } catch (error) {
          
        }
    }

  //Fetching the story preference of the user
useEffect(()=>{
  const getStoryPreference=async()=>{
    try {
      const response=await apiConnector(
        "GET",
        FETCH_STORY_PREFERENCE,
        null,
        null,
        { userId: String(authUserId) }
      );
      if (response.data?.filters){
      setFilters(response.data?.filters);
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  getStoryPreference();
  },[])
  

  return (
    <div>
       <h1>DASHBOARD</h1>
      <div>
        {genres.map((genre,indx) => (
          <div key={indx}>
            <input
              type="checkbox"
              name={genre}
              checked={filters[genre]}
              onChange={(e) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [genre]: e.target.checked,
                }));
              }}
            />
            <label htmlFor={genre}>{genre}</label>
          </div>
        ))}
      </div>
      <button onClick={()=>Submit()}>Submit the Preference</button>
    </div>
  )
}


export default Dashboard
