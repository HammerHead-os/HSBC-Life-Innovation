const LIVE_ORIGIN = 'https://hammerhead-os.github.io';
const LIVE_BASE = '/HSBC-Life-Innovation/';

export function getTapUrl(scenario, page = 'mobile') {
  const html = page === 'web' ? 'web.html' : 'mobile.html';
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.replace(/\/[^/]*$/, '/');
    return `${window.location.origin}${path}${html}#/tap/${scenario}`;
  }
  return `${LIVE_ORIGIN}${LIVE_BASE}${html}#/tap/${scenario}`;
}

export function getQrImageUrl(url) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(url)}`;
}
