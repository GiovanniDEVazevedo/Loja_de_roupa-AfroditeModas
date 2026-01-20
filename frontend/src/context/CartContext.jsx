import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // carrega carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("cart");
    if (carrinhoSalvo) {
      setCart(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // salva carrinho sempre que mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(produto) {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === produto.id);

      if (exist) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prev, { produto, quantidade: 1 }];
    });
  }

  function updateQuantity(produtoId, quantidade) {
    if (quantidade <= 0) {
      return removeFromCart(produtoId);
    }

    setCart((prev) =>
      prev.map((item) =>
        item.produtoId === produtoId
          ? { ...item, quantidade }
          : item
      )
    );
  }

  function removeFromCart(produtoId) {
    setCart((prev) =>
      prev.filter((item) => item.produtoId !== produtoId)
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function UseCart() {
  return useContext(CartContext);
}