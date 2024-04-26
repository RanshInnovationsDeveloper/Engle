import { useEffect, useState } from 'react'
import {apiConnector} from '../services/apiConnector'
import { storyEndpoints } from '../services/apis'
import { useParams } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'

const {FETCHSTORYBYID_API}=storyEndpoints
function IndividualStory() {
    //States used
    const [story,setStory]=useState({})
    const [query, setQuery] = useState('')
    
    const id=useParams().id;
    useEffect(()=>{
        const fetchStory=async()=>{
            try{
                const response=await apiConnector("GET",FETCHSTORYBYID_API+`/${id}`)
                setStory(response.data)
            }catch(error){
                console.log("Error from Individual Story",error)
            }
        }
        fetchStory();
    },[])

    const highlightText = (text, query) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return <span> { parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={i} style={{backgroundColor: '#3c87f0'}}>{part}</span> : 
            part 
        )} </span>;
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
          <h1>{story?.title ? highlightText(story.title, query) : ''}</h1>
          <p>{story?.content ? highlightText(story.content, query) : ''}</p>
        </div>
      )
}

export default IndividualStory
