import React from 'react';

const FavouritesCategoryPage = () => {
  // Sample array of favourite items
  
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

  return (
    <>
     
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl md:text-left font-semibold mt-10 mb-20">Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 ">
        {favouriteItems.map((item, index) => (
          <button
            key={index}
            className="border border-[#5B7ADE] bg-[#EBEDFF] hover:bg-[#CDD3FF] hover:border font-bold py-4 px-4 w-50 h-24 md:w-56  lg:h-22 rounded-2xl"
          >
            <div className="text-lg text-[#212121] hover:text-[#001257] font-semibold mb-2">{item.heading}</div>
            {item.comment && <div className="text-[#212121] hover:text-[#001257] font-normal">{item.comment}</div>}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};

export default FavouritesCategoryPage;