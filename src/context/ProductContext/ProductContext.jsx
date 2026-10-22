/* ==========================================================================
  Componente ProductContext.jsx
  Descripción: Contexto exclusivo para productos del catálogo.
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Creacion del contexto de Productos
const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    // Petición de productos
    //  (API / Firebase / JSON local)
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((err) => {
        setErrorProducts(err.message);
        setLoadingProducts(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadingProducts, errorProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  return useContext(ProductContext);
}