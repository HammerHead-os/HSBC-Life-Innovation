import { Radio, Zap } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { TRIGGER_GROUPS, TRIGGER_NOTES } from '../data/triggers';

export default function TriggersPage({ wide = false }) {
  return (
    <PageShell title="Triggers" backTo="/settings" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5 text-hsbc-red" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-900">What moves your coverage</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Real-world verified signals — government APIs, bank data, police reports, and medical records.
              Demo booth NFC taps simulate these sources.
            </p>
          </div>
        </div>
      </section>

      {TRIGGER_GROUPS.map((group) => (
        <section key={group.category} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: group.color }} />
              <h2 className="font-bold text-sm text-gray-900">{group.category}</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{group.summary}</p>
          </div>
          {group.triggers.map((trigger) => (
            <div key={trigger.label} className="px-4 py-3 border-b border-gray-50 last:border-0">
              <p className="text-sm font-medium text-gray-900">{trigger.label}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{trigger.detail}</p>
            </div>
          ))}
        </section>
      ))}

      <section className="bg-amber-50 rounded-xl border border-amber-100 p-4">
        <div className="flex items-start gap-2">
          <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <ul className="space-y-2">
            {TRIGGER_NOTES.map((note) => (
              <li key={note} className="text-xs text-amber-900 leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
