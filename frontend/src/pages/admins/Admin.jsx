import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css"

export default function Admin() {
    
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            alert("Você precisa estar logado");
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUsuario(payload);

            if (payload.cargo !== "admin") {
                alert("Apenas administradores podem acessar esta página.");
                navigate("/");
            }
        } catch (error) {
            console.log("Token inválido:", error);
            navigate("/login");
        }
    }, [navigate]);

    if (!usuario) return <p>Carregando...</p>;

    return (
        <div className="content">
            <h1>Painel Administrativo</h1>
            <p>Bem-vindo, {usuario.nome}!</p>

            <hr />
        <div className="opcoes">
            <h2>O que você deseja gerenciar?</h2>

            <ul>
                <li onClick={() => navigate("/admin/produtos")}>
                    Gerenciar Produtos
                </li>

                <li onClick={() => navigate("/admin/categorias")}>
                    Gerenciar Categorias
                </li>

                <li onClick={() => navigate("/admin/usuarios")}>
                    Gerenciar Usuários
                </li>
                </ul>
            </div>
        </div>
    );
}
