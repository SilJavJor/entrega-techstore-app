/* ==========================================================================
  Hook: useProductList.js
  Descripción: Encapsula la lógica de verificación, procesamiento y mapeo
    seguro del listado de productos para la grilla.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useMemo } from 'react';

export function useProductList(products = []) {
  // Array válido
  const safeProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  const hasProducts = safeProducts.length > 0;

  return {
    products: safeProducts,
    hasProducts
  };
}