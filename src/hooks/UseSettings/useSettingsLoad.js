/* ==========================================================================
  Hook: useSettingsLoad.js
  Descripción: Maneja exclusivamente la restauración de datos semilla.
========================================================================== */

//
import { useState } from 'react';
import { useBrands } from '../../context/Brands/BrandsContext';
import { useProducts } from '../../context/Products/ProductsContext';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { useTeam } from '../../context/Teams/TeamsContext';
import { STORAGE_KEYS } from './useSettingsStats';

export function useSettingsLoad(onSuccess, setModalConfig) {
  const { resetBrands } = useBrands();  
  const { resetProducts } = useProducts();
  const { resetCategories } = useCategories();
  const { resetTeams } = useTeam();

  const domainLoaders = {
    brands: resetBrands,
    products: resetProducts,
    categories: resetCategories,
    team: resetTeams
  };

  const domainEndPoints = {
    brands: '/data/brands/brands.json',
    products: '/data/products/products.json',
    categories: '/data/categories/categories.json',
    team: '/data/team/team.json',
  };

  const [selectedLoadKeys, setSelectedLoadKeys] = useState({
    brands: false,
    categories: false,
    products: false,
    team: false
  });

  const handleLoadCheck = (e) => {
    const { name, checked } = e.target;
    setSelectedLoadKeys((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectAllLoad = (value) => {
    setSelectedLoadKeys({
      brands: value,
      categories: value,
      products: value,
      team: value,
    });
  };

  const handleExecuteLoad = async () => {
    const keysToLoad = Object.keys(selectedLoadKeys).filter(
      (domain) => selectedLoadKeys[domain]
    );

    if (keysToLoad.length === 0) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'Por favor, seleccioná al menos un dominio para cargar los datos iniciales.'
      });
      return;
    }

    try {
      for (const domain of keysToLoad) {
        const endpoint = domainEndPoints[domain];

        if (endpoint) {
          const res = await fetch(endpoint);

          if (res.ok) {
            const data = await res.json();

            if (domainLoaders[domain]) {
              domainLoaders[domain](data);
            } else {
              localStorage.setItem(STORAGE_KEYS[domain], JSON.stringify(data));
            }
          }
        }
      }

      setSelectedLoadKeys({
        brands: false,
        categories: false,
        products: false,
        team: false
      });

      if (onSuccess) onSuccess();

      setModalConfig({
        show: true,
        title: '¡ Datos Restaurados !',
        message: `Se han precargado exitosamente los datos iniciales para: ${keysToLoad.join(', ')}.`
      });
    } catch (error) {
      console.error('Error durante la restauración:', error);

      setModalConfig({
        show: true,
        title: '¡ Error al Cargar !',
        message: error.message || 'Ocurrió un error al intentar leer los archivos JSON de respaldo.'
      });
    }
  };

  return {
    selectedLoadKeys,
    handleLoadCheck,
    handleSelectAllLoad,
    handleExecuteLoad
  };
}