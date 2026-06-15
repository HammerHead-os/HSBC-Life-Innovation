import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { SCENARIOS } from '../data/constants';

const ProtectionContext = createContext(null);

export function formatAllocationTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function ProtectionProvider({ children }) {
  const [scenarioId, setScenarioIdState] = useState('tokyo');
  const [allocatedAt, setAllocatedAt] = useState(() => formatAllocationTime());
  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  const setScenarioId = useCallback((id) => {
    setScenarioIdState(id);
    setAllocatedAt(formatAllocationTime());
  }, []);

  const value = useMemo(
    () => ({ scenarioId, setScenarioId, scenario, allocation, allocatedAt }),
    [scenarioId, scenario, allocation, allocatedAt, setScenarioId],
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
