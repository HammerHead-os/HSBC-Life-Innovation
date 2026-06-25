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

// Manual demo picker — NFC booth + hazards + partner venues (gates stay NFC-only).
export const DEMO_SCENARIO_IDS = [
  'helloride',
  'bus',
  'mtr_gate',
  'hsr_card',
  'flight_card',
  'typhoon',
  'black_rain',
  'fire',
  'tornado',
  'keeta',
  'gym',
  'pool',
  'climbing',
  'tokyo',
  'guangzhou',
];

/** Partner venue checkpoints — signals console only (no NFC). */
export const LOCATION_SCENARIO_IDS = ['gym', 'pool', 'climbing'];

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
  gym: {
    id: 'gym',
    label: 'Gym / fitness centre',
    icon: 'dumbbell',
    insight: 'Location checkpoint: registered fitness centre — health and liability cover boosted for your session window.',
    insightTitle: 'Gym checkpoint detected',
    highlightCategory: 'health',
    allocatedAt: '18:30',
    allocation: { life: 90, health: 62, travel: 5, property: 15, cyber: 5, liability: 18 },
  },
  pool: {
    id: 'pool',
    label: 'Public swimming pool',
    icon: 'waves',
    insight: 'Location checkpoint: LCSD pool venue — health cover increased for the swim session. Membership payment alone does not trigger this.',
    insightTitle: 'Pool checkpoint detected',
    highlightCategory: 'health',
    allocatedAt: '07:00',
    allocation: { life: 90, health: 58, travel: 5, property: 15, cyber: 5, liability: 12 },
  },

  // Mobility (good “tap → risk now” examples)
  helloride: {
    id: 'helloride',
    label: 'HelloRide bike unlock',
    icon: 'bike',
    insight: 'Bike unlock detected — real-time road risk. Liability and health protection increased for the ride window.',
    insightTitle: 'On-the-move risk detected',
    highlightCategory: 'liability',
    allocatedAt: '10:05',
    allocation: { life: 90, health: 55, travel: 10, property: 10, cyber: 5, liability: 30 },
  },
  bus: {
    id: 'bus',
    label: 'Credit tap at bus',
    icon: 'bus',
    insight: 'HSBC card tap at bus fare reader — short travel window activated. Travel and liability protection increased.',
    insightTitle: 'Transit window active',
    highlightCategory: 'travel',
    allocatedAt: '10:20',
    allocation: { life: 90, health: 45, travel: 30, property: 10, cyber: 5, liability: 20 },
  },
  mtr_gate: {
    id: 'mtr_gate',
    label: 'Credit tap at MTR gate',
    icon: 'train',
    insight: 'HSBC card tap at MTR gate — commute risk activated. Travel and liability protection increased.',
    insightTitle: 'Commute window active',
    highlightCategory: 'travel',
    allocatedAt: '10:35',
    allocation: { life: 90, health: 40, travel: 35, property: 10, cyber: 5, liability: 20 },
  },

  // “Card + location” pairs (use two NFC boxes: purchase vs checkpoint)
  hsr_card: {
    id: 'hsr_card',
    label: 'HSR ticket purchased',
    icon: 'ticket',
    insight: 'HSR ticket purchased — recorded. Coverage will not change until you pass the station gate checkpoint.',
    insightTitle: 'Travel intent detected',
    highlightCategory: 'travel',
    allocatedAt: '11:10',
    allocation: { life: 90, health: 40, travel: 25, property: 20, cyber: 5, liability: 20 },
  },
  hsr_gate: {
    id: 'hsr_gate',
    label: 'HSR station gate checkpoint',
    icon: 'train',
    insight: 'Checkpoint: West Kowloon Station — travel window active. Cross-border travel protection boosted now.',
    insightTitle: 'Station checkpoint detected',
    highlightCategory: 'travel',
    allocatedAt: '11:30',
    allocation: { life: 90, health: 45, travel: 40, property: 15, cyber: 5, liability: 5 },
  },
  flight_card: {
    id: 'flight_card',
    label: 'Flight booked (card)',
    icon: 'ticket',
    insight: 'Flight booking detected — recorded. Coverage will not change until you pass the airport gate checkpoint.',
    insightTitle: 'Trip booked',
    highlightCategory: 'travel',
    allocatedAt: '12:05',
    allocation: { life: 90, health: 40, travel: 25, property: 20, cyber: 5, liability: 20 },
  },
  flight_gate: {
    id: 'flight_gate',
    label: 'Airport gate checkpoint',
    icon: 'plane',
    insight: 'Checkpoint: airport gate — travel window active now. Travel and health protection increased for the journey.',
    insightTitle: 'Boarding checkpoint detected',
    highlightCategory: 'travel',
    allocatedAt: '12:50',
    allocation: { life: 90, health: 45, travel: 45, property: 10, cyber: 5, liability: 5 },
  },

  // Hazards (triggered by external console)
  black_rain: {
    id: 'black_rain',
    label: 'Black rainstorm warning',
    icon: 'cloud',
    insight: 'Severe rain warning — property protection increased. Travel reduced due to disruption risk.',
    insightTitle: 'Severe weather warning',
    highlightCategory: 'property',
    allocatedAt: '13:15',
    allocation: { life: 90, health: 35, travel: 10, property: 55, cyber: 5, liability: 5 },
  },
  fire: {
    id: 'fire',
    label: 'Fire nearby (alert)',
    icon: 'flame',
    insight: 'Emergency alert — property and health protection increased for the next 24 hours.',
    insightTitle: 'Emergency alert detected',
    highlightCategory: 'property',
    allocatedAt: '13:40',
    allocation: { life: 90, health: 45, travel: 5, property: 45, cyber: 5, liability: 10 },
  },
  tornado: {
    id: 'tornado',
    label: 'Tornado warning (alert)',
    icon: 'wind',
    insight: 'Severe wind warning — property protection increased. Travel reduced.',
    insightTitle: 'Severe wind alert',
    highlightCategory: 'property',
    allocatedAt: '14:10',
    allocation: { life: 90, health: 35, travel: 10, property: 55, cyber: 5, liability: 5 },
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
