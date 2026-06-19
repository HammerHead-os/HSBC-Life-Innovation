import { CloudRain, MapPin, Radio, Shield, Wallet } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { TRIGGER_GROUPS, TRIGGER_NOTES } from '../data/triggers';

const GROUP_ICONS = {
  'HKO weather & hazard alerts': CloudRain,
  'Card + verified location (two-step)': MapPin,
  'Mobility & transit taps': Wallet,
  'Gig work & activity checkpoints': Radio,
  'Cyber (HSBC card feed)': Shield,
};

export default function TriggersPage({ wide = false }) {
  return (
    <PageShell title="Triggers" backTo="/settings" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 p-4">
        <h2 className="font-bold text-sm text-gray-900">Signals that move your HKD 200 pool</h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          These are the live triggers wired into the demo — HKO weather API, airport and station geofences,
          Octopus transit, food-delivery shift status (Keeta), and partner venue check-ins. Booth NFC boxes
          simulate most feeds; cyber runs from your HSBC card in the background.
        </p>
      </section>

      {TRIGGER_GROUPS.map((group) => {
        const Icon = GROUP_ICONS[group.title] ?? Radio;
        return (
          <section key={group.title} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-hsbc-red shrink-0" />
                <h2 className="font-bold text-sm text-gray-900">{group.title}</h2>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{group.summary}</p>
            </div>
            {group.triggers.map((trigger) => (
              <div key={trigger.label} className="px-4 py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">{trigger.label}</p>
                  <span className="shrink-0 text-[10px] font-semibold text-hsbc-red bg-red-50 px-2 py-0.5 rounded-full">
                    {trigger.source}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{trigger.detail}</p>
                <p className="text-[10px] font-semibold text-gray-400 mt-1.5 uppercase tracking-wide">
                  {trigger.shifts}
                </p>
              </div>
            ))}
          </section>
        );
      })}

      <section className="bg-gray-50 rounded-xl border border-gray-100 p-4">
        <ul className="space-y-2">
          {TRIGGER_NOTES.map((note) => (
            <li key={note} className="text-xs text-gray-600 leading-relaxed">
              {note}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
