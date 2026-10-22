/* ==========================================================================
  Componente Item.jsx
  Descripcion: Componente que representa un producto en la lista de productos.
    Contiene información del producto y un botón para marcarlo como favorito. 
    Permite hacer clic tanto en el botón como en la imagen para ir al detalle.
    Y posee un boton para agrregar al carrito directamente.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner, Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext/CartContext';
import { StarInLineIcon } from '../UI/Icons/StarInLineIcon/StarInLineIcon';
import { StarOutlineIcon } from '../UI/Icons/StarOutLineIcon/StarOutLineIcon';
import styles from './Item.module.css';

export function Item({ id, name, price, stock, image, description, category }) {
  const { addToCart } = useCart();

  const [isFavorite, setIsFavorite] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    if (addToCart) {
      const product = { id, name, price, stock, image, description, category };

      addToCart(product, 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className={`w-100 h-100 border-0 position-relative ${styles.card}`}>
      <Button
        variant="link"
        onClick={toggleFavorite}
        title="Favorito"
        className={`position-absolute top-0 end-0 z-1 ${styles.favButton}`}
      >
        {isFavorite ? <StarInLineIcon /> : <StarOutlineIcon />}
      </Button>

      <Link to={`/product/${id}`} className={styles.imageLink}>
        {!imageLoaded && (
          <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <Spinner animation="border" style={{ color: '#8de2d6' }} size="sm" />
          </div>
        )}

        <Card.Img
          variant="top"
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          className={styles.image}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </Link>

      <Card.Body className="d-flex flex-column p-3">
        {/* Producto */}
        <Card.Title className={`fs-6 text-truncate mb-2 ${styles.title}`} title={name}>
          {name}
        </Card.Title>

        {/* Precio */}
        <Card.Text className={`fs-5 fw-bold mb-1 ${styles.price}`}>
          ${Number(price).toLocaleString('es-AR')}
        </Card.Text>

        {/* Stock */}
        <Card.Text className={`small mb-3 ${styles.stockText}`}>
          Stock disponible: {' '}
          <Badge bg={stock > 0 ? 'dark' : 'danger'} className={stock > 0 ? styles.stockBadgeIn : ''}>
            {stock}
          </Badge>
        </Card.Text>

        <div className="mt-auto d-flex flex-column gap-2 w-100">
          {/* Ver Detalle */}
          <Button
            as={Link}
            to={`/product/${id}`}
            className={`w-100 ${styles.detailsBtn}`}
          >
            Ver Detalle
          </Button>

          {/* Agregar al Carrito */}
          <Button
            className={`w-100 ${styles.addBtn}`}
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