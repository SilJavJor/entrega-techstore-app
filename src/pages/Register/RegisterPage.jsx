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
/* ==========================================================================
  Componente RegisterPage.jsx
  Descripción: Formulario de registro desacoplado visualmente mediante el hook
    useRegisterForm y estandarizado con clases globales de botones y validación HTML5.
  Autor: Silvio Jorda
  Fecha: 2026-11-04
========================================================================== */

import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useRegisterPage } from './useRegisterPage';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { GoogleIcon } from '../../components/UI/Icons/GoogleIcon/GoogleIcon';
import { GitHubIcon } from '../../components/UI/Icons/GitHubIcon/GitHubIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

import styles from './RegisterPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Forms/Titles.css';
import '../../styles/Forms/CheckBoxes.css';
import '../../styles/Forms/Inputs.css';
import '../../styles/Forms/Links.css';
import '../../styles/Buttons/ActionButtons.css';
import '../../styles/Buttons/SocialButtons.css';

export function RegisterPage() {
  const {
    formData,
    modalConfig,
    handleChange,
    handleReset,
    handleSubmit,
    handleNotImplemented,
    handleCloseModal,
    handleCustomInvalid
  } = useRegisterPage();

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Crear Cuenta</h1>

          <p className="subtitle">Completá tus datos para registrarte en TechStore</p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Nombre Completo */}
            <Form.Group controlId="name">
              <Form.Label className="label">Nombre completo *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Ingresá tu nombre completo.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Correo Electrónico */}
            <Form.Group controlId="email">
              <Form.Label className="label">Correo electrónico *</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: juan.perez@email.com"
                required
                className="input"
                onInvalid={(e) =>
                  handleCustomInvalid(
                    e,
                    'Ingresá un correo electrónico.',
                    'Ingresá un correo electrónico válido.'
                  )
                }
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Fila Contraseña + Confirmar Contraseña */}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label className="label">Contraseña *</Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    required
                    className="input"
                    onInvalid={(e) => handleCustomInvalid(e, 'Ingresá una contraseña.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="confirmPassword">
                  <Form.Label className="label">Confirmar contraseña *</Form.Label>

                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repetí tu contraseña"
                    required
                    className="input"
                    onInvalid={(e) => handleCustomInvalid(e, 'Confirmá tu contraseña.')}
                    onInput={(e) => e.target.setCustomValidity('')}
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
                className="checkInput"
                onInvalid={(e) =>
                  handleCustomInvalid(e, 'Debés aceptar los términos y condiciones para continuar.')
                }
                onInput={(e) => e.target.setCustomValidity('')}
                label={
                  <span className={styles.termsText}>
                    Acepto los{' '}
                    <a
                      href="#terms"
                      className="linkTo"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNotImplemented('Términos y Condiciones');
                      }}
                    >
                      Términos y Condiciones
                    </a>
                  </span>
                }
              />
            </Form.Group>

            {/* Botones de Acción */}
            <div className="d-flex gap-3 mt-3">
              {/* Limpiar */}
              <Button type="button" className="cleanBtn" onClick={handleReset}>
                <BroomIcon /> Limpiar
              </Button>

              {/* Registrarme */}
              <Button type="submit" className="submitBtn">
                <CheckIcon /> Registrarme
              </Button>
            </div>
          </Form>

          {/* Divisor */}
          <div className={styles.divider}>
            <span> o registrarse con </span>
          </div>

          {/* Botones Sociales */}
          <div className="d-flex gap-3">
            {/* Google */}
            <Button
              type="button" className="socialBtn"
              onClick={() => handleNotImplemented('Google')}
            >
              <GoogleIcon /> Google
            </Button>

          {/* GitHub */}
            <Button
              type="button" className="socialBtn"
              onClick={() => handleNotImplemented('GitHub')}
            >
              <GitHubIcon /> GitHub
            </Button>
          </div>

          {/* Login */}
          <p className={styles.footerText}>
            ¿ Si ya tenés una cuenta ?{' '}
            <Link to="/login" className="linkTo">
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