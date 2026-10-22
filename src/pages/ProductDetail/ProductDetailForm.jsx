/* ==========================================================================
  Componente ProductDetailForm.jsx
  Descripción: Componente que muestra el detalle de un producto específico
    consumiendo desde el DataContext. Tarjeta oscura
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { useData } from '../../context/DataContext/DataContext';
import { useCart } from '../../context/CartContext/CartContext';
import styles from './ProductDetailForm.module.css';

export function ProductDetailForm() {
  const { id } = useParams();

  const { products, loading } = useData();

  const { addToCart } = useCart();

  const [cantidad, setCantidad] = useState(1);

  const [added, setAdded] = useState(false);

  const product = products ? products.find((p) => String(p.id) === String(id)) : null;

  const incrementar = () => {
    if (product && cantidad < product.stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, cantidad);

      setAdded(true);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" style={{ color: '#8de2d6' }} role="status" />

        <p className={`mt-3 ${styles.loadingText}`}>Cargando detalle del producto...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Card className={`border-0 p-4 text-center shadow-lg ${styles.notFoundCard}`}>
          <Card.Body>
            <h2 className={styles.notFoundTitle}>Producto no encontrado</h2>

            <p className={styles.notFoundSubtitle}>
              El artículo solicitado no existe o fue removido del catálogo.
            </p>

            <Button as={Link} to="/products" className={styles.backBtn}>
              Volver al Catálogo
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.mainCard}`}>
        <Row className="g-4 align-items-center">
          {/* Columna Izquierda - Imagen del producto en caja oscura */}
          <Col md={6} className="text-center">
            <div className={styles.imageWrapper}>
              <Card.Img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />
            </div>
          </Col>

          {/* Columna Derecha - Información y Compra */}
          <Col md={6}>
            <div className="d-flex flex-column gap-3">
              <h1 className={styles.title}>{product.name}</h1>

              {/* Precio y Stock */}
              <div className="d-flex align-items-center gap-3">
                <span className={styles.price}>
                  ${Number(product.price).toLocaleString('es-AR')}
                </span>

                <Badge className={product.stock > 0 ? styles.stockBadgeIn : styles.stockBadgeOut}>
                  {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin Stock'}
                </Badge>
              </div>

              <hr className={styles.divider} />

              {/* Descripción */}
              <p className={styles.description}>
                {product.description || 'Sin descripción disponible.'}
              </p>

              {!added ? (
                <div className="d-flex flex-column gap-3 mt-2" style={{ maxWidth: '320px' }}>
                  {/* Selector de Cantidad */}
                  <div>
                    <label className={styles.qtyLabel}>
                      Cantidad a llevar:
                    </label>

                    <InputGroup>
                      <Button 
                        className={styles.qtyBtn}
                        onClick={decrementar}
                        disabled={cantidad <= 1}
                      >
                        -
                      </Button>

                      <span className={`form-control text-center readonly-input ${styles.qtyDisplay}`}>
                        {cantidad}
                      </span>

                      <Button 
                        className={styles.qtyBtn}
                        onClick={incrementar}
                        disabled={cantidad >= product.stock}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </div>

                  {/* Agregar al Carrito */}
                  <Button 
                    className={styles.addBtn}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                  >
                    Agregar al Carrito
                  </Button>
                </div>
              ) : (
                <Alert className={`mt-3 p-3 border-0 ${styles.addedAlert}`}>
                  <div className="d-flex flex-column gap-2">
                    <span className="fw-bold text-white">
                      ✓ ¡{cantidad} {cantidad === 1 ? 'unidad agregada' : 'unidades agregadas'} al carrito!
                    </span>

                    <div className="d-flex justify-content-between align-items-center w-100 mt-3 flex-wrap gap-2">
                      <Button as={Link} to="/cart" className={styles.goToCartBtn}>
                        Ir al Carrito
                      </Button>

                      <Button as={Link} to="/products" className={styles.keepShoppingBtn}>
                        Seguir Comprando
                      </Button>
                    </div>
                  </div>
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}