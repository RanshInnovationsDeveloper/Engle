import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../slices/authSlice";
import { demosignup } from "../services/operations/apiDemo";

function ContactUspage() {

  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.auth);
  dispatch(setHeader(2));


  return (
    <>
      <div>
      Contact Us
    </div>
    <button onClick={demosignup}> click me to check demo api</button>
    </>
  
  )
}

export default ContactUspage
