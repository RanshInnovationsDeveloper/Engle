import { useNavigate } from "react-router-dom"

function Homepage() {
  return (
    <>
     <div className="bg-[rgb(0,8,52)] text-white p-10 lg:mx-10 rounded-3xl shadow-2xl flex flex-col ">
            <header className="flex-grow flex lg:flex-row flex-col justify-center items-center">
                <img className="lg:w-[30%] lg:h-[30%] w-[90%] h-[90%]  " src='home_1_img.png' alt='home_image' />
                <div className='flex-grow flex flex-col lg:pr-5'>

                    <h1 class="lg:text-[4rem] text-[2.25rem] lg:text-right font-bold bg-gradient-to-r from-green-500 via-green-600 to-yellow-200 text-transparent bg-clip-text">
                        Elevate your English
                    </h1>
                    
                    <p className="text-xl mt-2 lg:text-right lg:hidden">Learn, Connect, and Excel with Our Interactive Language Learning Platform! </p>
                    <p className="text-xl mt-2 lg:text-right hidden lg:block">Learn, Connect, and Excel with Our Interactive Language </p>
                    <p className="text-xl mt-2 lg:text-right hidden lg:block">Learning Platform!</p>
                  <div className="flex lg:flex-row-reverse flex-row justify-center lg:justify-start">
                  <button className="text-xl mt-10 btn lg:w-[35%] w-[80%] py-3 px-2 ">Explore Categories Now</button>
                  </div>
                    
                </div>

            </header>

        </div>

    
    
    </>
  )
}

export default Homepage
