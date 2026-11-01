/* eslint-disable react-hooks/set-state-in-effect */
/* ==========================================================================
  Componente TeamContext.jsx
  Descripción: Sub-contexto independiente para la gestión del equipo (Nosotros)
    con operaciones CRUD completas y persistencia local.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { createContext, useContext, useState, useEffect } from 'react';

// Creacion del Contexto de Equipo
const TeamsContext = createContext();

// Hook para consumir el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export function useTeam() {
  const context = useContext(TeamsContext);

  if (!context) {
    throw new Error('useTeam debe ser utilizado dentro de un TeamProvider');
  }

  return context;
};

// Proveedor del contexto
export function TeamsProvider({ children }) {
  const [team, setTeam] = useState([]);

  const [loadingTeam, setLoadingTeam] = useState(true);

  const [errorTeam, setErrorTeam] = useState(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem('techstore_team');

    if (savedTeam) {
      try {
        setTeam(JSON.parse(savedTeam));

        setLoadingTeam(false);

        return;
      } catch (e) {
        console.error('Error al parsear equipo guardado:', e);
      }
    }

    // Lectura del archivo
    fetch('/data/team/team.json')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar la información del equipo');

        return res.json();
      })
      .then((data) => {
        setTeam(data);

        localStorage.setItem('techstore_team', JSON.stringify(data));

        setLoadingTeam(false);
      })
      .catch((err) => {
        setErrorTeam(err.message);

        setLoadingTeam(false);
      });
  }, []);

  const saveTeamLocally = (updatedList) => {
    setTeam(updatedList);

    localStorage.setItem('techstore_team', JSON.stringify(updatedList));
  };

  // Autogeneración de ID
  const getNextTeamId = () => {
    if (!team || team.length === 0) return '1';

    const numericIds = team.map((m) => Number(m.id)).filter((id) => !isNaN(id));

    return String(numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1);
  };

  // Create / Creacion
  const addTeamMember = (memberData) => {
    const nextId = getNextTeamId();
    const newMember = { id: nextId, ...memberData };
    const updated = [newMember, ...team];
    saveTeamLocally(updated);
    return { success: true, member: newMember };
  };

  // Update / Modificacion
  const updateTeamMember = (id, updatedData) => {
    const updated = team.map((member) =>
      String(member.id) === String(id) ? { ...member, ...updatedData } : member
    );
    saveTeamLocally(updated);
    return { success: true };
  };

  // Delete / Eliminacion
  const deleteTeamMember = (id) => {
    const updated = team.filter((member) => String(member.id) !== String(id));

    saveTeamLocally(updated);

    return { success: true };
  };

  // Método para vaciar productos en memoria y localStorage
  const clearTeams = () => {
    setTeam([]);

    // localStorage.removeItem('techstore_teams');
      localStorage.setItem('techstore_team', JSON.stringify([]));
  };

  // Método para recargar productos semilla
  const resetTeams = (newList) => {
    saveTeamLocally(newList);
  };

  return (
    <TeamsContext.Provider
      value={{
        team,
        loadingTeam,
        errorTeam,
        getNextTeamId,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        clearTeams,
        resetTeams
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};