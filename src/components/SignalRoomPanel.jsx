import { Wifi, WifiOff } from 'lucide-react';
import { POSTER_URL } from '../utils/signalSync';

export default function SignalRoomPanel({
  compact = false,
  remoteStatus = null,
  variant = 'listener',
  hubStatus = null,
  phoneCount = 0,
}) {
  const statusLabel =
    variant === 'console'
      ? hubStatus === 'ready' && phoneCount > 0
        ? `${phoneCount} phone${phoneCount === 1 ? '' : 's'} connected — ready to send`
        : hubStatus === 'ready'
          ? 'Hub ready — waiting for phone (poster QR → Mobile App → log in)'
          : hubStatus === 'error'
            ? 'Hub busy — close other signal tabs and reload'
            : 'Starting signal hub…'
      : remoteStatus === 'ready'
        ? 'Ready — will receive live hazard alerts from presenter'
        : remoteStatus === 'error'
          ? 'Reconnecting to presenter…'
          : 'Connecting to live demo…';

  const isOnline =
    variant === 'console'
      ? hubStatus === 'ready' && phoneCount > 0
      : remoteStatus === 'ready';

  if (compact) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2 flex items-center gap-2 text-xs">
        {isOnline ? (
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
        {isOnline ? (
          <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
        ) : (
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
        )}
        <span>{statusLabel}</span>
      </div>
      {variant === 'console' && (
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Keep this page open. Friend scans poster QR →{' '}
          <span className="font-mono break-all">{POSTER_URL}</span> → Mobile App → log in → keep open.
        </p>
      )}
    </div>
  );
}
