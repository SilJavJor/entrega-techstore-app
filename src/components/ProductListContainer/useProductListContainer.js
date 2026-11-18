/* ==========================================================================
  Hook: useProductListContainer.js
  Descripción: Encapsula el filtrado por categorías, historial de últimos 5
    filtros y paginación del catálogo.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState, useMemo } from 'react';
import { usePagination } from '../../hooks/UsePagination/usePagination';

// Contexto
import { useProducts } from '../../context/Products/ProductsContext';

export function useProductListContainer() {
  const { products, loadingProducts: loading, errorProducts: error } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentFilters, setRecentFilters] = useState([]);

  const availableCategories = useMemo(() => {
    if (!products) return [];
    const categories = products.map((p) => p.category).filter(Boolean);
    return ['all', ...new Set(categories)];
  }, [products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const categoryName = category === 'all' ? 'Todas' : category;

    setRecentFilters((prev) => {
      const filtered = prev.filter((item) => item !== categoryName);
      return [categoryName, ...filtered].slice(0, 5);
    });
  };

  const handleRecentFilterSelect = (e) => {
    const val = e.target.value;
    if (val) {
      setSelectedCategory(val === 'Todas' ? 'all' : val);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === 'all') return products;

    return products.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  const pagination = usePagination(filteredProducts, 8);

  return {
    loading,
    error,
    selectedCategory,
    recentFilters,
    availableCategories,
    handleCategoryChange,
    handleRecentFilterSelect,
    ...pagination
  };
}