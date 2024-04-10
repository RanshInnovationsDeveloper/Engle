import Header from '../components/Header';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
    <div className='h-screen flex flex-col '>

    <Header/>
     <div className=" flex-1 flex flex-col justify-center md:justify-end items-center mt-20 lg:mt-80 xl:mt-60 ">

       <img
        src="404error.png"
        alt="Error Encountered"
        className='mt-10 max-w-[70%] md:max-w-[40%]'
       />
      
       <footer  className="  bg-[#34468A] w-full h-full ">
        <div className='lg:max-h-48 xl:max-h-96 flex flex-col items-center '>
        <h6 className="text-4xl font-semibold text-[#FFFFFF] mt-20  mb-4 font-mukta lg:mt-60 xl:mt-20  ">Page Not Found</h6>
        <Link to="/">
        <button className="text-4xl text-[#FFFFFF]  btn py-1 px-4 mb-20 ">Go Home</button>
        </Link>      
        </div>
       </footer>

       </div>

      
    </div>
    
    </>
    
  );
}

export default ErrorPage;
