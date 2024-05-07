import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Header from '../components/Header';
import Notecard from '../components/Notecard';
import { useMediaQuery } from "react-responsive";

const FavouritesCategoryPage = () => {
  // Sample array of favourite items

  const isMobile = useMediaQuery({ maxWidth: "450px" });
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
    { heading: "Synonyms MCQ", comment: "(Play with Friends)" },
    { heading: "My Notes" }
  ];
  // To navigate to desired page
  const navigate = useNavigate();

  const handleTo = (heading) => {
    //these headings aren't developed yet so whenc clicked on these toast is given 
    if (heading === "Test Vocabulary" || heading === "Idioms"
      || heading === "Easy Words" || heading === "Word MCQ"
      || heading === "Ambiguous Words" || heading === "Idioms MCQ"
      || heading === "Match Words" || heading === "Antonyms MCQ" || heading === "Synonyms MCQ") {
      toast.error("This feature is not available yet");
      return;
    }
    //if the heading is not in the above then it will go to a page for that type of favourite 
    //which is dealt here using navigate 
    else {
      if(heading === "My Notes")
      {
        navigate('/mynotes');
      }
      else
      {
      const link = heading.split(' ').map(word => word.toLowerCase()).join('-');
      navigate(`/favourites/${link}`);
      }
    }
  }



  return (
    <>
      <Header val={1} />
      <div className={` mx-20 ${isMobile? "flex flex-col items-center ": ""}`}>
        <h1 className="text-[1.875rem] leading-4 md:text-left font-bold md:mt-10 mt-8 md:mb-20 mb-12">FAVOURITES</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-7 ">
          {favouriteItems.map((item, index) => (
            <button
              onClick={() => handleTo(item.heading)}
              key={index}
              role="listitem"
              className="border h-[4.3rem] w-[12.5rem] border-[#5B7ADE] bg-[#EBEDFF] hover:bg-[#CDD3FF] hover:border items-center rounded-xl"

            >
              <h1 className=" text-[1.15rem] font-medium text-center leading-6  text-[#212121] hover:text-[#001257] mb-1">{item.heading}</h1>
              {item.comment && <div className="text-[#212121] hover:text-[#001257] font-normal text-[1rem] leading-4">{item.comment}</div>}
            </button>
          ))}
        </div>
      </div>
      <Notecard />
    </>
  );
};

export default FavouritesCategoryPage;