/* ==========================================================================
  Hook: useTeamForm.js
  Descripción: Encapsula la lógica de estado, validación por capas,
    reseteo y envío de integrantes a ImgBB para TeamPage.
  Autor: Silvio Jorda
  Fecha: 2026-11-04
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useTeam } from '../../context/Teams/TeamsContext';


export function useTeamPage() {
  const { team, addTeamMember, getNextTeamId } = useTeam();

  const nextId = getNextTeamId ? getNextTeamId() : '-';

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

  const [showModal, setShowModal] = useState(false);

  const [savedMemberName, setSavedMemberName] = useState('');

  // Helper para mensajes nativos de HTML5 personalizados
  const handleCustomInvalid = (e, customMsg, typeMismatchMsg) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(customMsg || 'Por favor, completá este campo.');
    } else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity(typeMismatchMsg || 'El formato ingresado no es válido.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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

    const fileInput = document.getElementById('imagen');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedRole = formData.role.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedRole || !trimmedEmail) {
      alert('Por favor, completá los campos obligatorios (Nombre, Rol y Email).');
      return;
    }

    if (!imageFile) {
      alert('Por favor, seleccioná una foto de perfil para el integrante.');
      return;
    }

    // Prevención de duplicados por Email
    const isDuplicate = team?.some(
      (member) => member.email?.toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (isDuplicate) {
      alert(`El integrante con el correo "${trimmedEmail}" ya se encuentra registrado.`);
      return;
    }

    try {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error('La API Key de ImgBB no está definida en el archivo .env');
      }

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: uploadData
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Error al subir la imagen a ImgBB.');
      }

      const imageUrl = data.data.url;

      if (addTeamMember) {
        addTeamMember({
          name: trimmedName,
          role: trimmedRole,
          email: trimmedEmail,
          linkedin: formData.linkedin.trim(),
          github: formData.github.trim(),
          photo: imageUrl,
          bio: formData.bio.trim()
        });
      }

      setSavedMemberName(trimmedName);
 
      setShowModal(true);
 
      handleReset();
    } catch (error) {
      console.error('Error durante la carga:', error);
 
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    nextId,
    formData,
    imageFile,
    uploading,
    showModal,
    setShowModal,
    savedMemberName,
    handleChange,
    handleFileChange,
    handleReset,
    handleSubmit,
    handleCustomInvalid
  };
}