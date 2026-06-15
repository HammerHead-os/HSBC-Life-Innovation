import { PageShell } from '../components/SubPageHeader';
import { Users, Plus } from 'lucide-react';

const FAMILY = [
  { name: 'Maya Rivera', relation: 'Partner', status: 'Covered', premium: 200 },
  { name: 'Sam Rivera', relation: 'Child', status: 'Add-on available', premium: null },
];

export default function FamilyPage({ wide = false }) {
  return (
    <PageShell title="Family Protection" backTo="/" wide={wide}>
      <p className="text-sm text-gray-600">
        Link family members to share insights and coordinate life coverage floors.
      </p>
      {FAMILY.map((m) => (
        <div key={m.name} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">{m.name}</p>
            <p className="text-xs text-gray-500">{m.relation}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-hsbc-red">{m.status}</p>
            {m.premium && <p className="text-xs text-gray-400">HKD {m.premium}/mo</p>}
          </div>
        </div>
      ))}
      <button type="button" className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 font-medium hover:border-hsbc-red hover:text-hsbc-red transition">
        <Plus className="w-5 h-5" /> Add family member
      </button>
    </PageShell>
  );
}
