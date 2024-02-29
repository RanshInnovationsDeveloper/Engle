import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../slices/authSlice";
function AboutUspage() {

  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.auth);
  dispatch(setHeader(3));


  return (
    <div>
      
    </div>
  )
}

export default AboutUspage
