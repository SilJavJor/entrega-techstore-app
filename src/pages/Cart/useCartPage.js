/* ==========================================================================
  Hook: useCartPage.js
  Descripción: Encapsula las acciones de incremento, reducción parcial de
    unidades, eliminación completa y vaciado del carrito para CartPage.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

/* ==========================================================================
  Hook: useCartPage.js
  Descripción: Encapsula las acciones de incremento, reducción de unidades,
    eliminación completa, vaciado y confirmación de compra en modal.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/Cart/CartContext';

export function useCartPage() {
  const navigate = useNavigate();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice
  } = useCart();

  // Suma 1 unidad respetando el stock disponible
  const handleIncreaseOne = (item) => {
    const maxStock = item.stock ?? Infinity;

    if (item.quantity < maxStock) {
      addToCart(item, 1);
    }
  };

  // Resta 1 unidad
  const handleDecreaseOne = (itemId) => {
    decreaseQuantity(itemId, 1);
  };

  // Elimina todas las unidades del ítem
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Dispara el modal de confirmación de compra
  const handleCheckout = () => {
    if (cart.length > 0) {
      setIsCheckoutModalOpen(true);
    }
  };

  // Cierra el modal, vacía el carrito y vuelve al catálogo
  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    clearCart();
    navigate('/products');
  };

  return {
    cart,
    isEmpty: cart.length === 0,
    totalQuantity,
    totalPrice,
    isCheckoutModalOpen,
    handleIncreaseOne,
    handleDecreaseOne,
    handleRemoveItem,
    clearCart,
    handleCheckout,
    handleCloseCheckoutModal
  };
}