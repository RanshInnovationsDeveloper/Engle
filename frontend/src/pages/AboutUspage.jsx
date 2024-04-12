import Header from "../components/Header"
import { useState } from "react";
import "../styles/FlashCard.css";
function AboutUspage() {

//   const [currentPage, setCurrentPage] = useState(1);

//   const  totalItems = 100;
//  const itemsPerPage =6;
//   // Calculate total pages
//   const [inputPage, setInputPage] = useState('');

//   // Calculate total pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//     setInputPage('');
//   };

//   // Function to handle input change
//   const handleInputChange = (e) => {
//     setInputPage(e.target.value);
//   };

//   // Function to handle input submit on Enter key
//   const handleInputSubmit = () => {
//     const pageNumber = parseInt(inputPage);
//     if (!isNaN(pageNumber)) {
//       handlePageChange(pageNumber);
//     }
//   };

//   // Function to handle input blur
//   const handleInputBlur = () => {
//     handleInputSubmit();
//   };

//   return (
//     <div>
//       <span>Page: </span>
//       <input
//         type="number"
//         min="1"
//         max={totalPages}
//         value={inputPage || currentPage} // Use inputPage if not empty, otherwise use currentPage
//         onChange={handleInputChange}
//         onBlur={handleInputBlur}
//         onKeyPress={(e) => {
//           if (e.key === 'Enter') {
//             handleInputSubmit();
//           }
//         }}
//       />
//       <span> of {totalPages}</span>
//       <ul>
//         {[...Array(totalPages).keys()].map((page) => (
//           <li key={page + 1} onClick={() => handlePageChange(page + 1)}>
//             {page + 1}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
  

  return (
  
<>
<Header val={3}/>
{/* <div className="flex justify-center items-center">
  <h2>About us</h2>
</div> */}

</>
  )
}

export default AboutUspage
