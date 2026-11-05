/* ==========================================================================
  Hook: useHomePage.js
  Descripción: Encapsula la obtención de productos destacados del contexto
    de Productos y la gestión de estados para la página de inicio.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
========================================================================== */

// Importaciones
import { useMemo } from 'react';
import { useProducts } from '../../context/Products/ProductsContext';

export function useHomePage() {
  const { products, loading, error } = useProducts();

  // Selección personalizada de los primeros 4 productos del catálogo
  const featuredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products.slice(0, 4);
  }, [products]);

  return {
    featuredProducts,
    loading,
    error
  };
}