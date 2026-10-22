/* ==========================================================================
  Componente NotFoundForm.jsx
  Descripción: Vista de error 404 para rutas no encontradas con el botón de 
    retorno al inicio.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import styles from './NotFoundForm.module.css';

export function NotFoundForm() {
  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 text-center shadow-lg ${styles.card}`}>
        <Card.Body className="d-flex flex-column align-items-center">
          {/* Error 404 */}
          <h1 className={styles.errorCode}>404</h1>

          <h2 className={styles.title}>Página no encontrada</h2>

          <p className={styles.description}>
            Lo sentimos, la sección o producto que estás buscando no existe o fue movido.
          </p>

          <Button
            as={Link}
            to="/"
            className={styles.homeBtn}
          >
            Volver a la Página Principal
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}