/* ==========================================================================
  Hook: useSettingsClean.js
  Descripción: Maneja exclusivamente la lógica de selección y limpieza selectiva.
========================================================================== */

// Imprtaciones
import { useState } from 'react';

// Contextos
// import { useBrands } from '../../context/Brands/Brands';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { useProducts } from '../../context/Products/ProductsContext';
import { useTeam } from '../../context/Teams/TeamsContext';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/CartContext/CartContext';

//
import { STORAGE_KEYS } from './useSettingsStats';

export function useSettingsClean(onSuccess, setModalConfig) {
  // const { clearBrands } = useBrands();
  const { clearCategories } = useCategories();
  const { clearProducts } = useProducts();
  const { clearTeams } = useTeam();
  const { clearFavorites } = useFavorites();
  const { clearCart } = useCart();

  const domainCleaners = {
    // brands: clearBrands,
    categories: clearCategories,
    products: clearProducts,
    team: clearTeams,
    favorites: clearFavorites,
    cart: clearCart
  };

  const [selectedCleanKeys, setSelectedCleanKeys] = useState({
    brands: false,
    categories: false,
    products: false,
    team: false,
    favorites: false,
    cart: false
  });

  const handleCleanCheck = (e) => {
    const { name, checked } = e.target;

    setSelectedCleanKeys((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectAllClean = (value) => {
    setSelectedCleanKeys({
      brands: value,
      categories: value,
      products: value,
      team: value,
      favorites: value,
      cart: value
    });
  };

  const handleExecuteClean = () => {
    const keysToClean = Object.keys(selectedCleanKeys).filter(
      (domain) => selectedCleanKeys[domain]
    );

    if (keysToClean.length === 0) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'Por favor, seleccioná al menos una sección para limpiar.'
      });
      return;
    }

    keysToClean.forEach((domain) => {
      if (domainCleaners[domain]) {
        domainCleaners[domain]();
      } else {
        const key = STORAGE_KEYS[domain];

        if (key) localStorage.removeItem(key);
      }
    });

    // Desmarca los checkboxes
    setSelectedCleanKeys({
      brands: false,
      products: false,
      categories: false,
      team: false,
      favorites: false,
      cart: false
    });

    // Actualiza estadísticas
    if (onSuccess) onSuccess();

    setModalConfig({
      show: true,
      title: '¡ Limpieza Completada !',
      message: `Se eliminaron correctamente las secciones seleccionadas: ${keysToClean.join(', ')}.`
    });
  };

  return {
    selectedCleanKeys,
    handleCleanCheck,
    handleSelectAllClean,
    handleExecuteClean
  };
}