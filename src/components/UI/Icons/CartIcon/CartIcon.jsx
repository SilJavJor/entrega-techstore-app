/* ==========================================================================
  Componente CartIcon.jsx (Ícono de Carrito de Compras Vectorial)
  Descripción: Este componente representa un ícono de carrito de compras
    Props: 
    size: Tamaño del ícono (por defecto: 22)
    color: Color del ícono (por tamaño, defecto: '#cccccc')
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

export function CartIcon({ size = 22, color = '#ffffff' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle' }}
    >
      <circle cx="9" cy="21" r="1" fill={color} />
      <circle cx="20" cy="21" r="1" fill={color} />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}