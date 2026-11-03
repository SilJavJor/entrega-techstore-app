/* ==========================================================================
  Componente ProductPage.jsx
  Descripción: Pagina para la carga de productos. Obtiene dinámicamente
    las categorías registradas consumiendo useCategories() y guarda el 
    producto utilizando useProducts(). Guarda directamente las imágenes en 
    ImgBB mediante API Key. La Descripción es opcional.
  Autor: Silvio Jorda 
  Date: 2026-09-30
========================================================================== */

// Importaciones
/* ==========================================================================
  Componente ProductPage.jsx
  Descripción: Pagina para la carga de productos. Obtiene dinámicamente
    las categorías registradas consumiendo useCategories() y guarda el 
    producto utilizando useProducts(). Guarda directamente las imágenes en 
    ImgBB mediante API Key. La Descripción es opcional.
  Autor: Silvio Jorda 
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useProducts } from '../../context/Products/ProductsContext';
import { useCategories } from '../../context/Categories/CategoriesContext';
import { CustomFileInput } from '../../components/UI/CustomFileInput/CustomFileInput';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './ProductPage.module.css';
import '../../styles/Buttons/ActionButtons.css';

export function ProductPage() {
  // Sub-Contexto de Productos
  const { addProduct, getNextProductId } = useProducts();

  // Sub-Contextos de Categorias
  const { categories, loadingCategories, errorCategories } = useCategories();

  // Proximo ID de producto
  const nextId = getNextProductId ? getNextProductId() : '-';

  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [savedProductName, setSavedProductName] = useState('');

  const [savedProductId, setSavedProductId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.category) {
      alert('Por favor, seleccioná una categoría para el producto.');
      return;
    }

    const currentId = nextId;
    let imageUrl = productData.image;

    try {
      setUploading(true);

      // Si subió un archivo físico de imagen, se envía a ImgBB
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
          name: productData.name,
          category: productData.category,
          price: Number(productData.price),
          stock: Number(productData.stock),
          image: imageUrl || 'https://via.placeholder.com/300',
          description: productData.description
        });
      }

      setSavedProductName(productData.name);

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

  const handleReset = () => {
    setProductData({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: '',
      description: ''
    });
    setImageFile(null);

    setErrors({});

    const fileInput = document.getElementById('imagenArchivo');

    if (fileInput) fileInput.value = '';
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Alta de Productos</h1>

          <p className={styles.subtitle}>
            Completá la información básica para incorporar el artículo al catálogo
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

            {/* Nombre */}
            <Form.Group controlId="name">
              <Form.Label className={styles.label}>Nombre del Producto *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={productData.name}
                onChange={handleChange}
                placeholder="Ej: Monitor Gamer LG 27 UltraGear"
                required
                className={styles.input}
              />
            </Form.Group>

            {/* Categoría  */}
            <Form.Group controlId="category">
              <Form.Label className={styles.label}>Categoría *</Form.Label>

              {loadingCategories ? (
                <div className="d-flex align-items-center gap-2 py-2">
                  <Spinner animation="border" size="sm" style={{ color: '#8de2d6' }} />
                  <span className="text-muted small">Cargando categorías...</span>
                </div>
              ) : errorCategories ? (
                <Alert variant="danger" className="py-2 mb-0 small">
                  Error al cargar categorías: {errorCategories}
                </Alert>
              ) : (
                <Form.Select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                  className={styles.input}
                >
                  <option value="">Seleccioná una categoría...</option>
                  {categories &&
                    categories.map((cat, index) => {
                      // Extracción segura garantizando tipo string
                      const catName =
                        typeof cat === 'string'
                          ? cat
                          : cat.name || cat.nombre || cat.slug || `Categoría #${cat.id || index}`;

                      const catKey = typeof cat === 'object' && cat.id ? cat.id : index;

                      return (
                        <option key={catKey} value={catName}>
                          {catName}
                        </option>
                      );
                    })}
                </Form.Select>
              )}
            </Form.Group>

            <Row className="g-3">
              {/* Precio */}
              <Col md={6}>
                <Form.Group controlId="price">
                  <Form.Label className={styles.label}>Precio ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="Ej: 350000"
                    required
                    className={styles.input}
                  />
                </Form.Group>
              </Col>

              {/* Stock */}
              <Col md={6}>
                <Form.Group controlId="stock">
                  <Form.Label className={styles.label}>Stock Disponible *</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
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

            {/* Subida de Imagen por Archivo */}
            <CustomFileInput
              controlId="imagenArchivo"
              label={<>Imagen de Producto <span className="text-muted fw-normal">(Subida a ImgBB)</span></>}
              onChange={handleFileChange}
            />

            {/* URL de la imagen */}
            <Form.Group controlId="image">
              <Form.Label className={styles.label}>
                O ingresar URL directa de la imagen
              </Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="https://..."
                className={styles.input}
                disabled={!!imageFile}
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group controlId="description">
              <Form.Label className={styles.label}>Descripción del Producto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Especificaciones técnicas y detalles del artículo..."
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
                <CheckIcon /> {uploading ? 'Guardando...' : 'Guardar Producto'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal de confirmación */}
      <MessageBtnAccept
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡ Producto Registrado !"
        message={`El producto "${savedProductName}" con ID #${savedProductId} se cargó exitosamente en la categoría seleccionada.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}