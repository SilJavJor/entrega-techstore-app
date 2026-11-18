/* ==========================================================================
  Hook: useProductPage.js
  Descripción: Encapsula la lógica de estado, categorías, marcas, validación por capas
    y alta de productos con ImgBB.
  Autor: Silvio Jorda
  Fecha: 2026-11-04
========================================================================== */

// Importaciones
import { useState } from 'react';

// Contextos
import { useProducts } from '../../context/Products/ProductsContext';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { useBrands } from '../../context/Brands/BrandsContext';

export function useProductPage() {
  const { addProduct, getNextProductId } = useProducts();

  const { categories, loadingCategories, errorCategories } = useCategories();

  const { brands, loadingBrands, errorBrands } = useBrands();

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

  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: '',
    message: ''
  });

  const closeModal = () => setModalConfig({ show: false, title: '', message: '' });

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

    const fileInput = document.getElementById('archiveImage');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = productData.name.trim();

    if (!trimmedName) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'El nombre del producto no puede estar vacío.'
      });
      return;
    }

    if (!productData.brand) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'Por favor, seleccioná una marca para el producto.'
      });
      return;
    }

    if (!productData.category) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'Por favor, seleccioná una categoría para el producto.'
      });
      return;
    }

    const numericPrice = Number(productData.price);
    const numericStock = Number(productData.stock);

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setModalConfig({
        show: true,
        title: '¡ Precio Inválido !',
        message: 'El precio del producto debe ser mayor a $ 0.'
      });
      return;
    }

    if (Number.isNaN(numericStock) || numericStock < 0) {
      setModalConfig({
        show: true,
        title: '¡ Stock Inválido !',
        message: 'El stock disponible no puede ser negativo.'
      });
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
          brand: productData.brand,
          price: numericPrice,
          stock: numericStock,
          image: imageUrl || 'https://via.placeholder.com/300',
          description: productData.description.trim()
        });
      }

      setModalConfig({
        show: true,
        title: '¡ Producto Registrado !',
        message: `El producto "${trimmedName}" con ID #${currentId} se cargó exitosamente con su categoría y marca.`
      });

      handleReset();
    } catch (error) {
      console.error('Error al guardar el producto:', error);

      setModalConfig({
        show: true,
        title: '¡ Error !',
        message: `Ocurrió un error: ${error.message}`
      });
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
    modalConfig,
    closeModal,
    handleChange,
    handleFileChange,
    handleReset,
    handleSubmit,
    handleCustomInvalid
  };
}