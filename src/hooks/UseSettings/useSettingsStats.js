/* eslint-disable react-hooks/set-state-in-effect */
/* ==========================================================================
  Hook: useSettingsStats.js
  Descripción: Audita las claves del localStorage y calcula cantidades.
========================================================================== */

// Importaciones
/* ==========================================================================
  Hook: useSettingsStats.js
  Descripción: Audita y calcula cantidades en tiempo real desde los Contextos.
========================================================================== */

/* ==========================================================================
  Hook: useSettingsStats.js
  Descripción: Audita las cantidades en tiempo real reaccionando a los Contextos.
========================================================================== */

import { useState, useEffect } from 'react';
import { useBrands } from '../../context/Brands/BrandsContext';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { useProducts } from '../../context/Products/ProductsContext';
import { useTeam } from '../../context/Teams/TeamsContext';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/Cart/CartContext';

export const STORAGE_KEYS = {
  brands: 'techstore_brands',
  categories: 'techstore_categories',
  products: 'techstore_products',
  team: 'techstore_team',
  favorites: 'techstore_favorites',
  cart: 'techstore_cart'
};

export function useSettingsStats() {
  // Consumo de los contextos
  const { brands } = useBrands();
  const { categories } = useCategories();
  const { products } = useProducts();
  const { team } = useTeam();
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const [storageStats, setStorageStats] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkStorageStats = () => {
     // Suma real de unidades para el carrito
    const cartCount = Array.isArray(cart)
      ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
      : 0;

    // Lectura auxiliar para marcas (si no posee contexto propio)
    let brandsCount = 0;

    try {
      const savedBrands = localStorage.getItem(STORAGE_KEYS.brands);

      if (savedBrands) {
        const parsed = JSON.parse(savedBrands);
        brandsCount = Array.isArray(parsed) ? parsed.length : 1;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
        // eslint-disable-next-line no-unused-vars
        brandsCount = 0;
    }

    setStorageStats({
      brands: Array.isArray(brands) ? brands.length : 0,
      categories: Array.isArray(categories) ? categories.length : 0,
      products: Array.isArray(products) ? products.length : 0,
      team: Array.isArray(team) ? team.length : 0,
      favorites: Array.isArray(favorites) ? favorites.length : 0,
      cart: cartCount
    });
  };

  // Se re-ejecuta automáticamente ante cualquier cambio o carga
  // de datos en los Contextos
  useEffect(() => {
    checkStorageStats();
  }, [brands, categories, products, favorites, cart, team, checkStorageStats]);

  return {
    storageStats,

    checkStorageStats
  };
}