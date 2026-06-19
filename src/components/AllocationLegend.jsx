import { CATEGORIES, PREMIUM } from '../data/constants';
import { useProtection } from '../context/ProtectionContext';

export default function AllocationLegend({ compact = false, columns = 1 }) {
  const { displayAllocation } = useProtection();

  return (
    <ul
      className={`text-sm ${
        columns === 2
          ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2'
          : compact
            ? 'space-y-1'
            : 'space-y-1.5'
      }`}
    >
      {CATEGORIES.map((c) => (
        <li key={c.key} className="flex items-center justify-between gap-3 min-w-0">
          <span className="flex items-center gap-2 text-gray-600 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
            {c.name}
          </span>
          <span className="font-semibold text-gray-900 tabular-nums shrink-0">
            HKD {Math.round(displayAllocation[c.key])}
          </span>
        </li>
      ))}
      <li
        className={`flex justify-between font-bold text-gray-900 ${
          columns === 2 ? 'sm:col-span-2 pt-2 border-t border-gray-100' : 'pt-1 border-t border-gray-100'
        }`}
      >
        <span>Total</span>
        <span className="tabular-nums">HKD {PREMIUM}</span>
      </li>
    </ul>
  );
}
