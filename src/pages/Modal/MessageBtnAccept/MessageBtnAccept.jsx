/* ==========================================================================
  Componente Modal.jsx
  Descripción: Ventana emergente con mensaje personalizado y botón centrado.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { CheckIcon } from '../../../components/UI/Icons/CheckIcon/CheckIcon';

// Estilos
import styles from './MessageBtnAccept.module.css';

export function MessageBtnAccept({ isOpen, onClose, title = 'Atención', message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.message}>{message}</p>

        <div className={styles.buttonContainer}>
          <button className={styles.acceptBtn} onClick={onClose}>
            <CheckIcon /> Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}