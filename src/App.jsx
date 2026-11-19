/* ==========================================================================
  Componente App.jsx
  Descripcion: Componente principal de la aplicación que define las rutas
    y la estructura general de la aplicación.
  Autor: Silvio Jorda
  Date: 2026-09-30
========================================================================== */

// Importaciones
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { ProductListContainer } from './components/ProductListContainer/ProductListContainer';

// Paginas
import { HomePage } from './pages/Home/HomePage';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';
import { CartPage } from './pages/Cart/CartPage';
import { ProductPage } from './pages/Product/ProductPage';
import { BrandPage } from './pages/Brand/BrandPage';
import { CategoryPage } from './pages/Category/CategoryPage';
import { TeamPage } from './pages/Team/TeamPage';
import { ContactUsPage } from './pages/ContactUs/ContactUsPage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { AboutUsPage } from './pages/AboutUs/AboutUsPage';
import { MaintenancePage } from './pages/Maintenance/MaintenancePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Inicio */}
        <Route path="/" element={<HomePage />} />

        {/* Productos */}
        <Route path="/products" element={<ProductListContainer greeting="Catálogo de Productos" />} />

        {/* Detalle de un unico producto */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* ABMC de Marcas - CRUD */}
        <Route path="/add-brand" element={
            <ProtectedRoute>
              <BrandPage />
            </ProtectedRoute>
          }
        />


        {/* ABMC de Categorias - CRUD */}
        <Route path="/add-category" element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />


        {/* ABMC de Pproductos - CRUD */}
        <Route path="/add-product" element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />

        {/* / Carrito de compras */}
        <Route path="/cart" element={<CartPage />} />

        {/* Contactanos */}
        <Route path="/contactus" element={<ContactUsPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Registro de usuarios */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Acreca de... */}
        <Route path="/aboutus" element={<AboutUsPage />} />

        {/* ABMC de Equipo - CRUD */}
        <Route path="/add-team" element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          }
        />

        {/* Mantenimiento */}
        <Route path="/maintenance" element={
            <ProtectedRoute>
              <MaintenancePage />
            </ProtectedRoute>
          }
        />

        {/* Paginas no encontradas (404) */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;