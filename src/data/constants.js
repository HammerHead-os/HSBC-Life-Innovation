export const PREMIUM = 200;
export const USER = { name: 'Alex', fullName: 'Alex Rivera', plan: 'Basic', premium: 200 };

export const CATEGORIES = [
  { key: 'life', name: 'Life', color: '#DB0011', multiplier: 500, floor: 90, max: 90, fixed: true },
  { key: 'health', name: 'Health', color: '#E8A0A8', multiplier: 200, floor: 5, max: 90 },
  { key: 'travel', name: 'Travel', color: '#3D3D3D', multiplier: 150, floor: 5, max: 90 },
  { key: 'property', name: 'Property', color: '#5B7FA5', multiplier: 100, floor: 5, max: 90 },
  { key: 'cyber', name: 'Cyber', color: '#C4926A', multiplier: 200, floor: 5, max: 90 },
  { key: 'liability', name: 'Liability', color: '#6B9E8A', multiplier: 1000, floor: 5, max: 90 },
];

export const SCENARIOS = {
  tokyo: {
    id: 'tokyo',
    label: 'Flying to Tokyo',
    icon: 'plane',
    insight: 'Flight CX500 detected — travel protection increased automatically.',
    insightTitle: 'More travel risk detected',
    highlightCategory: 'travel',
    allocatedAt: '08:30',
    allocation: { life: 90, health: 40, travel: 35, property: 10, cyber: 5, liability: 20 },
  },
  keeta: {
    id: 'keeta',
    label: 'Keeta delivery',
    icon: 'bike',
    insight: 'Delivery app active — liability and health coverage increased.',
    insightTitle: 'Delivery mode active',
    highlightCategory: 'liability',
    allocatedAt: '09:15',
    allocation: { life: 90, health: 55, travel: 15, property: 10, cyber: 5, liability: 25 },
  },
  guangzhou: {
    id: 'guangzhou',
    label: 'Guangzhou HSR',
    icon: 'train',
    insight: 'XRL boarding detected — cross-border travel coverage boosted.',
    insightTitle: 'Cross-border commute',
    highlightCategory: 'travel',
    allocatedAt: '07:45',
    allocation: { life: 90, health: 45, travel: 40, property: 15, cyber: 5, liability: 5 },
  },
  typhoon: {
    id: 'typhoon',
    label: 'T10 Typhoon',
    icon: 'cloud',
    insight: 'Typhoon Signal T10 — property protection increased. Travel reduced.',
    insightTitle: 'Severe weather alert',
    highlightCategory: 'property',
    allocatedAt: '06:00',
    allocation: { life: 90, health: 35, travel: 15, property: 50, cyber: 5, liability: 5 },
  },
  climbing: {
    id: 'climbing',
    label: 'Rock climbing session',
    icon: 'mountain',
    insight: 'Location checkpoint: Kai Tak Climbing Centre — session coverage active for 2 hours. Gym payment alone does not trigger a boost.',
    insightTitle: 'Activity checkpoint detected',
    highlightCategory: 'health',
    allocatedAt: '14:00',
    allocation: { life: 90, health: 70, travel: 5, property: 15, cyber: 5, liability: 15 },
  },
};

export const ACTIVITY_LOG = [
  { time: '08:30', date: 'Today', event: 'Flight CX500 booked', change: 'Travel +35, Property −15', scenario: 'tokyo' },
  { time: '09:15', date: 'Today', event: 'Keeta delivery mode on', change: 'Liability +20, Health +15', scenario: 'keeta' },
  { time: '07:45', date: 'Yesterday', event: 'XRL West Kowloon → Guangzhou', change: 'Travel +35, Property −15', scenario: 'guangzhou' },
  { time: '06:00', date: 'Mon 15 Sep', event: 'HKO Typhoon Signal T10', change: 'Property +35, Travel −25', scenario: 'typhoon' },
  { time: '14:00', date: 'Sat 13 Sep', event: 'Checkpoint: Kai Tak Climbing Centre', change: 'Health +25, Liability +10', scenario: 'climbing' },
];

export const CLAIMS = [
  { id: 'CLM-2401', date: '12 Jun 2026', category: 'Travel', amount: 480, status: 'Paid', desc: 'Flight delay — CX500' },
  { id: 'CLM-2398', date: '3 Jun 2026', category: 'Health', amount: 300, status: 'Paid', desc: 'Clinic visit — Central' },
  { id: 'CLM-2385', date: '18 May 2026', category: 'Property', amount: 2250, status: 'Paid', desc: 'Typhoon T8 parametric payout' },
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
