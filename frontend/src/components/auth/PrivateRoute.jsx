// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function PrivateRoute({children,path}) {

    const { authUserId } = useSelector((state) => state.auth)
    localStorage.setItem('path',path);
    
    
    if (authUserId != null)
        return children
    else
        return <Navigate to="/login" />
}

export default PrivateRoute
