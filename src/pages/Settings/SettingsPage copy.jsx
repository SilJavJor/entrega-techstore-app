/* ==========================================================================
  Componente SettingsPage.jsx
  Descripción: Panel de administración para auditar, vaciar selectivamente y
    recargar datos semilla (mock data) en localStorage para Productos, Categorías,
    Equipos, Favoritos y Carrito.
  Autor: Silvio Jorda
  Fecha: 2026-10-27
========================================================================== */

import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';
import styles from './SettingsPage.module.css';

// laves de localStorage utilizadas en la aplicación
const STORAGE_KEYS = {
  products: 'techstore_products',
  categories: 'techstore_categories',
  team: 'techstore_team',
  favorites: 'techstore_favorites',
  cart: 'techstore_cart',
  brands: 'techstore_brands'
};

export function SettingsPage() {
  // Estado para la selección de borrado
  const [selectedCleanKeys, setSelectedCleanKeys] = useState({
    products: false,
    categories: false,
    team: false,
    favorites: false,
    cart: false,
    brands: false
  });

  // Estado para la selección de recarga
  const [selectedLoadKeys, setSelectedLoadKeys] = useState({
    products: false,
    categories: false,
    team: false,
    brands: false
  });

  // Metadatos de estado del storage (cantidad de ítems guardados)
  const [storageStats, setStorageStats] = useState({});

  // Control del Modal de Notificación
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: '',
    message: ''
  });

  // Función para auditar la cantidad de elementos en cada clave
  const checkStorageStats = () => {
    const stats = {};
    Object.entries(STORAGE_KEYS).forEach(([domain, key]) => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          stats[domain] = Array.isArray(parsed) ? parsed.length : 1;
        } else {
          stats[domain] = 0;
        }
      } catch (e) {
        stats[domain] = 'Error';
      }
    });
    setStorageStats(stats);
  };

  useEffect(() => {
    checkStorageStats();
  }, []);

  // Handlers para los checkboxes de borrado
  const handleCleanCheck = (e) => {
    const { name, checked } = e.target;
    setSelectedCleanKeys((prev) => ({ ...prev, [name]: checked }));
  };

  // Handlers para los checkboxes de recarga
  const handleLoadCheck = (e) => {
    const { name, checked } = e.target;
    setSelectedLoadKeys((prev) => ({ ...prev, [name]: checked }));
  };

  // Seleccionar o deseleccionar todos para borrar
  const handleSelectAllClean = (value) => {
    setSelectedCleanKeys({
      products: value,
      categories: value,
      team: value,
      favorites: value,
      cart: value,
      brands: value
    });
  };

  // 1. Ejecutar Limpieza Selectiva
  const handleExecuteClean = () => {
    const keysToClean = Object.keys(selectedCleanKeys).filter(
      (domain) => selectedCleanKeys[domain]
    );

    if (keysToClean.length === 0) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'Por favor, seleccioná al menos una sección para limpiar.'
      });
      return;
    }

    keysToClean.forEach((domain) => {
      const key = STORAGE_KEYS[domain];
      if (key) {
        localStorage.removeItem(key);
      }
    });

    checkStorageStats();
    setSelectedCleanKeys({
      products: false,
      categories: false,
      team: false,
      favorites: false,
      cart: false,
      brands: false
    });

    setModalConfig({
      show: true,
      title: '¡ Limpieza Completada !',
      message: `Se eliminaron correctamente del localStorage las secciones seleccionadas: ${keysToClean.join(', ')}. Te recomendamos recargar la aplicación para reflejar los cambios.`
    });
  };

  // 2. Ejecutar Carga de Datos Semilla
  const handleExecuteLoad = () => {
    const keysToLoad = Object.keys(selectedLoadKeys).filter(
      (domain) => selectedLoadKeys[domain]
    );

    if (keysToLoad.length === 0) {
      setModalConfig({
        show: true,
        title: '¡ Atención !',
        message: 'Por favor, seleccioná al menos un dominio para cargar los datos iniciales.'
      });
      return;
    }

    // Nota: Aquí se importan o llaman las constantes de datos por defecto
    keysToLoad.forEach((domain) => {
      // Ejemplo de guardado desde los mock arrays (a conectar con tus archivos)
      // localStorage.setItem(STORAGE_KEYS[domain], JSON.stringify(initialData[domain]));
    });

    checkStorageStats();
    setModalConfig({
      show: true,
      title: '¡ Datos Restaurados !',
      message: `Se han precargado los datos iniciales para: ${keysToLoad.join(', ')}.`
    });
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Panel de Limpieza y Restablecimiento</h1>
          <p className={styles.subtitle}>
            Administrá el almacenamiento local (localStorage) de TechStore
          </p>

          {/* ESTADO ACTUAL DEL STORAGE */}
          <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
            <h5 className="fs-6 fw-bold mb-3" style={{ color: '#8de2d6' }}>
              📊 Estado Actual en LocalStorage
            </h5>
            <Row className="g-2 text-center">
              <Col xs={4} md={2}>
                <div className="small text-muted">Productos</div>
                <Badge bg="dark" className="border border-secondary">{storageStats.products ?? 0} ítems</Badge>
              </Col>
              <Col xs={4} md={2}>
                <div className="small text-muted">Categorías</div>
                <Badge bg="dark" className="border border-secondary">{storageStats.categories ?? 0} ítems</Badge>
              </Col>
              <Col xs={4} md={2}>
                <div className="small text-muted">Equipo</div>
                <Badge bg="dark" className="border border-secondary">{storageStats.team ?? 0} ítems</Badge>
              </Col>
              <Col xs={4} md={2}>
                <div className="small text-muted">Favoritos</div>
                <Badge bg="dark" className="border border-secondary">{storageStats.favorites ?? 0} ítems</Badge>
              </Col>
              <Col xs={4} md={2}>
                <div className="small text-muted">Carrito</div>
                <Badge bg="dark" className="border border-secondary">{storageStats.cart ?? 0} ítems</Badge>
              </Col>
              <Col xs={4} md={2}>
                <div className="small text-muted">Marcas</div>
                <Badge bg="dark" className="border border-secondary">{storageStats.brands ?? 0} ítems</Badge>
              </Col>
            </Row>
          </div>

          <Row className="g-4">
            {/* SECCIÓN 1: BORRADO / LIMPIEZA */}
            <Col md={6}>
              <div className="p-3 h-100 rounded d-flex flex-column justify-content-between" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                <div>
                  <h5 className="fs-6 fw-bold mb-2 text-danger">🧹 Eliminar Datos de LocalStorage</h5>
                  <p className="small text-muted mb-3">
                    Marque los dominios que desea vaciar por completo:
                  </p>

                  <Form.Check
                    type="checkbox"
                    id="clean-products"
                    label={`Productos (${storageStats.products ?? 0})`}
                    name="products"
                    checked={selectedCleanKeys.products}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="clean-categories"
                    label={`Categorías (${storageStats.categories ?? 0})`}
                    name="categories"
                    checked={selectedCleanKeys.categories}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="clean-team"
                    label={`Equipo / Team (${storageStats.team ?? 0})`}
                    name="team"
                    checked={selectedCleanKeys.team}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="clean-favorites"
                    label={`Favoritos (${storageStats.favorites ?? 0})`}
                    name="favorites"
                    checked={selectedCleanKeys.favorites}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="clean-cart"
                    label={`Carrito (${storageStats.cart ?? 0})`}
                    name="cart"
                    checked={selectedCleanKeys.cart}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="clean-brands"
                    label={`Marcas (${storageStats.brands ?? 0})`}
                    name="brands"
                    checked={selectedCleanKeys.brands}
                    onChange={handleCleanCheck}
                    className="mb-3"
                  />

                  <div className="d-flex gap-2 mb-3">
                    <Button variant="outline-secondary" size="sm" onClick={() => handleSelectAllClean(true)}>
                      Marcar Todos
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleSelectAllClean(false)}>
                      Desmarcar
                    </Button>
                  </div>
                </div>

                <Button variant="danger" className="w-100 mt-2 d-flex align-items-center justify-content-center gap-2" onClick={handleExecuteClean}>
                  <BroomIcon /> Eliminar Seleccionados
                </Button>
              </div>
            </Col>

            {/* SECCIÓN 2: CARGA / RESTAURACIÓN */}
            <Col md={6}>
              <div className="p-3 h-100 rounded d-flex flex-column justify-content-between" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                <div>
                  <h5 className="fs-6 fw-bold mb-2" style={{ color: '#8de2d6' }}>
                    ⚡ Cargar Datos Iniciales (Seed Data)
                  </h5>
                  <p className="small text-muted mb-3">
                    Seleccione qué colecciones predeterminadas volver a generar:
                  </p>

                  <Form.Check
                    type="checkbox"
                    id="load-products"
                    label="Re-insertar Catálogo de Productos"
                    name="products"
                    checked={selectedLoadKeys.products}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="load-categories"
                    label="Re-insertar Lista de Categorías"
                    name="categories"
                    checked={selectedLoadKeys.categories}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="load-team"
                    label="Re-insertar Integrantes del Equipo"
                    name="team"
                    checked={selectedLoadKeys.team}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="load-brands"
                    label="Re-insertar Marcas Predeterminadas"
                    name="brands"
                    checked={selectedLoadKeys.brands}
                    onChange={handleLoadCheck}
                    className="mb-3"
                  />
                </div>

                <Button className={styles.submitBtn} onClick={handleExecuteLoad}>
                  <CheckIcon /> Restablecer Seleccionados
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <MessageBtnAccept
        isOpen={modalConfig.show}
        onClose={() => setModalConfig({ show: false, title: '', message: '' })}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}