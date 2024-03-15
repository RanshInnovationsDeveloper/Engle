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
        console.log("server error:", error);
        setErrorMessage("Something went wrong!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
        setButton("Contact Us");
      }
    }
    else {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return;
    }
  };

  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <form className="w-full sm:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-md p-6 mx-4 sm:mx-0">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 h-32"
          />

          <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
            type="submit"
            onClick={handleSubmit}
          >
            {button}
          </button>
        </form>
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
