import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const resposta = await fetch("http://localhost:3001/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao logar");
                return;
            }

            // salvar token no localStorage
            localStorage.setItem("token", dados.token);

            alert("Login realizado!");
        } catch (error) {
            console.error("Erro no login:", error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
