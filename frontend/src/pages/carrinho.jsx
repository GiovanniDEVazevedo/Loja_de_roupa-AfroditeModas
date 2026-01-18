import { useState } from "react";
import { UseCart } from "../context/CartContext";
import { useEffect } from "react";


export default function Carrinho() {
    const { cart, updateQuantity, removeFromCart, clearCart } = UseCart()
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const res = await fetch("https://loja-de-roupa-afroditemodas-backend.onrender.com/produtos/listar")
                const dados = await res.json()
                setProdutos(dados)
            } catch (err) {
                console.error("erro ao carregar produtos", err)
            } finally {
                setLoading(false)
            }
        }
        carregarProdutos()
    }, [])
    
    if (loading) return <p>Carregando carrinho...</p>;
    if (cart.length === 0) return <h2>Nada por aqui... seu carrinho esta vazio</h2>;
    
    const itensDetalhados = cart.map((item) => {
        const produto = produtos.find((p) => p.id === item.produtoId)
        return {
            ...item,
            produto,
            subtotal: produto.preco + item.quantidade,
        }
    })
    const total = itensDetalhados.reduce(
        (acc, item )=> acc + item.subtotal
    )
    function FinalizarWhatsApp() {
        const mensagem = itensDetalhados
            .map(
                (item) =>
                    `${item.produto.nome} - ${item.quantidade} - R$ ${item.produto.preco}` 
        )
            .join("\n")
        const texto = `Olá! Quero finalizar a compra: \n\n${mensagem}\n\nTotal: R$ ${total}`

        const url = `https://wa.me/55094992076075?text=${encodeURIComponent(texto)}`
        window.open(url, "_blank")
    }
     return (
    <div>
      <h1>Carrinho</h1>

      {itensDetalhados.map((item) => (
        <div key={item.produtoId}>
          <p>{item.produto.nome}</p>
          <p>R$ {item.produto.preco}</p>

          <div>
            <button
              onClick={() =>
                updateQuantity(item.produtoId, item.quantidade - 1)
              }
            >
              -
            </button>

            <span>{item.quantidade}</span>

            <button
              onClick={() =>
                updateQuantity(item.produtoId, item.quantidade + 1)
              }
            >
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.produtoId)}>
            Remover
          </button>
        </div>
      ))}

      <h3>Total: R$ {total}</h3>

      <button onClick={FinalizarWhatsApp}>
        Finalizar pelo WhatsApp
      </button>

      <button onClick={clearCart}>Limpar carrinho</button>
    </div>
  );
}   
    
