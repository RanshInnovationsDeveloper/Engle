import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../slices/authSlice";
import CategoryHeader from "../components/CategoryHeader";
function Categorypage() {

  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.auth);
  dispatch(setHeader(1));


  return (
    <>
    <CategoryHeader/>
    </>
    
  )
}

export default Categorypage
