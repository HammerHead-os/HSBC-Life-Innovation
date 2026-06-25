import { ACTIVITY_LOG, SCENARIOS } from '../data/constants';

const ACTIVITY_KEY = 'mpf-activity-log';

const ACTIVITY_META = {
  helloride: { event: 'HelloRide bike unlocked', change: 'Liability ↑ · Health ↑' },
  bus: { event: 'HSBC card tap — bus', change: 'Travel ↑ · Liability ↑' },
  mtr_gate: { event: 'HSBC card tap — MTR gate', change: 'Travel ↑ · Liability ↑' },
  hsr_card: { event: 'HSR ticket purchased', change: 'Intent only — waiting for gate' },
  flight_card: { event: 'Flight booked on HSBC card', change: 'Intent only — waiting for gate' },
  typhoon: { event: 'HKO Typhoon Signal T10', change: 'Property +35 · Travel −25' },
  black_rain: { event: 'Black rainstorm warning', change: 'Property ↑ · Travel ↓' },
  fire: { event: 'Fire alert nearby', change: 'Property ↑ · Health ↑' },
  tornado: { event: 'Tornado warning', change: 'Property ↑ · Travel ↓' },
  keeta: { event: 'Keeta delivery mode on', change: 'Liability +20 · Health +15' },
  climbing: { event: 'Checkpoint: Kai Tak Climbing Centre', change: 'Health +25 · Liability +10' },
  gym: { event: 'Checkpoint: registered gym', change: 'Health ↑ · Liability ↑' },
  pool: { event: 'Checkpoint: public swimming pool', change: 'Health ↑' },
  tokyo: { event: 'Flight CX500 departure', change: 'Travel +35 · Property −15' },
  guangzhou: { event: 'XRL West Kowloon → Guangzhou', change: 'Travel +35 · Property −15' },
};

function formatNow() {
  const now = new Date();
  return {
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: 'Today',
  };
}

function metaForScenario(scenarioId) {
  const scenario = SCENARIOS[scenarioId];
  if (!scenario) return { event: scenarioId, change: 'Signal received' };
  const custom = ACTIVITY_META[scenarioId];
  if (custom) return custom;
  return { event: scenario.label, change: scenario.insightTitle };
}

export function loadActivityLog() {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed
  }
  return [...ACTIVITY_LOG];
}

export function saveActivityLog(entries) {
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(entries));
}

export function prependActivity(scenarioId) {
  const { event, change } = metaForScenario(scenarioId);
  const entry = { ...formatNow(), event, change, scenario: scenarioId };
  const next = [entry, ...loadActivityLog()].slice(0, 30);
  saveActivityLog(next);
  window.dispatchEvent(new CustomEvent('mpf-activity-change'));
  return entry;
}

export function resetActivityLog() {
  localStorage.removeItem(ACTIVITY_KEY);
  window.dispatchEvent(new CustomEvent('mpf-activity-change'));
}
