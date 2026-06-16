import { useState } from 'react';
import { Bell, Eye, MapPin, Shield, Database, Trash2 } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import SettingsToggle from '../components/SettingsToggle';
import { loadSettings, SETTINGS_KEY } from '../data/settings';

const DATA_SOURCES = [
  { label: 'HSBC transaction metadata', detail: 'Merchant category & amount — not full statements' },
  { label: 'Calendar events', detail: 'Flights, commutes, booked activities' },
  { label: 'Location checkpoints', detail: 'One-time venue pings — never continuous GPS' },
  { label: 'Public weather APIs', detail: 'HKO typhoon signals and alerts' },
];

const NOT_USED = [
  'Continuous GPS tracking',
  'Biometric data',
  'Social media or browsing history',
  'Selling data to third parties',
];

export default function PrivacyPage({ wide = false }) {
  const [settings, setSettings] = useState(loadSettings);

  const updateSetting = (key) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  };

  return (
    <PageShell title="Privacy & data" backTo="/profile" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-hsbc-red" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-900">Your data, your control</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              PDPO & PIPL compliant. Processed on-device where possible. Retained 24 hours only, then deleted.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900 border-b border-gray-50 flex items-center gap-2">
          <Database className="w-4 h-4 text-gray-400" /> What we use
        </h2>
        {DATA_SOURCES.map((item) => (
          <div key={item.label} className="px-4 py-3 border-b border-gray-50 last:border-0">
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900 border-b border-gray-50 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-gray-400" /> What we never use
        </h2>
        <ul className="px-4 py-3 space-y-2">
          {NOT_USED.map((item) => (
            <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900">Permissions</h2>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="flex items-center gap-3 text-sm text-gray-800">
            <MapPin className="w-4 h-4 text-gray-400" /> Location checkpoints
          </span>
          <SettingsToggle
            on={settings.locationCheckpoints}
            onToggle={() => updateSetting('locationCheckpoints')}
            label="Location checkpoints"
          />
        </div>
        <div className="px-4 pb-3 text-xs text-gray-500 leading-relaxed">
          One-time ping at registered venues (airport, West Kowloon Station, partner gyms). Confirms physical risk — not just a card payment.
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="flex items-center gap-3 text-sm text-gray-800">
            <Bell className="w-4 h-4 text-gray-400" /> Reallocation alerts
          </span>
          <SettingsToggle
            on={settings.reallocationAlerts}
            onToggle={() => updateSetting('reallocationAlerts')}
            label="Reallocation alerts"
          />
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="flex items-center gap-3 text-sm text-gray-800">
            <Eye className="w-4 h-4 text-gray-400" /> Boost suggestions
          </span>
          <SettingsToggle
            on={settings.boostSuggestions}
            onToggle={() => updateSetting('boostSuggestions')}
            label="Boost suggestions"
          />
        </div>
      </section>
    </PageShell>
  );
}
