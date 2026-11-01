/* ==========================================================================
  Componente ShieldIcon.jsx
  Descripción: Icono SVG vectorial a todo color para escudo de protección (🛡️)
    que replica la estética y tonalidades metálicas del emoji original.
  Props: 
    size: Tamaño del ícono (por defecto: 22)
    color: Color del ícono (por tamaño, defecto: '#cccccc')
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

export function ShieldIcon({ width = "1.2em", height = "1.2em", className = "", ...props }) {
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
        {/* Borde Dorado del Escudo */}
        <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Cuerpo Metálico Plateado */}
        <linearGradient id="shieldBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Reflejo de Brillo Superior */}
        <linearGradient id="shieldShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Marco Exterior Dorado */}
      <path
        d="M 16 3 C 22 3 27 5.5 28 7 C 28 17 22.5 25 16 29 C 9.5 25 4 17 4 7 C 5 5.5 10 3 16 3 Z"
        fill="url(#shieldBorder)"
      />

      {/* Placa Interior de Acero */}
      <path
        d="M 16 5 C 21 5 25 7 26 8.2 C 26 16.5 21 23.5 16 27 C 11 23.5 6 16.5 6 8.2 C 7 7 11 5 16 5 Z"
        fill="url(#shieldBody)"
      />

      {/* Bisel del Brillo Reflectivo (Lado Izquierdo) */}
      <path
        d="M 16 5 C 11 5 7 7 6 8.2 C 6 16.5 11 23.5 16 27 Z"
        fill="url(#shieldShine)"
      />

      {/* Detalle de Grabadura Interior */}
      <path
        d="M 16 8 C 19.5 8 22.5 9.5 23 10.5 C 23 16 19.5 21.5 16 24 C 12.5 21.5 9 16 9 10.5 C 9.5 9.5 12.5 8 16 8 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />
    </svg>
  );
}