import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { FAQ_ITEMS } from '../data/faq';

function FaqItem({ question, answer, tags }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-colors hover:border-hsbc-red/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left hover:bg-red-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform hover:text-hsbc-red ${open ? 'rotate-180 text-hsbc-red' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function matchesQuery(item, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    item.question,
    item.answer,
    ...(item.tags ?? []),
  ].join(' ').toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}

export default function FAQPage({ wide = false }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => FAQ_ITEMS.filter((item) => matchesQuery(item, query)),
    [query],
  );

  return (
    <PageShell title="FAQ for Judges" backTo="/" wide={wide}>
      <p className="text-sm text-gray-500 mb-4">
        Tough questions on regulation, actuarial science, AI, and unit economics — search or tap to expand.
      </p>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. moral hazard, RBC, PIPL, reinsurance…"
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20"
          aria-label="Search FAQ"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-hsbc-red"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <p className="text-sm font-semibold text-gray-700">No matches</p>
          <p className="text-xs text-gray-500 mt-1">Try “typhoon”, “adverse selection”, or “regulatory”</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              tags={item.tags}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
