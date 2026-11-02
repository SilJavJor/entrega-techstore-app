/* ==========================================================================
  Componente LoginForm.jsx
  Descripcion: Pagina de inicio de sesión con validación de usuario/admin,
    autenticación y aviso de opciones no implementadas.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { GoogleIcon } from '../../components/UI/Icons/GoogleIcon/GoogleIcon';
import { GitHubIcon } from '../../components/UI/Icons/GitHubIcon/GitHubIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './LoginPage.module.css';
import '../../styles/CheckBoxes/CheckBoxes.css';
import '../../styles/Buttons/ActionButtons.css';
import '../../styles/Buttons/SocialButtons.css';

export function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false
  });

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
      identifier: '',
      password: '',
      rememberMe: false
    });
    setError('');
  };

  const handleNotImplemented = (featureName) => {
    setModalConfig({
      show: true,
      title: '¡ Función No Implementada !',
      message: `La opción de ${featureName} no se encuentra disponible actualmente en esta versión de desarrollo.`
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(formData.identifier, formData.password);

    if (success) {
      navigate('/products');
    } else {
      setError('Usuario o contraseña incorrectos. Verificá tus credenciales.');
    }
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, title: '', message: '' });
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Iniciar Sesión</h1>

          <p className={styles.subtitle}>Ingresá a tu cuenta para gestionar tus compras</p>

          {/* Error de  credenciales */}
          {error && (
            <Alert variant="danger" className="text-center py-2 mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Usuario o Email */}
            <Form.Group controlId="identifier">
              <Form.Label className={styles.label}>Usuario o Correo electrónico *</Form.Label>

              <Form.Control
                type="text"
                name="identifier"
                autoFocus
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Ej: tuemail@ejemplo.com o Admin"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Contraseña */}
            <Form.Group controlId="password">
              <Form.Label className={styles.label}>Contraseña *</Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••••••"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Recordarme */}
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
              type="button" 
              className="socialBtn"
              onClick={() => handleNotImplemented('Google')}
            >
              <GoogleIcon /> Google
            </Button>

            
            {/* GitHub */}
            <Button 
              type="button"
              className="socialBtn"
              onClick={() => handleNotImplemented('GitHub')}
            >
              <GitHubIcon /> GitHub
            </Button>
          </div>

          {/* Registrarse */}
          <p className={styles.footerText}>
            ¿ Si no tenés una cuenta ?{' '}

            <Link to="/register" className={styles.registerLink}>
              Registrate acá
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