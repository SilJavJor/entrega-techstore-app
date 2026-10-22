/* ==========================================================================
  Componente CreditCardIcon.jsx
  Descripción: Icono SVG vectorial a todo color para tarjeta de crédito/pago 
    que replica la estética y tonalidades del original (💳).
  Autor: Silvio Jorda
  Fecha: 2026-09-30
  ========================================================================== */

export function CreditCardIcon({ width = "1.2em", height = "1.2em", className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      className={className}
      style={{ verticalAlign: 'middle', display: 'inline-block' }}
      {...props}
    >
      <defs>
        {/* Degradado Azul del Cuerpo (Estilo Emoji Original) */}
        <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Degradado Dorado para el Chip */}
        <linearGradient id="chipBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>

        {/* Brillo reflejo en el borde superior */}
        <linearGradient id="cardGloss" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Cuerpo Principal de la Tarjeta */}
      <rect x="2" y="5" width="28" height="22" rx="3.5" fill="url(#cardBg)" />

      {/* Reflejo / Brillo Superior */}
      <path d="M 2 8.5 C 2 6.56 3.56 5 5.5 5 L 26.5 5 C 28.44 5 30 6.56 30 8.5 L 30 11 L 2 11 Z" fill="url(#cardGloss)" />

      {/* Banda Magnética Oscura */}
      <rect x="2" y="9" width="28" height="5.5" fill="#0f172a" />

      {/* Chip Dorado con relieve */}
      <rect x="5.5" y="17.5" width="5.5" height="4" rx="0.8" fill="url(#chipBg)" />
      <path d="M 5.5 19.5 L 11 19.5 M 8.25 17.5 L 8.25 21.5" stroke="#b45309" strokeWidth="0.4" />

      {/* Números / Relieve grabado */}
      <rect x="5.5" y="23" width="11" height="1.2" rx="0.6" fill="#93c5fd" opacity="0.85" />

      {/* Sello de Red de Pagos (Círculos Naranja y Rojo) */}
      <circle cx="23.5" cy="20.5" r="2.8" fill="#ef4444" />
      <circle cx="26" cy="20.5" r="2.8" fill="#f59e0b" opacity="0.85" />
    </svg>
  );
}