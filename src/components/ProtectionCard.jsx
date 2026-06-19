import { CheckCircle2 } from 'lucide-react';
import { SubPageLink } from './SubPageHeader';

export default function ProtectionCard({ allocatedAt, chart, legend, layout = 'mobile' }) {
  const isWeb = layout === 'web';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 h-full ${isWeb ? 'p-6' : 'p-5'}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className={`font-bold text-gray-900 ${isWeb ? 'text-xl' : 'text-lg'}`}>
            Your protection is active
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-emerald-600 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            All good
          </div>
        </div>
        <SubPageLink to="/details" className="text-xs font-semibold text-hsbc-red hover:text-hsbc-red-dark transition-colors">
          View details
        </SubPageLink>
      </div>

      <div className={isWeb ? 'grid grid-cols-[auto_1fr] gap-8 items-center' : 'flex items-center gap-4 flex-wrap'}>
        <div className="relative shrink-0 mx-auto lg:mx-0">
          {chart}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs text-gray-500">Total</div>
              <div className={`font-bold text-gray-900 ${isWeb ? 'text-lg' : ''}`}>HKD 200</div>
            </div>
          </div>
        </div>
        <div className={isWeb ? 'w-full min-w-0' : 'flex-1 min-w-[160px]'}>{legend}</div>
      </div>

      {allocatedAt && (
        <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Last reallocation at {allocatedAt}
        </p>
      )}
    </div>
  );
}
