import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, X } from 'lucide-react';
import { PageShell } from '../components/SubPageHeader';
import { CLAIMS, CATEGORIES } from '../data/constants';

const CLAIM_CATEGORIES = CATEGORIES.filter((c) => !c.fixed);

const EMPTY_FORM = {
  category: CLAIM_CATEGORIES[0]?.name ?? 'Health',
  desc: '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
};

function ClaimFormModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  if (!open) return null;

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.desc.trim() || !form.amount) return;
    onSubmit({
      category: form.category,
      desc: form.desc.trim(),
      amount: Number(form.amount),
      date: form.date,
    });
    setForm(EMPTY_FORM);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-form-title"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 id="claim-form-title" className="font-bold text-gray-900 text-lg">
            File a new claim
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-hsbc-red hover:bg-red-50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label htmlFor="claim-category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              id="claim-category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20 outline-none transition text-gray-900 bg-white"
            >
              {CLAIM_CATEGORIES.map((c) => (
                <option key={c.key} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="claim-desc" className="block text-sm font-medium text-gray-700 mb-1.5">
              What happened?
            </label>
            <textarea
              id="claim-desc"
              value={form.desc}
              onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
              placeholder="e.g. Flight delay — CX500"
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20 outline-none transition text-gray-900 resize-none"
            />
          </div>

          <div>
            <label htmlFor="claim-amount" className="block text-sm font-medium text-gray-700 mb-1.5">
              Claim amount (HKD)
            </label>
            <input
              id="claim-amount"
              type="number"
              min="1"
              step="1"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              placeholder="e.g. 480"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20 outline-none transition text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="claim-date" className="block text-sm font-medium text-gray-700 mb-1.5">
              Date of incident
            </label>
            <input
              id="claim-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hsbc-red focus:ring-2 focus:ring-hsbc-red/20 outline-none transition text-gray-900"
            />
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Parametric events (e.g. typhoon T8+) may auto-pay. Standard claims are triaged by AI — demo payouts in under 5 minutes.
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-hsbc-red text-white font-semibold rounded-xl hover:bg-hsbc-red-dark transition-colors"
          >
            Submit claim
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function formatClaimDate(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ClaimsPage({ wide = false }) {
  const [claims, setClaims] = useState(CLAIMS);
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = ({ category, desc, amount, date }) => {
    const id = `CLM-${2400 + claims.length}`;
    const newClaim = {
      id,
      date: formatClaimDate(date),
      category,
      amount,
      status: 'Submitted',
      desc,
    };
    setClaims((prev) => [newClaim, ...prev]);
    setFormOpen(false);
    setToast('Claim submitted — AI triage in progress');
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <PageShell title="Claims" backTo="/" wide={wide}>
      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-2">
        <p className="text-sm text-emerald-800">
          Parametric claims (e.g. typhoon T8+) pay out automatically in minutes. Standard claims use MIN(actual loss, allocation × multiplier).
        </p>
      </div>
      <div className="space-y-3">
        {claims.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">{c.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{c.id} · {c.category}</p>
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  c.status === 'Paid'
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-amber-700 bg-amber-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> {c.status}
              </span>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-sm text-gray-500">{c.date}</span>
              <span className="font-bold text-gray-900">HKD {c.amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setFormOpen(true)}
        className="w-full py-3 bg-hsbc-red text-white font-semibold rounded-xl hover:bg-hsbc-red-dark transition-colors"
      >
        File a new claim
      </button>

      <ClaimFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </PageShell>
  );
}
