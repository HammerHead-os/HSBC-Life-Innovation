import { Link } from 'react-router-dom';
import { FileText, Shield, Users, Settings, Eye } from 'lucide-react';

const ACTIONS = [
  { to: 'details', icon: Eye, label: 'View Details' },
  { to: 'claims', icon: FileText, label: 'Claims' },
  { to: 'family', icon: Users, label: 'Family Protection' },
  { to: 'settings', icon: Settings, label: 'Settings' },
];

export default function QuickActions({ basePath, large = false }) {
  if (large) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ACTIONS.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={`${basePath}/${to}`}
            className="flex flex-col items-center justify-center gap-2 bg-red-50 hover:bg-red-100 transition rounded-2xl p-6 border border-red-100"
          >
            <Icon className="w-7 h-7 text-hsbc-red" />
            <span className="text-sm font-semibold text-gray-800">{label}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {ACTIONS.map(({ to, icon: Icon, label }) => (
        <Link
          key={to}
          to={`${basePath}/${to}`}
          className="flex flex-col items-center gap-1.5 py-2"
        >
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-700" />
          </div>
          <span className="text-[10px] text-center text-gray-600 leading-tight">{label}</span>
        </Link>
      ))}
    </div>
  );
}

export function HsbcLogo({ light = false }) {
  return (
    <div className={`flex items-center gap-2 ${light ? 'text-white' : ''}`}>
      <div className="flex gap-0.5">
        <div className={`w-0 h-0 border-l-[5px] border-r-[5px] border-b-[9px] border-l-transparent border-r-transparent ${light ? 'border-b-white' : 'border-b-hsbc-red'}`} />
        <div className={`w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent ${light ? 'border-b-white/70' : 'border-b-hsbc-red/70'} mt-0.5`} />
      </div>
      <span className={`font-bold text-sm tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
        HSBC <span className={light ? 'font-normal' : 'text-hsbc-red'}>Life</span>
      </span>
    </div>
  );
}
