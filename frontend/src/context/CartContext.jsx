import { createContext, useState, useContext } from "react";

const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    
    //add itens
    function AddTocart(product) {
        const exist = cart.find((item) => item.id === product.id)
        
        if (exist) {
            return setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                    )
            )
        }
        setCart([...cart, { ...product, quantidade:1}])
    }
    //deletar item
    function removeFromCart(id) {
        setCart(cart.filter((item)=> item.id !== id))
    }
    //limpar selecao
    function clearCart() {
        setCart([])
    }
    return (
        <CartContext.Provider value={{ cart, AddTocart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
        return useContext(CartContext)
    }
    
