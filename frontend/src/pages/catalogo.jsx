import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Catalogo() {
    const [produtos, setProduto] = useState([])
    const [loading, setLoading] = useState(true)
    const {addtocart}= useCart()
    useEffect(() => {
        async function CarregarProdutos() {
            try {
                const resposta = await fetch("http://localhost:3001/produtos")
                const dados = await resposta.json()
                setProduto(dados)
            } catch(error) {
              console.log("erro ao carregar produto", error)  
            } finally {
                setLoading(false)
            }
        }
        CarregarProdutos()
    }, [])
    if (loading) return <p> carregando.....</p>
    return (
        <div>
            <h1>Catalogo</h1>
            <div className="cardFromProduct">
                {produtos.map(prod => (
                    <div key={prod.id}>
                        <img src={prod.imagem_url} alt={prod.nome} />
                        <h3>{prod.nome}</h3>
                        <p>{prod.descricao}</p>
                        <strong>R${prod.preco}</strong>
                        <button onClick={addtocart}>adicionar em carrinho</button>
                     </div>
                 ))}
            </div>
        </div>
    )
}