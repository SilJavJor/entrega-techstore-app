/* ==========================================================================
  Componente BrandsPage.jsx
  Descripción: Página para el alta de Marcas de productos con ID autogenerado,
    consumiendo del subcontexto useBrands().
  Autor: Silvio Jorda 
  Fecha: 2026-11-03
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useBrands } from '../../context/Brands/BrandsContext';
import { CustomFileInput } from '../../components/UI/CustomFileInput/CustomFileInput';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './BrandPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Forms/Titles.css';
import '../../styles/CheckBoxes/CheckBoxes.css';
import '../../styles/Forms/Inputs.css';
import '../../styles/Forms/Links.css';
import '../../styles/Buttons/ActionButtons.css';
import '../../styles/Buttons/SocialButtons.css';

export function BrandPage() {
  // Sub-Contexto de Marcas
  const { addBrand, getNextBrandId } = useBrands();

  // Próximo ID de Marca
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Autogeneración del slug al escribir el nombre
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de seguridad en JS
    if (!formData.name.trim() || !formData.slug.trim()) {
      alert('Por favor, completá el nombre de la marca y su identificador (slug).');
  
      return;
    }

    const currentId = nextId;

    let imageUrl = formData.image;

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

      const newBrandData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        image: imageUrl || 'https://via.placeholder.com/300',
        createdAt: new Date().toISOString()
      };

      if (addBrand) {
        addBrand(newBrandData);
      }

      setSavedBrandName(formData.name);

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

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Alta de Marcas</h1>

          <p className="subtitle">
            Ingresá los detalles para registrar e identificar a los fabricantes de productos
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* ID Auto-generado */}
            <Form.Group controlId="id">
              <Form.Label className="label">ID de Marca (Auto-generado)</Form.Label>

              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className="readOnlyInput"
              />
            </Form.Group>

            {/* Marca */}
            <Form.Group controlId="name">
              <Form.Label className="label">Nombre de la marca *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Asus, Corsair, Logitech..."
                required
                className="input"
              />
            </Form.Group>

            {/* Slug URL */}
            <Form.Group controlId="slug">
              <Form.Label className="label">Identificador URL (Slug) *</Form.Label>

              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Ej: asus, corsair, logitech"
                required
                className="input"
              />
            </Form.Group>

            {/* Subida de Imagen por Archivo */}
            <CustomFileInput
              controlId="imagenArchivoBrand"
              label={<>Logo o Imagen Representativa <span className="text-muted fw-normal">(Subida a ImgBB)</span></>}
              onChange={handleFileChange}
            />

            {/* O URL directa de Imagen */}
            <Form.Group controlId="image">
              <Form.Label className="label">
                O ingresar URL directa del logo/imagen
              </Form.Label>

              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="input"
                disabled={!!imageFile}
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group controlId="description">
              <Form.Label className="label">Descripción</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Resumen o detalles de la marca comercial o fabricante..."
                className="input"
              />
            </Form.Group>

            {/* Limpiar */}
            <div className="d-flex gap-3 mt-3">
              <Button
                type="button" className="cleanBtn" onClick={handleReset}
                  disabled={uploading}
              >
                <BroomIcon /> Limpiar
              </Button>

              <Button
                type="submit" className="submitBtn" disabled={uploading}
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
        title="¡ Marca agregada !"
        message={`La marca "${savedBrandName}" con ID #${savedBrandId} se agregó exitosamente.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}