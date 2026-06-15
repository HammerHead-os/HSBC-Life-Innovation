import { PageShell } from '../components/SubPageHeader';
import { CLAIMS } from '../data/constants';
import { CheckCircle2 } from 'lucide-react';

export default function ClaimsPage({ wide = false }) {
  return (
    <PageShell title="Claims" backTo="/" wide={wide}>
      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-2">
        <p className="text-sm text-emerald-800">
          Parametric claims (e.g. typhoon T8+) pay out automatically in minutes. Standard claims use MIN(actual loss, allocation × multiplier).
        </p>
      </div>
      <div className="space-y-3">
        {CLAIMS.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">{c.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{c.id} · {c.category}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> {c.status}
              </span>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-sm text-gray-500">{c.date}</span>
              <span className="font-bold text-gray-900">HKD {c.amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="w-full py-3 bg-hsbc-red text-white font-semibold rounded-xl hover:bg-hsbc-red-dark transition-colors">
        File a new claim
      </button>
    </PageShell>
  );
}
