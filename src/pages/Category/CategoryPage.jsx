/* ==========================================================================
  Componente CategoryPage.jsx
  Descripción: Pagina para el alta de categorías de productos con ID 
    autogenerado, botón de limpiar y mensaje de confirmación, consumiendo
    del sub-contexto independiente useCategories().
  Autor: Silvio Jorda 
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { CustomFileInput } from '../../components/UI/CustomFileInput/CustomFileInput';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './CategoryPage.module.css';
import '../../styles/Buttons/ActionButtons.css';

export function CategoryPage() {
  // Sub-Contexto de Categorias
  const { addCategory, getNextCategoryId } = useCategories();

  // Proximo ID de Categoria
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Autogeneración del slug al escribir el nombre
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentId = nextId;
    let imageUrl = categoryData.image;

    try {
      setUploading(true);

      // Si se seleccionó un archivo físico, se sube a ImgBB vía API
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
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        image: imageUrl || 'https://via.placeholder.com/300',
        createdAt: new Date().toISOString()
      };

      if (addCategory) {
        addCategory(newCategoryData);
      }

      setSavedCategoryName(categoryData.name);
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

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Alta de Categorías</h1>

          <p className={styles.subtitle}>
            Ingresá los detalles para clasificar e identificar las secciones de productos
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* ID Auto-generado */}
            <Form.Group controlId="id">
              <Form.Label className={styles.label}>ID de Categoría (Auto-generado)</Form.Label>
              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className={styles.readOnlyInput}
              />
            </Form.Group>

            {/* Nombre de la Categoría */}
            <Form.Group controlId="name">
              <Form.Label className={styles.label}>Nombre de la categoría *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={categoryData.name}
                onChange={handleChange}
                placeholder="Ej: Placas de Video"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Slug URL */}
            <Form.Group controlId="slug">
              <Form.Label className={styles.label}>Identificador URL (Slug) *</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={categoryData.slug}
                onChange={handleChange}
                placeholder="Ej: placas-de-video"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Subida de Imagen por Archivo */}
            <CustomFileInput
              controlId="imagenArchivoCategory"
              label={<>Foto o Imagen Representativa <span className="text-muted fw-normal">(Subida a ImgBB)</span></>}
              onChange={handleFileChange}
            />

            {/* O URL directa de Imagen */}
            <Form.Group controlId="image">
              <Form.Label className={styles.label}>
                O ingresar URL directa de la imagen
              </Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={categoryData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className={styles.input}
                disabled={!!imageFile}
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group controlId="description">
              <Form.Label className={styles.label}>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={categoryData.description}
                onChange={handleChange}
                placeholder="Resumen o detalles de los artículos pertenecientes a esta categoría..."
                className={styles.input}
              />
            </Form.Group>

            {/* Botones de Acción */}
            <div className="d-flex gap-3 mt-3">
              <Button
                type="button"
                className="cleanBtn"
                onClick={handleReset}
                disabled={uploading}
              >
                <BroomIcon /> Limpiar
              </Button>

              <Button
                type="submit"
                className="submitBtn"
                onClick={handleSubmit}
                disabled={uploading}
              >
                <CheckIcon /> {uploading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal de confirmación */}
      <MessageBtnAccept
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡ Categoría Registrada !"
        message={`La categoría "${savedCategoryName}" con ID #${savedCategoryId} se cargó correctamente en el sistema.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}