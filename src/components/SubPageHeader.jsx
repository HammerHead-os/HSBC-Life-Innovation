import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function useBackTarget(fallback = '/') {
  const location = useLocation();
  return location.state?.from ?? fallback;
}

export function SubPageLink({ to, children, className, ...rest }) {
  const location = useLocation();
  return (
    <Link to={to} state={{ from: location.pathname }} className={className} {...rest}>
      {children}
    </Link>
  );
}

export default function SubPageHeader({ title, backTo = '/' }) {
  const navigate = useNavigate();
  const backTarget = useBackTarget(backTo);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
      <button
        type="button"
        onClick={() => navigate(backTarget)}
        className="p-1 -ml-1 rounded-lg text-gray-600 hover:text-hsbc-red hover:bg-red-50 transition"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="font-bold text-gray-900">{title}</h1>
    </header>
  );
}

export function PageShell({ title, backTo = '/', children, wide = false }) {
  return (
    <div className={`min-h-full bg-gray-50 ${wide ? 'w-full' : 'max-w-md mx-auto'}`}>
      <SubPageHeader title={title} backTo={backTo} />
      <div className={`p-4 space-y-4 ${wide ? 'px-8 w-full max-w-none' : ''}`}>{children}</div>
    </div>
  );
}

export function ScenarioPicker({ scenarios, current, onChange, size = 'default' }) {
  const large = size === 'large';

  return (
    <div className={`flex flex-wrap ${large ? 'gap-2.5' : 'gap-2'}`}>
      {Object.values(scenarios).map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`rounded-full font-semibold transition-colors ${
            large ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'
          } ${
            current === s.id
              ? 'bg-hsbc-red text-white hover:bg-hsbc-red-dark'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-hsbc-red hover:bg-red-50 hover:text-hsbc-red'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
