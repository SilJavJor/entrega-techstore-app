/* ==========================================================================
  Hook: useProductCard.js
  Descripción: Encapsula la interacción individual de la tarjeta de producto,
    el estado de favorito y la adición rápida al carrito.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
/* ==========================================================================
  Hook: useProductCard.js
  Descripción: Encapsula la lógica de interacción de ProductCard e integra
    la activación del panel desplegable Offcanvas.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
========================================================================== */

import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCartModal } from '../../pages//Modal/CartSummary/useCartSummary';

export function useProductCard(product) {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Control del panel desplegable Offcanvas
  const {
    isOpen,
    lastAddedProduct,
    cart,
    totalItems,
    totalPrice,
    openModalWithProduct,
    closeModal
  } = useCartModal();

  const isFavoriteProduct = product ? isFavorite(product.id) : false;
  
  const stock = product?.stock ?? product?.stockDisponible ?? 0;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) toggleFavorite(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (stock > 0 && product) {
      // Agrega el producto y abre el Offcanvas lateral
      openModalWithProduct(product, 1);
    }
  };

  return {
    isFavoriteProduct,
    stock,
    isOpen,
    lastAddedProduct,
    cart,
    totalItems,
    totalPrice,
    handleFavoriteClick,
    handleAddToCart,
    closeModal
  };
}