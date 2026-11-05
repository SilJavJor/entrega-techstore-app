/* ==========================================================================
  Componente TeamPage.jsx
  Descripción: Pagina para el registro de un nuevo integrante del equipo
    desacoplado visualmente mediante useTeamPage.
  Autor: Silvio Jorda 
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useTeamPage } from './useTeamPage';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './TeamPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Titles/Titles.css';
import '../../styles/Inputs/Inputs.css';
import '../../styles/Buttons/ActionButtons.css';

export function TeamPage() {
  const {
    nextId,
    formData,
    uploading,
    showModal,
    setShowModal,
    savedMemberName,
    handleChange,
    handleFileChange,
    handleReset,
    handleSubmit,
    handleCustomInvalid
  } = useTeamPage();

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Alta de Integrante</h1>

          <p className="subtitle">
            Ingresá los datos del nuevo integrante para mostrar su perfil en la sección Nosotros
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* ID Auto-generado */}
            <Form.Group controlId="id">
              <Form.Label className="label">ID de Integrante (Auto-generado)</Form.Label>
              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className="readOnlyInput"
              />
            </Form.Group>

            {/* Nombre */}
            <Form.Group controlId="name">
              <Form.Label className="label">Nombre Completo *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Laura Giménez"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Por favor, ingresá el nombre completo del integrante.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Puesto / Rol */}
            <Form.Group controlId="role">
              <Form.Label className="label">Puesto / Rol *</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Ej: Desarrolladora Frontend React"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Por favor, ingresá el puesto o rol del integrante.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label className="label">Correo Electrónico *</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: laura.gimenez@techstore.com"
                required
                className="input"
                onInvalid={(e) =>
                  handleCustomInvalid(
                    e,
                    'Por favor, ingresá un correo electrónico.',
                    'Por favor, ingresá un correo electrónico válido.'
                  )
                }
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Redes Sociales (LinkedIn / GitHub) */}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="linkedin">
                  <Form.Label className="label">
                    Perfil de LinkedIn <span className="text-muted fw-normal">(Opcional)</span>
                  </Form.Label>

                  <Form.Control
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="Ej: https://linkedin.com/in/..."
                    className="input"
                    onInvalid={(e) => handleCustomInvalid(e, null, 'Por favor, ingresá una URL válida de LinkedIn.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="github">
                  <Form.Label className="label">
                    Perfil de GitHub <span className="text-muted fw-normal">(Opcional)</span>
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="Ej: https://github.com/..."
                    className="input"
                    onInvalid={(e) => handleCustomInvalid(e, null, 'Por favor, ingresá una URL válida de GitHub.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Foto de Perfil */}
            <Form.Group controlId="imagen">
              <Form.Label className="label">Foto de Perfil *</Form.Label>
              <Form.Control
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Por favor, seleccioná una foto de perfil.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Biografia */}
            <Form.Group controlId="bio">
              <Form.Label className="label">
                Biografía / Presentación <span className="text-muted fw-normal">(Opcional)</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Reseña sobre su experiencia y rol dentro del equipo..."
                className="input"
              />
            </Form.Group>

            {/* Botones de Acción */}
            <div className="d-flex gap-3 mt-3">
              {/* Limpiar */}
              <Button
                type="button"
                className="cleanBtn"
                onClick={handleReset}
                disabled={uploading}
              >
                <BroomIcon /> Limpiar
              </Button>

              {/* Guardar */}
              <Button
                type="submit"
                className="submitBtn"
                disabled={uploading}
              >
                <CheckIcon /> {uploading ? 'Subiendo...' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <MessageBtnAccept
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡ Integrante agregado !"
        message={`"${savedMemberName}" ha sido agregado al equipo exitosamente con su foto en ImgBB.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}