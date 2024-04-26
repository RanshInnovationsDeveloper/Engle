import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import '../styles/Footer.css'
export default function Footer() {
    return (
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