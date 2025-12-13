import { createBrowserRouter } from "react-router-dom";
import Carrinho from "../pages/carrinho"
import Catalogo from "../pages/catalogo";
import Admin from "../pages/Admin";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
const AppRoutes = createBrowserRouter([
    {
        path: "/catalogo",
        element: <Catalogo/>
    },
    {
        path: "/carrinho",
        element: <Carrinho/>
    },
    {
        path: "/admin",
        element: <Admin/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/cadastro",
        element:<Cadastro/>
    }

])
export default AppRoutes