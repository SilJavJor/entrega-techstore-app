/* ==========================================================================
  Hook: useMaintenancePage.js
  Descripción: Orquesta las estadísticas, limpieza y carga de semillas junto
    al estado del modal para MaintenancePage.
  Autor: Silvio Jorda
  Fecha: 2026-11-17
========================================================================== */

// Importaciones
import { useState } from 'react';
import { useSettingsStats } from '../../hooks/UseSettings/useSettingsStats';
import { useSettingsClean } from '../../hooks/UseSettings/useSettingsClean';
import { useSettingsLoad } from '../../hooks/UseSettings/useSettingsLoad';

export function useMaintenancePage() {
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: '',
    message: ''
  });

  const { storageStats, checkStorageStats } = useSettingsStats();

  const cleanActions = useSettingsClean(checkStorageStats, setModalConfig);

  const loadActions = useSettingsLoad(checkStorageStats, setModalConfig);

  const closeModal = () => setModalConfig({ show: false, title: '', message: '' });

  return {
    storageStats,
    modalConfig,
    closeModal,
    ...cleanActions,
    ...loadActions
  };
}