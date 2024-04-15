import Header from "../components/Header"
import "../styles/FlashCard.css";
import { useState, useEffect } from "react";

function AboutUspage() {
  return (
  
<>

<Header val={3}/>
<div className="flex justify-center items-center">
  <h2>About us</h2>
</div>

</>
  )
}

// const [isFlipped , setIsFlipped] = useState(false)
// const [leftclicked, setLeftClicked] = useState(false);
//     const [rightclicked, setRightClicked] = useState(false);
//     const [count , setCount] = useState(1);

//     const handleFlip = () => {
//       setIsFlipped(!isFlipped);
//     }

//     const handleRight = () => {
//       setRightClicked(true);
//       setLeftClicked(false);
//       setCount(count+1)
//     }
//     const handleLeft = () => {
//       setRightClicked(false);
//       setLeftClicked(true);
//        setCount(count-1);
//     }

// return (
//   <>
//   <div className="cube-container">
//                    <div className="cube flex flex-row justify-center items-center">
                   
//                    <div
//                        className={`flip-card ${isFlipped ? "flipped" : ""
//                            }  shadow-xl rounded-2xl  cube-face-front ${rightclicked? "movel": ""} ${leftclicked? "mover": ""} flex flex-row justify-center items-center` }
//                        onClick={handleFlip}
//                    >
//                     {count}
//                        </div>
                   
//                    <div onClick={handleRight} className={`cube-face cube-face-right ${rightclicked? "movec":""} ${leftclicked? "movel" : ""} shadow-xl rounded-2xl border border-[#5B7ADE] items-center flex flex-row justify-center text-lg font-normal text-[#757575] `}>Tap to Next</div>
//            <div onClick={handleLeft} className={`cube-face cube-face-left ${leftclicked? "movec":""} ${rightclicked? "mover":""}  shadow-xl rounded-2xl border border-[#5B7ADE] items-center flex flex-row justify-center text-[#757575] text-lg font-normal`}>
//             Tap to Prev
//            </div>
//                </div>
//                </div>

//   </>
// const listRef = useRef(null);
// let scrollPos = 0;
// const images = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5", "Image 6", "Image 7", "Image 8", "Image 9", "Image 10", "Image 11", "Image 12", "Image 13", "Image 14"];
// const imageWidth = 250; // Width of each image in pixels
// const animationDuration = 2000;

// useEffect(() => {
//     const interval = setInterval(() => {
//         scrollPos += imageWidth;
//         if (scrollPos >= (listRef.current.scrollWidth - listRef.current.clientWidth)) {
//             scrollPos = 0;
//         }
//         listRef.current.scroll({
//             left: scrollPos,
//             behavior: 'smooth'
//         });
//     }, );

//     return () => clearInterval(interval);
// }, []);

// return (
//     <div className="w-full bg-red-100">
//         <div className="h-[200px] m-auto overflow-hidden relative w-auto">
//             <ul ref={listRef} className="flex animate-scroll">
//                 {images.map((image, index) => (
//                     <li key={index} style={{ width: `${imageWidth}px` }}>{image}</li>
//                 ))}
//             </ul>
//         </div>
//     </div>                


// );
// };
export default AboutUspage
