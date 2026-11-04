/* ==========================================================================
  Componente ProductPage.jsx
  Descripción: Pagina para el alta de productos. Obtiene dinámicamente las 
    categorías registradas consumiendo useCategories() y guarda el producto 
    utilizando useProducts(). Guarda directamente las imágenes en ImgBB 
    mediante API Key. La Descripción es opcional.
  Autor: Silvio Jorda 
  Date: 2026-09-30
========================================================================== */

// Importaciones
/* ==========================================================================
  Componente ProductPage.jsx
  Descripción: Formulario de alta de productos con selección de Categorías y Marcas.
========================================================================== */

// Importaciones
import { Container, Card, Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useProductPage } from './useProductPage';
import { CustomFileInput } from '../../components/UI/CustomFileInput/CustomFileInput';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './ProductPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Forms/Titles.css';
import '../../styles/Forms/Inputs.css';
import '../../styles/Buttons/ActionButtons.css';

export function ProductPage() {
  const {
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
  } = useProductPage();

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Alta de Productos</h1>

          <p className="subtitle">
            Completá la información básica para incorporar el artículo al catálogo
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* ID Auto-generado */}
            <Form.Group controlId="id">
              <Form.Label className="label">ID de Producto (Auto-generado)</Form.Label>

              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className="readOnlyInput"
              />
            </Form.Group>

            {/* Nombre del Producto */}
            <Form.Group controlId="name">
              <Form.Label className="label">Nombre del Producto *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={productData.name}
                onChange={handleChange}
                placeholder="Ej: Monitor Gamer LG 27 UltraGear"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Por favor, ingresá el nombre del producto.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Marca y Categoría */}
            <Row className="g-3">
              {/* Marca */}
              <Col md={6}>
                <Form.Group controlId="brand">
                  <Form.Label className="label">Marca *</Form.Label>

                  {loadingBrands ? (
                    <div className="d-flex align-items-center gap-2 py-2">
                      <Spinner animation="border" size="sm" style={{ color: '#8de2d6' }} />

                      <span className="text-muted small">Cargando...</span>
                    </div>
                  ) : errorBrands ? (
                    <Alert variant="danger" className="py-2 mb-0 small">
                      Error: {errorBrands}
                    </Alert>
                  ) : (
                    <Form.Select
                      name="brand"
                      value={productData.brand}
                      onChange={handleChange}
                      required
                      className="input"
                      onInvalid={(e) => handleCustomInvalid(e, 'Seleccioná una marca de la lista.')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    >
                      <option value="">Seleccioná una marca...</option>
                      {brands &&
                        brands.map((b, index) => {
                          const brandName =
                            typeof b === 'string'
                              ? b
                              : b.name || b.nombre || b.slug || `Marca #${b.id || index}`;
                          const brandKey = typeof b === 'object' && b.id ? b.id : index;

                          return (
                            <option key={brandKey} value={brandName}>
                              {brandName}
                            </option>
                          );
                        })}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>

              {/* Categoría */}
              <Col md={6}>
                <Form.Group controlId="category">
                  <Form.Label className="label">Categoría *</Form.Label>

                  {loadingCategories ? (
                    <div className="d-flex align-items-center gap-2 py-2">
                      <Spinner animation="border" size="sm" style={{ color: '#8de2d6' }} />
                      <span className="text-muted small">Cargando...</span>
                    </div>
                  ) : errorCategories ? (
                    <Alert variant="danger" className="py-2 mb-0 small">
                      Error: {errorCategories}
                    </Alert>
                  ) : (
                    <Form.Select
                      name="category"
                      value={productData.category}
                      onChange={handleChange}
                      required
                      className="input"
                      onInvalid={(e) => handleCustomInvalid(e, 'Seleccioná una categoría.')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    >
                      <option value="">Seleccioná una categoría...</option>
                      {categories &&
                        categories.map((cat, index) => {
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
              </Col>
            </Row>

            {/* Precio y Stock */}
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
                    className="input"
                    onInvalid={(e) => handleCustomInvalid(e, 'Ingresá el precio del producto.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="stock">
                  <Form.Label className="label">Stock Disponible *</Form.Label>

                  <Form.Control
                    type="number"
                    min="0"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    placeholder="Ej: 15"
                    required
                    className="input"
                    onInvalid={(e) => handleCustomInvalid(e, 'Ingresá el stock inicial disponible.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Subida de Imagen por Archivo */}
            <CustomFileInput
              controlId="archiveImage"
              label={<>Imagen de Producto <span className="text-muted fw-normal">(Subida a ImgBB)</span></>}
              onChange={handleFileChange}
            />

            {/* O URL directa de Imagen */}
            <Form.Group controlId="image">
              <Form.Label className="label">O ingresar URL directa de la imagen</Form.Label>

              <Form.Control
                type="url"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="input"
                disabled={!!imageFile}
                onInvalid={(e) => handleCustomInvalid(e, null, 'Ingresá una URL de imagen válida.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group controlId="description">
              <Form.Label className="label">Descripción del Producto</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Especificaciones técnicas y detalles..."
                className="input"
              />
            </Form.Group>


            <div className="d-flex gap-3 mt-3">

              {/* Botones de Acción */}
              <Button type="button" className="cleanBtn" onClick={handleReset} disabled={uploading}>
                <BroomIcon /> Limpiar
              </Button>

              {/* Guardar */}
              <Button type="submit" className="submitBtn" disabled={uploading}>
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
        title="¡ Producto Registrado !"
        message={`El producto "${savedProductName}" con ID #${savedProductId} se cargó exitosamente con su categoría y marca.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}