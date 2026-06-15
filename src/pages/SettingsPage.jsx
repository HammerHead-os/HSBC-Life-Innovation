import { useState } from 'react';
import { PageShell } from '../components/SubPageHeader';
import { CATEGORIES } from '../data/constants';
import { Bell, Eye, MapPin, Lock, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProtection } from '../context/ProtectionContext';

import { DEFAULT_SETTINGS, loadSettings, SETTINGS_KEY } from '../data/settings';

function Toggle({ on, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${on ? 'bg-hsbc-red hover:bg-hsbc-red-dark' : 'bg-gray-200 hover:bg-gray-300'}`}
      aria-pressed={on}
      aria-label={label}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  );
}

export default function SettingsPage({ wide = false }) {
  const navigate = useNavigate();
  const { refreshData } = useProtection();
  const [settings, setSettings] = useState(loadSettings);

  const updateSetting = (key) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  };

  const handleRefreshData = () => {
    refreshData();
    navigate('/', { replace: true });
  };

  return (
    <PageShell title="Settings" backTo="/profile" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900 border-b border-gray-50">Personal floors</h2>
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="px-4 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
              {cat.name} floor
              {cat.fixed && <Lock className="w-3.5 h-3.5 text-gray-400" />}
            </span>
            <span className="text-sm font-semibold tabular-nums">
              HKD {cat.floor}{cat.fixed ? ' (fixed)' : ''}
            </span>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900">Notifications</h2>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="flex items-center gap-3 text-sm text-gray-800">
            <Bell className="w-4 h-4 text-gray-400" /> Reallocation alerts
          </span>
          <Toggle
            on={settings.reallocationAlerts}
            onToggle={() => updateSetting('reallocationAlerts')}
            label="Reallocation alerts"
          />
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="flex items-center gap-3 text-sm text-gray-800">
            <Eye className="w-4 h-4 text-gray-400" /> Boost suggestions
          </span>
          <Toggle
            on={settings.boostSuggestions}
            onToggle={() => updateSetting('boostSuggestions')}
            label="Boost suggestions"
          />
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-3 text-sm text-gray-800">
              <MapPin className="w-4 h-4 text-gray-400" /> Location checkpoints
            </span>
            <Toggle
              on={settings.locationCheckpoints}
              onToggle={() => updateSetting('locationCheckpoints')}
              label="Location checkpoints"
            />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            One-time ping when you arrive at a registered venue (airport, West Kowloon Station, partner gyms).
            Confirms you are physically at risk — not just a card payment. Never continuous GPS; deleted within 24 hours.
          </p>
        </div>
      </section>

      <p className="text-xs text-gray-500 text-center px-4">
        PDPO & PIPL compliant. No biometric or continuous location tracking.
      </p>

      <button
        type="button"
        onClick={handleRefreshData}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-hsbc-red/30 bg-red-50 text-hsbc-red text-sm font-medium hover:bg-hsbc-red hover:text-white transition-colors"
      >
        <RotateCcw className="w-4 h-4" /> Refresh data
      </button>
    </PageShell>
  );
}
