import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { SCENARIOS } from '../data/constants';
import {
  buildInitialInsights,
  buildInitialNotifications,
  createAllocationInsight,
  createAllocationNotification,
} from '../data/insights';

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
  const initialScenario = saved?.scenarioId ?? 'tokyo';
  const initialTime = saved?.allocatedAt ?? formatAllocationTime();

  const [scenarioId, setScenarioIdState] = useState(initialScenario);
  const [allocatedAt, setAllocatedAt] = useState(initialTime);
  const [insights, setInsights] = useState(
    saved?.insights ?? buildInitialInsights(initialScenario, initialTime),
  );
  const [notifications, setNotifications] = useState(
    saved?.notifications ?? buildInitialNotifications(initialScenario, initialTime),
  );

  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ scenarioId, allocatedAt, insights, notifications }),
    );
  }, [scenarioId, allocatedAt, insights, notifications]);

  const setScenarioId = useCallback((id) => {
    const time = formatAllocationTime();
    const next = SCENARIOS[id];
    setScenarioIdState(id);
    setAllocatedAt(time);
    setInsights((prev) => [
      createAllocationInsight(next, time),
      ...prev.filter((item) => item.source !== 'ai' || item.scenario !== id),
    ]);
    setNotifications((prev) => [
      createAllocationNotification(next, time),
      ...prev.map((n) => ({ ...n, read: true })),
    ]);
  }, []);

  const refreshData = useCallback(() => {
    const time = formatAllocationTime();
    setScenarioIdState('tokyo');
    setAllocatedAt(time);
    setInsights(buildInitialInsights('tokyo', time));
    setNotifications(buildInitialNotifications('tokyo', time));
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        scenarioId: 'tokyo',
        allocatedAt: time,
        insights: buildInitialInsights('tokyo', time),
        notifications: buildInitialNotifications('tokyo', time),
      }),
    );
  }, []);

  const value = useMemo(
    () => ({
      scenarioId,
      setScenarioId,
      scenario,
      allocation,
      allocatedAt,
      insights,
      notifications,
      refreshData,
    }),
    [scenarioId, scenario, allocation, allocatedAt, insights, notifications, setScenarioId, refreshData],
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
