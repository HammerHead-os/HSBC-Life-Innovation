import DonutChart from '../components/DonutChart';
import AllocationLegend from '../components/AllocationLegend';
import ProtectionCard from '../components/ProtectionCard';
import InsightCard, { AiBadge } from '../components/InsightCard';
import QuickActions from '../components/QuickActions';
import { ScenarioPicker } from '../components/SubPageHeader';
import { useProtection } from '../context/ProtectionContext';
import { getChartData, SCENARIOS } from '../data/constants';

export default function HomePage({ basePath, variant = 'mobile' }) {
  const { scenario, allocation, scenarioId, setScenarioId, allocatedAt } = useProtection();
  const chartData = getChartData(allocation);

  if (variant === 'web') {
    return (
      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur rounded-xl p-3 border border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Demo: switch scenario to see AI reallocate</p>
          <ScenarioPicker scenarios={SCENARIOS} current={scenarioId} onChange={setScenarioId} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
        <ProtectionCard
          key={allocatedAt}
          allocation={allocation}
          allocatedAt={allocatedAt}
              basePath={basePath}
              chart={<DonutChart data={chartData} size={180} inner={58} outer={82} />}
              legend={<AllocationLegend allocation={allocation} />}
            />
            <AiBadge key={allocatedAt} time={allocatedAt} />
          </div>
          <InsightCard
            title={scenario.insightTitle}
            body={scenario.insight}
            scenarioIcon={scenario.icon}
            scenarioId={scenarioId}
            variant="network"
          />
        </div>
        <QuickActions basePath={basePath} large />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/90 backdrop-blur rounded-xl p-2.5 border border-gray-100 mb-1">
        <p className="text-[10px] text-gray-500 mb-1.5">Demo: tap a scenario</p>
        <ScenarioPicker scenarios={SCENARIOS} current={scenarioId} onChange={setScenarioId} />
      </div>
        <ProtectionCard
          key={allocatedAt}
          allocation={allocation}
          allocatedAt={allocatedAt}
        basePath={basePath}
        chart={<DonutChart data={chartData} size={150} inner={48} outer={68} />}
        legend={<AllocationLegend allocation={allocation} compact />}
      />
      <AiBadge key={allocatedAt} time={allocatedAt} />
      <InsightCard
        title={scenario.insightTitle}
        body={scenario.insight}
        scenarioIcon={scenario.icon}
        scenarioId={scenarioId}
        variant="network"
      />
      <QuickActions basePath={basePath} />
    </>
  );
}
