/* ==========================================================================
  Componente CategoryContext.jsx
  Descripción: Sub-contexto independiente para la gestión de categorías
    con carga remota vía fetch ('/data/categories/categories.json'),
    operaciones CRUD completas y persistencia en localStorage.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Creacion del Contexto de Categorias
const CategoriesContext = createContext();

// Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories debe ser usado dentro de un CategoryProvider');
  }

  return context;
};

// Proveedor del contexto
export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);

  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const savedCategories = localStorage.getItem('techstore_categories');

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));

        setLoadingCategories(false);

        return;
      } catch (e) {
        console.error('Error al parsear categorías guardadas:', e);
      }
    }

    // Lectura del archivo
    fetch('/data/categories/categories.json')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar la lista de categorias');

        return res;
      })
      .then((res) => {

        if (!res.ok) throw new Error('No se pudo encontrar el archivo de categorías');

        return res.json();
      })
      .then((data) => {
        setCategories(data);

        localStorage.setItem('techstore_categories', JSON.stringify(data));

        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error('Error cargando las categorías:', err);

        setErrorCategories(err.message);

        setLoadingCategories(false);
      });
  }, []);

  const saveCategoriesLocally = (updatedList) => {
    setCategories(updatedList);

    localStorage.setItem('techstore_categories', JSON.stringify(updatedList));
  };

  // Generación de ID correlativo
  const getNextCategoryId = () => {
    if (!categories || categories.length === 0) return '1';

    const numericIds = categories.map((c) => Number(c.id)).filter((id) => !isNaN(id));

    return String(numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1);
  };

  // CRUD: Create
  const addCategory = (newCategoryData) => {
    const nextId = getNextCategoryId();

    const newCat = { id: nextId, ...newCategoryData };

    const updated = [...categories, newCat];

    saveCategoriesLocally(updated);

    return newCat;
  };

  // CRUD: Update
  const updateCategory = (id, updatedData) => {
    const updated = categories.map((cat) =>
      String(cat.id) === String(id) ? { ...cat, ...updatedData } : cat
    );
    saveCategoriesLocally(updated);

    return { success: true };
  };

  // CRUD: Delete
  const deleteCategory = (id) => {
    const updated = categories.filter((cat) => String(cat.id) !== String(id));

    saveCategoriesLocally(updated);

    return { success: true };
  };

  // Limpiar LocalStorage
  const clearCategories = () => {
    setCategories([]);

    localStorage.removeItem('techstore_categories');
  };

  // Reestablecer LocalStorage
  const resetCategories = (newList) => {
    setCategories(newList);

    localStorage.setItem('techstore_categories', JSON.stringify(newList));
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loadingCategories,
        errorCategories,
        getNextCategoryId,
        addCategory,
        updateCategory,
        deleteCategory,
        clearCategories,
        resetCategories
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};