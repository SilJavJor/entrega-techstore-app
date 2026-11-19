
/* ==========================================================================
  Componente ProtectRoute.jsx
  Descripcion: Componente de proteccion de rutas relativas de la aplicacion.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Navigate } from 'react-router-dom';

// Contexto
import { useAuth } from '../../context/AuthContext/AuthContext';

export function ProtectedRoute({ children, requireAdmin = true }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    // O tu componente <Spinner /> mientras verifica la sesión
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}