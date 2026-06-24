import { InsightListItem } from '../components/InsightCard';
import { useProtection } from '../context/ProtectionContext';

export default function InsightsPage({ variant = 'mobile' }) {
  const { insights } = useProtection();

  return (
    <div className={`space-y-3 ${variant === 'web' ? 'w-full' : ''}`}>
      <p className="text-sm text-gray-600 px-1 leading-relaxed">
        Research, product perspective, and market context from HSBC Life — not live reallocation alerts.
        For coverage shifts, see <strong className="text-gray-800">Activity</strong>.
      </p>
      {insights.map((item) => (
        <div key={item.id} className="rounded-xl">
          <InsightListItem {...item} />
        </div>
      ))}
    </div>
  );
}
