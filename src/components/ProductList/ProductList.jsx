/* ==========================================================================
  Componente ProductList.jsx
  Descripción: Componente que renderiza una lista de productos. Contenedor 
    tipo grilla (ProductList).
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Row, Col } from 'react-bootstrap';
import { ProductCard } from '../Product/ProductCard';
import styles from './ProductList.module.css';

export function ProductList({ products = [] }) {
  return (
    <div className={styles.gridWrapper}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            {/* Prop 'product' */}
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}