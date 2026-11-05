/* ==========================================================================
  Hook: useProductCard.js
  Descripción: Encapsula la interacción individual de la tarjeta de producto,
    el estado de favorito y la adición rápida al carrito.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/Cart/CartContext';

export function useProductCard(product) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const { addToCart } = useCart();

  const isFavoriteProduct = product ? isFavorite(product.id) : false;

  const stock = product?.stock ?? product?.stockDisponible ?? 0;

  const handleFavoriteClick = (e) => {
    e.preventDefault();

    e.stopPropagation();

    if (product) {
      toggleFavorite(product.id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    e.stopPropagation();

    if (stock > 0 && addToCart && product) {
      addToCart(product, 1);
    }
  };

  return {
    isFavoriteProduct,
    stock,
    handleFavoriteClick,
    handleAddToCart
  };
}