import { useCallback, useEffect, useState } from 'react';
import { SCENARIOS } from '../data/constants';
import { useProtection } from '../context/ProtectionContext';
import { loadActivityLog } from '../utils/activityStore';
import { Activity } from 'lucide-react';

export default function ActivityPage({ variant = 'mobile' }) {
  const { setScenarioId } = useProtection();
  const [log, setLog] = useState(loadActivityLog);

  const refresh = useCallback(() => setLog(loadActivityLog()), []);

  useEffect(() => {
    window.addEventListener('mpf-activity-change', refresh);
    return () => window.removeEventListener('mpf-activity-change', refresh);
  }, [refresh]);

  return (
    <div className={variant === 'web' ? 'w-full' : ''}>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-hsbc-red" />
          <h2 className="font-bold text-gray-900">Reallocation history</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {log.map((item, i) => (
            <li key={`${item.scenario}-${item.time}-${i}`}>
              <button
                type="button"
                onClick={() => setScenarioId(item.scenario)}
                className="w-full text-left px-4 py-4 hover:bg-red-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.event}</p>
                    <p className="text-xs text-hsbc-red font-medium mt-0.5">{item.change}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <p className="text-xs font-mono text-gray-400">{item.time}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  → {SCENARIOS[item.scenario]?.label ?? item.scenario}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
