import Header from "../components/Header";
import { useState } from "react";
function ContactUspage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message || !subject) {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    if (name && message && subject) {
      window.location.href = `mailto:${String(
        process.env.REACT_APP_EMAIL
      )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        message
      )}`;
      setName("");
      setMessage("");
      setSubject("");
    }
  };

  return (
    <>
      <Header></Header>;
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <form className="w-1/3 bg-white rounded-lg shadow-md p-6">
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
            Submit
          </button>
        </form>
        <div className="text-red-500 mt-6">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}

export default ContactUspage;
