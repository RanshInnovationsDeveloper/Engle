import { useNavigate } from "react-router-dom"
import Footer from "./Footer"

function Homepage() {
  return (
    <div className="container">
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
      <div className="text-black lg:p-10 p-5 lg:mx-12 flex flex-col">
        <div className="flex-grow flex flex-col lg:mt-[5rem] mt-3">
          <h1 className="text-[2.5rem]  mb-[3.5rem] font-bold">What's Unique About Us?</h1>
          <div className="flex-grow flex lg:flex-row flex-col justify-center items-center gap-[6rem]">
            <p className="lg:w-[45%] lg:h-[45%] w[100%] h-[100%] lg:text-left text-lg leading-8 tracking-wide"> Techish offers an exhilarating approach to learning English, incorporating gamified elements for easy comprehension. Our platform features 'Learn with Stories,' allowing you to read your favorite narratives, bookmark challenging or preferred words, and search for meanings or create personalized definitions. Explore the 'Learn with Friends' option for an enjoyable group learning experience. Dive into 'Learn with Context' to enhance your understanding. Plus, our innovative flashcards feature presents random words for self-assessment, helping you track your progress effortlessly.</p>
            <img className="lg:w-[35%] lg:h-[35%] w-[100%] h-[100%]  " src="home_2_img.png" alt="home_2_image" />
          </div>
        </div>

        <div className="flex-grow flex flex-col lg:mt-[6rem] mt-3">
          <h1 className="text-[2.5rem]  font-bold mb-[3.5rem]">Flashcards</h1>
          <div className="flex-grow flex lg:flex-row flex-col-reverse justify-center items-center gap-[6rem]">
          <img className="lg:w-[30%] lg:h-[30%] w-[90%] h-[90%]  " src="home_3_img.png" alt="home_3_image" />
            <p className="lg:w-[45%] lg:h-[45%] w[100%] h-[100%] text-lg leading-8 tracking-wide"> Explore the engaging world of learning with Techish's innovative flashcards feature. Immerse yourself in a dynamic experience as random words are presented for your consideration. This interactive tool not only challenges your vocabulary but also allows you to assess your knowledge instantly. Whether you're familiar with the words or encountering them for the first time, Techish's flashcards provide a fun and effective way to reinforce your English language skills. Elevate your learning journey with this dynamic and personalized approach to mastering new words effortlessly.</p>
           
          </div>
        </div>

        <div className="flex-grow flex flex-col lg:mt-[6rem] mt-3">
          <h1 className="text-[2.5rem]  font-bold mb-[1rem]">Learn with Stories</h1>
          <div className="flex-grow flex lg:flex-row flex-col justify-center items-center gap-[6rem]">
            <p className="lg:w-[45%] lg:h-[45%] w[100%] h-[100%]  text-lg leading-8 tracking-wide"> Discover the immersive world of learning with Techish through our captivating 'Learn with Stories' feature. Dive into your favorite narratives while effortlessly enhancing your English skills. With the ability to bookmark challenging or preferred words, you can further enrich your vocabulary. Explore the depths of storytelling and seamlessly integrate language learning into your reading experience. Whether you're unraveling gripping tales or exploring imaginative adventures, Techish makes language acquisition an engaging and enjoyable journey.</p>
            <img className="lg:w-[35%] lg:h-[35%] w-[90%] h-[90%]  " src="home_4_img.png" alt="home_4_image" />
          </div>
        </div>
        <div className="flex-grow flex flex-col lg:mt-[6rem] mt-3">
          <h1 className="text-[2.5rem]  font-bold mb-[3.5rem]">Learn with Friends</h1>
          <div className="flex-grow flex lg:flex-row flex-col-reverse justify-center items-center gap-[6rem]">
          <img className="lg:w-[35%] lg:h-[35%] w-[90%] h-[90%]  " src="home_5_img.png" alt="home_5_image" />
            <p className="lg:w-[45%] lg:h-[45%] w[100%] h-[100%]  text-lg leading-8 tracking-wide"> Experience the joy of collaborative learning with Techish's 'Learn with Friends' feature. Connect with peers and turn your English learning journey into a social and enjoyable experience. Engage in interactive sessions, share insights, and reinforce your language skills while having fun with friends. With Techish, language learning becomes a shared adventure, fostering a supportive community of learners.</p>
            
          </div>
        </div>
        <div className="flex-grow flex flex-col lg:mt-[6rem] mt-3">
          <h1 className="text-[2.5rem] font-bold mb-[3.5rem]">Ambiguous Words</h1>
          <div className="flex-grow flex lg:flex-row flex-col justify-center items-center gap-[6rem]">
            <p className="lg:w-[45%] lg:h-[45%] w[100%] h-[100%]  text-lg leading-8 tracking-wide"> Embark on a unique language-learning journey with Techish, where mastering English goes beyond conventional methods. Our platform introduces an engaging way to tackle ambiguous words through features like 'Learn with Stories.' Dive into your favorite narratives, bookmark challenging or favorite words, and explore their meanings. With the 'Learn with Friends' option, turn language acquisition into a social experience, making the process both educational and enjoyable. Delve into the 'Learn with Context' feature, providing a nuanced understanding of words in real-life scenarios. Additionally, our interactive flashcards challenge you with random words, refining your skills by identifying and clarifying ambiguous terms. Experience the thrill of decoding language intricacies at Techish!</p>
            <img className="lg:w-[35%] lg:h-[35%] w-[90%] h-[90%]  " src="home_6_img.png" alt="home_6_image" />
          </div>
        </div>
        <div className="flex flex-row justify-center my-[5rem] ">
              <button className="text-xl  btn lg:w-[28%] w-[70%] py-2 px-3 ">Start Learning Now -&gt;</button>
            </div>
      </div>

   <Footer/>

    </div>
  )
}

export default Homepage
