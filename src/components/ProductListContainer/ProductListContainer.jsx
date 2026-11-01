/* ==========================================================================
  Componente ProductListContainer.jsx
  Descripción: Componente contenedor del catálogo de productos. Consume los
    datos desde el sub-contexto useProducts. integra la barra de Filtros por
    categorías, labarra de paginacion, etc..
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState, useMemo } from 'react';
import { Container, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useProducts } from '../../context/Products/ProductsContext';
import { usePagination } from '../../hooks/UsePagination/usePagination';
import { PaginationBar } from '../UI/PaginationBar/PaginationBar';
import { ProductList } from '../ProductList/ProductList';
import styles from './ProductListContainer.module.css';

export function ProductListContainer({ greeting = "Catálogo de Productos" }) {
  // Consumo desde el sub-contexto useProducts con alias para el JSX
  const { products, loadingProducts: loading, errorProducts: error } = useProducts();

  // Estados del Filtro de Categorías y del Historial (últimos 5)
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [recentFilters, setRecentFilters] = useState([]);

  // Categorías obtenidas del catálogo
  const availableCategories = useMemo(() => {
    if (!products) return [];

    const categories = products.map((p) => p.category).filter(Boolean);

    return ['all', ...new Set(categories)];
  }, [products]);

  // Handler para seleccionar categoría y registrar el historial
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const categoryName = category === 'all' ? 'Todas' : category;

    setRecentFilters((prev) => {
      const filtered = prev.filter((item) => item !== categoryName);

      return [categoryName, ...filtered].slice(0, 5);
    });
  };

  // Productos filtrados por la categoría activa
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (selectedCategory === 'all') return products;

    return products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [products, selectedCategory]);

  // Paginacion aplicando los filtros
  const {
    currentItems: currentProducts,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange
  } = usePagination(filteredProducts, 8);

  return (
    <Container className="py-4 d-flex flex-column gap-3">
      {/* Encabezado  */}
      <div className={`d-flex align-items-center justify-content-between w-100 pb-2 mb-2 ${styles.headerWrapper}`}>
        {greeting && <h2 className={`mb-0 ${styles.title}`}>{greeting}</h2>}

        {/* Barra paginacion */}
        {!loading && !error && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            showSelect={true}
          />
        )}
      </div>

      {/* Grupo de filtrado */}
      {!loading && !error && (
        <div className={`d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 mb-2 ${styles.filterBar}`}>
          {/* Lado Izquierdo: Botones de Categorías */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className={`fw-semibold ${styles.filterLabel}`}>Categorías:</span>

            {availableCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              const label = cat === 'all' ? 'Todas' : cat;

              return (
                <Button
                  key={cat}
                  size="sm"
                  className={isActive ? styles.categoryBtnActive : styles.categoryBtn}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Lado Derecho: Desplegable de los últimos 5 filtros */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <Form.Label htmlFor="recentFiltersSelect" className={`mb-0 text-nowrap ${styles.filterLabel}`}>
              Últimos filtros:
            </Form.Label>

            <Form.Select
              id="recentFiltersSelect"
              size="sm"
              className={styles.selectFilterControl}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  const targetCat = val === 'Todas' ? 'all' : val;
                  setSelectedCategory(targetCat);
                }
              }}
              value={selectedCategory === 'all' ? 'Todas' : selectedCategory}
              disabled={recentFilters.length === 0}
            >
              {recentFilters.length === 0 ? (
                <option value="">Sin historial</option>
              ) : (
                recentFilters.map((filter, idx) => (
                  <option key={`${filter}-${idx}`} value={filter}>
                    {filter}
                  </option>
                ))
              )}
            </Form.Select>
          </div>
        </div>
      )}

      {/* 3. Carga */}
      {loading && (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" style={{ color: '#8de2d6' }} role="status" />
          <p className={`mt-3 ${styles.statusMessage}`}>Cargando catálogo de productos...</p>
        </div>
      )}

      {/* 4. Error */}
      {error && (
        <Alert variant="danger" className="text-center my-4">
          Error al cargar los productos: {error}
        </Alert>
      )}

      {/* 5. Grilla de Productos y Navegación Inferior */}
      {!loading && !error && currentProducts.length > 0 && (
        <>
          <ProductList products={currentProducts} />

          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            showSelect={false}
          />
        </>
      )}

      {/* Mensaje si no hay coincidencias */}
      {!loading && !error && currentProducts.length === 0 && (
        <Alert variant="dark" className="text-center my-4">
          No se encontraron productos en la categoría seleccionada.
        </Alert>
      )}
    </Container>
  );
}