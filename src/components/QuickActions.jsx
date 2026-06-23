import { FileText, Users, Settings, Eye, HelpCircle } from 'lucide-react';
import { SubPageLink } from './SubPageHeader';

const ACTIONS = [
  { to: '/details', icon: Eye, label: 'View Details' },
  { to: '/claims', icon: FileText, label: 'Claims' },
  { to: '/family', icon: Users, label: 'Family Protection' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/faq', icon: HelpCircle, label: 'FAQ' },
];

export default function QuickActions({ large = false }) {
  if (large) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
        {ACTIONS.map(({ to, icon: Icon, label }) => (
          <SubPageLink
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-2.5 bg-white hover:bg-hsbc-red hover:border-hsbc-red transition-colors rounded-2xl p-4 border border-gray-200 shadow-sm group min-h-[6.5rem]"
          >
            <Icon className="w-8 h-8 text-hsbc-red group-hover:text-white transition-colors" />
            <span className="text-[15px] font-semibold text-gray-800 group-hover:text-white transition-colors text-center leading-snug px-1">
              {label}
            </span>
          </SubPageLink>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      {ACTIONS.map(({ to, icon: Icon, label }) => (
        <SubPageLink key={to} to={to} className="flex flex-col items-center gap-1.5 py-2 group">
          <div className="w-11 h-11 rounded-xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
            <Icon className="w-5 h-5 text-gray-700 group-hover:text-hsbc-red transition-colors" />
          </div>
          <span className="text-[10px] text-center text-gray-600 group-hover:text-hsbc-red leading-tight transition-colors">{label}</span>
        </SubPageLink>
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
