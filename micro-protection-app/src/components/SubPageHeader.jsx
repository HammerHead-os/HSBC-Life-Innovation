import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function SubPageHeader({ title, backTo }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
      <Link to={backTo} className="p-1 -ml-1 text-gray-600 hover:text-hsbc-red">
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="font-bold text-gray-900">{title}</h1>
    </header>
  );
}

export function PageShell({ title, backTo, children, wide = false }) {
  return (
    <div className={`min-h-screen bg-gray-50 ${wide ? '' : 'max-w-md mx-auto'}`}>
      <SubPageHeader title={title} backTo={backTo} />
      <div className={`p-4 space-y-4 ${wide ? 'max-w-4xl mx-auto' : ''}`}>{children}</div>
    </div>
  );
}

export function ScenarioPicker({ scenarios, current, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(scenarios).map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            current === s.id
              ? 'bg-hsbc-red text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-hsbc-red'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
