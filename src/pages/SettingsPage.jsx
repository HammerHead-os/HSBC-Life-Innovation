import { PageShell } from '../components/SubPageHeader';
import { CATEGORIES } from '../data/constants';
import { Bell, Eye, MapPin, Lock, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';

export default function SettingsPage({ wide = false }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { resetProtection } = useProtection();

  const handleResetDemo = () => {
    resetProtection();
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <PageShell title="Settings" backTo="/profile" wide={wide}>
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900 border-b border-gray-50">Personal floors</h2>
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="px-4 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
              {cat.name} floor
              {cat.fixed && <Lock className="w-3.5 h-3.5 text-gray-400" />}
            </span>
            <span className="text-sm font-semibold tabular-nums">
              HKD {cat.floor}{cat.fixed ? ' (fixed)' : ''}
            </span>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        <h2 className="px-4 py-3 font-bold text-sm text-gray-900">Notifications</h2>
        {[
          { icon: Bell, label: 'Reallocation alerts', on: true },
          { icon: Eye, label: 'Boost suggestions', on: true },
          { icon: MapPin, label: 'Location (point-in-time only)', on: false },
        ].map(({ icon: Icon, label, on }) => (
          <div key={label} className="px-4 py-3 flex items-center justify-between">
            <span className="flex items-center gap-3 text-sm text-gray-800">
              <Icon className="w-4 h-4 text-gray-400" /> {label}
            </span>
            <div className={`w-10 h-6 rounded-full p-0.5 transition ${on ? 'bg-hsbc-red' : 'bg-gray-200'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition ${on ? 'translate-x-4' : ''}`} />
            </div>
          </div>
        ))}
      </section>

      <p className="text-xs text-gray-500 text-center px-4">
        We never store continuous GPS or biometrics. Data retained max 24 hours. PDPO & PIPL compliant.
      </p>

      <button
        type="button"
        onClick={handleResetDemo}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-hsbc-red/30 bg-red-50 text-hsbc-red text-sm font-medium hover:bg-red-100"
      >
        <RotateCcw className="w-4 h-4" /> Reset demo
      </button>
    </PageShell>
  );
}
