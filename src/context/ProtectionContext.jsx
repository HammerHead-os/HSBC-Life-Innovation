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
import { PENDING_TAP_KEY } from '../utils/pendingTap';

const ProtectionContext = createContext(null);
const STORAGE_KEY = 'mpf-protection';
export const EXTERNAL_SIGNAL_KEY = 'mpf-external-signal';
const PROCESSED_SIGNAL_KEY = 'mpf-signal-processed-at';

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

function consumeExternalSignal(raw, onSignal) {
  if (!raw) return;
  try {
    const payload = JSON.parse(raw);
    const id = payload?.scenarioId;
    if (!id || (!SCENARIOS[id] && !isTravelSignal(id))) return;

    const at = Number(payload.at) || 0;
    const lastProcessed = Number(sessionStorage.getItem(PROCESSED_SIGNAL_KEY) || 0);
    if (at && at <= lastProcessed) return;

    if (at) sessionStorage.setItem(PROCESSED_SIGNAL_KEY, String(at));
    localStorage.removeItem(EXTERNAL_SIGNAL_KEY);
    onSignal(id);
  } catch {
    // ignore
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
  const [uiPulse, setUiPulse] = useState(0);

  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  const showPopup = useCallback((content) => {
    setPopupContent(content);
    setPopupSignal((n) => n + 1);
  }, []);

  const pulseUi = useCallback(() => {
    setUiPulse((n) => n + 1);
  }, []);

  const applyScenario = useCallback((id) => {
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
  }, []);

  const commitScenario = useCallback((id) => {
    applyScenario(id);
    showPopup(getScenarioPopup(SCENARIOS[id]));
    window.setTimeout(() => pulseUi(), 100);
  }, [applyScenario, showPopup, pulseUi]);

  const setScenarioId = useCallback((id) => {
    if (isTravelSignal(id)) {
      const signal = TRAVEL_SIGNALS[id];
      const flags = loadTravelFlags();

      if (signal.type === 'ticket') {
        const nextFlags = { ...flags, [signal.flag]: true };
        setTravelFlags(nextFlags);
        saveTravelFlags(nextFlags);
        showPopup(signal.popup);
        return;
      }

      if (signal.type === 'checkpoint') {
        if (!flags[signal.requires]) {
          showPopup(signal.blockedPopup);
          return;
        }
        const nextFlags = { ...flags, [signal.requires]: false };
        setTravelFlags(nextFlags);
        saveTravelFlags(nextFlags);
        commitScenario(signal.applies);
        return;
      }
    }

    if (!SCENARIOS[id]) return;
    commitScenario(id);
  }, [showPopup, commitScenario]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ scenarioId, allocatedAt, insights, notifications }),
    );
  }, [scenarioId, allocatedAt, insights, notifications]);

  // External signals from signal console (other tab) — consume once, never replay on refresh.
  useEffect(() => {
    const apply = (id) => setScenarioId(id);

    consumeExternalSignal(localStorage.getItem(EXTERNAL_SIGNAL_KEY), apply);

    const onStorage = (e) => {
      if (e.key !== EXTERNAL_SIGNAL_KEY) return;
      consumeExternalSignal(e.newValue, apply);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [setScenarioId]);

  const refreshData = useCallback(() => {
    const time = formatAllocationTime();
    const clearedFlags = { flightTicket: false, hsrTicket: false };
    setTravelFlags(clearedFlags);
    saveTravelFlags(clearedFlags);
    localStorage.removeItem(EXTERNAL_SIGNAL_KEY);
    sessionStorage.removeItem(PROCESSED_SIGNAL_KEY);
    sessionStorage.removeItem(PENDING_TAP_KEY);
    setUiPulse(0);
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
      uiPulse,
      pulseUi,
      refreshData,
    }),
    [scenarioId, scenario, allocation, allocatedAt, insights, notifications, travelFlags, popupContent, popupSignal, uiPulse, pulseUi, setScenarioId, refreshData],
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
