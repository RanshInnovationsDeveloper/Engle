import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import '../styles/Footer.css'
export default function Footer() {
    return (
        // <footer className="bg-black relative bottom-0 py-12 ">
        //     <div className=" flex flex-col justify-center items-center">
        //         <div className="flex lg:flex-row flex-col justify-center items-center  gap-40">
        //             <div className="flex lg:flex-row flex-col justify-center items-center gap-28">
        //                 <div className="flex flex-row gap-28 ">
        //                     <div>
        //                         <h2 className="mb-6 text-2xl text-white">Company</h2>
        //                         <ul className="text-white opacity-60 font-medium">
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">About us</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Why Choose Us</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Pricing</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Testimonial</a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                     <div>
        //                         <h2 className="mb-6 text-2xl text-white ">Resouces</h2>
        //                         <ul className="text-white opacity-60 font-medium">
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline ">Privacy Policy</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Terms and Conditions</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Blog</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Contact Us</a>
        //                             </li>
        //                         </ul>
        //                     </div>


        //                     <div>
        //                         <h2 className="mb-6 text-2xl text-white">Product</h2>
        //                         <ul className="text-white opacity-60 font-medium">
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Project Management</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Time Tracker</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Time schedule</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Lead Generate</a>
        //                             </li>
        //                             <li className="mb-3">
        //                                 <a href='/' className="hover:underline">Remote Collaboration</a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="px-10">
        //                 <div className="flex flex-row justify-center items-center">
        //                 <h1 className='text-5xl  text-white mb-9 font-semibold'>
        //                     Engle
        //                 </h1>
        //                 </div>

        //                 <ul>
        //                     <li className="mb-3 text-white opacity-60 font-medium">
        //                         <a href='/' className="hover:underline">Subscribe to our Newsletter</a>
        //                     </li>
        //                     <li>
        //                         <div className="flex border-gradient rounded-2xl ">
        //                             <input className="bg-black px-7 py-3 lg:w-[80%] w-[100%] rounded-l-xl" type="text" placeholder="Enter your Email" />
        //                             <button className="btn2 border-l px-6 py-4 text-white rounded-r-xl">Subscribe</button>
        //                         </div>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>

        //         <div className="sm:flex sm:items-center sm:justify-center gap-48 flex mt-28 ">
        //             <span className="text-lg text-white lg:text-center">Copyright @2023
        //             </span>
        //             <div className="flex mt-4 sm:justify-center sm:mt-0">
        //                 <a href='/' className="text-white hover:text-gray-900">
        //                     <FaFacebook className='w-6 h-6' />

        //                 </a>
        //                 <a href='/' className="text-white hover:text-gray-900 ms-5">
        //                     <RiTwitterXLine className='w-6 h-6' />

        //                 </a>

        //                 <a href='/' className="text-white hover:text-gray-900 ms-5">
        //                     <FaLinkedin className='w-6 h-6' />

        //                 </a>


        //                 <a href='/' className="text-white hover:text-gray-900 ms-5">
        //                     <FaInstagram className='w-6 h-6' />

        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
        <>
            <footer className=" bg-black relative flex justify-center">
                <div className="flex flex-col py-10 lg:mx-12 mx-6">
                    <div className="flex flex-row flex-wrap  mb-10">
                     <div className="text-white lg:px-8 px-4  m-4">
                        <h1 className="text-2xl">Company</h1>
                        <ul className="opacity-60">
                            <li className="mb-2">
                                <a href="/">About Us</a>
                            </li>
                            <li className="mb-2">
                            <a href="/">Why Choose Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="/">Pricing</a>
                                </li>
                            <li className="mb-2">
                            <a href="/">Testimonial</a>
                            </li>
                        </ul>
                     </div>
                     <div className="text-white lg:px-8 px-4  m-4">
                     <h1 className="text-2xl">Resources</h1>
                        <ul className="opacity-60 ">
                            <li className="mb-2">
                                <a href="/">Privacy Policy</a>
                            </li>
                            <li className="mb-2">
                            <a href="/">Terms and conditions</a>
                            </li>
                            <li className="mb-2">
                                <a href="/">Blog</a>
                                </li>
                            <li className="mb-2">
                            <a href="/">Contact Us</a>
                            </li>
                        </ul>
                     </div>
                     <div className="text-white lg:px-8 px-4  m-4">
                     <h1 className="text-2xl">Product</h1>
                        <ul className="opacity-60">
                            <li className="mb-2">
                                <a href="/">Project management</a>
                            </li>
                            <li className="mb-2">
                            <a href="/">Time tracker</a>
                            </li>
                            <li className="mb-2">
                                <a href="/">Time schedule</a>
                                </li>
                            <li className="mb-2">
                            <a href="/">Lead generate</a>
                            </li>
                            <li className="mb-2">
                            <a href="/">Remote Collaboration</a>
                            </li>
                        </ul>
                     </div>
                     <div className="text-white lg:px-8 px-4  m-4">
                     <h1 className="text-2xl">Contact Us</h1>
                        <ul className="">
                            <li className="mb-2 opacity-60">
                                <a href="/">Contact us in any case of help</a>
                            </li>
                            <li className="mb-2 text-white">
                            <a href="/">support@engle.com</a>
                            </li>
                        <div className='mt-3 inline-flex items-center justify-center lg:gap-8 gap-4 '>
                            <button><FaFacebook className='w-[1.5rem] h-[1.5rem] text-white' /></button>
                            <button><RiTwitterXLine className='w-[1.5rem] h-[1.5rem] text-white' /></button>
                            <button><FaLinkedin className='w-[1.5rem] h-[1.5rem] text-white' /></button>
                            <button><FaInstagram className='w-[1.5rem] h-[1.5rem] text-white' /></button>
                        </div>
                        </ul>
                     </div>
                     {/* <div className="text-white lg:pl-40 px-4 lg:pr-10  m-4 ">
                        <h1 className=" text-5xl tracking-wider mb-6 ">Engle</h1>
                        <p className="text-white opacity-60">Subscribe to our newsletter</p>
                        <div className="flex flex-row w-full  justify-center my-4 border-gradient rounded-2xl">
                            <input type="email" placeholder="Enter your email" className=" relative block w-full px-4 lg:px-7 py-4 text-white bg-black focus:outline-none rounded-2xl text-left " />
                            <button className="rounded-r-2xl lg:px-5 px-2 py-4 font-semibold">Subscribe</button>
                        </div>
                     </div> */}
                    </div>
                    <div className="flex flex-row justify-center mt-16 mb-6 lg:gap-36 gap-14">
                        <div className="flex flex-col justify-center">
                            <p className="text-white">Copyright @2023</p>
                        </div>
                        
                    </div>
                </div>

            </footer>
        </>
    )
}