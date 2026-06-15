import { SCENARIOS } from '../data/constants';
import { CARD_SIGNALS, WEATHER_SIGNALS } from '../data/cardSignals';

export const NFC_TAP_BASE =
  'https://hammerhead-os.github.io/HSBC-Life-Innovation/mobile.html#/tap';

export const PENDING_TAP_KEY = 'mpf-pending-tap';

export function getNfcTapUrl(scenarioId) {
  return `${NFC_TAP_BASE}/${scenarioId}`;
}

export function getSignalByScenario(scenarioId) {
  return (
    CARD_SIGNALS.find((s) => s.scenario === scenarioId)
    ?? WEATHER_SIGNALS.find((s) => s.scenario === scenarioId)
    ?? null
  );
}

export function parseNfcPayload(raw) {
  if (!raw) return null;
  const text = raw.trim();

  const tapMatch = text.match(/\/tap\/([a-z]+)/i);
  if (tapMatch && SCENARIOS[tapMatch[1]]) return tapMatch[1];

  const mpfMatch = text.match(/mpf:([a-z]+)/i);
  if (mpfMatch && SCENARIOS[mpfMatch[1]]) return mpfMatch[1];

  if (SCENARIOS[text.toLowerCase()]) return text.toLowerCase();

  return null;
}

export function decodeNfcRecords(message) {
  const decoder = new TextDecoder();
  const parts = [];

  for (const record of message.records) {
    if (record.recordType === 'text') {
      parts.push(decoder.decode(record.data));
    }
    if (record.recordType === 'url') {
      parts.push(decoder.decode(record.data));
    }
  }

  return parts.join(' ');
}

export function storePendingTap(scenarioId) {
  if (SCENARIOS[scenarioId]) {
    sessionStorage.setItem(PENDING_TAP_KEY, scenarioId);
  }
}

export function consumePendingTap() {
  const id = sessionStorage.getItem(PENDING_TAP_KEY);
  if (!id) return null;
  sessionStorage.removeItem(PENDING_TAP_KEY);
  return SCENARIOS[id] ? id : null;
}
