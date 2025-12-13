import { useState } from "react";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleCadastro(e) {
        e.preventDefault();

        try {
            const resposta = await fetch("http://localhost:3001/usuarios/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao cadastrar");
                return;
            }

            alert("Cadastro realizado!");
        } catch (error) {
            console.error("Erro no cadastro:", error);
        }
    }

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleCadastro}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

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

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
