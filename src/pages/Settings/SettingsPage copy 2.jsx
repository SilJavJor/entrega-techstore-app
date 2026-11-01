/* ==========================================================================
  Componente SettingsPage.jsx
  Descripción: Panel de administración para auditar, vaciar selectivamente y
    recargar datos semilla (mock data) en localStorage para Productos, Categorías,
    Equipos, Favoritos y Carrito.
  Autor: Silvio Jorda
  Fecha: 2026-10-27
========================================================================== */

// Importaciones
import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import { BoltIcon } from '../../components/UI/Icons/BoltIcon/BoltIcon';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';
import styles from './SettingsPage.module.css';
import '../../styles/CheckBoxes/CheckBoxes.css';

// Imortaciones de Contextos
//import { useBrands } from '../../context/BrandsContext';
//import { useCategories } from '../../context/Categories/CategoriesContext';
import { useProducts } from '../../context/Products/ProductsContext';
//import { useTeams } from '../../context/Teams/TeamsContext';
//import { useFavorites } from '../../context/Favorites/FavoritesContext';
//import { useTeams } from '../../context/Cart/CartContext';

// Local Storage
const STORAGE_KEYS = {
  brands: 'techstore_brands',
  categories: 'techstore_categories',
  products: 'techstore_products',
  team: 'techstore_team',
  favorites: 'techstore_favorites',
  cart: 'techstore_cart'
};

