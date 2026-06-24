import { createContext, useContext, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { SCENARIOS, CATEGORIES } from '../data/constants';
import {
  buildInitialInsights,
  buildInitialNotifications,
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
import { easeInOutQuart } from '../utils/easing';
import { getSignalRoom, subscribeRemoteSignals } from '../utils/signalSync';
import { maybeAutoParametricClaim, clearAutoClaimFlags, saveClaims } from '../utils/claimsStore';
import { prependActivity, resetActivityLog } from '../utils/activityStore';
import { CLAIMS } from '../data/constants';

const ProtectionContext = createContext(null);
const STORAGE_KEY = 'mpf-protection';
export const EXTERNAL_SIGNAL_KEY = 'mpf-external-signal';
const PROCESSED_SIGNAL_KEY = 'mpf-signal-processed-at';
const ALLOC_ANIM_MS = 3000;

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

function consumeSignalPayload(payload, onSignal) {
  if (!payload) return;
  const id = payload?.scenarioId;
  if (!id || (!SCENARIOS[id] && !isTravelSignal(id))) return;

  const at = Number(payload.at) || 0;
  const lastProcessed = Number(sessionStorage.getItem(PROCESSED_SIGNAL_KEY) || 0);
  if (at && at <= lastProcessed) return;

  if (at) sessionStorage.setItem(PROCESSED_SIGNAL_KEY, String(at));
  localStorage.removeItem(EXTERNAL_SIGNAL_KEY);
  onSignal(id);
}

function consumeExternalSignal(raw, onSignal) {
  if (!raw) return;
  try {
    consumeSignalPayload(JSON.parse(raw), onSignal);
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
  const [insights, setInsights] = useState(buildInitialInsights);
  const [notifications, setNotifications] = useState(
    saved?.notifications ?? buildInitialNotifications(initialScenario, initialTime),
  );
  const [travelFlags, setTravelFlags] = useState(loadTravelFlags);
  const [popupContent, setPopupContent] = useState(null);
  const [popupSignal, setPopupSignal] = useState(0);
  const [remoteSignalStatus, setRemoteSignalStatus] = useState('connecting');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayAllocation, setDisplayAllocation] = useState(() => {
    const fromId = sessionStorage.getItem('mpf-anim-from');
    if (fromId && SCENARIOS[fromId]) return { ...SCENARIOS[fromId].allocation };
    return { ...SCENARIOS[initialScenario].allocation };
  });
  const displayRef = useRef(displayAllocation);
  const pendingApplyRef = useRef(null);

  const scenario = SCENARIOS[scenarioId];
  const allocation = scenario.allocation;

  // One shared smooth animation — chart, legend, and bars stay in sync.
  useEffect(() => {
    const to = allocation;
    const from = { ...displayRef.current };
    const unchanged = CATEGORIES.every((c) => Math.abs(from[c.key] - to[c.key]) < 0.01);
    if (unchanged) {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    const start = performance.now();
    let pauseStart = null;
    let totalPaused = 0;
    let frame;

    const onVisibility = () => {
      if (document.hidden) {
        pauseStart = performance.now();
      } else if (pauseStart !== null) {
        totalPaused += performance.now() - pauseStart;
        pauseStart = null;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = (now) => {
      if (pauseStart !== null) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - start - totalPaused;
      const progress = Math.min(elapsed / ALLOC_ANIM_MS, 1);
      const eased = easeInOutQuart(progress);
      const next = {};

      for (const cat of CATEGORIES) {
        const key = cat.key;
        next[key] = from[key] + (to[key] - from[key]) * eased;
      }

      displayRef.current = next;
      setDisplayAllocation(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        displayRef.current = { ...to };
        setDisplayAllocation(to);
        setIsAnimating(false);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', onVisibility);
      setIsAnimating(false);
    };
  }, [allocation]);

  const showPopup = useCallback((content) => {
    setPopupContent(content);
    setPopupSignal((n) => n + 1);
  }, []);

  const applyScenario = useCallback((id) => {
    const time = formatAllocationTime();
    const next = SCENARIOS[id];
    const settings = loadSettings();
    setScenarioIdState(id);
    setAllocatedAt(time);
    if (settings.reallocationAlerts) {
      setNotifications((prev) => [
        createAllocationNotification(next, time),
        ...prev.map((n) => ({ ...n, read: true })),
      ]);
    }
  }, []);

  const commitScenario = useCallback((id) => {
    applyScenario(id);
    prependActivity(id);
    window.setTimeout(() => {
      showPopup(getScenarioPopup(SCENARIOS[id]));
    }, ALLOC_ANIM_MS);
    const autoClaim = maybeAutoParametricClaim(id);
    if (autoClaim) {
      window.dispatchEvent(new CustomEvent('mpf-claims-change', { detail: autoClaim }));
    }
  }, [applyScenario, showPopup]);

  const runScenario = useCallback((id) => {
    if (isTravelSignal(id)) {
      const signal = TRAVEL_SIGNALS[id];
      const flags = loadTravelFlags();

      if (signal.type === 'ticket') {
        const nextFlags = { ...flags, [signal.flag]: true };
        setTravelFlags(nextFlags);
        saveTravelFlags(nextFlags);
        prependActivity(id);
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

  const scheduleScenario = useCallback((id) => {
    const run = () => runScenario(id);

    if (document.hidden) {
      pendingApplyRef.current = id;
      return;
    }

    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [runScenario]);

  const setScenarioId = useCallback((id) => {
    scheduleScenario(id);
  }, [scheduleScenario]);

  useEffect(() => {
    sessionStorage.removeItem('mpf-anim-from');
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden || !pendingApplyRef.current) return;
      const id = pendingApplyRef.current;
      pendingApplyRef.current = null;
      requestAnimationFrame(() => requestAnimationFrame(() => runScenario(id)));
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [runScenario]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ scenarioId, allocatedAt, notifications }),
    );
  }, [scenarioId, allocatedAt, notifications]);

  // External signals — same-device localStorage + cross-device room relay.
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

  useEffect(() => {
    const apply = (payload) => consumeSignalPayload(payload, setScenarioId);

    const stop = subscribeRemoteSignals(getSignalRoom(), apply, (status) => {
      setRemoteSignalStatus(status === 'ready' ? 'ready' : status === 'error' ? 'error' : 'connecting');
    });

    return stop;
  }, [setScenarioId]);

  const refreshData = useCallback(() => {
    const time = formatAllocationTime();
    const clearedFlags = { flightTicket: false, hsrTicket: false };
    setTravelFlags(clearedFlags);
    saveTravelFlags(clearedFlags);
    localStorage.removeItem(EXTERNAL_SIGNAL_KEY);
    sessionStorage.removeItem(PROCESSED_SIGNAL_KEY);
    sessionStorage.removeItem(PENDING_TAP_KEY);
    clearAutoClaimFlags();
    resetActivityLog();
    saveClaims(CLAIMS);
    window.dispatchEvent(new CustomEvent('mpf-claims-change'));
    const resetAlloc = SCENARIOS.tokyo.allocation;
    displayRef.current = { ...resetAlloc };
    setDisplayAllocation({ ...resetAlloc });
    setScenarioIdState('tokyo');
    setAllocatedAt(time);
    setInsights(buildInitialInsights());
    setNotifications(buildInitialNotifications('tokyo', time));
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        scenarioId: 'tokyo',
        allocatedAt: time,
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
      displayAllocation,
      allocatedAt,
      insights,
      notifications,
      travelFlags,
      popupContent,
      popupSignal,
      remoteSignalStatus,
      isAnimating,
      refreshData,
    }),
    [scenarioId, scenario, allocation, displayAllocation, allocatedAt, insights, notifications, travelFlags, popupContent, popupSignal, remoteSignalStatus, isAnimating, setScenarioId, refreshData],
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
