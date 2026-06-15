import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { SCENARIOS } from '../data/constants';

const ProtectionContext = createContext(null);
const STORAGE_KEY = 'mpf-protection';

export function formatAllocationTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function loadProtection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.scenarioId && SCENARIOS[data.scenarioId]) return data;
    return null;
  } catch {
    return null;
  }
}

export function ProtectionProvider({ children }) {
  const saved = loadProtection();
  const [scenarioId, setScenarioIdState] = useState(saved?.scenarioId ?? 'tokyo');
  const [allocatedAt, setAllocatedAt] = useState(
    saved?.allocatedAt ?? formatAllocationTime(),
  );
  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ scenarioId, allocatedAt }));
  }, [scenarioId, allocatedAt]);

  const setScenarioId = useCallback((id) => {
    setScenarioIdState(id);
    setAllocatedAt(formatAllocationTime());
  }, []);

  const resetProtection = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setScenarioIdState('tokyo');
    setAllocatedAt(formatAllocationTime());
  }, []);

  const value = useMemo(
    () => ({ scenarioId, setScenarioId, scenario, allocation, allocatedAt, resetProtection }),
    [scenarioId, scenario, allocation, allocatedAt, setScenarioId, resetProtection],
  );

  return (
    <ProtectionContext.Provider value={value}>{children}</ProtectionContext.Provider>
  );
}

export function useProtection() {
  const ctx = useContext(ProtectionContext);
  if (!ctx) throw new Error('useProtection must be used within ProtectionProvider');
  return ctx;
}

export function clearProtectionStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
