/* ==========================================================================
  Hook: useCartModal.js
  Descripción: Gestiona el estado de apertura/cierre del modal de confirmación,
    los datos del producto recién agregado y los totales calculados del carrito.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
========================================================================== */

// Importaciones
import { useState, useCallback } from 'react';

// Contexto
import { useCart } from '../../../context/Cart/CartContext';

export function useCartSummary() {
  const [isOpen, setIsOpen] = useState(false);

  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  // Consumo centralizado desde el CartContext
  const { cart, totalItems, totalPrice, addToCart } = useCart();

  // Función para agregar al carrito y disparar la apertura del modal
  const openModalWithProduct = useCallback((product, quantity = 1) => {
    if (product && addToCart) {
      addToCart(product, quantity);

      setLastAddedProduct({
        ...product,
        addedQuantity: quantity
      });
      setIsOpen(true);
    }
  }, [addToCart]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    lastAddedProduct,
    cart,
    totalItems: totalItems ?? cart?.reduce((acc, item) => acc + (item.quantity || 1), 0),
    totalPrice: totalPrice ?? cart?.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
    openModalWithProduct,
    closeModal
  };
}