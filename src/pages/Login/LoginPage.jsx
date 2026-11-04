/* ==========================================================================
  Componente LoginPage.jsx
  Descripcion: Pagina de inicio de sesión con validación de usuario/admin,
    autenticación y aviso de opciones no implementadas. Desacoplada 
    visualmente mediante el hook useLoginForm
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLoginPage } from './useLoginPage';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { GoogleIcon } from '../../components/UI/Icons/GoogleIcon/GoogleIcon';
import { GitHubIcon } from '../../components/UI/Icons/GitHubIcon/GitHubIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './LoginPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Forms/Titles.css';
import '../../styles/Forms/CheckBoxes.css';
import '../../styles/Forms/Inputs.css';
import '../../styles/Forms/Links.css';
import '../../styles/Buttons/ActionButtons.css';
import '../../styles/Buttons/SocialButtons.css';

export function LoginPage() {
  const {
    formData,
    error,
    modalConfig,
    handleChange,
    handleReset,
    handleSubmit,
    handleNotImplemented,
    handleCloseModal,
    handleCustomInvalid
  } = useLoginPage();

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Iniciar Sesión</h1>

          <p className="subtitle">Ingresá a tu cuenta para gestionar tus compras</p>

          {/* Error de credenciales */}
          {error && (
            <Alert variant="danger" className="text-center py-2 mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Usuario o Email */}
            <Form.Group controlId="identifier">
              <Form.Label className="label">Usuario o Correo electrónico *</Form.Label>

              <Form.Control
                type="text"
                name="identifier"
                autoFocus
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Ej: tuemail@ejemplo.com o Admin"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Ingresá tu usuario o correo electrónico.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Contraseña */}
            <Form.Group controlId="password">
              <Form.Label className="label">Contraseña *</Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••••••"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Ingresá tu contraseña.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Recordarme y Olvidé Contraseña */}
            <div className="d-flex justify-content-between align-items-center mt-1">
              <Form.Check
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={styles.remember}
                label={<span className={styles.rememberText}>Recordarme</span>}
              />

              <button
                type="button"
                className={styles.forgotBtn}
                onClick={() => handleNotImplemented('Recuperación de Contraseña')}
              >
                ¿ Olvidaste tu contraseña ?
              </button>
            </div>

            
            <div className="d-flex gap-3 mt-3">
              {/* Limpiar */}
              <Button type="button" className="cleanBtn" onClick={handleReset}>
                <BroomIcon /> Limpiar
              </Button>

              {/* Ingresar */}
              <Button type="submit" className="submitBtn">
                <CheckIcon /> Ingresar
              </Button>
            </div>
          </Form>

          {/* Divisor */}
          <div className={styles.divider}>
            <span>o ingresar con</span>
          </div>

          
          <div className="d-flex gap-3">
            {/* Google */}
            <Button 
              type="button" className="socialBtn"
              onClick={() => handleNotImplemented('Google')}
            >
              <GoogleIcon /> Google
            </Button>
            {/* Google */}
            <Button 
              type="button" className="socialBtn"
              onClick={() => handleNotImplemented('GitHub')}
            >
              <GitHubIcon /> GitHub
            </Button>
          </div>

          {/* Enlace al Registro */}
          <p className={styles.footerText}>
            ¿ Si no tenés una cuenta ?{' '}
            <Link to="/register" className={styles.registerLink}>
              Registrate acá
            </Link>
          </p>
        </Card.Body>
      </Card>

      {/* Modal para opciones no implementadas */}
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