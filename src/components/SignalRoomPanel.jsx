import { Wifi, WifiOff } from 'lucide-react';
import { POSTER_URL } from '../utils/signalSync';

export default function SignalRoomPanel({ compact = false, remoteStatus = null, variant = 'listener' }) {
  const statusLabel =
    variant === 'console'
      ? 'Sends to any phone opened from the poster QR link'
      : remoteStatus === 'ready'
        ? 'Ready — will receive live hazard alerts from presenter'
        : remoteStatus === 'error'
          ? 'Live link busy — close the app on other phones and reopen'
          : 'Connecting to live demo…';

  if (compact) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2 flex items-center gap-2 text-xs">
        {variant === 'console' || remoteStatus === 'ready' ? (
          <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        ) : (
          <WifiOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        )}
        <span className="text-gray-600">{statusLabel}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        {variant === 'console' || remoteStatus === 'ready' ? (
          <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
        ) : (
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
        )}
        <span>{statusLabel}</span>
      </div>
      {variant === 'console' && (
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Poster QR → <span className="font-mono break-all">{POSTER_URL}</span> → Mobile App → keep open on phone.
        </p>
      )}
    </div>
  );
}
