import DonutChart from '../components/DonutChart';
import AllocationLegend from '../components/AllocationLegend';
import ProtectionCard from '../components/ProtectionCard';
import InsightCard, { AiBadge } from '../components/InsightCard';
import QuickActions from '../components/QuickActions';
import ScenarioPanel from '../components/ScenarioPanel';
import SignalRoomPanel from '../components/SignalRoomPanel';
import { useProtection } from '../context/ProtectionContext';

export default function HomePage({ variant = 'mobile' }) {
  const { scenario, allocatedAt, remoteSignalStatus, isAnimating } = useProtection();
  const chartSize = variant === 'web'
    ? { size: 200, inner: 68, outer: 92 }
    : { size: 150, inner: 48, outer: 68 };

  if (variant === 'web') {
    return (
      <div className="w-full space-y-4">
        <ScenarioPanel
          variant="web"
          footer={<SignalRoomPanel compact remoteStatus={remoteSignalStatus} />}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch">
          <ProtectionCard
            layout="web"
            allocatedAt={allocatedAt}
            aiTime={allocatedAt}
            animating={isAnimating}
            chart={<DonutChart {...chartSize} />}
            legend={<AllocationLegend columns={3} large />}
          />
          <InsightCard
            layout="web"
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
      <SignalRoomPanel compact remoteStatus={remoteSignalStatus} />
      <ScenarioPanel />
      <ProtectionCard
        allocatedAt={allocatedAt}
        animating={isAnimating}
        chart={<DonutChart {...chartSize} />}
        legend={<AllocationLegend compact />}
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
