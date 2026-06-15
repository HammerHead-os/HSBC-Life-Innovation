import { PageShell } from '../components/SubPageHeader';
import DonutChart from '../components/DonutChart';
import AllocationLegend from '../components/AllocationLegend';
import { useProtection } from '../context/ProtectionContext';
import { getChartData, CATEGORIES, getCoverageCap } from '../data/constants';

export default function DetailsPage({ wide = false }) {
  const { allocation, scenario } = useProtection();
  const chartData = getChartData(allocation);

  return (
    <PageShell title="Coverage details" backTo="/" wide={wide}>
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <p className="text-xs text-hsbc-red font-bold uppercase mb-1">Active scenario</p>
        <p className="font-bold text-gray-900">{scenario.label}</p>
        <p className="text-sm text-gray-600 mt-2">{scenario.insight}</p>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
        <DonutChart data={chartData} size={200} inner={62} outer={88} />
        <AllocationLegend allocation={allocation} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <h2 className="px-4 py-3 font-bold text-sm border-b border-gray-50">Payout ceilings</h2>
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="px-4 py-3 flex justify-between text-sm border-b border-gray-50 last:border-0">
            <span className="text-gray-700">{cat.name}</span>
            <span className="font-semibold tabular-nums">
              HKD {getCoverageCap(cat.key, allocation[cat.key]).toLocaleString()}
              <span className="text-gray-400 font-normal ml-1">(×{cat.multiplier})</span>
            </span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
