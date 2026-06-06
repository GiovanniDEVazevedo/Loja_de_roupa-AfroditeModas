import { useState } from "react";
import { UseAuth } from "../../context/AuthContext.jsx";
import {  useNavigate } from "react-router-dom";


function Login() {
    //pega a funcao login do AuthContext onde ele faz a verificacao
    const { login } = UseAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function Fazerlogin(e) {
        e.preventDefault()
       const usuario = await login(email, senha)
    
        if (usuario === "admin") {
            navigate("/admin")
        }
        else {
            navigate("/")
        }
    }
    return (
        <form onSubmit={Fazerlogin}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            >
            </input>
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e)=> setSenha(e.target.value)}
            ></input>
            <button type="submit">Entrar</button>
    </form>
)
}
export default Login