export function SettingsPage() {
  // Metodos de cada Contexto
  //const { clearBrands, resetBrands } = useBrands();
  //const { clearCategories, resetCategories } = useCategories();
  const { clearProducts, resetProducts } = useProducts();
  //const { clearTeams, resetTeams } = useTeams();
  //const { clearFavorites, resetFavotites } = useFavorites();
  //const { clearCart, resetCart } = useCart();


  // 1. Diccionario de funciones de LIMPIEZA
  const domainCleaners = {
    // brands: clearBrands,
    // categories: clearCategories,
    products: clearProducts
    // team: clearTeam,
    //favorites: clearFavorites,
    //cart: clearCart
  };

  // 2. Diccionario de funciones de RESTAURACIÓN (Semilla)
  const domainLoaders = {
    // brands: resetBrands,
    products: resetProducts
    // categories: resetCategories,
    // team: resetTeam
  };

// 3. Diccionario de rutas a archivos JSON semilla
  const domainEndpoints = {
    //brands: '/data/brands/brands.json',
    //categories: '/data/categories/categories.json',
    products: '/data/products/products.json'
    //team: '/data/team/team.json'
  };

  // Estado para la selección de borrado
  const [selectedCleanKeys, setSelectedCleanKeys] = useState({
    brands: false,
    categories: false,
    products: false,
    team: false,
    favorites: false,
    cart: false
  });

  // Estado para la selección de recarga
  const [selectedLoadKeys, setSelectedLoadKeys] = useState({
    brands: false,
    categories: false,
    products: false,
    team: false
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

  useEffect(() => {checkStorageStats();
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
      brands: value,
      categories: value,
      products: value,
      team: value,
      favorites: value,
      cart: value
    });
  };

  // Ejecutar Limpieza Selectiva
  {/*
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
      brands: false,
      products: false,
      categories: false,
      team: false,
      favorites: false,
      cart: false
    });

    setModalConfig({
      show: true,
      title: '¡ Limpieza Completada !',
      message: `Se eliminaron correctamente del localStorage las secciones seleccionadas: ${keysToClean.join(', ')}. 
        Te recomendamos recargar la aplicación para reflejar los cambios.`
    });
  };
  */}

// Ejecutar Limpieza Selectiva
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

    // Recorre y limpia cada dominio seleccionado
    keysToClean.forEach((domain) => {
      if (domainCleaners[domain]) {
        // Ejecuta la función del Contexto correspondiente (limpia React State + localStorage)
        domainCleaners[domain]();
      } else {
        // Fallback para dominios sin contexto activo
        const key = STORAGE_KEYS[domain];
        if (key) localStorage.removeItem(key);
      }
    });

    checkStorageStats();

    setSelectedCleanKeys({
      brands: false,
      products: false,
      categories: false,
      team: false,
      favorites: false,
      cart: false
    });

    setModalConfig({
      show: true,
      title: '¡ Limpieza Completada !',
      message: `Se eliminaron correctamente del localStorage las secciones seleccionadas: ${keysToClean.join(', ')}.`
    });
  };


  // 2. Ejecutar Carga de Datos Semilla
  {/*
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
  */}

  // Carga de Datos (Semilla)
  {/*
  const handleExecuteLoad = async () => {
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

    try {
      // Restaurar Marcas
      if (selectedLoadKeys.brands) {
        try {
          const res = await fetch('/data/brands/brands.json');

          if (res.ok) {
            const data = await res.json();

            localStorage.setItem(STORAGE_KEYS.brands, JSON.stringify(data));
          }
        } catch (e) {
            console.warn('Marcas JSON no disponible');
        }

      // Restaurar Categorías
      if (selectedLoadKeys.categories) {
        try {
          const res = await fetch('/data/categories/categories.json');

          if (res.ok) {
            const data = await res.json();

            localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(data));
          }
        } catch (e) {
            console.warn('Categorias JSON no disponible');
        }
      }

      // Restaurar Productos
      if (selectedLoadKeys.products) {
        try {
          const res = await fetch('/data/products/products.json');

          if (res.ok) {
            const data = await res.json();

            localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(data));
          }
        } catch (e) {
            console.warn('Productos JSON no disponible');
        }
      }

      // Restaurar Equipo
      if (selectedLoadKeys.team) {
        try {
          const res = await fetch('/data/team/team.json');

          if (res.ok) {
            const data = await res.json();

            localStorage.setItem(STORAGE_KEYS.team, JSON.stringify(data));
          }
        } catch (e) {
            console.warn('Equipo JSON no disponible');
        }
      }

      }

      // Refrescar los badges contadores del storage
      checkStorageStats();

      // Limpiar los checks de recarga
      setSelectedLoadKeys({
        brands: false,
        categories: false,
        products: false,
        team: false
      });
  */}

// Carga de Datos (Semilla)
  const handleExecuteLoad = async () => {
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

    try {
      for (const domain of keysToLoad) {
        const endpoint = domainEndpoints[domain];

        if (endpoint) {
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();

            if (domainLoaders[domain]) {
              // Actualiza React State + localStorage en tiempo real
              domainLoaders[domain](data);
            } else {
              // Fallback directo si el dominio no tiene contexto aún
              localStorage.setItem(STORAGE_KEYS[domain], JSON.stringify(data));
            }
          }
        }
      }

      checkStorageStats();

      setSelectedLoadKeys({
        brands: false,
        categories: false,
        products: false,
        team: false
      });

      setModalConfig({
        show: true,
        title: '¡ Datos Restaurados !',
        message: `Se han precargado exitosamente los datos iniciales para: ${keysToLoad.join(', ')}.`
      });
    } catch (error) {
      console.error('Error durante la restauración:', error);
      setModalConfig({
        show: true,
        title: '¡ Error al Cargar !',
        message: error.message || 'Ocurrió un error al intentar leer los archivos JSON de respaldo.'
      });
    }
  };

      setModalConfig({
        show: true,
        title: '¡ Datos Restaurados !',
        message: `Se han precargado exitosamente los datos iniciales para: ${keysToLoad.join(', ')}.`
      });
    } catch (error) {
      console.error('Error durante la restauración:', error);

      setModalConfig({
        show: true,
        title: '¡ Error al Cargar !',
        message: error.message || 'Ocurrió un error al intentar leer los archivos JSON de respaldo.'
      });
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Panel de Limpieza y Restablecimiento</h1>

          <p className={styles.subtitle}>
            Administrá el almacenamiento local (localStorage) de TechStore
          </p>

          {/* Estado Actual */}
          <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
            <h5 className="fs-6 fw-bold mb-3" style={{ color: '#8de2d6' }}>
              {/* CAMBIAR ICONO */}
              📊 Estado Actual en LocalStorage
            </h5>

            <Row className="g-2 text-center">
              <Col xs={4} md={2}>
                <div className="small text-light fw-medium mb-1">Marcas</div>

                <Badge bg="dark" className="border border-secondary">{storageStats.brands ?? 0} ítems</Badge>
              </Col>

              <Col xs={4} md={2}>
                <div className="small text-light fw-medium mb-1">Categorías</div>

                <Badge bg="dark" className="border border-secondary">{storageStats.categories ?? 0} ítems</Badge>
              </Col>

              <Col xs={4} md={2}>
                <div className="small text-light fw-medium mb-1">Productos</div>

                <Badge bg="dark" className="border border-secondary">{storageStats.products ?? 0} ítems</Badge>
              </Col>

              <Col xs={4} md={2}>
                <div className="small text-light fw-medium mb-1">Equipo</div>

                <Badge bg="dark" className="border border-secondary">{storageStats.team ?? 0} ítems</Badge>
              </Col>

              <Col xs={4} md={2}>
                <div className="small text-light fw-medium mb-1">Favoritos</div>

                <Badge bg="dark" className="border border-secondary">{storageStats.favorites ?? 0} ítems</Badge>
              </Col>

              <Col xs={4} md={2}>
                <div className="small text-light fw-medium mb-1">Carrito</div>

                <Badge bg="dark" className="border border-secondary">{storageStats.cart ?? 0} ítems</Badge>
              </Col>
            </Row>
          </div>

          <Row className="g-4">
            {/* SECCIÓN 1: BORRADO / LIMPIEZA */}
            <Col md={6}>
              <div className="p-3 h-100 rounded d-flex flex-column justify-content-between" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                <div>
                  <h5 className="fs-6 fw-bold mb-2 text-danger"> 
                    <BroomIcon color="#dc3545" /> Eliminar Datos de LocalStorage
                  </h5>

                  <p className={styles.instructionText}>
                    Marque los dominios que desea vaciar por completo:
                  </p>

                  {/* Marcas */}
                  <Form.Check
                    type="checkbox"
                    id="clean-brands"
                    label={`Marcas (${storageStats.brands ?? 0})`}
                    name="brands"
                    checked={selectedCleanKeys.brands}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Categorias */}
                  <Form.Check
                    type="checkbox"
                    id="clean-categories"
                    label={`Categorías (${storageStats.categories ?? 0})`}
                    name="categories"
                    checked={selectedCleanKeys.categories}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Productos */}
                  <Form.Check
                    type="checkbox"
                    id="clean-products"
                    label={`Productos (${storageStats.products ?? 0})`}
                    name="products"
                    checked={selectedCleanKeys.products}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Equipo */}
                  <Form.Check
                    type="checkbox"
                    id="clean-team"
                    label={`Equipo (${storageStats.team ?? 0})`}
                    name="team"
                    checked={selectedCleanKeys.team}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Favoritos */}
                  <Form.Check
                    type="checkbox"
                    id="clean-favorites"
                    label={`Favoritos (${storageStats.favorites ?? 0})`}
                    name="favorites"
                    checked={selectedCleanKeys.favorites}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Carrito */}
                  <Form.Check
                    type="checkbox"
                    id="clean-cart"
                    label={`Carrito (${storageStats.cart ?? 0})`}
                    name="cart"
                    checked={selectedCleanKeys.cart}
                    onChange={handleCleanCheck}
                    className="mb-3"
                  />

                  {/* Botones Marcar / Desmarcar Todos */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Botón Marcar Todos */}
                    <Button type="button" className={styles.subActionButton} onClick={() => handleSelectAllClean(true)}>
                      Marcar Todos
                    </Button>

                    {/* Botón Desmarcar Todos */}
                    <Button type="button" className={styles.subActionButton} onClick={() => handleSelectAllClean(false)}>
                      Desmarcar Todos
                    </Button>
                  </div>
                </div>

                {/* Botón Eliminar */}
                <Button className={styles.cleanBtn} onClick={handleExecuteClean}>
                  <BroomIcon /> Eliminar Seleccionados
                </Button>
              </div>
            </Col>

            {/* Carga de Datos (Semillas) */}
            <Col md={6}>
              <div className="p-3 h-100 rounded d-flex flex-column justify-content-between" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                <div>
                  <h5 className="fs-6 fw-bold mb-2" style={{ color: '#8de2d6' }}>
                    <BoltIcon /> Cargar Datos Iniciales (Seed Data)
                  </h5>

                  <p className={styles.instructionText}>
                    Seleccione qué colecciones predeterminadas volver a generar:
                  </p>

                  {/* Restaurar Marcar */}
                  <Form.Check
                    type="checkbox"
                    id="load-brands"
                    label="Re-insertar Marcas Predeterminadas"
                    name="brands"
                    checked={selectedLoadKeys.brands}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />

                  {/* Restaurar Categorias */}
                  <Form.Check
                    type="checkbox"
                    id="load-categories"
                    label="Re-insertar Lista de Categorías"
                    name="categories"
                    checked={selectedLoadKeys.categories}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />

                  {/* Restaurar Productos */}
                  <Form.Check
                    type="checkbox"
                    id="load-products"
                    label="Re-insertar Catálogo de Productos"
                    name="products"
                    checked={selectedLoadKeys.products}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />

                  {/* Restaurar Equipo */}
                  <Form.Check
                    type="checkbox"
                    id="load-team"
                    label="Re-insertar Integrantes del Equipo"
                    name="team"
                    checked={selectedLoadKeys.team}
                    onChange={handleLoadCheck}
                    className="mb-3"
                  />
                </div>

                {/* Botón Restablecer */}
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