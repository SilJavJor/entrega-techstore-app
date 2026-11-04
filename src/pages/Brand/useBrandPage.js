/* ==========================================================================
  Hook: useBrandPage.js
  Descripción: Encapsula la lógica de estado, validación y envío de Marcas.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useBrands } from '../../context/Brands/BrandsContext';

export function useBrandPage() {
  const { brands, addBrand, getNextBrandId } = useBrands();

  const nextId = getNextBrandId ? getNextBrandId() : '-';

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  });

  const [imageFile, setImageFile] = useState(null);
  
  const [uploading, setUploading] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  
  const [savedBrandName, setSavedBrandName] = useState('');
  
  const [savedBrandId, setSavedBrandId] = useState('');

  // Personalización de mensajes nativos de HTML5
  const handleCustomInvalid = (e, customMsg, typeMismatchMsg) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(customMsg || 'Por favor, completá este campo.');
    } else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity(typeMismatchMsg || 'El formato ingresado no es válido.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w-]+/g, '');

      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: ''
    });
    setImageFile(null);

    const fileInput = document.getElementById('imagenArchivoBrand');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedSlug = formData.slug.trim();

    if (!trimmedName || !trimmedSlug) {
      alert('El nombre y el slug de la marca no pueden estar vacíos.');
      return;
    }

    const isDuplicate = brands?.some(
      (b) => b.name.toLowerCase() === trimmedName.toLowerCase() || b.slug === trimmedSlug
    );

    if (isDuplicate) {
      alert(`La marca "${trimmedName}" o el slug "${trimmedSlug}" ya existen.`);
      return;
    }

    const currentId = nextId;
    let imageUrl = formData.image;

    try {
      setUploading(true);

      if (imageFile) {
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

        imageUrl = data.data.url;
      }

      const newBrandData = {
        name: trimmedName,
        slug: trimmedSlug,
        description: formData.description.trim(),
        image: imageUrl || 'https://via.placeholder.com/300',
        createdAt: new Date().toISOString()
      };

      if (addBrand) {
        addBrand(newBrandData);
      }

      setSavedBrandName(trimmedName);
      setSavedBrandId(currentId);
      setShowModal(true);
      handleReset();
    } catch (error) {
      console.error('Error al guardar la marca:', error);
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
    savedBrandName,
    savedBrandId,
    handleChange,
    handleFileChange,
    handleReset,
    handleSubmit,
    handleCustomInvalid
  };
}