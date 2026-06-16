import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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

const VARIANT_STYLES = {
  hazard: {
    panel: 'bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white border-red-900/40 shadow-red-900/30',
    iconWrap: 'bg-white/15 ring-2 ring-white/25',
    icon: AlertTriangle,
    badge: 'Emergency alert',
  },
  travel: {
    panel: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-600/50 shadow-slate-900/40',
    iconWrap: 'bg-white/10 ring-2 ring-white/20',
    icon: Plane,
    badge: 'Travel signal',
  },
  checkpoint: {
    panel: 'bg-gradient-to-r from-[#b8000e] via-hsbc-red to-[#9a000c] text-white border-red-900/40 shadow-red-900/30',
    iconWrap: 'bg-white/15 ring-2 ring-white/25',
    icon: MapPin,
    badge: 'Location checkpoint',
  },
  mobility: {
    panel: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-gray-600/40 shadow-gray-900/40',
    iconWrap: 'bg-white/10 ring-2 ring-white/20',
    icon: Bike,
    badge: 'Mobility signal',
  },
  default: {
    panel: 'bg-white text-gray-900 border-hsbc-red/30 shadow-hsbc-red/15',
    iconWrap: 'bg-red-50 ring-2 ring-red-100',
    icon: Shield,
    badge: 'AI reallocation',
  },
};

export default function ScenarioPopup() {
  const { user } = useAuth();
  const { popupSignal, popupContent } = useProtection();
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const timerRef = useRef(null);
  const lastSignal = useRef(0);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (popupSignal === 0 || popupSignal === lastSignal.current) return;
    lastSignal.current = popupSignal;

    const next = popupContent;
    if (!next) return;
    setPopup({
      ...next,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    });
    setOpen(true);

    clearTimeout(timerRef.current);
    const duration = next.variant === 'hazard' ? 8000 : 6000;
    timerRef.current = setTimeout(close, duration);

    return () => clearTimeout(timerRef.current);
  }, [popupSignal, popupContent, close]);

  if (!user || !open || !popup) return null;

  const style = VARIANT_STYLES[popup.variant] ?? VARIANT_STYLES.default;
  const Icon = style.icon;
  const isLight = popup.variant !== 'default';

  return createPortal(
    <div
      className="fixed top-0 inset-x-0 z-[9999] px-3 pt-3 sm:pt-4 pointer-events-none"
      role="status"
      aria-live="assertive"
      aria-label={popup.title}
    >
      <div
        className={`pointer-events-auto mx-auto w-full max-w-lg rounded-2xl border-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] p-4 sm:p-5 animate-[slideDownBanner_0.45s_ease-out] ${style.panel}`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.iconWrap}`}>
            <Icon className={`w-5 h-5 ${isLight ? 'text-white' : 'text-hsbc-red'}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
              isLight ? 'bg-white/15 text-white/90' : 'bg-red-50 text-hsbc-red'
            }`}>
              <Bell className="w-3 h-3" />
              {style.badge}
              <span className="opacity-70">· {popup.time}</span>
            </div>

            <h2 className="font-bold text-base sm:text-lg leading-snug">
              {popup.title}
            </h2>

            <p className={`text-sm leading-relaxed mt-0.5 ${isLight ? 'text-white/90' : 'text-gray-600'}`}>
              {popup.body}
            </p>

            <p className={`flex items-center gap-1.5 text-xs font-semibold mt-2 ${isLight ? 'text-white/85' : 'text-hsbc-red'}`}>
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              {popup.footer ?? 'Coverage reallocated automatically'}
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className={`p-1.5 rounded-lg shrink-0 transition-colors ${
              isLight ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-hsbc-red hover:bg-red-50'
            }`}
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
