/* ==========================================================================
  Componente ItemList.jsx
  Descripción: Componente que renderiza una lista de productos. Se utiliza en
    el componente ItemListContainer. Contenedor tipo grilla.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Row, Col } from 'react-bootstrap';
import { Item } from '../Item/Item';
import styles from './ItemList.module.css';

export function ItemList({ products = [] }) {
  return (
    <div className={styles.gridWrapper}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            <Item {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}