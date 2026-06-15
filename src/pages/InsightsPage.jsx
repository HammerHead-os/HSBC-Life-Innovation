import { InsightListItem } from '../components/InsightCard';
import { useProtection } from '../context/ProtectionContext';

export default function InsightsPage({ variant = 'mobile' }) {
  const { insights, setScenarioId } = useProtection();

  return (
    <div className={`space-y-3 ${variant === 'web' ? 'max-w-3xl' : ''}`}>
      <p className="text-sm text-gray-600 px-1">
        Live AI reallocations and HSBC Life news — updated as soon as coverage shifts.
      </p>
      {insights.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => item.scenario && setScenarioId(item.scenario)}
          className={`w-full text-left rounded-xl transition-colors ${item.scenario ? 'hover:bg-red-50 cursor-pointer' : 'cursor-default'}`}
        >
          <InsightListItem {...item} />
        </button>
      ))}
    </div>
  );
}
