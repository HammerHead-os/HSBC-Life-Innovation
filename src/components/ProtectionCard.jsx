import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SubPageLink } from './SubPageHeader';
import { useProtection } from '../context/ProtectionContext';

export default function ProtectionCard({ allocation, allocatedAt, chart, legend }) {
  const { uiPulse } = useProtection();
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (!uiPulse) return;
    setPulsing(true);
    const timer = window.setTimeout(() => setPulsing(false), 3000);
    return () => clearTimeout(timer);
  }, [uiPulse]);

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 transition-shadow duration-500 ${
        pulsing ? 'animate-[revealPulse_3s_ease-out] ring-2 ring-hsbc-red/20' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">Your protection is active</h2>
          <div className="flex items-center gap-1.5 mt-1 text-emerald-600 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            All good
          </div>
        </div>
        <SubPageLink to="/details" className="text-xs font-semibold text-hsbc-red hover:text-hsbc-red-dark transition-colors">
          View details
        </SubPageLink>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative shrink-0">
          {chart}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs text-gray-500">Total</div>
              <div className="font-bold text-gray-900">HKD 200</div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[160px]">{legend}</div>
      </div>
      {allocatedAt && (
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Last reallocation at {allocatedAt}
        </p>
      )}
    </div>
  );
}
