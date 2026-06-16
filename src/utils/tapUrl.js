const LIVE_ORIGIN = 'https://hammerhead-os.github.io';
const LIVE_BASE = '/HSBC-Life-Innovation/';

export function getTapUrl(scenarioId, page = 'mobile') {
  const html = page === 'web' ? 'web.html' : 'mobile.html';
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.replace(/\/[^/]*$/, '/');
    return `${window.location.origin}${path}${html}#/tap/${scenarioId}`;
  }
  return `${LIVE_ORIGIN}${LIVE_BASE}${html}#/tap/${scenarioId}`;
}
