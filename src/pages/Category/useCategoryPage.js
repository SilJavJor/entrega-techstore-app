/* ==========================================================================
  Hook: useCategoryPage.js
  Descripción: Encapsula la lógica de estado, validación por capas,
    duplicados y envío a ImgBB para el alta de categorías.
  Autor: Silvio Jorda
  Fecha: 2026-11-04
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useCategories } from '../../context/Categories/CategoriesContext';

export function useCategoryPage() {
  const { categories, addCategory, getNextCategoryId } = useCategories();
 
  const nextId = getNextCategoryId ? getNextCategoryId() : '-';

  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [savedCategoryName, setSavedCategoryName] = useState('');

  const [savedCategoryId, setSavedCategoryId] = useState('');

  // Helper de mensajes nativos HTML5
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

      setCategoryData((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug
      }));
    } else {
      setCategoryData((prev) => ({
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
    setCategoryData({
      name: '',
      slug: '',
      description: '',
      image: ''
    });
    setImageFile(null);

    const fileInput = document.getElementById('imagenArchivoCategory');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = categoryData.name.trim();
 
    const trimmedSlug = categoryData.slug.trim();

    if (!trimmedName || !trimmedSlug) {
      alert('El nombre de la categoría y su slug no pueden estar vacíos.');
      return;
    }

    const isDuplicate = categories?.some(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase() || c.slug === trimmedSlug
    );

    if (isDuplicate) {
      alert(`La categoría "${trimmedName}" o el slug "${trimmedSlug}" ya existen en el sistema.`);
      return;
    }

    const currentId = nextId;
    let imageUrl = categoryData.image;

    try {
      setUploading(true);

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        if (!apiKey) {
          throw new Error('La API Key de ImgBB no está definida en el archivo .env');
        }

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error?.message || 'Error al subir la imagen a ImgBB.');
        }

        imageUrl = data.data.url;
      }

      const newCategoryData = {
        name: trimmedName,
        slug: trimmedSlug,
        description: categoryData.description.trim(),
        image: imageUrl || 'https://via.placeholder.com/300',
        createdAt: new Date().toISOString()
      };

      if (addCategory) {
        addCategory(newCategoryData);
      }

      setSavedCategoryName(trimmedName);

      setSavedCategoryId(currentId);

      setShowModal(true);

      handleReset();
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    nextId,
    categoryData,
    imageFile,
    uploading,
    showModal,
    setShowModal,
    savedCategoryName,
    savedCategoryId,
    handleChange,
    handleFileChange,
    handleReset,
    handleSubmit,
    handleCustomInvalid
  };
}