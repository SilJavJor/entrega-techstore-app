/* ==========================================================================
  Componente Header.jsx
  Descripción: Cabecera principal adaptable con React Bootstrap y estilos CSS
    unificados. responsive con Logo y Carrito siempre visibles en móviles,
    dejando únicamente la navegación central dentro del menú hamburguesa.
  Autor: Silvio Jorda
  Fecha: 2026-10-14
========================================================================== */

// Importaciones
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { NavBar } from '../NavBar/NavBar';
import { BoltIcon } from '../UI/Icons/BoltIcon/BoltIcon';
import { CartWidget } from '../CartWidget/CartWidget';

// Estilos
import styles from './Header.module.css';

export function Header() {
  const navigate = useNavigate();

  const { isAdmin, logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿ Realmente desea cerrar la sesión ?');

    if (confirmLogout) {
      logout();

      navigate('/');
    }
  };

  return (
    <header className={styles.header}>
      <Navbar expand="lg" variant="dark" className="p-0">
        <Container className={styles.container}>
          {/* Logo y Empresa */}
          <Navbar.Brand as={Link} to="/" className={styles.logo}>
            <BoltIcon />

            <span className={styles.highlight}>TechStore</span>
          </Navbar.Brand>

          {/* Carrito visible siempre */}
          <div className="d-flex align-items-center gap-2 order-lg-last">
            <div className={styles.cartWidgetWrapper}>
              <CartWidget />
            </div>

            {/* Solo visible en pantallas chicas */}
            <Navbar.Toggle aria-controls="header-navbar-nav" />
          </div>

          {/* Menú colapsable */}
          <Navbar.Collapse id="header-navbar-nav">
            <div className={styles.navContainer}>
              <NavBar />
            </div>

            {/* Autenticacion - Admin */}
            <div className={styles.authButtons}>
              {isAdmin ? (
                <button className={styles.btnPrimary} onClick={handleLogout}>
                  Salir
                </button>
              ) : (
                <button className={styles.btnPrimary} onClick={() => navigate('/login')}>
                  Ingresar
                </button>
              )}

              <button className={styles.btnSecondary} onClick={() => navigate('/register')}>
                Registrarse
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}