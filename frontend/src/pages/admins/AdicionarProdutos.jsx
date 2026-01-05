import { useEffect, useState } from "react";


export default function GerenciarProdutos() {
    const [nome, SetNome] = useState("")
    const [preco,SetPreco]= useState("")
    const [descricao, SetDescricao] = useState("")
    const [imagem_url, SetImagem] = useState(null)
    const [estoque, SetEstoque] = useState("")
    
    //categorias
    const token = localStorage.getItem("token")
    const [categoria, SetCategoria] = useState([])
    const [categoriaID, SetCategoriaID] = useState("")
    
    async function AddProduto(e) {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append("nome", nome)
            formData.append("descricao", descricao)
            formData.append("preco", preco)
            formData.append("estoque", estoque)
            formData.append("imagem_url", imagem_url)
            formData.append("categoria", categoriaID)
            
            const resposta = await fetch("http://localhost:3001/produtos/criar", {
                method: "POST",
                 headers:{
                "Authorization": `Bearer ${token}`
            },
                body: formData
                
            })
            const dados = await resposta.json()
            if (!resposta.ok) {
                alert(dados.erro|| "erro ao criar Produto")
            }
        }catch(error){
            console.error("erro ao criar produto", error)
            return
        }
        alert("Produto criado com sucesso!!!")
    }useEffect(() => {
        
    
    async function ListarCategoria() {
        try {
            const resposta = await fetch("http://localhost:3001/categorias", {
                method: "GET",
                    headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const dados = await resposta.json()
            SetCategoria(Array.isArray(dados)? dados : [])

        } catch(error) {
            console.error("erro ao tentar listar as categorias ", error)
        }
        }
        ListarCategoria()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 
    return (
        
        <div>
               <h1>Criar Produtos</h1>
            
            <h2>Preencha os campos</h2> 
                
                <form onSubmit={AddProduto}>
                <input
                    type="text"
                    value={nome}
                    placeholder="Nome do Produto"
                    onChange={(e) => SetNome(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Digite o valor do produto"
                        value={preco}
                        onChange={(e)=> SetPreco(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Digite a descriçâo do produto"
                        value={descricao}
                        onChange={(e)=> SetDescricao(e.target.value)}
                    />
                    <input
                        type="file"
                        placeholder="cole a url da imagem aqui"
                        accept="image/*"
                        onChange={(e)=> SetImagem(e.target.files[0])}
                    />
                    <input
                        type="number"
                        placeholder="ditite o estoque"
                        value={estoque}
                        onChange={(e)=> SetEstoque(e.target.value)}
                    />
                    <select
                        value={categoriaID}
                        onChange={(e) => SetCategoriaID(e.target.value)}
                    >
                        <option value="">selecione uma categoria</option>
                        {categoria.map((cat) => (
                            <option key={cat.id}value={cat.id}>
                                {cat.nome}
                            </option>
                        ))}
                    </select>

                    
                <button type="submit">Criar</button>
                </form>
        </div>
    )
    

    }
