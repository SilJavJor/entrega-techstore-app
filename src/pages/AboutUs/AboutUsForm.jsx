/* ==========================================================================
  Componente AboutUsForm.jsx
  Descripcion: Componente que muestra información sobre la empresa TechStore 
    y su equipo. Muestra información de cada miembro del equipo. La informacion
    se obtiene del DataContext.
  Autor: Nombre 
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useData } from '../../context/DataContext/DataContext';
import styles from './AboutUsForm.module.css';

export function AboutUsForm() {
  const { team, loading, error } = useData();

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: '#8de2d6' }} role="status" />

        <p className={`mt-3 ${styles.statusMessage}`}> Cargando información del equipo... </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <p className={styles.errorMessage}> Error al cargar el equipo: {error} </p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className={`border-0 p-4 p-md-5 mb-5 text-center shadow-lg ${styles.bannerCard}`}>
        <Card.Body className="d-flex flex-column align-items-center">
          <h1 className={styles.bannerTitle}>
            Sobre <span className={styles.highlight}>Nosotros</span>
          </h1>

          <p className={styles.bannerSubtitle}>
            Somos un equipo multidisciplinario apasionado por la tecnología, dedicado a ofrecer los mejores productos y soluciones informáticas.
          </p>
        </Card.Body>
      </Card>

      <Row className="g-4 justify-content-center">
        {team && team.length > 0 ? (
          team.map((member) => (
            <Col key={member.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
              <Card className={`border-0 text-center w-100 ${styles.memberCard}`}>
                <Card.Body className="d-flex flex-column align-items-center p-4">
                  {/* Avatar con Borde Turquesa */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={styles.avatar}
                  />

                  {/* Nombre completo */}
                  <strong className={styles.memberName}>{member.name}</strong>

                  {/* Puesto / Rol */}
                  <span className={styles.memberRole}>{member.role}</span>

                  {/* E-mail */}
                  <p className={styles.memberEmail}>{member.email}</p>

                  {/* Biografía / Reseña (Si existe) */}
                  {member.bio && (
                    <p className={styles.memberBio}>{member.bio}</p>
                  )}

                  {/* Enlaces a Redes Sociales (Opcionales) */}
                  {(member.linkedin || member.github) && (
                    <div className="d-flex gap-2 mt-auto pt-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                        >
                          LinkedIn
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p className={styles.statusMessage}> No hay miembros registrados en el equipo actualmente.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}