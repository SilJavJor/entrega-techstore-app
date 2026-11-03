/* eslint-disable react-hooks/set-state-in-effect */
/* ==========================================================================
  Componente BrandsContext.jsx
  Descripción: Sub-contexto independiente para la gestión de marcas
    con carga remota vía fetch ('/data/brands/brands.json'),
    operaciones CRUD completas y persistencia en localStorage.
  Autor: Silvio Jorda
  Fecha: 2026-11-03
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Creación del Contexto de Marcas
const BrandsContext = createContext();

// Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export function useBrands() {
  const context = useContext(BrandsContext);

  if (!context) {
    throw new Error('useBrands debe ser usado dentro de un BrandsProvider');
  }

  return context;
}

// Proveedor del contexto
export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]);

  const [loadingBrands, setLoadingBrands] = useState(true);

  const [errorBrands, setErrorBrands] = useState(null);

  useEffect(() => {
    const savedBrands = localStorage.getItem('techstore_brands');

    if (savedBrands) {
      try {
        setBrands(JSON.parse(savedBrands));

        setLoadingBrands(false);

        return;
      } catch (e) {
        console.error('Error al parsear marcas guardadas:', e);
      }
    }

    // Lectura del archivo
    fetch('/data/brands/brands.json')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo encontrar el archivo de marcas');

        return res.json();
      })
      .then((data) => {
        setBrands(data);

        localStorage.setItem('techstore_brands', JSON.stringify(data));

        setLoadingBrands(false);
      })
      .catch((err) => {
        console.error('Error cargando las marcas:', err);

        setErrorBrands(err.message);

        setLoadingBrands(false);
      });
  }, []);

  const saveBrandsLocally = (updatedList) => {
    setBrands(updatedList);

    localStorage.setItem('techstore_brands', JSON.stringify(updatedList));
  };

  // Generación de ID correlativo
  const getNextBrandId = () => {
    if (!brands || brands.length === 0) return '1';

    const numericIds = brands.map((b) => Number(b.id)).filter((id) => !isNaN(id));

    return String(numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1);
  };

  // CRUD: Create
  const addBrand = (newBrandData) => {
    const nextId = getNextBrandId();

    const newBrand = { id: nextId, ...newBrandData };

    const updated = [...brands, newBrand];

    saveBrandsLocally(updated);

    return newBrand;
  };

  // CRUD: Update
  const updateBrand = (id, updatedData) => {
    const updated = brands.map((brand) =>
      String(brand.id) === String(id) ? { ...brand, ...updatedData } : brand
    );

    saveBrandsLocally(updated);

    return { success: true };
  };

  // CRUD: Delete
  const deleteBrand = (id) => {
    const updated = brands.filter((brand) => String(brand.id) !== String(id));

    saveBrandsLocally(updated);

    return { success: true };
  };

  // Limpiar LocalStorage (Guardando array vacío explícito para evitar re-fetch de semillas)
  const clearBrands = () => {
    setBrands([]);

    localStorage.setItem('techstore_brands', JSON.stringify([]));
  };

  // Reestablecer LocalStorage
  const resetBrands = (newList) => {
    saveBrandsLocally(newList);
  };

  return (
    <BrandsContext.Provider
      value={{
        brands,
        loadingBrands,
        errorBrands,
        getNextBrandId,
        addBrand,
        updateBrand,
        deleteBrand,
        clearBrands,
        resetBrands
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
}