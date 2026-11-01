/* ==========================================================================
  Componente CustomFileInput.jsx
  Descripcion: Campo selector de archivos reutilizable.
    ProductPage, TEamPage, etc.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { Form } from 'react-bootstrap';
import styles from './CustomFileInput.module.css';

export function CustomFileInput({ label, onChange, controlId = "imagenArchivo", disabled = false }) {
  return (
    <Form.Group controlId={controlId}>
      {label && <Form.Label className={styles.label}>{label}</Form.Label>}

      <Form.Control type="file" accept="image/*" onChange={onChange} disabled={disabled} className={styles.input} />
    </Form.Group>
  );
}