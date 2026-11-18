/* ==========================================================================
  Componente ProductListContainer.jsx
  Descripción: Componente contenedor del catálogo de productos desacoplado
    mediante useProductListContainer.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Container, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useProductListContainer } from './useProductListContainer';
import { PaginationBar } from '../UI/PaginationBar/PaginationBar';
import { ProductList } from '../ProductList/ProductList';

// Estilos
import styles from './ProductListContainer.module.css';

export function ProductListContainer({ greeting = 'Catálogo de Productos' }) {
  const {
    loading,
    error,
    selectedCategory,
    recentFilters,
    availableCategories,
    handleCategoryChange,
    handleRecentFilterSelect,
    currentItems: currentProducts,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange
  } = useProductListContainer();

  return (
    <Container className="py-4 d-flex flex-column gap-3">
      {/* Encabezado */}
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

      {/* Grupo de filtrado */}
      {!loading && !error && (
        <div className={`d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 mb-2 ${styles.filterBar}`}>
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

          <div className="d-flex align-items-center gap-2 ms-auto">
            <Form.Label htmlFor="recentFiltersSelect" className={`mb-0 text-nowrap ${styles.filterLabel}`}>
              Últimos filtros:
            </Form.Label>

            <Form.Select
              id="recentFiltersSelect"
              size="sm"
              className={styles.selectFilterControl}
              onChange={handleRecentFilterSelect}
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

      {/* Carga */}
      {loading && (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" style={{ color: '#8de2d6' }} role="status" />
          <p className={`mt-3 ${styles.statusMessage}`}>Cargando catálogo de productos...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert variant="danger" className="text-center my-4">
          Error al cargar los productos: {error}
        </Alert>
      )}

      {/* Grilla de Productos y Navegación Inferior */}
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

      {/* Sin coincidencias */}
      {!loading && !error && currentProducts.length === 0 && (
        <Alert variant="dark" className="text-center my-4">
          No se encontraron productos en la categoría seleccionada.
        </Alert>
      )}
    </Container>
  );
}