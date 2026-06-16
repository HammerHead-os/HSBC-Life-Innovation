import { CreditCard, Calendar, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { PREMIUM, CATEGORIES } from '../data/constants';
import { useAuth } from '../context/AuthContext';

export default function PlanBillingPage({ wide = false }) {
  const { user } = useAuth();

  return (
    <PageShell title="Plan & billing" backTo="/profile" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">Your plan</p>
        <h2 className="text-xl font-bold text-gray-900">{user.plan} · Micro-Protection Fluid</h2>
        <p className="text-sm text-gray-500 mt-1">HSBC Premier · Hong Kong</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-600">Monthly premium</span>
          <span className="text-2xl font-bold text-hsbc-red tabular-nums">HKD {PREMIUM}</span>
        </div>
        <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          Next billing: 1 Jul 2026
        </div>
        <div className="px-4 py-3 flex items-center gap-3 text-sm text-gray-700">
          <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
          HSBC Premier · •••• 4829
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-bold text-sm text-gray-900 mb-2">What&apos;s included</h3>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          One flat premium covers all six protection categories. AI reallocates your HKD {PREMIUM} pool like an ETF — no extra charges when coverage shifts.
        </p>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.key} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-hsbc-red shrink-0" />
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} />
              {cat.name}
              {cat.fixed && <span className="text-xs text-gray-400">(fixed floor HKD {cat.floor})</span>}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
