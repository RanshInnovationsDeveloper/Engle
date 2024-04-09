// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function OpenRoute({ children }) {
    const { authUserId } = useSelector((state) => state.auth)
    const path=localStorage.getItem('path');
    

    if (authUserId == null)
        return children
    else
        return <Navigate to={path||"/"} />  


}

export default OpenRoute
