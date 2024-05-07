import React, { useEffect } from 'react'
import { useState } from 'react';
import { STORY_FILE_NAME, STORY_FILE_TYPE, genres } from '../constants/constants';
import { GoSearch } from "react-icons/go";
import { apiConnector } from "../services/apiConnector";
import { storyEndpoints,subscriptionEndpoints,dashboardEndpoints } from "../services/apis";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavouriteButton from '../components/FavouriteButton';
import Header from '../components/Header';
function Stories() {

  const initialFilters = genres.reduce((acc, genre) => ({ ...acc, [genre]: false }), {});
  const [filters, setFilters] = useState(initialFilters); //Initializing filter useState
  const [query, setQuery] = useState(''); //Initializing query useState
  const [isSubscribed,setIsSubscribed]=useState(false); //To check if the user is subscribed or not
  const { authUserId } = useSelector((state) => state.auth);//User ID of the user
  
  //Data and filtered stories to handle data coming from backend and filters applied
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([data]);
  const [queryStories, setQueryStories] = useState([filteredData]);


  const {FETCHALLSTORIES_API} = storyEndpoints;
  const {GET_SUBSCRIPTION_STATUS}=subscriptionEndpoints;
  const {FETCH_STORY_PREFERENCE}=dashboardEndpoints
  const navigate=useNavigate(); //Navigate to navigate to the story clicked
  
  
  //Function to open individual story
  const openStory = (id) => {
          navigate(`/story/${id}`)
         }

  //Function to handle the case when user is not subscribed
  const handleNotSubscribed=()=>{
    navigate("/subscribe") //TODO:GIve the address of this page
  } 

//Fetching the subscription status of user
useEffect(()=>{
  const fetchSubscriptionStatus=async()=>{
    try {
      const response=await apiConnector(
        "GET",
        GET_SUBSCRIPTION_STATUS,
        null,
        null,
        { userId: String(authUserId) }
      );
      setIsSubscribed(response?.data?.isSubscribed);
    } catch (error) {
      console.log(error.message)
    }
  };
  fetchSubscriptionStatus();
},[])

//Fetching all the stories data
useEffect(()=>{
  const fetchData=async()=>{
    try {
      const response=await apiConnector("GET",FETCHALLSTORIES_API,null,null,{userId:authUserId});
      setData(response.data);
    } catch (error) {
      console.log(error.message)
    }
  }
  fetchData();
},[])

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

//Filtering the stories based on the genre selected
useEffect(() => {
  const filterData=()=>{
  const allFalse = Object.values(filters).every(value => value === false);
  if (allFalse) {
    setFilteredData(data);
  } else {
    const newData = data.filter(story => filters[story.genre]);
    setFilteredData(newData);
  }
}
filterData();
}, [filters,data]);


//Filtering the stories based on the search query
useEffect(() => {
        if (query === '') setQueryStories(filteredData);
        else {
          const tempArr=[];
          for (let i = 0; i < filteredData.length; i++) {
            if (filteredData[i]?.title?.toLowerCase()?.includes(query?.toLowerCase())) {
              tempArr.push(filteredData[i]);
            }
          }
          setQueryStories(tempArr);
        }
      }, [query,data,filters,filteredData]);

  return (
    <div>
    <Header val={1}/>
      <h1>LEARN WITH STORY</h1>
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
      <GoSearch className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] ' />
          <input
              type="text"
              placeholder="Search..."
              className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

       {queryStories.map((story)=>{
         return (
           <div key={story?.id}>
             <h1>{story?.title}</h1>
             <FavouriteButton
                  itemId={story?.id}
                  type={STORY_FILE_TYPE}
                  name={STORY_FILE_NAME}
             />
           Count:{story?.count}
            <br/>
            Scroll Percentage:{story?.scrollPercentage}
           <button onClick={(isSubscribed||story?.isFree)?()=>openStory(story?.id):()=>handleNotSubscribed()}>{(isSubscribed||story?.isFree)?"View":"Please Subscribe To View This"}</button>
           </div>
         )
       })}
      
    </div>
  )
}

export default Stories
