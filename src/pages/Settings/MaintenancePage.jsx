/* ==========================================================================
  Componente SettingsPage.jsx
  Descripción: Panel de administración para auditar, vaciar selectivamente y
    recargar datos semilla (mock data) en localStorage para Productos, Categorías,
    Equipos, Favoritos y Carrito.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import { BoltIcon } from '../../components/UI/Icons/BoltIcon/BoltIcon';
import { BroomIcon } from '../../components/UI/Icons/BroomIcon/BroomIcon';
import { CheckIcon } from '../../components/UI/Icons/ChekIcon/CheckIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';

// 
import { useSettingsStats } from '../../hooks/UseSettings/useSettingsStats';
import { useSettingsClean } from '../../hooks/UseSettings/useSettingsClean';
import { useSettingsLoad } from '../../hooks/UseSettings/useSettingsLoad';

// Estilos
import styles from './MaintenancePage.module.css';
import '../../styles/CheckBoxes/CheckBoxes.css';

export function MaintenancePage() {
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '' });

  // Hook de Auditoría
  const { storageStats, checkStorageStats } = useSettingsStats();

  // Hook de Limpieza
  const {
    selectedCleanKeys,
    handleCleanCheck,
    handleSelectAllClean,
    handleExecuteClean
  } = useSettingsClean(checkStorageStats, setModalConfig);

  // Hook de Carga
  const {
    selectedLoadKeys,
    handleLoadCheck,
    handleSelectAllLoad,
    handleExecuteLoad
  } = useSettingsLoad(checkStorageStats, setModalConfig);

  const closeModal = () => setModalConfig({ show: false, title: '', message: '' });

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card className={`border-0 p-4 shadow-lg ${styles.card}`}>
        <Card.Body>
          <h1 className={styles.title}>Panel de Limpieza y Restablecimiento</h1>

          <p className={styles.subtitle}>
            Administrá el almacenamiento local (localStorage) de TechStore
          </p>

          {/* Estado actual */}
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

                <Badge bg="dark" className="border border-secondary">{storageStats.teams ?? 0} ítems</Badge>
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
            {/* Limpieza */}
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
                    label={`Limpiar Marcas (${storageStats.brands ?? 0})`}
                    name="brands"
                    checked={selectedCleanKeys.brands}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Categorias */}
                  <Form.Check
                    type="checkbox"
                    id="clean-categories"
                    label={`Limpiar Categorías (${storageStats.categories ?? 0})`}
                    name="categories"
                    checked={selectedCleanKeys.categories}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Productos */}
                  <Form.Check
                    type="checkbox"
                    id="clean-products"
                    label={`Limpiar Productos (${storageStats.products ?? 0})`}
                    name="products"
                    checked={selectedCleanKeys.products}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Equipo */}
                  <Form.Check
                    type="checkbox"
                    id="clean-team"
                    label={`Limpiar Equipo (${storageStats.team ?? 0})`}
                    name="team"
                    checked={selectedCleanKeys.team}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Favoritos */}
                  <Form.Check
                    type="checkbox"
                    id="clean-favorites"
                    label={`Limpiar Favoritos (${storageStats.favorites ?? 0})`}
                    name="favorites"
                    checked={selectedCleanKeys.favorites}
                    onChange={handleCleanCheck}
                    className="mb-2"
                  />

                  {/* Carrito */}
                  <Form.Check
                    type="checkbox"
                    id="clean-cart"
                    label={`Limpiar Carrito (${storageStats.cart ?? 0})`}
                    name="cart"
                    checked={selectedCleanKeys.cart}
                    onChange={handleCleanCheck}
                    className="mb-3"
                  />

                  {/* Botones Marcar / Desmarcar */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Marcar Todos */}
                    <Button type="button" className={styles.subActionButton} onClick={() => handleSelectAllClean(true)}>
                      Marcar Todos
                    </Button>

                    {/* Desmarcar Todos */}
                    <Button type="button" className={styles.subActionButton} onClick={() => handleSelectAllClean(false)}>
                      Desmarcar Todos
                    </Button>
                  </div>
                </div>

                {/* Eliminar */}
                <Button className={styles.cleanBtn} onClick={handleExecuteClean}>
                  <BroomIcon /> Eliminar Seleccionados
                </Button>
              </div>
            </Col>

            {/* Reestablecer */}
            <Col md={6}>
              <div className="p-3 h-100 rounded d-flex flex-column justify-content-between" style={{ backgroundColor: '#111', border: '1px solid #333' }}>
                <div>
                  <h5 className="fs-6 fw-bold mb-2" style={{ color: '#8de2d6' }}>
                    <BoltIcon /> Cargar Datos Iniciales (Seed Data)
                  </h5>

                  <p className={styles.instructionText}>
                    Seleccione qué colecciones predeterminadas volver a generar:
                  </p>

                  {/* Marcas */}
                  <Form.Check
                    type="checkbox"
                    id="load-brands"
                    label="Re-insertar Marcas"
                    name="brands"
                    checked={selectedLoadKeys.brands}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />

                  { /* Categorias */}
                  <Form.Check
                    type="checkbox"
                    id="load-categories"
                    label="Re-insertar Categorías"
                    name="categories"
                    checked={selectedLoadKeys.categories}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />

                  {/* Productos */}
                  <Form.Check
                    type="checkbox"
                    id="load-products"
                    label="Re-insertar Productos"
                    name="products"
                    checked={selectedLoadKeys.products}
                    onChange={handleLoadCheck}
                    className="mb-2"
                  />

                  {/* Equipo */}
                  <Form.Check
                    type="checkbox"
                    id="load-team"
                    label="Re-insertar Equipo"
                    name="team"
                    checked={selectedLoadKeys.team}
                    onChange={handleLoadCheck}
                    className="mb-3"
                  />
                </div>

                  {/* Botones Marcar / Desmarcar */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Marcar Todos */}
                    <Button type="button" className={styles.subActionButton} onClick={() => handleSelectAllLoad(true)}>
                      Marcar Todos
                    </Button>

                    {/* Desmarcar Todos */}
                    <Button type="button" className={styles.subActionButton} onClick={() => handleSelectAllLoad(false)}>
                      Desmarcar Todos
                    </Button>
                  </div>

                {/* Botón Eliminar */}
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
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Aceptar"
        showCancel={false}
      />
    </Container>
  );
}