/* ==========================================================================
  Componente RocketIcon.jsx
  Descripción: Icono SVG vectorial a todo color para cohete (🚀) que replica
    la estética, velocidad y gradientes metálicos del emoji original.
  Autor: Silvio Jorda
  Fecha: 2026-10-19
========================================================================== */

export function RocketIcon({ width = "1.2em", height = "1.2em", className = "", ...props }) {
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
        {/* Cuerpo Metálico del Cohete */}
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Punta y Alerones Rojos */}
        <linearGradient id="rocketRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>

        {/* Ventanilla de Cristal Azul */}
        <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* Fuego de Propulsión Exterior (Naranja / Rojo) */}
        <linearGradient id="flameOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>

        {/* Fuego de Propulsión Interior (Amarillo / Blanco) */}
        <linearGradient id="flameInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      {/* Llamarada de Propulsión Exterior */}
      <path
        d="M 6 26 C 3 29 2 30 2 30 C 2 30 3 29 6 26 C 8 24 10 22 10 22 L 10 26 Z"
        fill="url(#flameOuter)"
      />
      <path
        d="M 5 27 C 2 30 1 31 1 31 C 2 30 5 27 7 25 C 7 25 8 28 5 27 Z"
        fill="url(#flameOuter)"
      />

      {/* Fuego Núcleo Amarillo */}
      <path
        d="M 7 25 C 4 28 3 29 3 29 C 4 28 7 25 8 24 Z"
        fill="url(#flameInner)"
      />

      {/* Alerón Izquierdo */}
      <path
        d="M 7 19 L 4 24 C 3.5 25 4.5 25.5 5.5 25 L 11 21 Z"
        fill="url(#rocketRed)"
      />

      {/* Alerón Derecho */}
      <path
        d="M 13 13 L 17 8.5 C 17.5 8 18 9 17.5 10 L 13 15 Z"
        fill="url(#rocketRed)"
        transform="rotate(90 15 11)"
      />

      {/* Cuerpo Principal del Cohete */}
      <path
        d="M 9.5 22.5 C 7.5 15.5 12 8 20 4 C 24 2 28.5 2.5 29.5 3.5 C 30.5 4.5 30 9 28 13 C 24 21 16.5 25.5 9.5 22.5 Z"
        fill="url(#rocketBody)"
      />

      {/* Punta del Cohete (Roja) */}
      <path
        d="M 23 7 C 25.5 4.5 28.5 2.5 29.5 3.5 C 30.5 4.5 28.5 7.5 26 10 Z"
        fill="url(#rocketRed)"
      />

      {/* Ventanilla de Inspección / Ojo de Buey */}
      <circle cx="19" cy="12" r="3.2" fill="#0f172a" />
      <circle cx="19" cy="12" r="2.4" fill="url(#rocketWindow)" />
      <circle cx="18" cy="11" r="0.7" fill="#ffffff" opacity="0.8" />

      {/* Boquilla del Escape en la Base */}
      <path
        d="M 9.5 22.5 L 7.5 24.5 L 8.5 25.5 L 11.5 22.5 Z"
        fill="#334155"
      />
    </svg>
  );
}