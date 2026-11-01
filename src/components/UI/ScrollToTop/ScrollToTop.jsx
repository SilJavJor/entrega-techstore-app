/* ==========================================================================
  Componente ScrollToTop.jsx
  Descripcion: 
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Se muestra a mas de 200px del inicio de la página
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className={styles.scrollTopBtn}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}