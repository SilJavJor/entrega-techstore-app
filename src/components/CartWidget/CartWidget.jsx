/* ==========================================================================
  Componente CartWidget.jsx
  Descripcion: El Widget del carrito de compras integrado en la barra de 
    navegación.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext/CartContext';
import { CartIcon } from '../UI/Icons/CartIcon/CartIcon';
import styles from './CartWidget.module.css';

export function CartWidget() {
  const { totalQuantity } = useCart();

  return (
    <Link
      to="/cart"
      className={`position-relative d-inline-flex align-items-center text-decoration-none ${styles.cartWidgetLink}`}
      title="Ver Carrito de Compras"
    >
      {/* Icono del Carrito */}
      <span className={styles.cartIcon}>
        <CartIcon />
      </span>

      {/* Total */}
      {totalQuantity > 0 && (
        <Badge
          bg="danger"
          pill
          className="position-absolute top-0 start-100 translate-middle"
          style={{ fontSize: '0.7rem', padding: '0.28em 0.55em' }}
        >
          {totalQuantity}
        </Badge>
      )}
    </Link>
  );
}