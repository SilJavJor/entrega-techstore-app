/* ==========================================================================
  Componente Register.jsx
  Descripción: Formulario de registro de usuarios para la aplicación TechStore.
    Este componente permite a los usuarios crear una nueva cuenta proporcionando 
    su nombre completo, correo electrónico y contraseña. También incluye la 
    opción de registrarse mediante cuentas de terceros como Google o GitHub y 
    redirecionamiento al Login.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { GoogleIcon } from '../../components/UI/Icons/GoogleIcon/GoogleIcon';
import { GitHubIcon } from '../../components/UI/Icons/GitHubIcon/GitHubIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';
import styles from './RegisterForm.module.css';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  // Estado para controlar el modal de aviso
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    });
  };

  const handleNotImplemented = (featureName) => {
    setModalConfig({
      show: true,
      title: '¡ Función No Implementada !',
      message: `El registro mediante ${featureName} no se encuentra disponible actualmente en esta versión de desarrollo.`
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModalConfig({
        show: true,
        title: '¡ Error de Contraseña !',
        message: 'Las contraseñas ingresadas no coinciden. Por favor, verificá los datos.'
      });
      return;
    }

    // Opcion no implementada
    handleNotImplemented('este Formulario');
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, title: '', message: '' });
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Crear Cuenta</h1>

          <p className={styles.subtitle}>Completá tus datos para registrarte en TechStore</p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Nombre Completo */}
            <Form.Group controlId="name">
              <Form.Label className={styles.label}>Nombre completo *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={formData.name}
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

            {/* Fila Contraseña + Confirmar Contraseña */}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label className={styles.label}>Contraseña *</Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    required
                    className={styles.input}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="confirmPassword">
                  <Form.Label className={styles.label}>Confirmar contraseña *</Form.Label>

                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repetí tu contraseña"
                    required
                    className={styles.input}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Términos y Condiciones */}
            <Form.Group controlId="acceptTerms" className="mt-1">
              <Form.Check
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className={styles.terms}
                label={
                  <span className={styles.termsText}>
                    Acepto los{' '}

                    <a href="#terms" className={styles.termsLink}>
                      Términos y Condiciones
                    </a>
                  </span>
                }
              />
            </Form.Group>

            <div className="d-flex gap-3 mt-3">
              {/* Limpiar */}
              <Button 
                type="button" 
                className={styles.cleanBtn} 
                onClick={handleReset}
              >
                <BroomIcon /> Limpiar
              </Button>

              {/* Registrarme */}
              <Button 
                type="submit" 
                className={styles.submitBtn}
              >
                <CheckIcon /> Registrarme
              </Button>
            </div>
          </Form>

          {/* Divisor */}
          <div className={styles.divider}>
            <span> o registrarse con </span>
          </div>

          <div className="d-flex gap-3">
            {/* Google */}
            <Button 
              type="button" 
              className={styles.socialBtn}
              onClick={() => handleNotImplemented('Google')}
            >
              <GoogleIcon /> Google
            </Button>

            {/* GitHub */}
            <Button 
              type="button" 
              className={styles.socialBtn}
              onClick={() => handleNotImplemented('GitHub')}
            >
              <GitHubIcon /> GitHub
            </Button>
          </div>

          {/* Login */}
          <p className={styles.footerText}>
            ¿ Si ya tenés una cuenta ?{' '}
            <Link to="/login" className={styles.loginLink}>
              Iniciá sesión acá
            </Link>
          </p>
        </Card.Body>
      </Card>

      <MessageBtnAccept
        isOpen={modalConfig.show}
        onClose={handleCloseModal}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}