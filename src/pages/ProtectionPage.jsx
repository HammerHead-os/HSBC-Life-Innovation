import { CATEGORIES, getCoverageCap } from '../data/constants';
import { useProtection } from '../context/ProtectionContext';
import { Lock, TrendingUp } from 'lucide-react';

export default function ProtectionPage({ variant = 'mobile' }) {
  const { allocation, scenario } = useProtection();

  return (
    <div className={`space-y-4 ${variant === 'web' ? 'max-w-4xl' : ''}`}>
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-1">Current mode</h2>
        <p className="text-sm text-hsbc-red font-semibold">{scenario.label}</p>
        <p className="text-xs text-gray-500 mt-1">{scenario.insight}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Category breakdown</h2>
          <p className="text-xs text-gray-500">Payout cap = allocation × multiplier</p>
        </div>
        <div className={`${variant === 'web' ? 'grid md:grid-cols-2' : ''} divide-y md:divide-y-0 md:gap-px md:bg-gray-100`}>
          {CATEGORIES.map((cat) => {
            const amount = allocation[cat.key];
            const cap = getCoverageCap(cat.key, amount);
            const pct = (amount / 200) * 100;
            return (
              <div key={cat.key} className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold text-gray-900">
                    <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    {cat.name}
                    {cat.key === 'life' && <Lock className="w-3.5 h-3.5 text-gray-400" />}
                  </span>
                  <span className="font-bold tabular-nums">HKD {amount}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: cat.color }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Floor: HKD {cat.floor}</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Max payout HKD {cap.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
        <p className="text-sm text-gray-800">
          <strong className="text-hsbc-red">Floor guarantee:</strong> AI can reallocate freely but never drops below HKD 5 per category. Life (HKD 90) is permanently locked.
        </p>
      </div>
    </div>
  );
}
