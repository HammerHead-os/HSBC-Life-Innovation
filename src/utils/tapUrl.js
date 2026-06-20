const LIVE_ORIGIN = 'https://hammerhead-os.github.io';
const LIVE_BASE = '/HSBC-Life-Innovation/';

function siteBase() {
  if (typeof window !== 'undefined') {
    const match = window.location.pathname.match(/^(.*\/HSBC-Life-Innovation\/)/);
    if (match) return `${window.location.origin}${match[1]}`;
    return `${window.location.origin}/`;
  }
  return `${LIVE_ORIGIN}${LIVE_BASE}`;
}

/** Opens mobile.html — if app is already open, signals it and snaps back automatically. */
export function getTapUrl(scenarioId) {
  return `${siteBase()}mobile.html?tap=${encodeURIComponent(scenarioId)}`;
}
