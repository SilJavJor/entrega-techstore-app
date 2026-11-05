/* ==========================================================================
  Componente Home.jsx
  Descripción: Componente que representa la página de inicio de la aplicación.
    desde aquí se accede a las secciones principales y a los productos 
    destacados. Los Productos Destacados son leidos directamente desde eel 
    DataContext.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { RocketIcon } from '../../components/UI/Icons/RocketIcon/RocketIcon';
import { ShieldIcon } from '../../components/UI/Icons/ShieldIcon/ShieldIcon';
import { CreditCardIcon } from '../../components/UI/Icons/CreditCardIcon/CreditCardIcon';
import { useProducts } from '../../context/Products/ProductsContext';
import { ProductList } from '../../components/ProductList/ProductList';

// Estilos
import styles from './HomePage.module.css';

export function HomePage() {
  // Desde el estado global centralizado del DataContext
  const { products, loading, error } = useProducts();

  // Seleccionamos los primeros 4 productos del catálogo como destacados
  const featuredProducts = products ? products.slice(0, 4) : [];

  return (
    <Container className="py-4 d-flex flex-column gap-5">
      {/* Bienvenida */}

      {/*
      <Card className={`border-0 p-4 p-md-5 text-center shadow-lg ${styles.heroCard}`}>
        <Card.Body className="d-flex flex-column align-items-center">
          <h1 className={styles.heroTitle}>
            Bienvenido a <span className={styles.highlight}>TechStore</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Encontrá los mejores componentes de hardware, periféricos y tecnología con la garantía y asesoramiento que buscás.
          </p>

          <Button
            as={Link}
            to="/products"
            className={styles.heroButton}
          >
            Ver Catálogo Completo
          </Button>
        </Card.Body>
      </Card>
      */}

      <Card className={`border-0 p-4 p-md-5 text-center shadow-lg ${styles.bannerCard}`}>
  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
    <h1 className={styles.title}>
      Bienvenido a <span className={styles.highlight}>TechStore</span>
    </h1>

    <p className={styles.subtitle}>
      Encontrá los mejores componentes de hardware, periféricos y
      tecnología con la garantía y asesoramiento que buscás.
    </p>

          <Button
            as={Link} to="/products" className={styles.heroButton}
          >
            Ver Catálogo Completo
          </Button>
  </Card.Body>
</Card>

      {/* Envíos, Garantía, Pagos */}
      <section>
        <Row className="g-4 justify-content-center">
          <Col xs={12} md={4}>
            <Card className={`border-0 p-3 text-center h-100 ${styles.featureCard}`}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                {/* <span className={styles.featureIcon}>🚀</span> */} 
                <span className={styles.featureIcon}> <RocketIcon /> </span>

                <h3 className={styles.featureTitle}>Envíos a todo el país</h3>

                <p className={styles.featureText}>Despachamos tu pedido en menos de 24 horas hábiles.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className={`border-0 p-3 text-center h-100 ${styles.featureCard}`}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                {/* <span className={styles.featureIcon}>🛡️</span> */}
                <span className={styles.featureIcon}> <ShieldIcon /> </span>

                <h3 className={styles.featureTitle}>Garantía Oficial</h3>

                <p className={styles.featureText}>Todos nuestros productos cuentan con respaldo directo de fábrica.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className={`border-0 p-3 text-center h-100 ${styles.featureCard}`}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                {/* <span className={styles.featureIcon}>💳</span> */}
                <span className={styles.featureIcon}> <CreditCardIcon /> </span>

                <h3 className={styles.featureTitle}>Pagos Seguros</h3>

                <p className={styles.featureText}>Aceptamos tarjetas de crédito, débito y transferencias bancarias.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Productos Destacados */}
      <section className={styles.featuredSection}>
        <div className={`d-flex justify-content-between align-items-center pb-3 mb-4 ${styles.sectionHeader}`}>
          <h2 className={styles.sectionTitle}>Productos Destacados</h2>

          {/* Ver todos */}
          <Button
            as={Link}
            to="/products"
            className={styles.viewAllBtn}
          >
            Ver todos &rarr;
          </Button>
        </div>

        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: '#8de2d6' }} role="status" />

            <p className={`mt-3 ${styles.loadingText}`}>Cargando productos destacados...</p>
          </div>
        )}

        {error && (
          <p className={styles.errorText}>Error al cargar los productos: {error}</p>
        )}

        {!loading && !error && (
          <ProductList products={featuredProducts} />
        )}
      </section>
    </Container>
  );
}