import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Plane, Zap, TrendingUp, Info, X, Newspaper } from 'lucide-react';
import { useProtection } from '../context/ProtectionContext';

const TYPE_ICONS = { travel: Plane, boost: Zap, summary: TrendingUp, info: Info, alert: Info, news: Newspaper };

export default function NotificationBell({ light = false }) {
  const { notifications } = useProtection();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`relative ${light ? 'text-white' : 'text-gray-700'}`}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className={light ? 'w-5 h-5' : 'w-6 h-6'} />
        {unread > 0 && (
          <span
            className={`absolute rounded-full bg-hsbc-red border-2 ${
              light ? 'border-white -top-1 -right-1 w-2 h-2' : '-top-0.5 -right-0.5 w-2.5 h-2.5 border-white'
            }`}
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 z-[60] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
            {notifications.map((n) => {
              const Icon = TYPE_ICONS[n.type] || Info;
              return (
                <div key={n.id} className={`px-4 py-3 ${!n.read ? 'bg-red-50/40' : 'hover:bg-gray-50'}`}>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-hsbc-red" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold text-gray-900 text-xs">{n.title}</p>
                        <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{n.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            to="/insights"
            onClick={() => setOpen(false)}
            className="block text-center text-xs font-semibold text-hsbc-red py-3 border-t border-gray-100 hover:bg-red-50"
          >
            View all insights
          </Link>
        </div>
      )}
    </div>
  );
}
