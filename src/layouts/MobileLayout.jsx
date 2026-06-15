import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Activity, Shield, Lightbulb, User } from 'lucide-react';
import { HsbcLogo } from '../components/QuickActions';
import NotificationBell from '../components/NotificationBell';
import { useAuth } from '../context/AuthContext';
import { mobileHeaderStyle } from '../styles/headerBackground';

const NAV = [
  { to: '/', end: true, icon: Home, label: 'Home' },
  { to: '/activity', icon: Activity, label: 'Activity' },
  { to: '/protection', icon: Shield, label: 'My Protection' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const SUB_PAGES = ['/claims', '/family', '/settings', '/details', '/faq'];

export default function MobileLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const isSubPage = SUB_PAGES.some((p) => location.pathname.includes(p));

  if (isSubPage) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl flex flex-col">
      <header
        className="relative px-4 pt-10 pb-16 bg-cover bg-no-repeat"
        style={mobileHeaderStyle}
      >
        <div className="flex items-center justify-between mb-6">
          <HsbcLogo light />
          <div className="flex items-center gap-3">
            <NotificationBell light />
            <Link
              to="/profile"
              className="w-9 h-9 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white font-bold text-sm hover:bg-white hover:text-hsbc-red transition-colors"
              aria-label="Profile"
            >
              {user.name[0]}
            </Link>
          </div>
        </div>
        <h1 className="text-white text-2xl font-bold drop-shadow-md">
          Good morning, {user.name} 👋
        </h1>
      </header>

      <main className="flex-1 -mt-8 px-4 pb-24 space-y-4 relative z-10">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-2 flex justify-around z-50">
        {NAV.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] transition-colors rounded-lg ${
                isActive ? 'text-hsbc-red font-semibold' : 'text-gray-500 hover:text-hsbc-red hover:bg-red-50'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
