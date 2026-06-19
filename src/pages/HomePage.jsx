import DonutChart from '../components/DonutChart';
import AllocationLegend from '../components/AllocationLegend';
import ProtectionCard from '../components/ProtectionCard';
import InsightCard, { AiBadge } from '../components/InsightCard';
import QuickActions from '../components/QuickActions';
import ScenarioPanel from '../components/ScenarioPanel';
import SignalRoomPanel from '../components/SignalRoomPanel';
import { useProtection } from '../context/ProtectionContext';

export default function HomePage({ variant = 'mobile' }) {
  const { scenario, allocatedAt, remoteSignalStatus } = useProtection();
  const chartSize = variant === 'web'
    ? { size: 220, inner: 72, outer: 100 }
    : { size: 150, inner: 48, outer: 68 };

  if (variant === 'web') {
    return (
      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_18rem] gap-6">
          <ScenarioPanel />
          <SignalRoomPanel compact remoteStatus={remoteSignalStatus} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <ProtectionCard
              layout="web"
              allocatedAt={allocatedAt}
              chart={<DonutChart {...chartSize} />}
              legend={<AllocationLegend columns={2} />}
            />
            <AiBadge key={allocatedAt} time={allocatedAt} />
          </div>
          <div className="lg:col-span-4">
            <InsightCard
              title={scenario.insightTitle}
              body={scenario.insight}
              highlightCategory={scenario.highlightCategory}
              variant="network"
            />
          </div>
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
