/* ==========================================================================
  Hook: useContactUsPage.js
  Descripción: Encapsula el estado y las acciones del formulario de contacto.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

import { useState } from 'react';

export function useContactUsPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    handleReset();
  };

  return {
    formData,
    showModal,
    handleChange,
    handleReset,
    handleSubmit,
    handleCloseModal
  };
}