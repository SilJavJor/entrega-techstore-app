/* ==========================================================================
  Componente Layout.jsx
  Descripcion: Mantiene el Header arriba (encabezado), el Footer al pie (pie)
    y renderiza las vistas dinámicas a través del Outlet de React Router.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ScrollToBottom } from '../UI/ScrollToBottom/ScrollToBottom';
import { ScrollToTop } from '../UI/ScrollToTop/ScrollToTop';

// Estilos
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={`d-flex flex-column min-vh-100 ${styles.layoutContainer}`}>
      <ScrollToBottom />

      <Header />

      {/* Contenedor principal */}
      <Container as="main" fluid className={`flex-grow-1 p-0 ${styles.mainContent}`}>
        <Outlet />
      </Container>

      <Footer />

      <ScrollToTop />
    </div>
  );
}