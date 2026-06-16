import { CATEGORIES, PREMIUM } from '../data/constants';
import AnimatedNumber from './AnimatedNumber';

export default function AllocationLegend({ allocation, compact = false }) {
  return (
    <ul className={`space-y-${compact ? '1' : '1.5'} text-sm`}>
      {CATEGORIES.map((c) => (
        <li key={c.key} className="flex items-center justify-between gap-3 min-w-[140px]">
          <span className="flex items-center gap-2 text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
            {c.name}
          </span>
          <span className="font-semibold text-gray-900 tabular-nums">
            HKD <AnimatedNumber value={allocation[c.key]} duration={3000} />
          </span>
        </li>
      ))}
      <li className="flex justify-between pt-1 border-t border-gray-100 font-bold text-gray-900">
        <span>Total</span>
        <span className="tabular-nums">HKD {PREMIUM}</span>
      </li>
    </ul>
  );
}
