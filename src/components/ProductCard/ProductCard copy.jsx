/* ==========================================================================
  Componente ProductCard.jsx
  Descripcion: Componente que representa un producto en la lista de productos.
    Contiene información parcial del producto. Un botón para marcarlo como 
    favorito. Permite hacer clic tanto en el botón como en la imagen para ir
    al detalle. Y posee un boton para agrregar al carrito directamente.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { StarInLineIcon } from '../UI/Icons/StarInLineIcon/StarInLineIcon';
import { StarOutlineIcon } from '../UI/Icons/StarOutLineIcon/StarOutLineIcon';
import { useCart } from '../../context/Cart/CartContext';

// Estilos
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const { addToCart } = useCart();
  
  if (!product) return null;

  const active = isFavorite(product.id);

  const stock = product.stock ?? product.stockDisponible ?? 0;

  // Marcado como favorito
  const handleFavoriteClick = (e) => {
    e.preventDefault();

    e.stopPropagation();

    toggleFavorite(product.id);
  };

  // Agrega al carrito
  const handleAddToCart = (e) => {
    e.preventDefault();

    e.stopPropagation();

    if (stock > 0 && addToCart) {
      addToCart(product, 1);
    }
  };

  return (
    <Card className={`h-100 shadow-sm border-0 position-relative ${styles.card}`}>
      {/* Favorito */}
      <Button
        variant="link"
        onClick={handleFavoriteClick}
        title={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className={`position-absolute top-0 end-0 z-3 ${styles.favButton}`}
      >
        {active ? <StarInLineIcon /> : <StarOutlineIcon />}
      </Button>

      {/*
      <Button
        variant="link"
        onClick={handleFavoriteClick}
        className={`position-absolute top-0 end-0 z-3 ${styles.favButton}`}
        title={active ? <StarOutlineIcon /> 'Quitar de favoritos' : <StarInLineIcon /> 'Agregar a favoritos'}
      </Button>
      */}

      {/*
      <Button
        variant="link"
        onClick={toggleFavorite}
        title="Favorito"
        className={`position-absolute top-0 end-0 z-3 ${styles.favButton}`}
      >
        {isFavorite ? <StarInLineIcon /> : <StarOutlineIcon />}
      </Button>
      */}

      {/*
      <button
        type="button"
        className={`position-absolute top-0 end-0 z-3 ${styles.favButton}`}
        onClick={handleFavoriteClick}
        title={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-label="Guardar en favoritos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={active ? '#8de2d6' : 'none'}
          stroke="#8de2d6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
      */}

      {/* Imagen Producto */}
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image || product.imagen || 'https://via.placeholder.com/300'}
          alt={product.name || product.nombre}
          className={styles.image}
        />
      </Link>

      {/* Cuerpo Tarjeta */}
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
          <Link to={`/product/${product.id}`} className={styles.detailsBtn}>
            Ver Detalle
          </Link>

          <Button
            type="button"
            className={styles.addBtn}
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