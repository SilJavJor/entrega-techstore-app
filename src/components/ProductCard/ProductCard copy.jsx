/* ==========================================================================
  Componente ProductCard.jsx
  Descripción: Tarjeta individual de producto desacoplada visualmente mediante
    el hook useProductCard.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProductCard } from './useProductCard';
import { StarInLineIcon } from '../UI/Icons/StarInLineIcon/StarInLineIcon';
import { StarOutlineIcon } from '../UI/Icons/StarOutLineIcon/StarOutLineIcon';

// Estilos
import styles from './ProductCard.module.css';
import '../../styles/Buttons/ActionButtons.css';

export function ProductCard({ product }) {
  const { isFavoriteProduct, stock, handleFavoriteClick, handleAddToCart } = useProductCard(product);

  if (!product) return null;

  return (
    <Card className={`h-100 shadow-sm border-0 position-relative ${styles.card}`}>
      {/* Favorito */}
      <Button
        variant="link"
        onClick={handleFavoriteClick}
        title={isFavoriteProduct ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className={`position-absolute top-0 end-0 z-3 ${styles.favoriteBtn}`}
      >
        {isFavoriteProduct ? <StarInLineIcon /> : <StarOutlineIcon />}
      </Button>

      {/* Imagen del Producto */}
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image || product.imagen || 'https://via.placeholder.com/300'}
          alt={product.name || product.nombre}
          className={styles.image}
        />
      </Link>

      {/* Cuerpo de la Tarjeta */}
      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div>
          {/* Título */}
          <h5 className={`mb-1 ${styles.title}`}>
            {product.name || product.nombre}
          </h5>

          {/* Precio */}
          <div className={`fw-bold fs-5 mb-2 ${styles.price}`}>
            $ {Number(product.price || product.precio || 0).toLocaleString('es-AR')}
          </div>

          {/* Stock */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className={`small ${styles.stockText}`}>Stock disponible:</span>
            <Badge bg="transparent" className={`px-2 py-1 ${styles.stockBadgeIn}`}>
              {stock}
            </Badge>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="d-flex flex-column gap-2">
          {/* Ver Detalle */}
          <Link to={`/product/${product.id}`} className="detailsBtn">
            Ver Detalle
          </Link>
{/*}
          <Button
            type="button"
            className={styles.addBtn}
            onClick={handleAddToCart}
            disabled={stock <= 0}
          >
            {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </Button>
*/}

          {/* Agregar al Carrito */}
          <Button
            type="button"
            className="addBtn"
            onClick={handleAddToCart}
            disabled={stock <= 0}
          >
            {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </Button>
          </div>
      </Card.Body>
    </Card>
  );
}