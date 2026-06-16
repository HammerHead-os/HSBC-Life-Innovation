import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { SCENARIOS } from '../data/constants';
import {
  buildInitialInsights,
  buildInitialNotifications,
  createAllocationInsight,
  createAllocationNotification,
} from '../data/insights';
import { getScenarioPopup } from '../data/scenarioPopups';
import { loadSettings } from '../data/settings';
import {
  TRAVEL_SIGNALS,
  loadTravelFlags,
  saveTravelFlags,
  isTravelSignal,
} from '../data/travelSignals';

const ProtectionContext = createContext(null);
const STORAGE_KEY = 'mpf-protection';
export const EXTERNAL_SIGNAL_KEY = 'mpf-external-signal';

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
  const [travelFlags, setTravelFlags] = useState(loadTravelFlags);
  const [popupContent, setPopupContent] = useState(null);
  const [popupSignal, setPopupSignal] = useState(0);

  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  const showPopup = useCallback((content) => {
    setPopupContent(content);
    setPopupSignal((n) => n + 1);
  }, []);

  const commitScenario = useCallback((id) => {
    const time = formatAllocationTime();
    const next = SCENARIOS[id];
    const settings = loadSettings();
    setScenarioIdState(id);
    setAllocatedAt(time);
    setInsights((prev) => [
      createAllocationInsight(next, time),
      ...prev.filter((item) => item.source !== 'ai' || item.scenario !== id),
    ]);
    if (settings.reallocationAlerts) {
      setNotifications((prev) => [
        createAllocationNotification(next, time),
        ...prev.map((n) => ({ ...n, read: true })),
      ]);
    }
    showPopup(getScenarioPopup(next));
  }, [showPopup]);

  const setScenarioId = useCallback((id) => {
    if (!SCENARIOS[id]) return;

    if (isTravelSignal(id)) {
      const signal = TRAVEL_SIGNALS[id];

      if (signal.type === 'ticket') {
        const nextFlags = { ...travelFlags, [signal.flag]: true };
        setTravelFlags(nextFlags);
        saveTravelFlags(nextFlags);
        showPopup(signal.popup);
        return;
      }

      if (signal.type === 'checkpoint') {
        if (!travelFlags[signal.requires]) {
          showPopup(signal.blockedPopup);
          return;
        }
        const nextFlags = { ...travelFlags, [signal.requires]: false };
        setTravelFlags(nextFlags);
        saveTravelFlags(nextFlags);
        commitScenario(signal.applies);
        return;
      }
    }

    commitScenario(id);
  }, [travelFlags, showPopup, commitScenario]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ scenarioId, allocatedAt, insights, notifications }),
    );
  }, [scenarioId, allocatedAt, insights, notifications]);

  // Listen for external signals sent from a separate "console" page (same origin).
  useEffect(() => {
    const applySignal = (raw) => {
      try {
        if (!raw) return;
        const payload = JSON.parse(raw);
        const id = payload?.scenarioId;
        if (!id || !SCENARIOS[id]) return;
        setScenarioId(id);
      } catch {
        // ignore
      }
    };

    applySignal(localStorage.getItem(EXTERNAL_SIGNAL_KEY));

    const onStorage = (e) => {
      if (e.key !== EXTERNAL_SIGNAL_KEY) return;
      applySignal(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [setScenarioId]);

  const refreshData = useCallback(() => {
    const time = formatAllocationTime();
    const clearedFlags = { flightTicket: false, hsrTicket: false };
    setTravelFlags(clearedFlags);
    saveTravelFlags(clearedFlags);
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
      travelFlags,
      popupContent,
      popupSignal,
      refreshData,
    }),
    [scenarioId, scenario, allocation, allocatedAt, insights, notifications, travelFlags, popupContent, popupSignal, setScenarioId, refreshData],
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
