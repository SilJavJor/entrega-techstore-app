/* ==========================================================================
  Componente OurTeam.jsx
  Descripción: Componente que muestra la información del equipo de TechStore
    consumiendo los datos centralizados desde DataContext.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useData } from '../../context/DataContext/DataContext';
import styles from './OurTeam.module.css';

export function OurTeam() {
  const { team, loading, error } = useData();

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="secondary" className="me-2" />

        <p className="mt-3 text-muted"> Cargando información del equipo... </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center shadow-sm">
          Error al cargar el equipo: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Encabezado de la sección */}
      <div className="text-center mb-4">
        <h2 className={styles.title}>Nuestro Equipo</h2>

        <p className={styles.subtitle}>Conocé a los profesionales detrás de TechStore</p>
      </div>

      {/* Grilla responsive de integrantes */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
        {team && team.map((member) => (
          <Col key={member.id}>
            <Card className={`h-100 border-0 shadow-sm text-center p-3 ${styles.card}`}>
              <div className="d-flex justify-content-center mb-3">
                <Card.Img
                  src={member.photo || member.imagen || member.image}
                  alt={member.name || member.nombre}
                  className={styles.avatar}
                />
              </div>

              <Card.Body className="p-0 d-flex flex-column justify-content-center">
                <Card.Title className={styles.memberName}>
                  {member.name || member.nombre}
                </Card.Title>

                <Card.Text className={styles.memberRole}>
                  {member.role || member.puesto}
                </Card.Text>

                <Card.Text className={styles.memberEmail}>
                  {member.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}