import { SCENARIOS } from './constants';
import { getScenarioPopup } from './scenarioPopups';

/** Editorial & research feed for the Insights tab — not live reallocation alerts. */
export const HSBC_INSIGHTS = [
  {
    id: 'insight-parametric',
    title: 'Why parametric cover works in Hong Kong',
    body: 'HKO weather signals are public, verifiable, and binary. HSBC Life can trigger property boosts and payouts without loss adjusters — cutting average claim time from weeks to minutes.',
    time: 'Today',
    type: 'research',
    source: 'hsbc-research',
  },
  {
    id: 'insight-etf',
    title: 'Insurance that behaves like an ETF',
    body: 'Customers keep one premium (HKD 200/month in the Alex demo). Life stays fixed; the remaining pool rebalances across health, travel, property, cyber, and liability as real-world signals arrive — same money, better fit.',
    time: 'Today',
    type: 'product',
    source: 'hsbc-product',
  },
  {
    id: 'insight-gig',
    title: 'Gig workers need fluid liability, not static bundles',
    body: 'HSBC Life analysis: delivery and ride-share shifts create short, intense risk windows. Micro-Protection Fluid scales liability and health for the shift duration instead of charging a 24/7 courier rate.',
    time: 'Yesterday',
    type: 'research',
    source: 'hsbc-research',
  },
  {
    id: 'insight-checkpoints',
    title: 'Card + checkpoint beats continuous GPS',
    body: 'Flight and HSR cover uses ticket intent from your HSBC card, then a one-time venue ping at the gate. No always-on tracking — aligned with PDPO transparency and 24-hour retention limits.',
    time: 'Yesterday',
    type: 'product',
    source: 'hsbc-product',
  },
  {
    id: 'insight-weather',
    title: 'Extreme weather is a portfolio problem, not a postcode problem',
    body: 'With typhoon and black rainstorm frequency rising, static home policies leave ground-floor Hong Kong renters under-protected. Fluid allocation shifts property weight when HKO signals fire — before damage occurs.',
    time: '3d ago',
    type: 'market',
    source: 'hsbc-market',
  },
  {
    id: 'insight-trust',
    title: 'Floors, ceilings, and customer control',
    body: 'Every category has a minimum floor (Life fixed at HKD 90). Customers set personal floors in the app. AI reallocates only inside guardrails — with a live transparency dashboard showing what triggered each move.',
    time: '4d ago',
    type: 'guidance',
    source: 'hsbc-product',
  },
  {
    id: 'insight-cyber',
    title: 'Cyber cover from the card you already use',
    body: 'Fraud alerts on your HSBC card can bump cyber allocation in real time. On low-mobility days the model shifts toward home and screen-time risk — no extra app to install.',
    time: '5d ago',
    type: 'product',
    source: 'hsbc-product',
  },
  {
    id: 'insight-gba',
    title: 'Hong Kong first, GBA via sandbox',
    body: 'HSBC Life is launching fluid protection HK-only, using parametric structures that avoid cross-border claims friction. Greater Bay Area expansion follows Wealth Management Connect regulatory engagement.',
    time: '1w ago',
    type: 'market',
    source: 'hsbc-research',
  },
];

export function createAllocationNotification(scenario, allocatedAt) {
  const popup = getScenarioPopup(scenario);
  const cat = scenario.highlightCategory;
  const amount = scenario.allocation[cat];
  return {
    id: `notif-${scenario.id}-${Date.now()}`,
    title: popup.title,
    body: `${popup.body} ${cat.charAt(0).toUpperCase() + cat.slice(1)} now HKD ${amount}.`,
    time: allocatedAt ? `Today at ${allocatedAt}` : 'Just now',
    type: popup.variant === 'hazard' ? 'alert' : popup.variant === 'travel' ? 'travel' : 'alert',
    read: false,
    source: 'ai',
  };
}

export function buildInitialInsights() {
  return [...HSBC_INSIGHTS];
}

export function buildInitialNotifications(scenarioId = 'tokyo', allocatedAt) {
  const scenario = SCENARIOS[scenarioId];
  return [createAllocationNotification(scenario, allocatedAt)];
}
