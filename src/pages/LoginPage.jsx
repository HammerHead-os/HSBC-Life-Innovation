import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HsbcLogo } from '../components/QuickActions';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate('/', { replace: true });
  };

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
              className="w-full py-3 rounded-xl bg-hsbc-red text-white font-semibold hover:bg-hsbc-red-dark transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue to demo
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
