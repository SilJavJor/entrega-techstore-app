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
/* ==========================================================================
  Componente CartContext.jsx
  Descripción: Contexto para la gestión del carrito de compras con persistencia
    en localStorage, suma, reducción parcial y eliminación de ítems.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }

  return context;
};

export const CartProvider = ({ children }) => {
  // 1. Inicialización perezosa leyendo localStorage[cite: 13]
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('techstore_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Error al leer el carrito desde localStorage:', e);
      return [];
    }
  });

  // Sincronización automática de cada cambio de 'cart' hacia localStorage[cite: 13]
  useEffect(() => {
    try {
      localStorage.setItem('techstore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar el carrito en localStorage:', e);
    }
  }, [cart]);

  // Agregar o incrementar cantidad de un producto (inmutable)[cite: 13]
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((prod) => prod.id === product.id);

      if (existingIndex !== -1) {
        return prevCart.map((item, index) => {
          if (index !== existingIndex) return item;
          const maxStock = item.stock ?? Infinity;
          const nextQty = Math.min(item.quantity + quantity, maxStock);
          return { ...item, quantity: nextQty };
        });
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  // Restar una cantidad específica (por defecto 1, o N unidades) sin borrar todo el ítem
  const decreaseQuantity = (id, amount = 1) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id !== id) {
          acc.push(item);
          return acc;
        }

        const newQty = item.quantity - amount;
        // Si quedan unidades (> 0), conservamos el ítem actualizado; si llega a 0, se quita
        if (newQty > 0) {
          acc.push({ ...item, quantity: newQty });
        }
        return acc;
      }, [])
    );
  };

  // Eliminar un producto completo (todas sus unidades)[cite: 13]
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  // Vaciar / Limpiar el carrito[cite: 13]
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('techstore_cart', JSON.stringify([]));
  };

  // Totales[cite: 13]
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = cart.reduce((acc, product) => acc + (product.price || 0) * product.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
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