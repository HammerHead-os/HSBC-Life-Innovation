import { createContext, useContext, useState, useMemo } from 'react';
import { SCENARIOS } from '../data/constants';

const ProtectionContext = createContext(null);

export function ProtectionProvider({ children }) {
  const [scenarioId, setScenarioId] = useState('tokyo');
  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  const value = useMemo(
    () => ({ scenarioId, setScenarioId, scenario, allocation }),
    [scenarioId, scenario, allocation],
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
