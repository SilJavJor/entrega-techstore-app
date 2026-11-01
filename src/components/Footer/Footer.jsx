/* ==========================================================================
  Componente Footer.jsx
  Descripcion: Informa sobre la marca, enlace a Nosotros y Copyright.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BoltIcon } from '../UI/Icons/BoltIcon/BoltIcon';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="align-items-center gy-3">
          <Col xs={12} md={5} className="text-center text-md-start">
            <h3 className={styles.title}>
              <Link to="/" className={styles.brandLink}>
                {/* Icono */}
                <BoltIcon />

                {/* Marca */}
                TechStore
              </Link>{' '}

              - Soluciones Tecnológicas
            </h3>

            <p className={styles.description}>
              {/* Descripción */}
              Tu tienda de confianza para componentes informáticos y periféricos de alto rendimiento.
            </p>
          </Col>

          {/* Nosotros */}
          <Col xs={12} md={2} className="text-center">
            <Link to="/aboutus" className={styles.teamLink}>
              Nosotros
            </Link>
          </Col>

          {/* Copyright */}
          <Col xs={12} md={5} className="text-center text-md-end">
            <p className={styles.copyright}>
              &copy; 2026{' '}

              <Link to="/" className={styles.brandLink}>
                TechStore
              </Link>

              . Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}