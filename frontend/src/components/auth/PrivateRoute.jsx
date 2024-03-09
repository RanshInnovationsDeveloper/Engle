// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function PrivateRoute({children}) {

    const { authUserId } = useSelector((state) => state.auth)
    
    
    if (authUserId !== null)
        return children
    else
        return <Navigate to="/login" />
}

export default PrivateRoute
