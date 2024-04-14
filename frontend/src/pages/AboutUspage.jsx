import Header from "../components/Header"
import "../styles/FlashCard.css";
import { useState } from "react";
function AboutUspage() {
//   return (
  
// <>

// <Header val={3}/>
// <div className="flex justify-center items-center">
//   <h2>About us</h2>
// </div>

// </>
//   )
// }

const [isFlipped , setIsFlipped] = useState(false)
const [leftclicked, setLeftClicked] = useState(false);
    const [rightclicked, setRightClicked] = useState(false);
    const [count , setCount] = useState(1);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    }

    const handleRight = () => {
      setRightClicked(true);
      setLeftClicked(false);
      setCount(count+1)
    }
    const handleLeft = () => {
      setRightClicked(false);
      setLeftClicked(true);
       setCount(count-1);
    }

return (
  <>
  <div className="cube-container">
                   <div className="cube flex flex-row justify-center items-center">
                   
                   <div
                       className={`flip-card ${isFlipped ? "flipped" : ""
                           }  shadow-xl rounded-2xl  cube-face-front ${rightclicked? "movel": ""} ${leftclicked? "mover": ""} flex flex-row justify-center items-center` }
                       onClick={handleFlip}
                   >
                    {count}
                       </div>
                   
                   <div onClick={handleRight} className={`cube-face cube-face-right ${rightclicked? "movec":""} ${leftclicked? "movel" : ""} shadow-xl rounded-2xl border border-[#5B7ADE] items-center flex flex-row justify-center text-lg font-normal text-[#757575] `}>Tap to Next</div>
           <div onClick={handleLeft} className={`cube-face cube-face-left ${leftclicked? "movec":""} ${rightclicked? "mover":""}  shadow-xl rounded-2xl border border-[#5B7ADE] items-center flex flex-row justify-center text-[#757575] text-lg font-normal`}>
            Tap to Prev
           </div>
               </div>
               </div>

  </>
                


);
};
export default AboutUspage
