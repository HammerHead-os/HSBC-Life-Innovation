import DonutChart from '../components/DonutChart';
import AllocationLegend from '../components/AllocationLegend';
import ProtectionCard from '../components/ProtectionCard';
import InsightCard, { AiBadge } from '../components/InsightCard';
import QuickActions from '../components/QuickActions';
import CreditCardPanel from '../components/CreditCardPanel';
import { useProtection } from '../context/ProtectionContext';
import { getChartData } from '../data/constants';

export default function HomePage({ variant = 'mobile' }) {
  const { scenario, allocation, allocatedAt } = useProtection();
  const chartData = getChartData(allocation);
  const chartSize = variant === 'web'
    ? { size: 180, inner: 58, outer: 82 }
    : { size: 150, inner: 48, outer: 68 };

  if (variant === 'web') {
    return (
      <div className="space-y-6">
        <CreditCardPanel variant="web" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProtectionCard
              allocation={allocation}
              allocatedAt={allocatedAt}
              chart={<DonutChart data={chartData} {...chartSize} />}
              legend={<AllocationLegend allocation={allocation} />}
            />
            <AiBadge key={allocatedAt} time={allocatedAt} />
          </div>
          <InsightCard
            title={scenario.insightTitle}
            body={scenario.insight}
            highlightCategory={scenario.highlightCategory}
            variant="network"
          />
        </div>
        <QuickActions large />
      </div>
    );
  }

  return (
    <>
      <CreditCardPanel variant="mobile" />
      <ProtectionCard
        allocation={allocation}
        allocatedAt={allocatedAt}
        chart={<DonutChart data={chartData} {...chartSize} />}
        legend={<AllocationLegend allocation={allocation} compact />}
      />
      <AiBadge key={allocatedAt} time={allocatedAt} />
      <InsightCard
        title={scenario.insightTitle}
        body={scenario.insight}
        highlightCategory={scenario.highlightCategory}
        variant="network"
      />
      <QuickActions />
    </>
  );
}
