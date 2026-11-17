/* ==========================================================================
  Hook: useCartPage.js
  Descripción: Encapsula las acciones de incremento, reducción parcial de
    unidades, eliminación completa y vaciado del carrito para CartPage.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

import { useCart } from '../../context/Cart/CartContext';

export function useCartPage() {
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

  // Resta N unidades (por defecto 1, o cualquier cantidad seleccionada)
  const handleDecreaseBy = (itemId, amount = 1) => {
    decreaseQuantity(itemId, amount);
  };

  // Elimina todas las unidades del ítem
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  return {
    cart,
    isEmpty: cart.length === 0,
    totalQuantity,
    totalPrice,
    handleIncreaseOne,
    handleDecreaseBy,
    handleRemoveItem,
    clearCart
  };
}