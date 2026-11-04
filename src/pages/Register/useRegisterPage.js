/* ==========================================================================
  Hook: useRegisterPage.js
  Descripción: Encapsula la lógica de estado, validación por capas,
    confirmación de contraseña y modales de funciones no implementadas.
  Autor: Silvio Jorda
  Fecha: 2026-11-04
========================================================================== */

import { useState } from 'react';

export function useRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: '',
    message: ''
  });

  // Helper para mensajes nativos de HTML5 personalizados
  const handleCustomInvalid = (e, customMsg, typeMismatchMsg) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(customMsg || 'Por favor, completá este campo.');
    } else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity(typeMismatchMsg || 'El formato ingresado no es válido.');
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

    handleNotImplemented('este Formulario');
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, title: '', message: '' });
  };

  return {
    formData,
    modalConfig,
    handleChange,
    handleReset,
    handleSubmit,
    handleNotImplemented,
    handleCloseModal,
    handleCustomInvalid
  };
}