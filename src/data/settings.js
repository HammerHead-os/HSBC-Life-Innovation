export const SETTINGS_KEY = 'mpf-settings';

export const DEFAULT_SETTINGS = {
  locationCheckpoints: true,
  reallocationAlerts: true,
  boostSuggestions: true,
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function shouldShowNotification(notification) {
  const settings = loadSettings();
  if (notification.source === 'ai' || notification.type === 'alert') {
    return settings.reallocationAlerts;
  }
  if (notification.type === 'boost') {
    return settings.boostSuggestions;
  }
  return true;
}
