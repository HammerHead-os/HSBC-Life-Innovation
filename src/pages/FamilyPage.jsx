import { useState } from 'react';
import { PageShell } from '../components/SubPageHeader';
import { Users, Plus, X } from 'lucide-react';

const STORAGE_KEY = 'mpf-family';

const DEFAULT_FAMILY = [
  { id: '1', name: 'Maya Rivera', relation: 'Partner', status: 'Covered', premium: 200 },
  { id: '2', name: 'Sam Rivera', relation: 'Child', status: 'Add-on available', premium: null },
];

function loadFamily() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_FAMILY;
  } catch {
    return DEFAULT_FAMILY;
  }
}

export default function FamilyPage({ wide = false }) {
  const [members, setMembers] = useState(loadFamily);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Partner');

  const saveMembers = (next) => {
    setMembers(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const next = [
      ...members,
      {
        id: String(Date.now()),
        name: trimmed,
        relation,
        status: 'Pending invite',
        premium: null,
      },
    ];
    saveMembers(next);
    setName('');
    setRelation('Partner');
    setShowForm(false);
  };

  const handleRemove = (id) => {
    saveMembers(members.filter((m) => m.id !== id));
  };

  return (
    <PageShell title="Family Protection" backTo="/" wide={wide}>
      <p className="text-sm text-gray-600">
        Link family members to share insights and coordinate life coverage floors.
      </p>
      {members.map((m) => (
        <div key={m.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">{m.name}</p>
            <p className="text-xs text-gray-500">{m.relation}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-semibold text-hsbc-red">{m.status}</p>
            {m.premium && <p className="text-xs text-gray-400">HKD {m.premium}/mo</p>}
          </div>
          {m.id !== '1' && m.id !== '2' && (
            <button
              type="button"
              onClick={() => handleRemove(m.id)}
              className="p-1 text-gray-400 hover:text-hsbc-red hover:bg-red-50 rounded-lg transition-colors"
              aria-label={`Remove ${m.name}`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}

      {showForm ? (
        <form onSubmit={handleAdd} className="bg-white rounded-xl p-4 border border-gray-100 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">Add family member</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20 outline-none text-sm"
            autoFocus
          />
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-hsbc-red outline-none text-sm bg-white"
          >
            {['Partner', 'Child', 'Parent', 'Sibling'].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 rounded-lg bg-hsbc-red text-white text-sm font-semibold hover:bg-hsbc-red-dark transition-colors disabled:opacity-40"
            >
              Send invite
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setName(''); }}
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 font-medium hover:border-hsbc-red hover:text-hsbc-red hover:bg-red-50 transition-colors"
        >
          <Plus className="w-5 h-5" /> Add family member
        </button>
      )}
    </PageShell>
  );
}
