import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Copy, ExternalLink, Flame, Wind, CloudRain, Bike, Bus, Train, Ticket, MapPin } from 'lucide-react';
import './index.css';
import { SCENARIOS } from './data/constants';
import { EXTERNAL_SIGNAL_KEY } from './context/ProtectionContext';
import { getTapUrl } from './utils/tapUrl';
import { getSignalRoom, sendRemoteSignal } from './utils/signalSync';
import SignalRoomPanel from './components/SignalRoomPanel';

const GROUPS = [
  {
    title: 'Mobility boxes (NFC)',
    items: [
      { id: 'helloride', icon: Bike, label: 'HelloRide unlock' },
      { id: 'bus', icon: Bus, label: 'Bus ride tap' },
      { id: 'mtr_gate', icon: Train, label: 'MTR gate tap' },
    ],
  },
  {
    title: 'Card + location (2 boxes — ticket first, then gate)',
    items: [
      { id: 'hsr_card', icon: Ticket, label: 'HSR ticket purchased (card)' },
      { id: 'hsr_gate', icon: MapPin, label: 'HSR station gate checkpoint' },
      { id: 'flight_card', icon: Ticket, label: 'Flight booked (card)' },
      { id: 'flight_gate', icon: MapPin, label: 'Airport gate checkpoint' },
    ],
  },
  {
    title: 'Hazard alerts (external signals)',
    items: [
      { id: 'tornado', icon: Wind, label: 'Tornado warning' },
      { id: 'fire', icon: Flame, label: 'Fire alert nearby' },
      { id: 'black_rain', icon: CloudRain, label: 'Black rainstorm warning' },
    ],
  },
];

function writeExternalSignal(scenarioId) {
  const payload = {
    scenarioId,
    at: Date.now(),
    source: 'signal-console',
  };
  localStorage.setItem(EXTERNAL_SIGNAL_KEY, JSON.stringify(payload));
  return payload;
}

function Button({ onClick, children, className = '', disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-red-50 hover:border-hsbc-red/30 transition-colors text-sm font-semibold text-gray-800 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  );
}

function copy(text) {
  return navigator.clipboard?.writeText(text);
}

function App() {
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(null);
  const page = 'mobile';

  const tapUrls = useMemo(() => {
    const ids = GROUPS.flatMap((g) => g.items.map((i) => i.id));
    return Object.fromEntries(ids.map((id) => [id, getTapUrl(id, page)]));
  }, [page]);

  const sendSignal = async (item) => {
    writeExternalSignal(item.id);
    setSending(item.id);
    try {
      await sendRemoteSignal(getSignalRoom(), item.id);
      setToast(`Signal sent: ${item.label}`);
    } catch {
      setToast(`Phone not reachable — poster QR → Mobile App, keep open`);
    } finally {
      setSending(null);
      setTimeout(() => setToast(null), 3500);
    }
  };

  const hazardIds = new Set(['tornado', 'fire', 'black_rain']);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">Signals Console</p>
          <h1 className="text-xl font-bold text-gray-900">Send live signals to the app</h1>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Sends live signals to phones opened from the <strong>poster QR link</strong>.
            Hazard alerts need no NFC — mobility taps still support NFC URLs.
          </p>
          <div className="flex gap-2 flex-wrap mt-4">
            <a
              href="mobile.html"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-hsbc-red text-white text-sm font-semibold hover:bg-hsbc-red-dark transition-colors"
            >
              Open mobile app <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="web.html"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Open web app <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <SignalRoomPanel variant="console" />

        {GROUPS.map((group) => (
          <div key={group.title} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-3">{group.title}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                const scenario = SCENARIOS[item.id];
                const url = tapUrls[item.id];
                return (
                  <div key={item.id} className="rounded-2xl border border-gray-100 p-4 bg-gray-50/60">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-hsbc-red" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{scenario?.insightTitle ?? item.id}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{scenario?.highlightCategory}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        onClick={() => sendSignal(item)}
                        disabled={sending === item.id}
                        className="border-hsbc-red/30"
                      >
                        {sending === item.id ? 'Sending…' : 'Send signal'}
                      </Button>
                      {!hazardIds.has(item.id) && (
                        <>
                          <Button
                            onClick={() => {
                              copy(url);
                              setToast('NFC URL copied');
                              setTimeout(() => setToast(null), 2000);
                            }}
                          >
                            Copy NFC URL <Copy className="w-4 h-4 text-gray-500" />
                          </Button>
                          <a
                            href={url}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-800"
                          >
                            Test open <ExternalLink className="w-4 h-4 text-gray-500" />
                          </a>
                        </>
                      )}
                    </div>

                    {!hazardIds.has(item.id) && (
                      <p className="text-[11px] text-gray-400 mt-3 break-all font-mono">{url}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-xs text-gray-400 text-center pb-6">
          Friend scans poster QR → taps Mobile App → keeps it open · you hit Send signal here
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

