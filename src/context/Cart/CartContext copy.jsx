/* eslint-disable react-refresh/only-export-components */
/* ==========================================================================
  Componente CartContext.jsx
  Descripcion:  
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

/* ==========================================================================
  Componente CartContext.jsx
  Descripción: Contexto para la gestión del carrito de compras con persistencia
    en localStorage.
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
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }

  return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  // 1. Inicialización perezosa leyendo localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('techstore_cart');

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Error al leer el carrito desde localStorage:', e);
      return [];
    }
  });

  // Sincronización automática de cada cambio de 'cart' hacia localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techstore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar el carrito en localStorage:', e);
    }
  }, [cart]);

  // Agregar un producto al carrito
  {/*
  const addToCart = (product, quantity) => {
    const existingIndex = cart.findIndex((prod) => prod.id === product.id);

    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };
  */}
  // Agregar un producto al carrito (versión inmutable)
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((prod) => prod.id === product.id);

      if (existingIndex !== -1) {
        // Retornamos un nuevo arreglo clonando también el objeto modificado
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Si es nuevo, lo agregamos al final
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Eliminar un producto
  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  // Vaciar / Limpiar el carrito
  const clearCart = () => {
    // Vaciar Favoritos
    setCart([]);

    localStorage.setItem('techstore_cart', JSON.stringify([]));
  };

  // Totales
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);

  const totalPrice = cart.reduce((acc, product) => acc + (product.price || 0) * product.quantity, 0);

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