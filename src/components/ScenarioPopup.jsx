import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  AlertTriangle,
  Plane,
  MapPin,
  Bike,
  Bell,
  Shield,
} from 'lucide-react';
import { useProtection } from '../context/ProtectionContext';
import { getScenarioPopup } from '../data/scenarioPopups';

const VARIANT_STYLES = {
  hazard: {
    wrap: 'bg-red-600 text-white border-red-700',
    icon: AlertTriangle,
    badge: 'Emergency alert',
  },
  travel: {
    wrap: 'bg-slate-800 text-white border-slate-900',
    icon: Plane,
    badge: 'Travel signal',
  },
  checkpoint: {
    wrap: 'bg-hsbc-red text-white border-hsbc-red-dark',
    icon: MapPin,
    badge: 'Location checkpoint',
  },
  mobility: {
    wrap: 'bg-gray-900 text-white border-gray-800',
    icon: Bike,
    badge: 'Mobility signal',
  },
  default: {
    wrap: 'bg-white text-gray-900 border-gray-200 shadow-xl',
    icon: Shield,
    badge: 'AI reallocation',
  },
};

export default function ScenarioPopup() {
  const { popupSignal, scenario, allocatedAt } = useProtection();
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const timerRef = useRef(null);
  const lastSignal = useRef(0);

  useEffect(() => {
    if (popupSignal === 0 || popupSignal === lastSignal.current) return;
    lastSignal.current = popupSignal;

    const next = getScenarioPopup(scenario);
    setPopup({ ...next, time: allocatedAt });
    setOpen(true);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 6000);

    return () => clearTimeout(timerRef.current);
  }, [popupSignal, scenario, allocatedAt]);

  if (!open || !popup) return null;

  const style = VARIANT_STYLES[popup.variant] ?? VARIANT_STYLES.default;
  const Icon = style.icon;
  const isLight = popup.variant !== 'default';

  return createPortal(
    <div
      className="fixed inset-x-0 z-[9999] px-4 pointer-events-none"
      style={{ bottom: 'max(5.5rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))' }}
      role="alert"
      aria-live="assertive"
    >
      <div className="mx-auto max-w-md sm:max-w-sm sm:ml-auto sm:mr-6 pointer-events-auto">
        <div
          className={`rounded-2xl border shadow-2xl p-4 animate-[slideUpPopup_0.35s_ease] ${style.wrap}`}
        >
          <div className="flex gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                isLight ? 'bg-white/15' : 'bg-red-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isLight ? 'text-white' : 'text-hsbc-red'}`} />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2 mb-0.5">
                <Bell className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-white/80' : 'text-hsbc-red'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wide ${isLight ? 'text-white/80' : 'text-hsbc-red'}`}>
                  {style.badge}
                </span>
                <span className={`text-[10px] ml-auto ${isLight ? 'text-white/70' : 'text-gray-400'}`}>
                  {popup.time}
                </span>
              </div>
              <p className="font-bold text-sm leading-snug">{popup.title}</p>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-white/90' : 'text-gray-600'}`}>
                {popup.body}
              </p>
              <p className={`text-[10px] mt-2 font-semibold ${isLight ? 'text-white/75' : 'text-hsbc-red'}`}>
                Coverage reallocated automatically
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`p-1 rounded-lg shrink-0 self-start transition-colors ${
                isLight ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-hsbc-red hover:bg-red-50'
              }`}
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
