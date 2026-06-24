import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';
import { HsbcLogo } from '../components/QuickActions';
import { PENDING_TAP_KEY } from '../utils/pendingTap';

import { USER } from '../data/constants';

export default function LoginPage() {
  const { isAuthenticated, login, logout } = useAuth();
  const { setScenarioId } = useProtection();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState('');
  const clearedSignIn = useRef(false);

  // Landing-page “Web Dashboard” link uses ?signin=1 so booth laptops always see login.
  useEffect(() => {
    if (clearedSignIn.current || searchParams.get('signin') !== '1') return;
    clearedSignIn.current = true;
    logout();
    setSearchParams({}, { replace: true });
  }, [logout, searchParams, setSearchParams]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const pending = sessionStorage.getItem(PENDING_TAP_KEY);
    if (pending) {
      sessionStorage.removeItem(PENDING_TAP_KEY);
      setScenarioId(pending);
    }
    navigate('/', { replace: true });
  }, [isAuthenticated, setScenarioId, navigate]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
  };

  const continueAsAlex = () => login(USER.fullName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <HsbcLogo />
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Micro-Protection Fluid
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter your name to personalise your demo experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={continueAsAlex}
              className="w-full py-3 rounded-xl bg-hsbc-red text-white font-semibold hover:bg-hsbc-red-dark transition-colors"
            >
              Continue as Alex
            </button>

            <div className="relative flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 shrink-0">or enter your name</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20 outline-none transition text-gray-900"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue with name
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            HSBC Life Insurance Innovation Competition · Demo only
          </p>
        </div>
      </div>
    </div>
  );
}
