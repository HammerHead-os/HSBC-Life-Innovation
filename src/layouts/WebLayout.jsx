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
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0 fixed h-full z-40">
        <div className="p-5 border-b border-gray-100">
          <HsbcLogo />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-hsbc-red'
                    : 'text-gray-600 hover:bg-red-50 hover:text-hsbc-red'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100 space-y-1">
          <SubPageLink
            to="/faq"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 w-full hover:bg-red-50 hover:text-hsbc-red rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" /> FAQ for judges
          </SubPageLink>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 w-full hover:bg-red-50 hover:text-hsbc-red rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-56 min-w-0 flex flex-col min-h-screen">
        {!isSubPage && (
          <div
            className="h-52 bg-cover bg-no-repeat relative shrink-0"
            style={webHeaderStyle}
          >
            <div className="absolute inset-0 flex items-end justify-between p-8">
              <h1 className="text-white text-3xl font-bold drop-shadow-md">Good morning, {user.name} 👋</h1>
              <div className="flex items-center gap-4">
                <NotificationBell light />
                <SubPageLink
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white font-bold hover:bg-white hover:text-hsbc-red transition-colors"
                  aria-label="Profile"
                >
                  {user.name[0]}
                </SubPageLink>
              </div>
            </div>
          </div>
        )}
        <main className={`flex-1 w-full relative z-10 ${isSubPage ? '' : 'p-8 -mt-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
