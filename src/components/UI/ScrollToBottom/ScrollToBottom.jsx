/* ==========================================================================
  Componente ScrollToBottom.jsx
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { useState, useEffect } from 'react';
import styles from './ScrollToBottom.module.css';

export function ScrollToBottom() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const windowHeight = window.innerHeight;

      const fullHeight = document.documentElement.scrollHeight;

      const currentScroll = window.scrollY;

      // Se oculta a menos de 200px del final de la página
      if (windowHeight + currentScroll >= fullHeight - 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className={styles.scrollBottomBtn}
      onClick={scrollToBottom}
      aria-label="Ir abajo"
    >
      ↓
    </button>
  );
}