/* ==========================================================================
  Hook: useProductDetail.js
  Descripción: Encapsula la búsqueda del producto por ID, el contador de 
    cantidad a comprar y la interacción con el carrito de compras.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
/* ==========================================================================
  Hook: useProductDetail.js (Con Logs de Diagnóstico)
========================================================================== */

import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/Products/ProductsContext';
import { useBrands } from '../../context/Brands/BrandsContext';
import { useCart } from '../../context/Cart/CartContext';

export function useProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { brands } = useBrands();
  const { addToCart } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  // Búsqueda del producto por ID
  const product = products
    ? products.find((p) => String(p.id) === String(id))
    : null;

  // Resolución diagnóstica de la Marca
  const brandName = useMemo(() => {
    if (!product) return null;

    // --- LOGS DE DIAGNÓSTICO PARA CONSOLA ---
    console.log('🔍 [Diagnóstico Detail] Producto cargado:', product);
    console.log('🏷️ [Diagnóstico Detail] Propiedad product.brand:', product.brand);
    console.log('📦 [Diagnóstico Detail] Contexto Brands completo:', brands);

    // 1. Si la propiedad brand no existe o viene vacía
    if (!product.brand) {
      return 'MARCA_VACIA'; // Tag para identificar en pantalla que la propiedad no existe
    }

    // 2. Si ya viene directamente como un String (ej: "LG")
    if (typeof product.brand === 'string') {
      return product.brand;
    }

    // 3. Si viene como Objeto (ej: { id: 1, name: "LG" })
    if (typeof product.brand === 'object' && product.brand.name) {
      return product.brand.name;
    }

    // 4. Si guarda un ID numérico/string y hay que buscarlo en el contexto de marcas
    if (brands && Array.isArray(brands)) {
      const foundBrand = brands.find(
        (b) => String(b.id) === String(product.brand) || String(b.name) === String(product.brand)
      );
      if (foundBrand) {
        return typeof foundBrand === 'string' ? foundBrand : foundBrand.name;
      }
    }

    return `ID_MARCA_NO_ENCONTRADA (${product.brand})`;
  }, [product, brands]);

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
    brandName,
    loading,
    cantidad,
    added,
    increase,
    decrement,
    handleAddToCart
  };
}