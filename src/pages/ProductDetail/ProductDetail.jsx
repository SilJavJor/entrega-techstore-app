/* ==========================================================================
  Componente ProductDetail.jsx
  Descripcion: Componente que muestra el detalle de un producto específico,
    desacoplado visualmente mediante useProductDetail.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, InputGroup, Spinner } from 'react-bootstrap';
import { useProductDetail } from './useProductDetail';

// 
import { CartSummary } from '../../pages/Modal/CartSummary/CartSummary';

// Estilos
import styles from './ProductDetail.module.css';

export function ProductDetail() {
  const {
    product,
    brandName,
    loading,
    cantidad,
    increase,
    decrement,
    handleAddToCart,
    isOpen,
    closeModal,
    lastAddedProduct,
    cart,
    totalItems,
    totalPrice
  } = useProductDetail();

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
    <>
      <Container fluid="lg" className="py-5 d-flex justify-content-center">
        <Card className={`border-0 p-4 shadow-lg ${styles.mainCard}`}>
          <Row className="g-4 align-items-center">
            {/* Imagen del producto */}
            <Col md={6} className="text-center">
              <div className={styles.imageWrapper}>
                <Card.Img
                  src={product.image || product.imagen || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className={styles.image}
                />
              </div>
            </Col>

            {/* Información y Compra */}
            <Col md={6}>
              <div className="d-flex flex-column gap-3">
                {/* Marca */}
                {brandName && (
                  <div>
                    <Badge bg="dark" className={styles.brandBadge}>
                      {brandName}
                    </Badge>
                  </div>
                )}

                {/* Título del producto */}
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

                {/* Descripcion */}
                <p className={styles.description}>
                  {product.description || 'Sin descripción disponible.'}
                </p>

                {/* Selector de Cantidad y Botón de Compra */}
                <div className="d-flex flex-column gap-3 mt-2" style={{ maxWidth: '320px' }}>
                  <div>
                    <label className={styles.qtyLabel}>Cantidad a llevar:</label>

                    <InputGroup>
                      <Button
                        className={styles.qtyBtn}
                        onClick={decrement}
                        disabled={cantidad <= 1}
                      >
                        -
                      </Button>

                      <span className={`form-control text-center readonly-input ${styles.qtyDisplay}`}>
                        {cantidad}
                      </span>

                      <Button
                        className={styles.qtyBtn}
                        onClick={increase}
                        disabled={cantidad >= product.stock}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </div>

                  <Button
                    className={styles.addBtn}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>

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