/* ==========================================================================
  Componente CategoryPage.jsx
  Descripción: Pagina para el Alta de Categorías desacoplada mediante 
    useCategoryPage.
  Autor: Silvio Jorda 
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useCategoryPage } from './useCategoryPage';
import { CustomFileInput } from '../../components/UI/CustomFileInput/CustomFileInput';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './CategoryPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Titles/Titles.css';
import '../../styles/Inputs/Inputs.css';
import '../../styles/Buttons/ActionButtons.css';

export function CategoryPage() {
  const {
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
  } = useCategoryPage();

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Alta de Categorías</h1>

          <p className="subtitle">
            Ingresá los detalles para clasificar e identificar las secciones de productos
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group controlId="id">
              <Form.Label className="label">ID de Categoría (Auto-generado)</Form.Label>

              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className="readOnlyInput"
              />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label className="label">Nombre de la categoría *</Form.Label>

              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={categoryData.name}
                onChange={handleChange}
                placeholder="Ej: Placas de Video"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Ingresá el nombre de la categoría.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            <Form.Group controlId="slug">
              <Form.Label className="label">Identificador URL (Slug) *</Form.Label>

              <Form.Control
                type="text"
                name="slug"
                value={categoryData.slug}
                onChange={handleChange}
                placeholder="Ej: placas-de-video"
                required
                className="input"
                onInvalid={(e) => handleCustomInvalid(e, 'Ingresá un identificador slug válido.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            <CustomFileInput
              controlId="archiveImage"
              label={<>Foto o Imagen Representativa <span className="text-muted fw-normal">(Subida a ImgBB)</span></>}
              onChange={handleFileChange}
            />

            <Form.Group controlId="image">
              <Form.Label className="label">O ingresar URL directa de la imagen</Form.Label>

              <Form.Control
                type="url"
                name="image"
                value={categoryData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="input"
                disabled={!!imageFile}
                onInvalid={(e) => handleCustomInvalid(e, null, 'Por favor, ingresá una URL válida (http:// o https://).')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="label">Descripción</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={categoryData.description}
                onChange={handleChange}
                placeholder="Resumen o detalles de los artículos..."
                className="input"
              />
            </Form.Group>

            <div className="d-flex gap-3 mt-3">
              <Button type="button" className="cleanBtn" onClick={handleReset} disabled={uploading}>
                <BroomIcon /> Limpiar
              </Button>

              <Button type="submit" className="submitBtn" disabled={uploading}>
                <CheckIcon /> {uploading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <MessageBtnAccept
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡ Categoría Registrada !"
        message={`La categoría "${savedCategoryName}" con ID #${savedCategoryId} se cargó correctamente.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}