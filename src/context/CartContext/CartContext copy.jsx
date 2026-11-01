/* ==========================================================================
  Componente CartContext.jsx
  Descripcion:  
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
//import { createContext, useState, useContext } from 'react';
import { createContext, useState, useEffect, useContext } from 'react';

// Creacion del contexto del Carrito
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }

  return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (product, quantity) => {
    const existingIndex = cart.findIndex((prod) => prod.id === product.id);

    if (existingIndex !== -1) {
      // Si ya existe, actualizamos la cantidad
      const newCart = [...cart];

      newCart[existingIndex].quantity += quantity;

      setCart(newCart);
    } else {
      // Si no existe, lo agregamos como nuevo
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Eliminar un producto
  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  // Vaciar / Limpiar
  const clearCart = () => {
    // Vaciar Favoritos
    setCart([]);

    // Vaciar LocalStorage
    localStorage.removeItem('techstore_cart');
  };

  // Obtener la cantidad total de elementos para el Widget del Navbar
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);

  // Obtener el precio total acumulado
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <CartContext.Provider

      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}

    </CartContext.Provider>
  );
};