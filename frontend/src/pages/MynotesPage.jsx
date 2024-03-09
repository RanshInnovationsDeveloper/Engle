
import { RiFilter2Line } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
export default function MynotesPage() {
//map the heading, scrollbar 
//read, unread nahi remembered and not remembered
    const myList = ['Learn with Story', 'Unseen Words', 'Unseen Words', 'Learn with Story', 'Unseen Words', 'Learn with Story', 'Unseen Words', 'Learn with Story', 'Unseen Words', ' Learn with Story', 'Learn with Story',];

    const myComponentList = myList.map((item, index) => (
        <li key={index}>{item}</li>
    ));
    const myList2 = ['Learn with Story', 'Unseen Words'];

    const myComponentList2 = myList2.map((item, index) => (
        <li key={index}>{item}</li>
    ));
    return (
        <>
        <Header/>
        <CategoryHeader/>

        <div className='mt-4'>
            <div className='flex justify-between mx-28 mb-6'>
                <h1 className='font-bold text-3xl'>
                    My Notes
                </h1>
                <div>
                <div className="flex max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute text-gray-600 inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                            <RiSearch2Line className='w-7 h-7' />
                        </div>
                        <input type="text" id="simple-search" className="bg-white border border-gray-700 text-black text-sm rounded-lg block w-full ps-14 p-3  " placeholder="Search" required />
                    </div>
                    <button type="submit" className="p-2 ms-2 text-lg font-medium text-gray-600 bg-white rounded-lg border border-gray-700">
                        <RiFilter2Line className='w-7 h-7' />
                    </button>
                </div>
                </div>
            </div>
            <div className='flex flex-col bg-indigo-50 shadow-lg rounded-2xl border-2 mb-10 border-indigo-300 justify-center mx-28'>
                <div>
                <h1 className='font-bold py-3 px-10 '>
                    Today - 31st January, 2024 (Wednesday)
                </h1>
                <hr className='border-t-2 border-indigo-300'/>
                <div className='list-none py-5 px-10'>
                    {myComponentList}
                </div>
                </div>
                <div>
                <hr className='border-t-2 border-indigo-300'/>
                <h1 className='font-bold py-3 px-10'>
                    Yesterday - 30th January, 2024 (Tuesday)
                </h1>
                <hr className='border-t-2 border-indigo-300'/>
                <div className='list-none py-5 px-10'>
                    {myComponentList2}
                </div>
                </div>
                <div>
            </div>
                <div class="overflow-x-hidden scrollbar" id="style-2">
                <div class="force-overflow scrollbar-custom"></div>
            </div>
            </div>
            

        </div>
        </>
        
    )
}