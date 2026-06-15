import { CARD_SIGNALS, WEATHER_SIGNALS } from '../data/cardSignals';

const RFID_MAP_KEY = 'mpf-rfid-map';

/** Program your USB card reader to type these codes + Enter (see booth setup in app). */
export const WEDGE_CODES = {
  'MPF-TOKYO': 'tokyo',
  'MPF-GUANGZHOU': 'guangzhou',
  'MPF-KEETA': 'keeta',
  'MPF-CLIMBING': 'climbing',
  'MPF-TYPHOON': 'typhoon',
};

export function loadRfidMap() {
  try {
    const raw = localStorage.getItem(RFID_MAP_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveRfidMapping(cardUid, scenarioId) {
  const map = loadRfidMap();
  map[cardUid.trim()] = scenarioId;
  localStorage.setItem(RFID_MAP_KEY, JSON.stringify(map));
}

export function resolveWedgeScan(code) {
  const trimmed = code.trim().toUpperCase();
  if (WEDGE_CODES[trimmed]) return WEDGE_CODES[trimmed];
  const map = loadRfidMap();
  if (map[code.trim()]) return map[code.trim()];
  if (map[trimmed]) return map[trimmed];
  return null;
}

export function findSignalByScenario(scenarioId) {
  return (
    CARD_SIGNALS.find((s) => s.scenario === scenarioId)
    ?? WEATHER_SIGNALS.find((s) => s.scenario === scenarioId)
  );
}

export function findSignalById(signalId) {
  return (
    CARD_SIGNALS.find((s) => s.id === signalId)
    ?? WEATHER_SIGNALS.find((s) => s.id === signalId)
  );
}
