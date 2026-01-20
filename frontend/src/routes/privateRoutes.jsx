// src/routes/PrivateRoute.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";


export default function PrivateRoute({ children }) {
  const { isAutenticado, loading } = UseAuth();
  if (loading) {
    return (
      <div>
        <p>Verificando sessão...</p>
    </div>
  )
}
  if (!isAutenticado) {
    return <Navigate to="/login" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
