/* ==========================================================================
  Componente CategoryContext.jsx
  Descripción: Contexto exclusivo para categorías de productos.
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Creacion del contexto de Categorias
const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);

  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    // Petición de categorías
    //  (API / Firebase / JSON local)
    fetch('/data/products.json')

    fetch('/data/categories.json')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        setErrorCategories(err.message);
        setLoadingCategories(false);
      });
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loadingCategories, errorCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCategories() {
  return useContext(CategoryContext);
}