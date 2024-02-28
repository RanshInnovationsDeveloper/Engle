import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../slices/authSlice";
function ContactUspage() {

  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.auth);
  dispatch(setHeader(2));


  return (
    <div>
      Contact Us
    </div>
  )
}

export default ContactUspage
