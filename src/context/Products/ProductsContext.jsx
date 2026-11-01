/* eslint-disable react-hooks/set-state-in-effect */
/* ==========================================================================
  Componente ProductContext.jsx
  Descripción: Sub-contexto independiente para el catálogo de productos
    con operaciones CRUD completas y persistencia local.
  Autor: Silvio Jorda
  Date: 2026-10-09
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Creacion del Contexto de Productos
const ProductsContext = createContext();

// Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }

  return context;
};

// Proveedor del contexto
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('techstore_products');

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));

        setLoadingProducts(false);

        return;
      } catch (e) {
        console.error('Error al parsear productos de localStorage:', e);
      }
    }

    // Lectura del archivo
    fetch('/data/products/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar la lista de productos');

        return res.json();
      })
      .then((data) => {
        setProducts(data);

        localStorage.setItem('techstore_products', JSON.stringify(data));

        setLoadingProducts(false);
      })
      .catch((err) => {
        setErrorProducts(err.message);

        setLoadingProducts(false);
      });
  }, []);

  const saveProductsLocally = (updatedList) => {
    setProducts(updatedList);

    localStorage.setItem('techstore_products', JSON.stringify(updatedList));
  };

  const getNextProductId = () => {
    if (!products || products.length === 0) return '1';

    const numericIds = products.map((p) => Number(p.id)).filter((id) => !isNaN(id));

    return String(numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1);
  };

  // Create / Creacion
  const addProduct = (newProductData) => {
    const nextId = getNextProductId();

    const completeProduct = { id: nextId, ...newProductData };

    const updated = [completeProduct, ...products];

    saveProductsLocally(updated);

    return completeProduct;
  };

  // Update / Modificacion
  const updateProduct = (id, updatedData) => {
    const updated = products.map((product) =>
      String(product.id) === String(id) ? { ...product, ...updatedData } : product
    );

    saveProductsLocally(updated);

    return { success: true };
  };

  // Delete / Eliminacion
  const deleteProduct = (id) => {
    const updated = products.filter((p) => String(p.id) !== String(id));

    saveProductsLocally(updated);

    return { success: true };
  };

  // Limpiar LocalStorage
  const clearProducts = () => {
    setProducts([]);

    // localStorage.removeItem('techstore_products');
    localStorage.setItem('techstore_products', JSON.stringify([]));
  };

  // Reestablecer LocalStorage
  const resetProducts = (newList) => {
    saveProductsLocally(newList);
  };

return (
    <ProductsContext.Provider
      value={{
        products,
        loadingProducts,
        errorProducts,
        getNextProductId,
        addProduct,
        updateProduct,
        deleteProduct,
        clearProducts,
        resetProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};