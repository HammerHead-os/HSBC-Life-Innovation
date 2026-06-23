import { CheckCircle2 } from 'lucide-react';
import { SubPageLink } from './SubPageHeader';

export default function ProtectionCard({ allocatedAt, chart, legend, layout = 'mobile', animating = false }) {
  const isWeb = layout === 'web';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border h-full transition-colors duration-500 ${isWeb ? 'p-5' : 'p-5'} ${
      animating ? 'border-hsbc-red/40 ring-2 ring-hsbc-red/10' : 'border-gray-100'
    }`}>
      <div className={`flex items-start justify-between ${isWeb ? 'mb-3' : 'mb-4'}`}>
        <div>
          <h2 className={`font-bold text-gray-900 ${isWeb ? 'text-xl' : 'text-lg'}`}>
            Your protection is active
          </h2>
          <div className={`flex items-center gap-1.5 mt-1 text-emerald-600 font-medium ${isWeb ? 'text-[15px]' : 'text-sm'}`}>
            <CheckCircle2 className={isWeb ? 'w-[18px] h-[18px]' : 'w-4 h-4'} />
            All good
          </div>
        </div>
        <SubPageLink
          to="/details"
          className={`font-semibold text-hsbc-red hover:text-hsbc-red-dark transition-colors ${isWeb ? 'text-sm' : 'text-xs'}`}
        >
          View details
        </SubPageLink>
      </div>

      <div
        className={
          isWeb
            ? 'flex flex-col xl:flex-row xl:items-center gap-5 w-full'
            : 'flex items-center gap-4 flex-wrap'
        }
      >
        <div className="relative shrink-0 mx-auto sm:mx-0">
          {chart}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className={`text-gray-500 ${isWeb ? 'text-sm' : 'text-xs'}`}>Total</div>
              <div className={`font-bold text-gray-900 ${isWeb ? 'text-xl' : ''}`}>HKD 200</div>
            </div>
          </div>
        </div>
        <div className={isWeb ? 'flex-1 w-full min-w-0' : 'flex-1 min-w-[160px]'}>{legend}</div>
      </div>

      {allocatedAt && (
        <div className={`text-gray-500 mt-3 ${isWeb ? 'text-sm' : 'text-xs'}`}>
          {animating ? (
            <p className="flex items-center gap-1.5 text-hsbc-red font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-hsbc-red animate-pulse" />
              AI reallocating coverage…
            </p>
          ) : (
            <p className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Last reallocation at {allocatedAt}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
