import { Radio, Wifi, WifiOff } from 'lucide-react';
import { POSTER_URL } from '../utils/signalSync';

function consoleLabel(relay) {
  const { broadcast, peer, phoneCount = 0 } = relay ?? {};
  if (broadcast === 'ready') {
    return phoneCount > 0
      ? `Cloud relay live · ${phoneCount} direct backup link${phoneCount === 1 ? '' : 's'}`
      : 'Cloud relay live — broadcasts to every phone on the poster link';
  }
  if (peer === 'ready' && phoneCount > 0) {
    return `Direct backup only (${phoneCount} phone${phoneCount === 1 ? '' : 's'}) — waiting for cloud relay…`;
  }
  if (peer === 'error' && broadcast === 'error') {
    return 'Both relays down — reload console or use Standby tap URLs';
  }
  if (peer === 'error') {
    return 'Hub busy — close other signal tabs; cloud relay still starting…';
  }
  return 'Starting cloud relay…';
}

function listenerLabel(remoteStatus) {
  if (remoteStatus === 'ready') {
    return 'Ready — live hazard alerts from presenter';
  }
  if (remoteStatus === 'error') {
    return 'Reconnecting to presenter…';
  }
  return 'Connecting to live demo…';
}

export default function SignalRoomPanel({
  compact = false,
  remoteStatus = null,
  variant = 'listener',
  relay = null,
}) {
  const statusLabel =
    variant === 'console' ? consoleLabel(relay) : listenerLabel(remoteStatus);

  const isOnline =
    variant === 'console'
      ? relay?.broadcast === 'ready' || (relay?.peer === 'ready' && relay?.phoneCount > 0)
      : remoteStatus === 'ready';

  if (compact) {
    return (
      <div className="rounded-lg bg-gray-50/80 px-3 py-2 flex items-center gap-2 text-sm">
        {isOnline ? (
          <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
        ) : (
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
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
        <>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Primary:</strong> cloud broadcast — works for unlimited phones on the
            same café Wi‑Fi, mobile data, or a mix. No peer-to-peer needed.
          </p>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <strong className="text-gray-500">Backup:</strong> direct peer link when cloud is blocked. Audience opens{' '}
            <span className="font-mono break-all">{POSTER_URL}</span> → Mobile App → log in → keep Home open.
          </p>
          <p className="text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
            <Radio className="w-3.5 h-3.5 shrink-0 mt-0.5 text-hsbc-red" />
            <span>
              <strong className="text-gray-500">Standby:</strong> if both fail, use the tap URLs in the hazard section —
              each person scans or opens the link on their own phone (same as NFC).
            </span>
          </p>
        </>
      )}
    </div>
  );
}
