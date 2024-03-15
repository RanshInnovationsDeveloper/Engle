// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function OpenRoute({ children }) {
    const { authUserId } = useSelector((state) => state.auth)

    if (authUserId === null)
        return children
    else
        return <Navigate to="/" />        // baad mai is route ko profile vale route se change karna "/Profile"


}

export default OpenRoute
