import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, X } from 'lucide-react';

export default function ParametricClaimToast() {
  const [claim, setClaim] = useState(null);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => setClaim(null), []);

  useEffect(() => {
    const onClaim = (e) => {
      const detail = e.detail;
      if (!detail?.automatic) return;
      setClaim(detail);
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(dismiss, 6000);
    };
    window.addEventListener('mpf-claims-change', onClaim);
    return () => {
      window.removeEventListener('mpf-claims-change', onClaim);
      clearTimeout(timerRef.current);
    };
  }, [dismiss]);

  if (!claim) return null;

  return (
    <div
      className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-1.5rem)] max-w-md animate-[slideDownBanner_0.35s_ease-out]"
      role="status"
      aria-live="polite"
    >
      <div className="bg-emerald-900 text-white rounded-2xl shadow-xl border border-emerald-700/50 p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-emerald-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300/90">Parametric payout</p>
          <p className="font-semibold text-sm mt-0.5 leading-snug">{claim.desc}</p>
          <p className="text-emerald-100 text-sm mt-1">
            <strong>HKD {claim.amount.toLocaleString()}</strong> · Auto-paid
          </p>
          <Link
            to="/claims"
            className="inline-block text-xs font-semibold text-white underline underline-offset-2 mt-2 hover:text-emerald-200"
          >
            View in Claims
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="p-1 rounded-lg text-emerald-300/70 hover:text-white hover:bg-white/10 shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
