/* ==========================================================================
  Componente ProductList.jsx
  Descripción: Componente que renderiza la grilla de productos desacoplada
    mediante el hook useProductList.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Row, Col } from 'react-bootstrap';
import { useProductList } from './useProductList';

// Estilos
import { ProductCard } from '../ProductCard/ProductCard';

// Estilos
import styles from './ProductList.module.css';

export function ProductList({ products = [] }) {
  const { products: itemList, hasProducts } = useProductList(products);

  if (!hasProducts) return null;

  return (
    <div className={styles.gridWrapper}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {itemList.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            {/* Prop 'product' */}
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}