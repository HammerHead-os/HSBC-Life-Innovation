import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { FAQ_ITEMS } from '../data/constants';

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-900 text-sm">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage({ basePath, wide = false }) {
  return (
    <PageShell title="FAQ for Judges" backTo={`${basePath}/`} wide={wide}>
      <p className="text-sm text-gray-500 mb-4">
        Common questions about Micro-Protection Fluid — tap to expand.
      </p>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </PageShell>
  );
}
