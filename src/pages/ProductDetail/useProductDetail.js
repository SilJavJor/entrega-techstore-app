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

/* ==========================================================================
  Hook: useProductDetail.js
  Descripción: Encapsula la búsqueda del producto por ID, resuelve la marca
    vinculando id_marca con el contexto de marcas y gestiona el carrito.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
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

  // Búsqueda del producto en el catálogo por ID
  const product = products
    ? products.find((p) => String(p.id) === String(id))
    : null;

  // Resolución del nombre de la marca vinculando id_marca con el contexto
  const brandName = useMemo(() => {
    if (!product) return null;

    // Clave proveniente del producto (id_marca)
    const brandId = product.id_marca || product.idMarca || product.brand || product.marca;

    if (!brandId) return null;

    // Si ya viene como nombre de marca directo en texto
    if (typeof brandId === 'string' && isNaN(brandId)) {
      return brandId;
    }

    // Búsqueda en la lista de marcas por ID
    if (brands && Array.isArray(brands)) {
      const foundBrand = brands.find((b) => String(b.id) === String(brandId));
      if (foundBrand) {
        return foundBrand.name || foundBrand.nombre || foundBrand.slug;
      }
    }

    return null;
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