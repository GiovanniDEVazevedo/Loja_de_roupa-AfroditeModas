import { useCart } from "../context/CartContext";

export default function productCart({ produto }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { addToCart } = useCart()
    return (
        <div className="produto">
            <img src="{produto.imagem}" alt="{produto.nome}" />
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco}</p>
            
            <button onClick={prev => addToCart(prev, produto)}>adicionar ao carrinho</button>
        </div>
    )
}