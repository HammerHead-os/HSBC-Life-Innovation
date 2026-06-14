import { USER, PREMIUM } from '../data/constants';
import { ChevronRight, CreditCard, Shield, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage({ basePath, variant = 'mobile' }) {
  const items = [
    { icon: CreditCard, label: 'Plan & billing', desc: `${USER.plan} · HKD ${PREMIUM}/month`, to: `${basePath}/settings` },
    { icon: Sliders, label: 'Coverage floors', desc: 'Set personal minimums', to: `${basePath}/settings` },
    { icon: Shield, label: 'Privacy & data', desc: 'No GPS · 24hr retention', to: `${basePath}/settings` },
  ];

  return (
    <div className={`space-y-4 ${variant === 'web' ? 'max-w-2xl' : ''}`}>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-hsbc-red text-white flex items-center justify-center text-2xl font-bold">
          {USER.name[0]}
        </div>
        <div>
          <h2 className="font-bold text-xl text-gray-900">{USER.fullName}</h2>
          <p className="text-sm text-gray-500">HSBC Premier · Hong Kong</p>
          <p className="text-xs text-hsbc-red font-semibold mt-1">Micro-Protection Fluid active</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {items.map(({ icon: Icon, label, desc, to }) => (
          <Link key={label} to={to} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </Link>
        ))}
      </div>

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
