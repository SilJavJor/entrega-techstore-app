/* ==========================================================================
  Componente NavBar.jsx
  Descripción: Componente de navegación con menú desplegable condicional 
    para administradores en la sección de Productos, Carrito y Nosotros.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext/AuthContext';
import styles from './NavBar.module.css';

export function NavBar() {
  const { isAdmin } = useAuth();

  return (
    <Nav className="align-items-center">
      {/* Inicio */}
      <Nav.Link as={Link} to="/" className={styles.navLink}>
        Inicio
      </Nav.Link>

      {/* Productos */}
      {isAdmin ? (
        <NavDropdown 
          title={<span className={styles.navLink}>Productos</span>} 
          id="products-dropdown"
          menuVariant="dark"
        >
          <NavDropdown.Item as={Link} to="/products" className={styles.dropdownLink}>
            Ver Productos
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/add-categories" className={styles.dropdownLink}>
            Agregar Categoria
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/add-products" className={styles.dropdownLink}>
            Agregar Producto
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={Link} to="/products" className={styles.navLink}>
          Productos
        </Nav.Link>
      )}

      {/* Carrito */}
      <Nav.Link as={Link} to="/cart" className={styles.navLink}>
        Carrito
      </Nav.Link>

      {/* Contáctanos */}
      <Nav.Link as={Link} to="/contactus" className={styles.navLink}>
        Contáctanos
      </Nav.Link>

      {/* Nosotros */}
      {isAdmin ? (
        <NavDropdown 
          title={<span className={styles.navLink}>Nosotros</span>} 
          id="aboutus-dropdown"
          menuVariant="dark"
        >
          <NavDropdown.Item as={Link} to="/aboutus" className={styles.dropdownLink}>
            Ver Equipo
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/add-team" className={styles.dropdownLink}>
            Agregar Integrante
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={Link} to="/aboutus" className={styles.navLink}>
          Nosotros
        </Nav.Link>
      )}
    </Nav>
  );
}