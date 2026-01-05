import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function AdminRoute({ children }){
    const { isAutenticado, isAdmin } = UseAuth()
    if (!isAutenticado) {
        return <Navigate to= "/login" replace/>
    }
    if (!isAdmin) {
        return <Navigate to="/" replace/>
    }
return children
}