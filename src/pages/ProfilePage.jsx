import { PREMIUM } from '../data/constants';
import { ChevronRight, CreditCard, Shield, Sliders, HelpCircle, LogOut, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubPageLink } from '../components/SubPageHeader';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';

export default function ProfilePage({ variant = 'mobile' }) {
  const { user, logout } = useAuth();
  const { refreshData } = useProtection();
  const navigate = useNavigate();

  const items = [
    { icon: CreditCard, label: 'Plan & billing', desc: `${user.plan} · HKD ${PREMIUM}/month`, to: '/plan' },
    { icon: Sliders, label: 'Coverage floors', desc: 'Set personal minimums', to: '/coverage-floors' },
    { icon: Shield, label: 'Privacy & data', desc: 'Location checkpoints · 24hr retention', to: '/privacy' },
    { icon: HelpCircle, label: 'FAQ for judges', desc: 'Long-term vs short-term, and more', to: '/faq' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleRefreshData = () => {
    refreshData();
    navigate('/', { replace: true });
  };

  return (
    <div className={`space-y-4 ${variant === 'web' ? 'max-w-2xl' : ''}`}>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-hsbc-red text-white flex items-center justify-center text-2xl font-bold">
          {user.name[0]}
        </div>
        <div>
          <h2 className="font-bold text-xl text-gray-900">{user.fullName}</h2>
          <p className="text-sm text-gray-500">HSBC Premier · Hong Kong</p>
          <p className="text-xs text-hsbc-red font-semibold mt-1">Micro-Protection Fluid active</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {items.map(({ icon: Icon, label, desc, to }) => (
          <SubPageLink key={label} to={to} className="flex items-center gap-4 px-4 py-4 hover:bg-red-50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </SubPageLink>
        ))}
      </div>

      <button
        type="button"
        onClick={handleRefreshData}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-hsbc-red/30 bg-red-50 text-hsbc-red text-sm font-medium hover:bg-hsbc-red hover:text-white transition-colors"
      >
        <RotateCcw className="w-4 h-4" /> Refresh data
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-hsbc-red hover:text-hsbc-red hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-4 h-4" /> Log out
      </button>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { v: '47', l: 'Reallocations this month' },
          { v: '3', l: 'Claims paid' },
          { v: '5 min', l: 'Avg claim time' },
        ].map(({ v, l }) => (
          <div key={l} className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-lg font-bold text-hsbc-red">{v}</p>
            <p className="text-[10px] text-gray-500 leading-tight">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
