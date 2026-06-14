export const PREMIUM = 200;
export const USER = { name: 'Alex', fullName: 'Alex Rivera', plan: 'Basic', premium: 200 };

export const CATEGORIES = [
  { key: 'life', name: 'Life', color: '#DB0011', multiplier: 500, floor: 90, max: 90 },
  { key: 'health', name: 'Health', color: '#E8A0A8', multiplier: 200, floor: 40, max: 90 },
  { key: 'travel', name: 'Travel', color: '#3D3D3D', multiplier: 150, floor: 5, max: 90 },
  { key: 'property', name: 'Property', color: '#5B7FA5', multiplier: 100, floor: 15, max: 90 },
  { key: 'cyber', name: 'Cyber', color: '#C4926A', multiplier: 200, floor: 5, max: 90 },
  { key: 'liability', name: 'Liability', color: '#6B9E8A', multiplier: 1000, floor: 10, max: 90 },
];

export const SCENARIOS = {
  tokyo: {
    id: 'tokyo',
    label: 'Flying to Tokyo',
    icon: 'plane',
    insight: 'Flight CX500 detected — travel protection increased automatically.',
    insightTitle: 'More travel risk detected',
    allocatedAt: '08:30',
    allocation: { life: 90, health: 40, travel: 35, property: 10, cyber: 5, liability: 20 },
  },
  wfh: {
    id: 'wfh',
    label: 'Work from home',
    icon: 'home',
    insight: 'Home activity detected — property and cyber coverage boosted.',
    insightTitle: 'Home mode active',
    allocatedAt: '07:15',
    allocation: { life: 90, health: 60, travel: 5, property: 25, cyber: 15, liability: 5 },
  },
  keeta: {
    id: 'keeta',
    label: 'Keeta delivery',
    icon: 'bike',
    insight: 'Delivery app active — liability and health coverage increased.',
    insightTitle: 'Delivery mode active',
    allocatedAt: '09:15',
    allocation: { life: 90, health: 55, travel: 15, property: 10, cyber: 5, liability: 25 },
  },
  guangzhou: {
    id: 'guangzhou',
    label: 'Guangzhou HSR',
    icon: 'train',
    insight: 'XRL boarding detected — cross-border travel coverage boosted.',
    insightTitle: 'Cross-border commute',
    allocatedAt: '07:15',
    allocation: { life: 90, health: 45, travel: 40, property: 15, cyber: 5, liability: 5 },
  },
  typhoon: {
    id: 'typhoon',
    label: 'T10 Typhoon',
    icon: 'cloud',
    insight: 'Typhoon Signal T10 — property protection increased. Travel reduced.',
    insightTitle: 'Severe weather alert',
    allocatedAt: '06:00',
    allocation: { life: 90, health: 35, travel: 15, property: 50, cyber: 5, liability: 5 },
  },
  climbing: {
    id: 'climbing',
    label: 'Rock climbing',
    icon: 'mountain',
    insight: 'Sports facility payment detected — health and liability boosted.',
    insightTitle: 'High activity detected',
    allocatedAt: '14:00',
    allocation: { life: 90, health: 70, travel: 5, property: 15, cyber: 5, liability: 15 },
  },
};

export const ACTIVITY_LOG = [
  { time: '08:30', date: 'Today', event: 'Flight CX500 booked', change: 'Travel +35, Property −15', scenario: 'tokyo' },
  { time: '07:15', date: 'Yesterday', event: 'Work from home — Octopus tap', change: 'Property +20, Travel −30', scenario: 'wfh' },
  { time: '09:15', date: 'Wed 17 Sep', event: 'Keeta delivery mode on', change: 'Liability +20, Health +15', scenario: 'keeta' },
  { time: '07:15', date: 'Wed 17 Sep', event: 'XRL West Kowloon → Guangzhou', change: 'Travel +35, Property −15', scenario: 'guangzhou' },
  { time: '06:00', date: 'Mon 15 Sep', event: 'HKO Typhoon Signal T10', change: 'Property +35, Travel −25', scenario: 'typhoon' },
  { time: '14:00', date: 'Sat 13 Sep', event: 'Rock climbing gym payment', change: 'Health +25, Liability +10', scenario: 'climbing' },
];

export const CLAIMS = [
  { id: 'CLM-2401', date: '12 Jun 2026', category: 'Travel', amount: 480, status: 'Paid', desc: 'Flight delay — CX500' },
  { id: 'CLM-2398', date: '3 Jun 2026', category: 'Health', amount: 300, status: 'Paid', desc: 'Clinic visit — Central' },
  { id: 'CLM-2385', date: '18 May 2026', category: 'Property', amount: 2250, status: 'Paid', desc: 'Typhoon T8 parametric payout' },
];

export const INSIGHTS = [
  { id: 1, title: 'More travel risk detected', body: 'We detected a flight in your schedule today, so we increased your travel protection.', time: '2h ago', type: 'travel', scenario: 'tokyo' },
  { id: 2, title: 'Coverage floor reminder', body: 'Your health floor is set to HKD 40. AI cannot drop below this amount.', time: '1d ago', type: 'info' },
  { id: 3, title: 'Monthly summary ready', body: 'You had 47 micro-reallocations this month. Most active: Travel (+12 days).', time: '3d ago', type: 'summary' },
  { id: 4, title: 'Boost available', body: 'Rock climbing detected. Tap to boost activity coverage for today (+HKD 3.50).', time: '5d ago', type: 'boost', scenario: 'climbing' },
];

export function getChartData(allocation) {
  return CATEGORIES.map((c) => ({
    name: c.name,
    value: allocation[c.key],
    color: c.color,
    key: c.key,
  })).filter((d) => d.value > 0);
}

export function getCoverageCap(category, amount) {
  const cat = CATEGORIES.find((c) => c.key === category);
  return amount * (cat?.multiplier ?? 1);
}
