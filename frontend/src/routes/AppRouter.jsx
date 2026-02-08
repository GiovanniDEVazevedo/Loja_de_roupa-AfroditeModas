import { Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import PrivateRoute from "./privateRoutes.jsx"

import Login from "../pages/login.jsx";
import Catalogo from "../pages/catalogo.jsx";
import Carrinho from "../pages/carrinho.jsx";
import Checkout from "../pages/checkout.jsx";

import Admin from "../pages/admins/Admin.jsx";
import Produtos from "../pages/admins/AdicionarProdutos.jsx";
import Categorias from "../pages/admins/AddCategorias.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Catalogo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carrinho" element={<Carrinho />} />

      {/* Protegida por login */}
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />

      {/* Protegidas por admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/produtos"
        element={
          <AdminRoute>
            <Produtos />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categorias"
        element={
          <AdminRoute>
            <Categorias />
          </AdminRoute>
        }
      />
    </Routes>
  );
}