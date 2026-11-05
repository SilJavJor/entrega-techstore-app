/* ==========================================================================
  Componente BrandsPage.jsx
  Descripción: Página para el alta de Marcas desacoplada de la lógica mediante
   useBrandPage.
  Autor: Silvio Jorda 
  Fecha: 2026-11-03
========================================================================== */

// Importaciones
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useBrandPage } from './useBrandPage';
import { CustomFileInput } from '../../components/UI/CustomFileInput/CustomFileInput';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// Estilos
import styles from './BrandPage.module.css';
import '../../styles/Forms/Globals.css';
import '../../styles/Titles/Titles.css';
import '../../styles/Inputs/Inputs.css';
import '../../styles/Buttons/ActionButtons.css';

export function BrandPage() {
  const {
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
  } = useBrandPage();

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className="title">Alta de Marcas</h1>

          <p className="subtitle">
            Ingresá los detalles para registrar e identificar a los fabricantes de productos
          </p>

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group controlId="id">
              <Form.Label className="label">ID de Marca (Auto-generado)</Form.Label>

              <Form.Control
                type="text"
                value={`# ${nextId}`}
                readOnly
                className="readOnlyInput"
              />
            </Form.Group>

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
                onInvalid={(e) => handleCustomInvalid(e, 'Por favor, ingresá el nombre de la marca.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

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
                onInvalid={(e) => handleCustomInvalid(e, 'Ingresá un slug válido.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            <CustomFileInput
              controlId="archiveImage"
              label={<>Logo o Imagen Representativa <span className="text-muted fw-normal">(Subida a ImgBB)</span></>}
              onChange={handleFileChange}
            />

            <Form.Group controlId="image">
              <Form.Label className="label">O ingresar URL directa del logo/imagen</Form.Label>

              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="input"
                disabled={!!imageFile}
                onInvalid={(e) => handleCustomInvalid(e, null, 'Ingresá una URL de imagen válida.')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="label">Descripción</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Resumen o detalles de la marca..."
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
        title="¡ Marca agregada !"
        message={`La marca "${savedBrandName}" con ID #${savedBrandId} se agregó exitosamente.`}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}