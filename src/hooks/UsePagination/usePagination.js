/* ==========================================================================
  Hook: usePagination.js
  Descripción: Hook personalizado reutilizable para paginar cualquier arreglo 
    de datos (productos, categorías, marcas, etc.).
  Autor: Silvio Jorda
  Fecha: 2026-10-21
========================================================================== */

// Importaciones
import { useState, useEffect } from 'react';

export function usePagination(items = [], defaultItemsPerPage = 8) {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  
  const [currentPage, setCurrentPage] = useState(1);

  // Reinicia a la página a 1
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [itemsPerPage, items]);

  const totalItems = items ? items.length : 0;

  const isAll = itemsPerPage === 'all';

  const effectiveItemsPerPage = isAll ? totalItems : Number(itemsPerPage);

  const totalPages = isAll || totalItems === 0 ? 1 : Math.ceil(totalItems / effectiveItemsPerPage);

  const indexOfLastItem = currentPage * effectiveItemsPerPage;

  const indexOfFirstItem = indexOfLastItem - effectiveItemsPerPage;

  const currentItems = isAll ? items : items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;

    setItemsPerPage(value === 'all' ? 'all' : Number(value));
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange
  };
}