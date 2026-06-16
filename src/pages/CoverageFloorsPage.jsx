import { Lock, Sliders } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { CATEGORIES } from '../data/constants';

export default function CoverageFloorsPage({ wide = false }) {
  return (
    <PageShell title="Coverage floors" backTo="/profile" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5 text-hsbc-red" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-900">Personal minimums</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              AI can rebalance your HKD 200 pool across categories, but never drops coverage below these floors. Life is fixed at HKD 90.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900 border-b border-gray-50">Your floors</h2>
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="px-4 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
              {cat.name}
              {cat.fixed && <Lock className="w-3.5 h-3.5 text-gray-400" />}
            </span>
            <span className="text-sm font-semibold tabular-nums">
              HKD {cat.floor}{cat.fixed ? ' (fixed)' : ''}
            </span>
          </div>
        ))}
      </section>

      <p className="text-xs text-gray-500 text-center px-4 leading-relaxed">
        Floors protect you from over-aggressive AI cuts. Raise a floor anytime — AI will respect it on the next reallocation.
      </p>
    </PageShell>
  );
}
