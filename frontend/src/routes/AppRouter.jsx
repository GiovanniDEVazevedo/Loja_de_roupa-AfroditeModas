import {  Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";

import Login from "../pages/login.jsx";
import Catalogo from "../pages/catalogo.jsx";
import Admin from "../pages/admins/Admin.jsx";
import Produtos from "../pages/admins/AdicionarProdutos.jsx"
import Categorias from "../pages/admins/AddCategorias.jsx"
import { CartProvider } from "../context/CartContext.jsx";


export default function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <CartProvider>
<Catalogo />
        </CartProvider>
        
      } />
        

        {/* Rotas protegidas */}
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
            <Produtos/>
        }
      />
      <Route
        path="/admin/categorias"
        element={
          <Categorias/>
        }
      />

       
      </Routes>
  
  );
}