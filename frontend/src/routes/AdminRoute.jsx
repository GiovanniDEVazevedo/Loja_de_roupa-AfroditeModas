import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAutenticado, isAdmin, loading } = UseAuth();

  // Enquanto carrega auth, não decide nada ainda
  if (loading) {
    return <p>Carregando...</p>;
  }

  //  Não logado → login
  if (!isAutenticado) {
    return <Navigate to="/login" replace />;
  }

  //  Logado mas sem permissão → home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Passou em tudo → libera rota
  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};