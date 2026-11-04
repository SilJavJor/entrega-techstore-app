/* ==========================================================================
  Hook: useProductPage.js
  Descripción: Encapsula la lógica de estado, categorías, marcas, validación por capas
    y alta de productos con ImgBB.
  Autor: Silvio Jorda
  Fecha: 2026-11-04
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useProducts } from '../../context/Products/ProductsContext';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { useBrands } from '../../context/Brands/BrandsContext'; // <-- Importación de Marcas

export function useProductPage() {
  const { addProduct, getNextProductId } = useProducts();

  const { categories, loadingCategories, errorCategories } = useCategories();

  const { brands, loadingBrands, errorBrands } = useBrands(); // <-- Sub-contexto de Marcas

  const nextId = getNextProductId ? getNextProductId() : '-';

  const [productData, setProductData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [savedProductName, setSavedProductName] = useState('');

  const [savedProductId, setSavedProductId] = useState('');

  const handleCustomInvalid = (e, customMsg, typeMismatchMsg) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(customMsg || 'Por favor, completá este campo.');
    } else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity(typeMismatchMsg || 'El formato ingresado no es válido.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setProductData({
      name: '',
      category: '',
      brand: '',
      price: '',
      stock: '',
      image: '',
      description: ''
    });
    setImageFile(null);

    const fileInput = document.getElementById('imagenArchivo');

    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = productData.name.trim();

    if (!trimmedName) {
      alert('El nombre del producto no puede estar vacío.');

      return;
    }

    if (!productData.category) {
      alert('Por favor, seleccioná una categoría para el producto.');

      return;
    }

    if (!productData.brand) {
      alert('Por favor, seleccioná una marca para el producto.');

      return;
    }

    const currentId = nextId;

    let imageUrl = productData.image;

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

      if (addProduct) {
        addProduct({
          name: trimmedName,
          category: productData.category,
          brand: productData.brand, // <-- Se persiste la Marca seleccionada
          price: Number(productData.price),
          stock: Number(productData.stock),
          image: imageUrl || 'https://via.placeholder.com/300',
          description: productData.description.trim()
        });
      }

      setSavedProductName(trimmedName);

      setSavedProductId(currentId);

      setShowModal(true);

      handleReset();
    } catch (error) {
      console.error('Error al guardar el producto:', error);

      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    nextId,
    productData,
    categories,
    loadingCategories,
    errorCategories,
    brands,
    loadingBrands,
    errorBrands,
    imageFile,
    uploading,
    showModal,
    setShowModal,
    savedProductName,
    savedProductId,
    handleChange,
    handleFileChange,
    handleReset,
    handleSubmit,
    handleCustomInvalid
  };
}