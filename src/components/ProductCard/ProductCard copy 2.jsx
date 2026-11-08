/* ==========================================================================
  Componente ProductCard.jsx
  Descripción: Tarjeta individual de producto desacoplada visualmente mediante
    el hook useProductCard.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */


/* ==========================================================================
  Componente ProductCard.jsx
  Descripción: Renderiza la tarjeta de un producto individual e integra
    el desplegable Offcanvas de resumen de carrito.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
========================================================================== */

// Importaciones
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProductCard } from './useProductCard';
import { StarInLineIcon } from '../UI/Icons/StarInLineIcon/StarInLineIcon';
import { StarOutlineIcon } from '../UI/Icons/StarOutLineIcon/StarOutLineIcon';
import { CartSummary } from '../../pages/Modal/CartSummary/CartSummary';

// Estilos
import styles from './ProductCard.module.css';
import '../../styles/Buttons/ActionButtons.css';

export function ProductCard({ product }) {
  const {
    isFavoriteProduct,
    stock,
    isOpen,
    lastAddedProduct,
    cart,
    totalItems,
    totalPrice,
    handleFavoriteClick,
    handleAddToCart,
    closeModal
  } = useProductCard(product);

  if (!product) return null;

  return (
    <>
      <Card className={`h-100 border-0 shadow-sm ${styles.card}`}>
        {/* Favorito */}
        <button
          type="button"
          className={styles.favBtn}
          onClick={handleFavoriteClick}
          aria-label="Agregar a favoritos"
        >
          {isFavoriteProduct ? <StarInLineIcon /> : <StarOutlineIcon />}
        </button>

        {/* Imagen del Producto */}
        <div className={styles.imageWrapper}>
          <Card.Img
            variant="top"
            src={product.image || product.imagen || 'https://via.placeholder.com/200'}
            alt={product.name || product.nombre}
            className={styles.image}
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-between p-3">
          <div>
            <Card.Title className={styles.title}>
              {product.name || product.nombre}
            </Card.Title>

            <div className="d-flex align-items-center justify-content-between my-2">
              <span className={styles.price}>
                $ {Number(product.price || product.precio || 0).toLocaleString('es-AR')}
              </span>
              <Badge className={stock > 0 ? styles.stockBadgeIn : styles.stockBadgeOut}>
                {stock > 0 ? `Stock: ${stock}` : 'Sin Stock'}
              </Badge>
            </div>
          </div>

          <div className="d-flex flex-column gap-2 mt-3">
            <Button
              as={Link}
              to={`/product/${product.id}`}
              className={styles.detailBtn}
            >
              Ver Detalle
            </Button>

            <Button
              className={styles.addBtn}
              onClick={handleAddToCart}
              disabled={stock <= 0}
            >
              Agregar al Carrito
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Panel Desplegable Lateral Offcanvas */}
      <CartSummary
        isOpen={isOpen}
        onClose={closeModal}
        lastAddedProduct={lastAddedProduct}
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
    </>
  );
}