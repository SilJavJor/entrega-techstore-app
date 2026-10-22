/* ==========================================================================
  Componente ProductForm.jsx
  Descripción: Formulario para el registro e ingreso de un nuevo producto con
    subida directa de imágenes a ImgBB mediante API Key. La Descripción es
    opcional.
  Autor: Silvio Jorda 
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useData } from '../../context/DataContext/DataContext';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/CheckIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';
import styles from './ProductForm.module.css';

export function ProductForm() {
  const { addProduct, getNextProductId } = useData();

  // Obtenemos el próximo ID disponible en memoria
  const nextId = getNextProductId ? getNextProductId() : '-';

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [savedProductName, setSavedProductName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Por favor, seleccioná una imagen para el producto.');

      return;
    }

    try {
      setUploading(true);

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
        console.error('Respuesta de error de ImgBB:', data);
        throw new Error(data.error?.message || 'Error al subir la imagen a ImgBB.');
      }

      const imageUrl = data.data.url;

      const newProductData = {
        name: productData.name,
        price: Number(productData.price),
        stock: Number(productData.stock),
        category: productData.category,
        image: imageUrl,
        description: productData.description,
        createdAt: new Date().toISOString()
      };

      if (addProduct) {
        addProduct(newProductData);
      }

      setSavedProductName(productData.name);

      setShowModal(true);

      handleReset();
    } catch (error) {
      console.error('Error durante la carga:', error);
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setProductData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: ''
    });
    setImageFile(null);

    const fileInput = document.getElementById('image');
    if (fileInput) fileInput.value = '';
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Cargar Nuevo Producto</h1>

          <p className={styles.subtitle}>
            Ingresá los detalles e información técnica del nuevo artículo para el catálogo
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* ID Auto-generado */}
            <Form.Group controlId="id">
              <Form.Label className={styles.label}>ID de Producto (Auto-generado)</Form.Label>
              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className={styles.readOnlyInput}
              />
            </Form.Group>

            {/* Nombre del Producto */}
            <Form.Group controlId="name">
              <Form.Label className={styles.label}>Nombre del producto *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Ej: Monitor Curvo 27"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Fila Precio + Stock Inicial */}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="price">
                  <Form.Label className={styles.label}>Precio ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="Ej: 450000"
                    required
                    className={styles.input}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="stock">
                  <Form.Label className={styles.label}>Stock inicial *</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    placeholder="Ej: 15"
                    required
                    className={styles.input}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Categoría */}
            <Form.Group controlId="category">
              <Form.Label className={styles.label}>Categoría *</Form.Label>
              <Form.Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="" disabled>Seleccioná una categoría</option>
                <option value="procesadores">Procesadores</option>
                <option value="placas-video">Placas de Video</option>
                <option value="monitores">Monitores</option>
                <option value="perifericos">Periféricos</option>
                <option value="almacenamiento">Almacenamiento</option>
                <option value="componentes">Componentes PC</option>
              </Form.Select>
            </Form.Group>

            {/* Selector de Imagen */}
            <Form.Group controlId="image">
              <Form.Label className={styles.label}>Imagen del producto *</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Descripción (Campo Opcional) */}
            <Form.Group controlId="description">
              <Form.Label className={styles.label}>
                Descripción <span className="text-muted fw-normal">(Opcional)</span>
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Especificaciones técnicas y detalles del producto (opcional)..."
                className={styles.input}
              />
            </Form.Group>

            {/* Botones de Acción */}
            <div className="d-flex gap-3 mt-3">
              <Button 
                type="button" 
                className={styles.cleanBtn} 
                onClick={handleReset}
                disabled={uploading}
              >
                <BroomIcon /> Limpiar
              </Button>

              <Button 
                type="submit" 
                className={styles.submitBtn}
                disabled={uploading}
              >
                <CheckIcon /> {uploading ? 'Subiendo...' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <MessageBtnAccept
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡ Producto Registrado !"
        message={`El artículo "${savedProductName}" se cargó correctamente con su imagen en ImgBB.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}