import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Wifi, Cloud, ChevronDown, CheckCircle2, Loader2, CreditCard, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';
import { CARD_SIGNALS, WEATHER_SIGNALS } from '../data/cardSignals';
import { ScenarioPicker } from './SubPageHeader';
import { SCENARIOS } from '../data/constants';
import { getTapUrl, getQrImageUrl } from '../utils/tapUrl';

export default function CreditCardPanel({ variant = 'mobile' }) {
  const { user } = useAuth();
  const location = useLocation();
  const { scenarioId, setScenarioId } = useProtection();
  const [processing, setProcessing] = useState(null);
  const [toast, setToast] = useState(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

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

  useEffect(() => {
    const tap = location.state?.cardTap;
    if (!tap) return;
    const signal =
      CARD_SIGNALS.find((s) => s.id === location.state?.signalId || s.scenario === tap)
      ?? WEATHER_SIGNALS.find((s) => s.scenario === tap);
    if (signal) {
      const label = signal.merchant
        ? `${signal.merchant} · HKD ${signal.amount?.toLocaleString()}`
        : `${signal.source} · ${signal.detail}`;
      setToast({ label, ok: true });
      const t = setTimeout(() => setToast(null), 3500);
      window.history.replaceState({}, '');
      return () => clearTimeout(t);
    }
  }, [location.state]);

  const isCompact = variant === 'mobile';
  const page = variant === 'web' ? 'web' : 'mobile';

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">
          Card tap demo
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Hand the judge a <strong>prop HSBC card</strong>, then have them{' '}
          <strong>hold it to the screen and tap a reader</strong> below — like contactless pay.
        </p>
        <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
          Real bank cards cannot be read by browsers (encrypted chip). No NFC needed — tap the pad or scan a QR printed on your demo card.
        </p>

        <div
          className="rounded-xl p-3 mb-4 flex items-center gap-3 text-white"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 55%, #db0011 100%)' }}
        >
          <CreditCard className="w-8 h-8 shrink-0 opacity-90" />
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-80">HSBC Premier · Demo</p>
            <p className="text-sm font-bold tracking-wider">•••• 4829 · {user.name}</p>
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
          <Wifi className="w-4 h-4 text-hsbc-red" />
          Tap readers — hold card to phone, then press
        </p>
        <div className={`grid gap-2 mb-3 ${isCompact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {CARD_SIGNALS.map((signal) => {
            const active = processing === signal.id;
            const selected = scenarioId === signal.scenario;
            return (
              <button
                key={signal.id}
                type="button"
                disabled={!!processing && !active}
                onClick={() => runSignal(signal, 'card')}
                className={`relative rounded-xl border-2 p-3 text-left transition-all min-h-[88px] ${
                  selected ? 'border-hsbc-red bg-red-50' : 'border-gray-200 hover:border-hsbc-red hover:bg-red-50'
                } ${active ? 'scale-[0.97] border-hsbc-red' : ''} disabled:opacity-60`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Wifi className={`w-4 h-4 ${selected ? 'text-hsbc-red' : 'text-gray-500'}`} />
                  </div>
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wide">Tap</span>
                </div>
                <p className="font-semibold text-gray-900 text-xs leading-tight">{signal.merchant}</p>
                <p className="text-[10px] text-hsbc-red font-bold mt-1">HKD {signal.amount.toLocaleString()}</p>
                {active && (
                  <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-hsbc-red animate-spin" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5" /> Weather signal (no card)
          </p>
          {WEATHER_SIGNALS.map((signal) => (
            <button
              key={signal.id}
              type="button"
              disabled={!!processing}
              onClick={() => runSignal(signal, 'weather')}
              className={`w-full text-left p-3 rounded-xl border-2 transition-colors ${
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
          onClick={() => setQrOpen((v) => !v)}
          className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-xs text-gray-600 flex items-center gap-1.5">
            <QrCode className="w-4 h-4" />
            <span><span className="font-semibold text-gray-800">Print QR on demo cards</span> (optional)</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${qrOpen ? 'rotate-180' : ''}`} />
        </button>
        {qrOpen && (
          <div className="px-3 pb-3 border-t border-gray-50 grid grid-cols-2 gap-3 pt-3">
            {[...CARD_SIGNALS, ...WEATHER_SIGNALS].map((signal) => {
              const url = getTapUrl(signal.scenario, page);
              const label = signal.merchant ?? signal.source;
              return (
                <div key={signal.id} className="text-center">
                  <img
                    src={getQrImageUrl(url)}
                    alt={`QR for ${label}`}
                    className="mx-auto rounded-lg border border-gray-100"
                    width={100}
                    height={100}
                  />
                  <p className="text-[10px] font-semibold text-gray-700 mt-1">{label}</p>
                  <p className="text-[9px] text-gray-400 break-all leading-tight mt-0.5">{url}</p>
                </div>
              );
            })}
            <p className="col-span-2 text-[10px] text-gray-500 leading-relaxed">
              Stick each QR on a prop card. Judge scans with phone camera — no NFC required.
            </p>
          </div>
        )}
      </div>

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
