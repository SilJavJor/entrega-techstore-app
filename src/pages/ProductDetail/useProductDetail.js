/* ==========================================================================
  Hook: useProductDetail.js
  Descripción: Encapsula la búsqueda del producto por ID, el contador de 
    cantidad a comprar y la interacción con el carrito de compras.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
/* ==========================================================================
  Hook: useProductDetail.js
  Descripción: Encapsula la búsqueda del producto por ID, la resolución de su
    marca, el contador de cantidad y la apertura del Offcanvas del carrito.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Contextos
import { useProducts } from '../../context/Products/ProductsContext';
import { useBrands } from '../../context/Brands/BrandsContext';

// 
import { useCartSummary } from '../../pages/Modal/CartSummary/useCartSummary';

export function useProductDetail() {
  const { id } = useParams();

  const { products, loading } = useProducts();

  const { brands } = useBrands();

  // Integración con el hook del Offcanvas (ajusta la ruta si lo ubicaste en otra carpeta)
  const {
    isOpen,
    lastAddedProduct,
    cart,
    totalItems,
    totalPrice,
    openModalWithProduct,
    closeModal
  } = useCartSummary();

  const [cantidad, setCantidad] = useState(1);

  // Búsqueda del producto en el catálogo por ID[cite: 11]
  const product = products
    ? products.find((p) => String(p.id) === String(id))
    : null;

  // Resolución del nombre de la marca vinculando id_marca con el contexto[cite: 11]
  const brandName = useMemo(() => {
    if (!product) return null;

    const brandId = product.id_marca || product.idMarca || product.brand || product.marca;

    if (!brandId) return null;

    if (typeof brandId === 'string' && isNaN(brandId)) {
      return brandId;
    }

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

  // Agrega la cantidad seleccionada al carrito y despliega el Offcanvas
  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      openModalWithProduct(product, cantidad);
    }
  };

  return {
    product,
    brandName,
    loading,
    cantidad,
    increase,
    decrement,
    handleAddToCart,
    isOpen,
    closeModal,
    lastAddedProduct,
    cart,
    totalItems,
    totalPrice
  };
}