/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y barra de navegación 
    reutilizable para cualquier listado.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

// Importaciones
/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y barra de navegación alineados
    en la misma fila horizontal.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y barra de navegación alineados
    horizontalmente sin errores de sintaxis en JSX.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y barra de navegación alineados
    a la derecha.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y barra de navegación agrupados
    lado a lado en el extremo derecho.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y barra de navegación agrupados
    lado a lado en el extremo derecho.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

/* ==========================================================================
  Componente: PaginationBar.jsx
  Descripción: Selector de cantidad por página y botones de paginación
    alineados horizontalmente y sin márgenes verticales desequilibrantes.
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

import { Form, Pagination } from 'react-bootstrap';
import styles from './PaginationBar.module.css';

export function PaginationBar({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  options = [4, 8, 12, 16],
  showSelect = true
}) {
  return (
    <div className="d-flex align-items-center justify-content-end gap-2 mb-0">
      {/* Selector de cantidad por página */}
      {showSelect && totalItems > 0 && (
        <div className="d-flex align-items-center gap-2 text-nowrap">
          <Form.Label htmlFor="itemsPerPageSelect" className={`mb-0 ${styles.selectLabel}`}>
            Mostrar:
          </Form.Label>

          <Form.Select
            id="itemsPerPageSelect"
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className={styles.selectControl}
            size="sm"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
            <option value="all">Todos ({totalItems})</option>
          </Form.Select>
        </div>
      )}

      {/* Botones de navegación */}
      {totalPages > 1 && (
        <div className="d-flex align-items-center">
          <Pagination className={`mb-0 ${styles.paginationCustom}`}>
            <Pagination.First
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}

            <Pagination.Next
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}