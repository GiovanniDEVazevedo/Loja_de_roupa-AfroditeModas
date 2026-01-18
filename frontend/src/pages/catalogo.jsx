import { useEffect, useState } from "react";
import { UseCart } from "../context/CartContext";

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = UseCart();

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch("https://loja-de-roupa-afroditemodas-backend.onrender.com/produtos/listar");
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Catálogo</h1>

      <div className="cardFromProduct">
        {produtos.map((prod) => (
          <div key={prod.id}>
            <img
              src={`https://loja-de-roupa-afroditemodas-backend.onrender.com${prod.imagem_url}`}
              alt={prod.nome}
            />
            <h3>{prod.nome}</h3>
            <p>{prod.descricao}</p>
            <strong>R$ {prod.preco}</strong>

            <button onClick={() => addToCart(prod.id)}>
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}