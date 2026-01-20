import { UseCart } from "../context/CartContext";
import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = UseCart();
  const { isAutenticado } = UseAuth();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (!isAutenticado) {
      navigate("/login");
      return;
    }

    async function carregarProdutos() {
      const res = await fetch("http://localhost:3001/produtos/listar");
      const dados = await res.json();
      setProdutos(dados);
    }

    carregarProdutos();
  }, [isAutenticado, navigate]);

  const itensDetalhados = cart.map((item) => {
    const produto = produtos.find((p) => p.id === item.produtoId);
    return {
      ...item,
      produto,
      subtotal: produto?.preco * item.quantidade || 0,
    };
  });

  const total = itensDetalhados.reduce((acc, item) => acc + item.subtotal, 0);

  function finalizarWhatsApp() {
    const mensagem = itensDetalhados
      .map(
        (item) =>
          `${item.produto.nome} - ${item.quantidade}x - R$ ${item.produto.preco}`
      )
      .join("\n");

    const texto = `Olá! Quero finalizar a compra:\n\n${mensagem}\n\nTotal: R$ ${total}`;

    window.open(
      `https://wa.me/55094?text=${encodeURIComponent(texto)}`,
      "_blank"
    );

    clearCart();
    navigate("/");
  }

  if (cart.length === 0) return <h2>Carrinho vazio</h2>;

  return (
    <div>
      <h1>Checkout</h1>

      {itensDetalhados.map((item) => (
        <p key={item.produtoId}>
          {item.produto.nome} — {item.quantidade}x
        </p>
      ))}

      <h3>Total: R$ {total}</h3>

      <button onClick={finalizarWhatsApp}>
        Finalizar pelo WhatsApp
      </button>
    </div>
  );
}
