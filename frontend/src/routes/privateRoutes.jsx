// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { isAutenticado } = useAuth();

  if (!isAutenticado) {
    return <Navigate to="/login" />;
  }

  return children;
}
