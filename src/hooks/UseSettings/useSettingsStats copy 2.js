/* eslint-disable react-hooks/set-state-in-effect */
/* ==========================================================================
  Hook: useSettingsStats.js
  Descripción: Audita las claves del localStorage y calcula cantidades.
========================================================================== */

// Importaciones
import { useState, useEffect } from 'react';

export const STORAGE_KEYS = {
  brands: 'techstore_brands',
  categories: 'techstore_categories',
  products: 'techstore_products',
  team: 'techstore_team',
  favorites: 'techstore_favorites',
  cart: 'techstore_cart'
};

export function useSettingsStats() {
  const [storageStats, setStorageStats] = useState({});

  const checkStorageStats = () => {
    const stats = {};

    Object.entries(STORAGE_KEYS).forEach(([domain, key]) => {
      try {
        const item = localStorage.getItem(key);

        if (item) {
          const parsed = JSON.parse(item);

          if (Array.isArray(parsed)) {
            // Si es el carrito, sumamos la propiedad 'quantity' de cada ítem
            if (domain === 'cart') {
              stats[domain] = parsed.reduce(
                (acc, prod) => acc + (prod.quantity || 1),
                0
              );
            } else {
              stats[domain] = parsed.length;
            }
          } else {
            stats[domain] = 1;
          }
        } else {
          stats[domain] = 0;
        }
      } catch (e) {
        stats[domain] = 'Error';
      }
    });

    setStorageStats(stats);
  };

  useEffect(() => {
    checkStorageStats();
  }, []);

  return {
    storageStats,

    checkStorageStats
  };
}