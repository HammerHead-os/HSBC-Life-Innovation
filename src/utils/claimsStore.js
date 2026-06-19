import { CLAIMS } from '../data/constants';

const CLAIMS_KEY = 'mpf-claims';
const AUTO_CLAIM_KEY = 'mpf-auto-claims-done';

const PARAMETRIC_CLAIMS = {
  typhoon: {
    category: 'Property',
    amount: 2250,
    desc: 'Typhoon T10 parametric payout — HKO API',
    automatic: true,
  },
  black_rain: {
    category: 'Property',
    amount: 1800,
    desc: 'Black rainstorm parametric payout — HKO API',
    automatic: true,
  },
  fire: {
    category: 'Property',
    amount: 1500,
    desc: 'Fire alert parametric payout — FSD feed',
    automatic: true,
  },
  tornado: {
    category: 'Property',
    amount: 2000,
    desc: 'Severe wind parametric payout — HKO API',
    automatic: true,
  },
};

function formatToday() {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function loadDoneSet() {
  try {
    const raw = sessionStorage.getItem(AUTO_CLAIM_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveDoneSet(set) {
  sessionStorage.setItem(AUTO_CLAIM_KEY, JSON.stringify([...set]));
}

export function loadClaims() {
  try {
    const raw = localStorage.getItem(CLAIMS_KEY);
    return raw ? JSON.parse(raw) : CLAIMS;
  } catch {
    return CLAIMS;
  }
}

export function saveClaims(claims) {
  localStorage.setItem(CLAIMS_KEY, JSON.stringify(claims));
}

export function addClaim(claim) {
  const claims = loadClaims();
  const next = [claim, ...claims];
  saveClaims(next);
  return next;
}

export function updateClaimStatus(id, status) {
  const claims = loadClaims().map((c) => (c.id === id ? { ...c, status } : c));
  saveClaims(claims);
  return claims;
}

/** Fire parametric payout when a hazard scenario activates — once per session per event. */
export function maybeAutoParametricClaim(scenarioId) {
  const template = PARAMETRIC_CLAIMS[scenarioId];
  if (!template) return null;

  const done = loadDoneSet();
  if (done.has(scenarioId)) return null;

  done.add(scenarioId);
  saveDoneSet(done);

  const claims = loadClaims();
  const id = `CLM-${2400 + claims.length}`;
  const claim = {
    id,
    date: formatToday(),
    status: 'Paid',
    automatic: true,
    ...template,
  };

  addClaim(claim);
  return claim;
}

export function clearAutoClaimFlags() {
  sessionStorage.removeItem(AUTO_CLAIM_KEY);
}

export function formatClaimDate(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function createManualClaim({ category, desc, amount, date }) {
  const claims = loadClaims();
  return {
    id: `CLM-${2400 + claims.length}`,
    date: formatClaimDate(date),
    category,
    amount,
    status: 'Processing',
    desc,
    automatic: false,
  };
}
