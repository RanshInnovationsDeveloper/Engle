import { useEffect, useState,useRef } from 'react'
import {apiConnector} from '../services/apiConnector'
import { storyEndpoints,subscriptionEndpoints } from '../services/apis'
import { useParams } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const {FETCHSTORYBYID_API,UPDATE_STORY_COUNT,UPDATE_SCROLL_PERCENTAGE}=storyEndpoints
const {GET_SUBSCRIPTION_STATUS}=subscriptionEndpoints
function IndividualStory() {
    //States used
    const [story,setStory]=useState({})
    const [query, setQuery] = useState('')
    const { authUserId } = useSelector((state) => state.auth);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [isSubscribed,setIsSubscribed]=useState(false);

    const navigate=useNavigate();
  
    //Reference of div
    const divRef = useRef();

    
    const id=useParams().id;

  //This is to check the subscription status of the user
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

  //This is to fetch the story by id 
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
    },[id])

  //This is to update the story count
  useEffect(()=>{
    const updateStoryCount=async()=>{
    if (Object.keys(story).length>0)
      {
      const update=await apiConnector("POST",UPDATE_STORY_COUNT,null,null,{storyId:id})
    }
  }
  updateStoryCount();
  },[story])


 //This is to highlight the text when searched
    const highlightText = (text, query) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return <span> { parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={i} style={{backgroundColor: '#3c87f0'}}>{part}</span> : 
            part 
        )} </span>;
      }

//This to set the scroll percentage
useEffect(() => {
  const onScroll = async() => {
    const scrollHeight = divRef.current.scrollHeight;
    const scrollTop = divRef.current.scrollTop;
    const clientHeight = divRef.current.clientHeight;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

    const currentScrollPercentage = scrollHeight > clientHeight ? scrolled : 100;
    setScrollPercentage(currentScrollPercentage);
    const updateScrollPercentage= await apiConnector("POST",UPDATE_SCROLL_PERCENTAGE,{userId:authUserId,percentage:parseInt(currentScrollPercentage),storyId:id},null,null)
  };
  if (divRef.current) {
    const observer = new MutationObserver(onScroll);
    observer.observe(divRef.current, { childList: true, subtree: true });

    divRef.current.addEventListener('scroll', onScroll);
    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener('scroll', onScroll);
        observer.disconnect();
      }
    };
  }
}, [authUserId]);

//A conditional rendering it renders when a story with wrong id is searched
if (!Object.keys(story).length>0){
  return(
    <div>
      <Header val={1}/>
      <GoSearch className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] ' />
      <input
        type="text"
        placeholder="Search..."
        className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div ref={divRef} 
       style={{ height: '80vh', backgroundColor: 'gray', overflow: 'auto',width:"80vw", margin:"auto" }}>
       <h1>No Such Story</h1>
       <button onClick={()=>navigate("/")}>Go Back to Home</button>
      </div>
    </div>
  )
}

//Another conditional rendering it is based on price of story and subscription status of user
else if (!story?.isFree && !isSubscribed) {
  return (
  
    <div>
      <Header val={1}/>
      <h1>Subscribe to read the story</h1>
      <button onClick={()=>navigate("/subscribe")}>Click to subscribe</button>
    </div>
  )
}


//Main render    
return (
  <div>
  <Header val={1}/>
    <GoSearch className='fill-gray-500 pt-1 px-1 w-[2rem] h-[2rem] ' />
    <input
      type="text"
      placeholder="Search..."
      className="rounded-lg py-2 px-4 mr-2 focus:outline-none"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <div ref={divRef} 
      style={{ height: '80vh', backgroundColor: 'gray', overflow: 'auto',width:"80vw", margin:"auto" }}>
    <h1>{story?.title ? highlightText(story.title, query) : ''}</h1>
    <p>{story?.content ? highlightText(story.content, query) : ''}</p>
    </div>
  </div>
)
}

    export default IndividualStory