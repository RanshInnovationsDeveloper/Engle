import Header from '../components/Header';
import { Link } from 'react-router-dom';

function SomethingwentwrongPage() {
  return (
    <>
    <div className='h-screen flex flex-col '>

    <Header/>
     <div className=" h-[83vh] flex-1 flex flex-col justify-center md:justify-end items-center ">

       <img
        src="Somethingwentwrong.png"
        alt="Something Went Wrong"
        className='mt-5 max-w-[70%] md:max-w-[40%]'
       />
      
       <footer  className="  bg-[#34468A] w-full h-full xl:h-52 ">
        <div className='lg:max-h-48 xl:max-h-96 flex flex-col items-center '>
        <h6 className="text-4xl font-semibold text-[#FFFFFF] mt-20  mb-4 font-mukta lg:mt-60 xl:mt-10  ">Sorry, something went wrong.</h6>
        <Link to="/">
        <button className="text-4xl text-[#FFFFFF]  btn py-1 px-4 mb-10 ">Go Home</button>
        </Link>      
        </div>
       </footer>

       </div>

      
    </div>
    
    </>
    
  );
}

export default SomethingwentwrongPage;
