import Header from "../components/Header";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { contactEndpoints } from "../services/apis";

const { CONTACT_API } = contactEndpoints;

function ContactUspage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [button, setButton] = useState("Contact Us");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && message && subject && email) {
      try {
        setButton("Sending...");
        const response = await apiConnector("POST", CONTACT_API, {
          name,
          message,
          subject,
          email,
        });
        setButton("Contact Us");
        setSuccessMessage(response?.data?.message);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
        setName("");
        setMessage("");
        setSubject("");
        setEmail("");
      } catch (error) {
        // console.log("server error:", error?.error);
        setErrorMessage("Something went wrong!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
        setButton("Contact Us");
      }
    } else {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return;
    }
  };

  return (
    <>
      <Header val={2} />
      <div className="  lg:mx-2 mx-8 flex flex-col justify-center items-center lg:mt-10 mt-24 ">
      <div className="flex lg:flex-row flex-col justify-evenly lg:gap-0 md:gap-14 items-center ">
        <div className=" hidden md:block  ">
        <img
           src="ContactUs.png"
            alt="contactUs"
            
        />
        </div>
        <div className=" flex  items-center justify-center lg:w-[35%] md:w-2/3 w-full">
          <form className="border border-[#5B7ADE] rounded-2xl  bg-[#34468A]  shadow-md p-6">
            <h1 className="text-white text-3xl mb-5">Contact Us!</h1>
            <input
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#F4F6FC]  rounded-xl w-full  py-4 px-3 text-gray-700 leading-tight  mb-4"
            />
            <input
              required
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#F4F6FC] shadow appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <input
              required
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-[#F4F6FC] shadow appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <textarea
              required
              value={message}
              placeholder="How can we help?"
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#F4F6FC] shadow appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 h-32"
            />
            <button
              className="btn rounded-xl w-full p-2"
              type="submit"
              onClick={handleSubmit}
              disabled={(button==="Sending...")?true:false}
            >
              {button}
            </button>
          </form>
        </div>
        <div className="absolute top-20 right-0 m-6">
          {errorMessage && (
            <div className="text-white bg-red-500 mb-4 p-2 border border-red-500 rounded">
              <p>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="text-white bg-green-500 p-2 border border-green-500 rounded">
              {successMessage && <p>{successMessage}</p>}
            </div>
          )}
        </div>
      </div>
      </div>
      
      
    </>
  );
}

export default ContactUspage;
