/* ==========================================================================
  Componente TeamForm.jsx
  Descripcion: Formulario para el registro de un nuevo integrante del equipo
    con ID autogenerado, botón de limpiar y ventana de mensaje de confirmación.
  Autor: Silvio Jorda 
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useTeam } from '../../context/Teams/TeamsContext';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './TeamPage.module.css';
import '../../styles/Buttons/ActionButtons.css';

export function TeamPage() {
  // Sub-Contexto de Equipos
  const { addTeamMember, getNextTeamId } = useTeam();
  
  // Proximo ID de Integrante
  const nextId = getNextTeamId ? getNextTeamId() : '-';

  const [memberData, setMemberData] = useState({
    name: '',
    role: '',
    email: '',
    linkedin: '',
    github: '',
    bio: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [savedMemberName, setSavedMemberName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Por favor, seleccioná una foto de perfil para el integrante.');

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append('image', imageFile);

      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

      if (!apiKey) {
        throw new Error('La API Key de ImgBB no está definida en el archivo .env');
      }

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || 'Error al subir la imagen a ImgBB.');
      }

      const imageUrl = data.data.url;

      if (addTeamMember) {
        const result = addTeamMember({
          name: memberData.name,
          role: memberData.role,
          email: memberData.email,
          linkedin: memberData.linkedin,
          github: memberData.github,
          photo: imageUrl,
          bio: memberData.bio
        });

        if (result && !result.success && result.errors) {
          setErrors(result.errors);

          return;
        }
      }

      setSavedMemberName(memberData.nombre);

      setShowModal(true);

      handleReset();
    } catch (error) {
      console.error('Error durante la carga:', error);

      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setMemberData({
      name: '',
      role: '',
      email: '',
      linkedin: '',
      github: '',
      bio: ''
    });
    setImageFile(null);

    setErrors({});

    const fileInput = document.getElementById('imagen');
    if (fileInput) fileInput.value = '';
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Alta de Integrante</h1>

          <p className={styles.subtitle}>
            Ingresá los datos del nuevo integrante para mostrar su perfil en la sección Nosotros
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* ID Auto-generado */}
            <Form.Group controlId="id">
              <Form.Label className={styles.label}>ID de Integrante (Auto-generado)</Form.Label>

              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className={styles.readOnlyInput}
              />
            </Form.Group>

            {/* Nombre Completo */}
            <Form.Group controlId="nombre">
              <Form.Label className={styles.label}>Nombre Completo *</Form.Label>

              <Form.Control
                type="text"
                name="nombre"
                autoFocus
                value={memberData.nombre}
                onChange={handleChange}
                placeholder="Ej: Laura Giménez"
                required
                className={styles.input}
                isInvalid={!!errors.nombre}
              />
              {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}
            </Form.Group>

            {/* Puesto / Rol */}
            <Form.Group controlId="puesto">
              <Form.Label className={styles.label}>Puesto / Rol *</Form.Label>

              <Form.Control
                type="text"
                name="puesto"
                value={memberData.puesto}
                onChange={handleChange}
                placeholder="Ej: Desarrolladora Frontend React"
                required
                className={styles.input}
                isInvalid={!!errors.puesto}
              />
              {errors.puesto && <span className={styles.errorText}>{errors.puesto}</span>}
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label className={styles.label}>Correo Electrónico *</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={memberData.email}
                onChange={handleChange}
                placeholder="Ej: laura.gimenez@techstore.com"
                required
                className={styles.input}
                isInvalid={!!errors.email}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </Form.Group>

            <Row className="g-3">
              {/* Fila LinkedIn (Opcionales) */}
              <Col md={6}>
                <Form.Group controlId="linkedin">
                  <Form.Label className={styles.label}>
                    Perfil de LinkedIn <span className="text-muted fw-normal">(Opcional)</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="linkedin"
                    value={memberData.linkedin}
                    onChange={handleChange}
                    placeholder="Ej: https://linkedin.com/in/laura-gimenez"
                    className={styles.input}
                  />
                </Form.Group>
              </Col>

              {/* GitHub (Opcionales) */}
              <Col md={6}>
                <Form.Group controlId="github">
                  <Form.Label className={styles.label}>
                    Perfil de GitHub <span className="text-muted fw-normal">(Opcional)</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="github"
                    value={memberData.github}
                    onChange={handleChange}
                    placeholder="Ej: https://github.com/lauragimenez"
                    className={styles.input}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Foto de Perfil (Subida a ImgBB) */}
            <Form.Group controlId="imagen">
              <Form.Label className={styles.label}>Foto de Perfil *</Form.Label>

              <Form.Control
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleFileChange}
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Biografía / Presentación */}
            <Form.Group controlId="bio">
              <Form.Label className={styles.label}>
                Biografía / Presentación <span className="text-muted fw-normal">(Opcional)</span>
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="bio"
                value={memberData.bio}
                onChange={handleChange}
                placeholder="Reseña sobre su experiencia y rol dentro del equipo..."
                className={styles.input}
              />
            </Form.Group>

            {/* Botones */}
            <div className="d-flex gap-3 mt-3">
              <Button 
                type="button" 
                className="cleanBtn"
                onClick={handleReset}
                disabled={uploading}
              >
                <BroomIcon /> Limpiar
              </Button>

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
        title="¡ Integrante Registrado !"
        message={`"${savedMemberName}" ha sido agregado al equipo exitosamente con su foto en ImgBB.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}