/* ==========================================================================
  Componente ContactUsPage.jsx
  Descripcion: Pagina de contacto.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';
import styles from './ContactUsPage.module.css';

export function ContactUsPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);

    handleReset();
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          {/* Encabezado */}
          <h1 className={styles.title}>Contáctanos</h1>

          {/* Subtítulo */}
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitle}>
              ¿Tenés alguna duda o consulta sobre nuestros productos?
            </p>

            <p className={styles.subtitle}>
              Dejanos tu mensaje y te responderemos a la brevedad.
            </p>
          </div>

          {/* Formulario */}
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Nombre completo */}
            <Form.Group controlId="nombre">
              <Form.Label className={styles.label}>Nombre completo *</Form.Label>

              <Form.Control
                type="text"
                name="nombre"
                autoFocus
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* E-mail */}
            <Form.Group controlId="email">
              <Form.Label className={styles.label}>Correo electrónico *</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: juan.perez@email.com"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Mensaje */}
            <Form.Group controlId="mensaje">
              <Form.Label className={styles.label}>Mensaje *</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribí tu consulta o mensaje acá..."
                required
                className={styles.input}
              />
            </Form.Group>

            <div className="d-flex gap-3 mt-3">
            { /* Limpiar */}
              <Button 
                type="button" 
                className={styles.cleanBtn} 
                onClick={handleReset}
              >
                <BroomIcon /> Limpiar
              </Button>

              {/* Enviar  */}
              <Button 
                type="submit" 
                className={styles.btnSubmit}
              >
                <CheckIcon /> Enviar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <MessageBtnAccept
        isOpen={showModal}
        onClose={handleCloseModal}
        title="¡ Mensaje Enviado !"
        message="¡ Gracias por contactarte ! Te responderemos a la brevedad."
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}