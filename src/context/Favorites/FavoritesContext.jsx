/* eslint-disable react-hooks/set-state-in-effect */
/* ==========================================================================
  Componente FavoritesContext.jsx
  Descripción: Sub-contexto independiente para la gestión de productos 
    favoritos con persistencia local en localStorage.
  Autor: Silvio Jorda
  Fecha: 2026-10-23
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Cracion del contexto de Favoritos
const FavoritesContext = createContext();

// Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }

  return context;
};

// Proveedor del contexto
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Carga inicial desde localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('techstore_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error al cargar favoritos desde localStorage:', e);
      }
    }
  }, []);

  // Helper para persistir en localStorage
  const saveFavoritesLocally = (updatedList) => {
    setFavorites(updatedList);

    localStorage.setItem('techstore_favorites', JSON.stringify(updatedList));
  };

  // Comprobar si un producto está en favoritos
  const isFavorite = (productId) => {
    return favorites.some((id) => String(id) === String(productId));
  };

  // Alternar estado de favorito (Agregar / Quitar)
  const toggleFavorite = (productId) => {
    const strId = String(productId);

    if (isFavorite(strId)) {
      const updated = favorites.filter((id) => String(id) !== strId);

      saveFavoritesLocally(updated);
    } else {
      const updated = [...favorites, strId];

      saveFavoritesLocally(updated);
    }
  };

  // Vaciar / Limpiar
  const clearFavorites = () => {
    // Vaciar Favoritos
    setFavorites([]);

    // Vaciar LocalStorage
    localStorage.removeItem('techstore_favorites');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        favoritesCount: favorites.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};