import { useState } from 'react';
import { Wifi, Cloud, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';
import { CARD_SIGNALS, WEATHER_SIGNALS } from '../data/cardSignals';
import { ScenarioPicker } from './SubPageHeader';
import { SCENARIOS } from '../data/constants';

export default function CreditCardPanel({ variant = 'mobile' }) {
  const { user } = useAuth();
  const { scenarioId, setScenarioId } = useProtection();
  const [processing, setProcessing] = useState(null);
  const [toast, setToast] = useState(null);
  const [manualOpen, setManualOpen] = useState(false);

  const runSignal = (signal, type = 'card') => {
    if (processing) return;
    setProcessing(signal.id);
    setToast(null);

    setTimeout(() => {
      setScenarioId(signal.scenario);
      const label = type === 'card'
        ? `${signal.merchant} · HKD ${signal.amount.toLocaleString()}`
        : `${signal.source} · ${signal.detail}`;
      setToast({ label, ok: true });
      setProcessing(null);
      setTimeout(() => setToast(null), 3500);
    }, 900);
  };

  const isCompact = variant === 'mobile';

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">
          Live signal demo
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Tap a payment below — AI reads your HSBC card transaction and reallocates coverage.
        </p>

        <button
          type="button"
          className={`relative w-full rounded-2xl p-4 mb-4 text-left overflow-hidden transition-transform ${
            processing ? 'scale-[0.98]' : 'hover:scale-[1.01]'
          }`}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 50%, #db0011 100%)',
          }}
          onClick={() => {}}
          tabIndex={-1}
          aria-hidden
        >
          <div className="flex justify-between items-start text-white">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-80">HSBC Premier</p>
              <p className="text-lg font-bold mt-2 tracking-widest">•••• •••• •••• 4829</p>
              <p className="text-sm mt-3 font-medium">{user.fullName}</p>
            </div>
            <div className="text-right">
              <Wifi className={`w-6 h-6 opacity-90 ${processing ? 'animate-pulse' : ''}`} />
              <p className="text-[10px] mt-1 opacity-70">Contactless</p>
            </div>
          </div>
          {processing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </button>

        <div className={`grid gap-2 ${isCompact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {CARD_SIGNALS.map((signal) => (
            <button
              key={signal.id}
              type="button"
              disabled={!!processing}
              onClick={() => runSignal(signal, 'card')}
              className={`text-left p-3 rounded-xl border transition-colors ${
                scenarioId === signal.scenario
                  ? 'border-hsbc-red bg-red-50'
                  : 'border-gray-200 hover:border-hsbc-red hover:bg-red-50'
              } disabled:opacity-50`}
            >
              <p className="font-semibold text-gray-900 text-xs">{signal.merchant}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{signal.detail}</p>
              <p className="text-xs font-bold text-hsbc-red mt-1">HKD {signal.amount.toLocaleString()}</p>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5" /> Non-card signal
          </p>
          {WEATHER_SIGNALS.map((signal) => (
            <button
              key={signal.id}
              type="button"
              disabled={!!processing}
              onClick={() => runSignal(signal, 'weather')}
              className={`w-full text-left p-3 rounded-xl border transition-colors ${
                scenarioId === signal.scenario
                  ? 'border-hsbc-red bg-red-50'
                  : 'border-gray-200 hover:border-hsbc-red hover:bg-red-50'
              } disabled:opacity-50`}
            >
              <p className="font-semibold text-gray-900 text-xs">{signal.source}</p>
              <p className="text-[10px] text-gray-500">{signal.detail}</p>
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl animate-[fadeIn_0.3s_ease]">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span><strong>Payment detected.</strong> {toast.label} — coverage updated.</span>
        </div>
      )}

      <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-100 overflow-hidden">
        <button
          type="button"
          onClick={() => setManualOpen((v) => !v)}
          className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-xs text-gray-600">
            <span className="font-semibold text-gray-800">Manual override</span>
            {' '}— show coverage change directly
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${manualOpen ? 'rotate-180' : ''}`} />
        </button>
        {manualOpen && (
          <div className="px-3 pb-3 pt-0 border-t border-gray-50">
            <ScenarioPicker scenarios={SCENARIOS} current={scenarioId} onChange={setScenarioId} />
          </div>
        )}
      </div>
    </div>
  );
}
