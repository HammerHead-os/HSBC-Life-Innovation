import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import {
  X,
  AlertTriangle,
  Plane,
  MapPin,
  Bike,
  Bell,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';
import { getScenarioPopup } from '../data/scenarioPopups';

const VARIANT_STYLES = {
  hazard: {
    panel: 'bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white border-red-900/30',
    iconWrap: 'bg-white/15 ring-2 ring-white/25',
    icon: AlertTriangle,
    badge: 'Emergency alert',
    backdrop: 'bg-black/60',
  },
  travel: {
    panel: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white border-slate-700/40',
    iconWrap: 'bg-white/10 ring-2 ring-white/20',
    icon: Plane,
    badge: 'Travel signal',
    backdrop: 'bg-black/55',
  },
  checkpoint: {
    panel: 'bg-gradient-to-br from-[#b8000e] via-hsbc-red to-[#8f0009] text-white border-red-900/30',
    iconWrap: 'bg-white/15 ring-2 ring-white/25',
    icon: MapPin,
    badge: 'Location checkpoint',
    backdrop: 'bg-black/55',
  },
  mobility: {
    panel: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-gray-700/40',
    iconWrap: 'bg-white/10 ring-2 ring-white/20',
    icon: Bike,
    badge: 'Mobility signal',
    backdrop: 'bg-black/50',
  },
  default: {
    panel: 'bg-white text-gray-900 border-gray-200',
    iconWrap: 'bg-red-50 ring-2 ring-red-100',
    icon: Shield,
    badge: 'AI reallocation',
    backdrop: 'bg-black/45',
  },
};

export default function ScenarioPopup() {
  const { user } = useAuth();
  const location = useLocation();
  const { popupSignal, scenario, allocatedAt } = useProtection();
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const timerRef = useRef(null);
  const lastSignal = useRef(0);

  const isAppRoute = location.pathname !== '/login';

  useEffect(() => {
    if (popupSignal === 0 || popupSignal === lastSignal.current) return;
    lastSignal.current = popupSignal;

    const next = getScenarioPopup(scenario);
    setPopup({ ...next, time: allocatedAt });
    setOpen(true);

    clearTimeout(timerRef.current);
    const duration = next.variant === 'hazard' ? 9000 : 7000;
    timerRef.current = setTimeout(() => setOpen(false), duration);

    return () => clearTimeout(timerRef.current);
  }, [popupSignal, scenario, allocatedAt]);

  if (!user || !isAppRoute || !open || !popup) return null;

  const style = VARIANT_STYLES[popup.variant] ?? VARIANT_STYLES.default;
  const Icon = style.icon;
  const isLight = popup.variant !== 'default';

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 ${style.backdrop} animate-[fadeIn_0.25s_ease]`}
      role="alertdialog"
      aria-live="assertive"
      aria-modal="true"
      aria-label={popup.title}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Dismiss alert"
        onClick={() => setOpen(false)}
      />

      <div
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 animate-[scaleInAlert_0.35s_ease] ${style.panel}`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
            isLight ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-hsbc-red hover:bg-red-50'
          }`}
          aria-label="Close alert"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 ${style.iconWrap}`}>
            <Icon className={`w-10 h-10 ${isLight ? 'text-white' : 'text-hsbc-red'}`} />
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 ${
            isLight ? 'bg-white/15 text-white/90' : 'bg-red-50 text-hsbc-red'
          }`}>
            <Bell className="w-3.5 h-3.5" />
            {style.badge}
            <span className="opacity-70">· {popup.time}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
            {popup.title}
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed max-w-md ${isLight ? 'text-white/90' : 'text-gray-600'}`}>
            {popup.body}
          </p>

          <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${isLight ? 'text-white/85' : 'text-hsbc-red'}`}>
            <Sparkles className="w-4 h-4" />
            Coverage reallocated automatically
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className={`mt-6 w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm transition-colors ${
              isLight
                ? 'bg-white text-hsbc-red hover:bg-red-50'
                : 'bg-hsbc-red text-white hover:bg-hsbc-red-dark'
            }`}
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
