
/* ==========================================================================
  Componente CatalogFilters.jsx
  Descripción: Barra de filtros con búsqueda, categoría, marca y botón de reseteo.
========================================================================== */

import { Row, Col, Form, Button } from 'react-bootstrap';
import { BroomIcon } from '../UI/Icons/BroomIcon/BroomIcon';

export function CatalogFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  categories,
  brands,
  onReset
}) {
  return (
    <Row className="g-3 mb-4 align-items-center">
      {/* Búsqueda por texto */}
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
      </Col>

      {/* Selector de Categorías */}
      <Col md={3}>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input"
        >
          <option value="">Todas las Categorías</option>
          {categories?.map((cat, index) => {
            const catName = typeof cat === 'string' ? cat : cat.name;
            const catKey = typeof cat === 'object' && cat.id ? cat.id : index;
            return (
              <option key={catKey} value={catName}>
                {catName}
              </option>
            );
          })}
        </Form.Select>
      </Col>

      {/* Selector de Marcas */}
      <Col md={3}>
        <Form.Select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="input"
        >
          <option value="">Todas las Marcas</option>
          {brands?.map((brand, index) => {
            const brandName = typeof brand === 'string' ? brand : brand.name;
            const brandKey = typeof brand === 'object' && brand.id ? brand.id : index;
            return (
              <option key={brandKey} value={brandName}>
                {brandName}
              </option>
            );
          })}
        </Form.Select>
      </Col>

      {/* Botón para Limpiar Filtros */}
      <Col md={2} className="d-flex justify-content-end">
        <Button
          type="button"
          className="btn-form-clean w-100"
          onClick={onReset}
          disabled={!searchTerm && !selectedCategory && !selectedBrand}
        >
          <BroomIcon /> Limpiar
        </Button>
      </Col>
    </Row>
  );
}