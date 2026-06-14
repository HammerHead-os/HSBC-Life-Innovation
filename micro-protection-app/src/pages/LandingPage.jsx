import { Link } from 'react-router-dom';
import { Smartphone, Monitor } from 'lucide-react';
import { HsbcLogo } from '../components/QuickActions';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <HsbcLogo />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Micro-Protection Fluid</h1>
        <p className="text-gray-600 max-w-md">
          Full interactive prototype — mobile app & web dashboard. Same premium, smarter allocation.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl w-full">
        <Link
          to="/mobile"
          className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-hsbc-red shadow-lg hover:shadow-xl transition text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-hsbc-red transition">
            <Smartphone className="w-8 h-8 text-hsbc-red group-hover:text-white transition" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Mobile App</h2>
          <p className="text-sm text-gray-500">Phone-first HSBC Life experience with bottom navigation</p>
        </Link>
        <Link
          to="/web"
          className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-hsbc-red shadow-lg hover:shadow-xl transition text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-hsbc-red transition">
            <Monitor className="w-8 h-8 text-hsbc-red group-hover:text-white transition" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Web Dashboard</h2>
          <p className="text-sm text-gray-500">Desktop portal with sidebar and expanded layout</p>
        </Link>
      </div>
      <p className="text-xs text-gray-400 mt-10">HSBC Life Insurance Innovation Competition · Demo</p>
    </div>
  );
}
