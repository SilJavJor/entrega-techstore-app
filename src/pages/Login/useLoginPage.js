/* ==========================================================================
  Hook: useLoginPage.js
  Descripción: Encapsula la lógica de estado, validación por capas,
    reseteo, modal de funciones no implementadas y autenticación del Login.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';

export function useLoginPage() {
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

  // Helper para mensajes nativos de HTML5 personalizados
  const handleCustomInvalid = (e, customMsg) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(customMsg || 'Por favor, completá este campo.');
    }
  };

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

    const trimmedIdentifier = formData.identifier.trim();

    const trimmedPassword = formData.password.trim();

    if (!trimmedIdentifier || !trimmedPassword) {
      setError('Por favor, ingresá tu usuario y contraseña.');

      return;
    }

    const success = login(trimmedIdentifier, trimmedPassword);

    if (success) {
      navigate('/products');
    } else {
      setError('Usuario o contraseña incorrectos. Verificá tus credenciales.');
    }
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, title: '', message: '' });
  };

  return {
    formData,
    error,
    modalConfig,
    handleChange,
    handleReset,
    handleSubmit,
    handleNotImplemented,
    handleCloseModal,
    handleCustomInvalid
  };
}