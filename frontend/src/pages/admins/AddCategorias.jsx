import { useState } from "react";


export default function CriarCategoria() {
    const [nome, SetNome] = useState("")
    async function add(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")
        try {
            const resposta = await fetch("http://localhost:3001/categorias/criar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify({
                    nome,
                })
            })
            const dados = await resposta.json()

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao Cadastro")
                return
            }
            alert("Categoria criada com sucesso!!!")
        }catch(error){
        alert("erro")
            console.error("erro ao criar categoria", error)
    }
    } 
    return (
        <h1>Criar categoria</h1>,
        <form onSubmit={add}>
                <input
                    type="text"
                    placeholder="Digite o nome da categoria"
                    value={nome}
                    onChange={(e) => SetNome(e.target.value)}
                
                />
                <button type="submit">adicionar</button>
        </form>
    )
} 