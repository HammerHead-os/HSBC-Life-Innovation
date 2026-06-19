import { ChevronRight, CreditCard, Radio, Sliders, Shield } from 'lucide-react';
import { PageShell, SubPageLink } from '../components/SubPageHeader';
import SignalRoomPanel from '../components/SignalRoomPanel';
import { useProtection } from '../context/ProtectionContext';

const SECTIONS = [
  { icon: CreditCard, label: 'Plan & billing', desc: 'Premium, payment method, what\'s included', to: '/plan' },
  { icon: Sliders, label: 'Coverage floors', desc: 'Personal minimums per category', to: '/coverage-floors' },
  { icon: Radio, label: 'Triggers', desc: 'HKO API, geofences, delivery shifts, fraud feed', to: '/triggers' },
  { icon: Shield, label: 'Privacy & data', desc: 'Permissions, retention, compliance', to: '/privacy' },
];

export default function SettingsPage({ wide = false }) {
  const { remoteSignalStatus } = useProtection();

  return (
    <PageShell title="Settings" backTo="/profile" wide={wide}>
      <div className="space-y-4 mb-4">
        <SignalRoomPanel remoteStatus={remoteSignalStatus} />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {SECTIONS.map(({ icon: Icon, label, desc, to }) => (
          <SubPageLink key={to} to={to} className="flex items-center gap-4 px-4 py-4 hover:bg-red-50 transition-colors">
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
    </PageShell>
  );
}
