import React,{useEffect,useState} from 'react'
import { apiConnector } from "../services/apiConnector";
import { storyEndpoints } from "../services/apis";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import FavouriteButton from '../components/FavouriteButton';
import { STORY_FILE_NAME,STORY_FILE_TYPE } from '../constants/constants';



const {FETCHALLSTORIES_API} = storyEndpoints;
function Stories() {
//Navigate to navigate to the story clicked
  const navigate=useNavigate();
//Various states used in the component
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([stories]);
  const [query, setQuery] = useState('')
  //Fetching all the stories
  useEffect(() => {const fetchStories = async () => {
        try {
            const response = await apiConnector(
                "GET",
                FETCHALLSTORIES_API,
              );
              setStories(response.data);
        } catch (error) {
            console.log("Error from stories",error)
        }
    }
    fetchStories();
    },[])
//Filtering the stories based on the search query
    useEffect(() => {
      if (query === '') setFilteredStories(stories);
      else {
        const tempArr=[];
        for (let i = 0; i < stories.length; i++) {
          if (stories[i].title.toLowerCase().includes(query.toLowerCase()) || stories[i].content.toLowerCase().includes(query.toLowerCase()) ) {
            tempArr.push(stories[i]);
          }
        }
        setFilteredStories(tempArr);
      }
    }, [stories,query]);

    //Open the story clicked
    const openStory = (id) => {
      navigate(`/story/${id}`)
    }

    return (
    <div>
       <GoSearch className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] ' />
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
      {filteredStories.map((story,indx)=>{
        return (
          <div key={indx} onClick={()=>openStory(indx)}>
            <h1>{story?.title}</h1>
            <p>{story?.content}</p>
            <FavouriteButton
            type={STORY_FILE_TYPE}
            itemId={indx}
            name={STORY_FILE_NAME}
          />
          </div>
        )
      })}
    </div>
  )
}

export default Stories
