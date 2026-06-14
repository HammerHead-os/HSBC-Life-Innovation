import { INSIGHTS } from '../data/constants';
import { InsightListItem } from '../components/InsightCard';
import { useProtection } from '../context/ProtectionContext';

export default function InsightsPage({ variant = 'mobile' }) {
  const { setScenarioId } = useProtection();

  return (
    <div className={`space-y-3 ${variant === 'web' ? 'max-w-3xl' : ''}`}>
      <p className="text-sm text-gray-600 px-1">
        AI-generated insights based on your spending, travel, and weather signals.
      </p>
      {INSIGHTS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => item.scenario && setScenarioId(item.scenario)}
          className="w-full text-left"
        >
          <InsightListItem {...item} />
        </button>
      ))}
    </div>
  );
}
