import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Activity, Shield, Lightbulb, User, HelpCircle, LogOut } from 'lucide-react';
import { HsbcLogo } from '../components/QuickActions';
import { SubPageLink } from '../components/SubPageHeader';
import NotificationBell from '../components/NotificationBell';
import { useAuth } from '../context/AuthContext';
import { webHeaderStyle } from '../styles/headerBackground';

const NAV = [
  { to: '/', end: true, icon: Home, label: 'Home' },
  { to: '/activity', icon: Activity, label: 'Activity' },
  { to: '/protection', icon: Shield, label: 'My Protection' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const SUB_PAGES = ['/claims', '/family', '/settings', '/plan', '/coverage-floors', '/triggers', '/privacy', '/details', '/faq'];

export default function WebLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isSubPage = SUB_PAGES.some((p) => location.pathname.includes(p));

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-[13rem_minmax(0,1fr)] bg-gray-100 text-base">
      <aside className="bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen z-40">
        <div className="px-4 py-4 border-b border-gray-100">
          <HsbcLogo />
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-hsbc-red'
                    : 'text-gray-600 hover:bg-red-50 hover:text-hsbc-red'
                }`
              }
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-2 py-2 border-t border-gray-100 space-y-0.5">
          <SubPageLink
            to="/faq"
            className="flex items-center gap-2.5 px-3 py-2 text-[15px] text-gray-600 w-full hover:bg-red-50 hover:text-hsbc-red rounded-lg transition-colors"
          >
            <HelpCircle className="w-[18px] h-[18px] shrink-0" /> FAQ for judges
          </SubPageLink>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-[15px] text-gray-600 w-full hover:bg-red-50 hover:text-hsbc-red rounded-lg transition-colors"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" /> Log out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex flex-col min-h-screen">
        {!isSubPage && (
          <div
            className="h-36 w-full bg-cover bg-center relative shrink-0"
            style={webHeaderStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
            <div className="relative h-full flex items-end justify-between gap-4 px-5 pb-4 min-w-0">
              <div className="min-w-0">
                <p className="text-white/80 text-[15px] font-medium mb-0.5">Micro-Protection Fluid</p>
                <h1 className="text-white text-[1.75rem] font-bold drop-shadow-md truncate">Good morning, {user.name} 👋</h1>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <NotificationBell light />
                <SubPageLink
                  to="/profile"
                  className="w-11 h-11 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-lg font-bold hover:bg-white hover:text-hsbc-red transition-colors"
                  aria-label="Profile"
                >
                  {user.name[0]}
                </SubPageLink>
              </div>
            </div>
          </div>
        )}
        <main className={`flex-1 w-full min-w-0 relative z-10 ${isSubPage ? 'bg-gray-50' : 'px-5 pt-4 pb-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
