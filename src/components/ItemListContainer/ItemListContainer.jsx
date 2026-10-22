/* ==========================================================================
  Componente ItemListContainer.jsx
  Descripción: Componente que maneja la carga del catálogo de proeductos 
    que se obtiene desde el DataContext. Manejo de errores, y renderiza
    el título principal junto a ItemList.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState, useMemo } from 'react';
import { Container, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useData } from '../../context/DataContext/DataContext';
import { usePagination } from '../../hooks/UsePagination/usePagination';
import { PaginationBar } from '../UI/PaginationBar/PaginationBar';
import { ItemList } from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';

export function ItemListContainer({ greeting = "Catálogo de Productos" }) {
  const { products, loading, error } = useData();

  // Estados del Filtro de Categorías y del Historial (últimos 5)
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [recentFilters, setRecentFilters] = useState([]);

  // Categorías únicas obtenidas del catálogo
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

  // Productos filtrados por categoría activa
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (selectedCategory === 'all') return products;

    return products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [products, selectedCategory]);

  // Hook de paginacion aplicado a la lista filtrada
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
      {/* Enacbezado */}
      <div className={`d-flex align-items-center justify-content-between w-100 pb-2 mb-2 ${styles.headerWrapper}`}>
        {greeting && <h2 className={`mb-0 ${styles.title}`}>{greeting}</h2>}

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

      {/* Filtors */}
      {!loading && !error && (
        <div className={`d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 mb-2 ${styles.filterBar}`}>
          {/* Botones de Categorias */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className={`fw-semibold ${styles.filterLabel}`}>Categorías :</span>

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

          {/* Desplegable de los ultimos 5 filtros */}
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

      {/* Mensaje */}
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

      {/* 5. GRILLA DE PRODUCTOS Y NAVEGACIÓN INFERIOR */}
      {!loading && !error && currentProducts.length > 0 && (
        <>
          <ItemList products={currentProducts} />

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

      {/* Mensaje en caso de no haber coincidencias */}
      {!loading && !error && currentProducts.length === 0 && (
        <Alert variant="dark" className="text-center my-4">
          No se encontraron productos en la categoría seleccionada.
        </Alert>
      )}
    </Container>
  );
}