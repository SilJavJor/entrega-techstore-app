/* ==========================================================================
  Hook: useProductDetail.js
  Descripción: Encapsula la búsqueda del producto por ID, el contador de 
    cantidad a comprar y la interacción con el carrito de compras.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
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
    ? products.find((p) => String(p.id) === String(id)) : null;

  // Resolución del nombre de la marca desde el objeto de producto o desde el contexto
  const brandName = useMemo(() => {
    if (!product || !product.brand) return null;
    
    console.log('🔍 [Diagnóstico Detail] Producto cargado:', product);
    console.log('🏷️ [Diagnóstico Detail] Propiedad product.brand:', product.brand);
    console.log('📦 [Diagnóstico Detail] Contexto Brands completo:', brands);

    // Si el producto ya posee el nombre de marca en string
    if (typeof product.brand === 'string') return product.brand;

    // Si es un objeto de marca
    if (typeof product.brand === 'object' && product.brand.name) {
      return product.brand.name;
    }

    // Si product.brand guarda la ID de la marca, la buscamos en el contexto de marcas
    if (brands && Array.isArray(brands)) {
      const foundBrand = brands.find((b) => String(b.id) === String(product.brand));
      if (foundBrand) return typeof foundBrand === 'string' ? foundBrand : foundBrand.name;
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