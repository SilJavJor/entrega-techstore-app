/* ==========================================================================
  Hook / Lógica de Filtrado de Catálogo
========================================================================== */

import { useState, useMemo } from 'react';
import { useProducts } from '../context/Products/ProductsContext';
import { useCategories } from '../context/Categories/CategoriesContext';
import { useBrands } from '../context/Brands/BrandsContext';

export function useCatalog() {
  const { products, loadingProducts } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  // Filtrado combinado: Búsqueda por texto + Categoría + Marca
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      // Coincidencia por texto (nombre o descripción)
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Coincidencia por Categoría
      const matchesCategory = selectedCategory
        ? String(product.category).toLowerCase() === selectedCategory.toLowerCase()
        : true;

      // Coincidencia por Marca
      const matchesBrand = selectedBrand
        ? String(product.brand).toLowerCase() === selectedBrand.toLowerCase()
        : true;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
  };

  return {
    products: filteredProducts,
    totalCount: products?.length || 0,
    loadingProducts,
    categories,
    brands,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    handleResetFilters
  };
}