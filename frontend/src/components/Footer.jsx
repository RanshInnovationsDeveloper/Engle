import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
    return (



        <footer className="bg-black relative bottom-0 w-full">
            <div className="md:m-2 max-w-screen-3xl mx-40 my-20 w-full justify-center items-center">
                <div className="md:flex sm-gap-6 gap-80">
                    <div className="flex items-center">
                        <div className="grid grid-cols-2 gap-2 sm:gap-40 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-2xl  text-gray-900 dark:text-white">Company</h2>
                                <ul className="text-gray-500  font-medium">
                                    <li className="mb-3 text-white">
                                        <Link to="/" className="hover:underline">About us</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="/" className="hover:underline">Why Choose Us</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="/" className="hover:underline">Pricing</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="/" className="hover:underline">Testimonial</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-2xl text-gray-900 dark:text-white">Resouces</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-3">
                                        <Link to="#" className="hover:underline ">Privacy Policy</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="" className="hover:underline">Terms and Conditions</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="" className="hover:underline">Blog</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="" className="hover:underline">Contact Us</Link>
                                    </li>
                                </ul>
                            </div>


                            <div>
                                <h2 className="mb-6 text-2xl text-gray-900 dark:text-white">Product</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-3">
                                        <Link to="#" className="hover:underline">Project Management</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="#" className="hover:underline">Time Tracker</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="#" className="hover:underline">Time schedule</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="#" className="hover:underline">Lead Generate</Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link to="#" className="hover:underline">Remote Collaboration</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-5xl md:flex text-white mb-9 font-semibold'>
                            Engle
                        </p>
                        <ul>
                            <li className="mb-3 text-gray-500 dark:text-gray-400 font-medium">
                                <Link to="#" className="hover:underline">Subscribe to our Newsletter</Link>
                            </li>
                            <li>
                                <div className="max-w-md mx-auto overflow-hidden relative bottom-0">
                                    <form className="max-w-md mx-auto">
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Enter Your Email</label>
                                        <div className="relative flex items-stretch">
                                            <input
                                                type="search"
                                                id="default-search"
                                                className="block w-full  px-10 py-4 text-md text-gray-900 border-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-l-lg dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter Your Email"
                                                required
                                                style={{ borderImage: 'linear-gradient(to right, #C7D800, #10B981, #2BD500 )', borderImageSlice: 1 }}
                                            />
                                            <button
                                                type="submit"
                                                className="text-white  bg-gradient-to-r from-green-600 via-green-500 to-yellow-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-md px-10 py-2 rounded-r-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Subscribe
                                            </button>
                                        </div>
                                    </form>
                                </div>


                            </li>
                        </ul>

                    </div>
                </div>

                <div className="sm:flex sm:items-center sm:justify-center gap-48 flex mt-28 mr-60">
                    <span className="text-lg text-white font-semibold lg:text-center dark:text-gray-400">Copyright @2023
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <Link to="#" className="text-white hover:text-gray-900 dark:hover:text-white">
                            <FaFacebook className='w-6 h-6' />
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        <Link to="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                            <RiTwitterXLine className='w-6 h-6' />
                            <span className="sr-only">Twitter page</span>
                        </Link>

                        <Link to="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaLinkedin className='w-6 h-6' />
                            <span className="sr-only">LinkedIn account</span>
                        </Link>


                        <Link to="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaInstagram className='w-6 h-6' />
                            <span className="sr-only">Instagram account</span>
                        </Link>

                    </div>
                </div>
            </div>
        </footer>


    )
}
