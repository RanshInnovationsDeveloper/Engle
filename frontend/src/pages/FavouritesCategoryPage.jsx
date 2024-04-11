import React from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import Header from '../components/Header';
import Notecard from '../components/Notecard';
const FavouritesCategoryPage = () => {
  // Sample array of favourite items
  
  //Later store these heading and comment in a contant js file for ease and further use
  const favouriteItems = [
    { heading: "All" },
    { heading: "Unseen Words", comment: "(Flashcards)" },
    { heading: "Seen Words", comment: "(Flashcards)" },
    { heading: "Test Vocabulary", comment: "(Flashcards)" },
    { heading: "Idioms", comment: "(Flashcards)" },
    { heading: "Easy Words", comment: "(Flashcards)" },
    { heading: "Ambiguous Words" },
    { heading: "Learn With Story" },
    { heading: "Word MCQ", comment: "(Play with Friends)" },
    { heading: "Idioms MCQ", comment: "(Play with Friends)" },
    { heading: "Match Words", comment: "(Play with Friends)" },
    { heading: "Antonyms MCQ", comment: "(Play with Friends)" },
    { heading: "Synonyms MCQ", comment: "(Play with Friends)" }
  ];
// To navigate to desired page
  const navigate=useNavigate();

const handleTo=(heading)=>{
      //these headings aren't developed yet so whenc clicked on these toast is given 
    if (heading==="Test Vocabulary" || heading==="Idioms" 
    || heading==="Easy Words" || heading==="Word MCQ" 
    || heading==="Ambiguous Words"|| heading==="Idioms MCQ"
    || heading==="Match Words"|| heading==="Antonyms MCQ"|| heading==="Synonyms MCQ"|| heading==="Learn With Story"){
      toast.error("This feature is not available yet");
      return;
    }
    //if the heading is not in the above then it will go to a page for that type of favourite 
    //which is dealt here using navigate 
else{
    const link = heading.split(' ').map(word => word.toLowerCase()).join('-');
    navigate(`/favourites/${link}`);
  }
}



  return (
    <>
     <Header val={1}/>
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-left font-semibold mt-12 mb-20">Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 ">
        {favouriteItems.map((item, index) => (
          <button
  onClick={()=>handleTo(item.heading)}
  key={index}
  className="border border-[#5B7ADE] bg-[#EBEDFF] hover:bg-[#CDD3FF] hover:border font-bold py-4 px-4 w-50 h-24 md:w-56  lg:h-22 rounded-2xl"
 
>
            <div className="text-lg text-[#212121] hover:text-[#001257] font-semibold mb-2">{item.heading}</div>
            {item.comment && <div className="text-[#212121] hover:text-[#001257] font-normal">{item.comment}</div>}
          </button>
        ))}
      </div>
    </div>
    <Notecard/>
    </>
  );
};

export default FavouritesCategoryPage;