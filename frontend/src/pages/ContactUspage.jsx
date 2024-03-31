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
        console.log("server error:", error.error);
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
      <Header />
      <div className="flex flex-row items-center justify-center h-screen bg-{#FFFFFF} mx-auto">
        <div className=" w-0 md:w-1/2 flex  items-center invisible justify-center md:visible ml-10">
        <img
           src="ContactUs.png"
            alt="contactUs"
            
        />
        </div>
        <div className="w-full p-3 px-4 md:w-1/2 flex items-center justify-center">
          <form className="border border-[#5B7ADE] rounded-2xl  bg-[#34468A] w-full sm:w-3/4 lg:w-2/3 shadow-md p-6 mx-4 sm:mx-0">
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
              disabled={(button=="Sending...")?true:false}
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
      
    </>
  );
}

export default ContactUspage;
