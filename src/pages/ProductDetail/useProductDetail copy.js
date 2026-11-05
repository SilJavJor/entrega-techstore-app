/* ==========================================================================
  Hook: useProductDetail.js
  Descripción: Encapsula la búsqueda del producto por ID, el contador de 
    cantidad a comprar y la interacción con el carrito de compras.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/Products/ProductsContext';
import { useCart } from '../../context/Cart/CartContext';

export function useProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  // Búsqueda del producto en el catálogo por ID
  const product = products
    ? products.find((p) => String(p.id) === String(id))
    : null;

  const increase = () => {
    if (product && cantidad < product.stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, cantidad);
      setAdded(true);
    }
  };

  return {
    product,
    loading,
    cantidad,
    added,
    increase,
    decrement,
    handleAddToCart
  };
}