/* ==========================================================================
  Componente TeamContext.jsx
  Descripción: Contexto exclusivo para miembros del equipo (Nosotros).
========================================================================== */

// Imprtaciiones
import { createContext, useContext, useState, useEffect } from 'react';

// Creacion del contexto de Equipos
const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState([]);

  const [loadingTeam, setLoadingTeam] = useState(true);

  const [errorTeam, setErrorTeam] = useState(null);

  useEffect(() => {
    // Petición de equipo
    fetch('/data/team.json')
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setLoadingTeam(false);
      })
      .catch((err) => {
        setErrorTeam(err.message);
        setLoadingTeam(false);
      });
  }, []);

  return (
    <TeamContext.Provider value={{ team, loadingTeam, errorTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTeam() {
  return useContext(TeamContext);
}