import { useCart } from "../context/CartContext";

export default function Carrinho() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    if (cart.length === 0) {
        return <h2>Seu carrinho está vazio</h2>;
    }

    const total = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    function finalizarWhatsApp() {
        const mensagem = cart
            .map(item => `${item.nome} - ${item.quantidade}x - R$${item.preco}`)
            .join("\n");

        const texto = `Olá! Quero finalizar a compra:\n\n${mensagem}\n\nTotal: R$${total}`;

        const url = `https://wa.me/55094?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    }

    return (
        <div>
            <h1>Carrinho</h1>

            {cart.map(item => (
                <div key={item.id}>
                    <p>{item.nome}</p>
                    <p>R$ {item.preco}</p>

                    <div>
                        <button onClick={() => updateQuantity(item.id, item.quantidade - 1)}>-</button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantidade + 1)}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)}>Remover</button>
                </div>
            ))}

            <h3>Total: R$ {total}</h3>

            <button onClick={finalizarWhatsApp}>Finalizar pelo WhatsApp</button>
            <button onClick={clearCart}>Limpar carrinho</button>
        </div>
    );
}