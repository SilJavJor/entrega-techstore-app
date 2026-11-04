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
import '../../styles/Forms/Globals.css';
import '../../styles/Forms/Titles.css';
import '../../styles/CheckBoxes/CheckBoxes.css';
import '../../styles/Forms/Inputs.css';
import '../../styles/Buttons/ActionButtons.css';

export function TeamPage() {
  // Sub-Contexto de Equipos
  const { addTeamMember, getNextTeamId } = useTeam();
  
  // Proximo ID de Integrante
  const nextId = getNextTeamId ? getNextTeamId() : '-';

  //const [memberData, setMemberData] = useState({
  const [formData, setFormData] = useState({
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
    setFormData((prev) => ({
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
          name: formData.name,
          role: formData.role,
          email: formData.email,
          linkedin: formData.linkedin,
          github: formData.github,
          photo: imageUrl,
          bio: formData.bio
        });

        if (result && !result.success && result.errors) {
          setErrors(result.errors);

          return;
        }
      }

      setSavedMemberName(formData.name);

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
    setFormData({
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
            <Form.Group controlId="nombre">
              <Form.Label className="label">Nombre Completo *</Form.Label>

              <Form.Control
                type="text"
                name="nombre"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Laura Giménez"
                required
                className="input"
                isInvalid={!!errors.nombre}
              />

              {errors.nombre && <span className="errorText">{errors.nombre}</span>}
            </Form.Group>

            {/* Puesto / Rol */}
            <Form.Group controlId="puesto">
              <Form.Label className="label">Puesto / Rol *</Form.Label>

              <Form.Control
                type="text"
                name="puesto"
                value={formData.role}
                onChange={handleChange}
                placeholder="Ej: Desarrolladora Frontend React"
                required
                className="input"
                isInvalid={!!errors.puesto}
              />

              {errors.puesto && <span className={styles.errorText}>{errors.puesto}</span>}
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
                isInvalid={!!errors.email}
              />

              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </Form.Group>

            <Row className="g-3">
              {/* Fila LinkedIn (Opcionales) */}
              <Col md={6}>
                <Form.Group controlId="linkedin">
                  <Form.Label className="label">
                    Perfil de LinkedIn 
                    <span className="text-muted fw-normal">(Opcional)</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="Ej: https://linkedin.com/in/laura-gimenez"
                    className="input"
                  />
                </Form.Group>
              </Col>

              {/* GitHub (Opcionales) */}
              <Col md={6}>
                <Form.Group controlId="github">
                  <Form.Label className="label">
                    Perfil de GitHub 
                    <span className="text-muted fw-normal">(Opcional)</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="Ej: https://github.com/lauragimenez"
                    className="input"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Foto de Perfil (Subida a ImgBB) */}
            <Form.Group controlId="imagen">
              <Form.Label className="label">Foto de Perfil *</Form.Label>

              <Form.Control
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="input"
              />
            </Form.Group>

            {/* Biografía / Presentación */}
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
        title="¡ Integrante agregado !"
        message={`"${savedMemberName}" ha sido agregado al equipo exitosamente con su foto en ImgBB.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}