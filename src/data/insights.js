import { SCENARIOS } from './constants';
import { getScenarioPopup } from './scenarioPopups';

export const HSBC_NEWS = [
  {
    id: 'news-1',
    title: 'HSBC Life expands parametric typhoon cover',
    body: 'Micro-Protection Fluid customers now receive automatic T8/T10 property boosts linked to HKO signals — no claim form required.',
    time: 'Today',
    type: 'news',
    source: 'hsbc',
  },
  {
    id: 'news-2',
    title: 'Premier customers pilot ETF-style insurance',
    body: 'HSBC Life reports strong engagement from the HKD 200/month fluid allocation model — 47 reallocations per user monthly on average.',
    time: 'Yesterday',
    type: 'news',
    source: 'hsbc',
  },
  {
    id: 'news-3',
    title: 'Location checkpoints now live in Hong Kong',
    body: 'One-time venue pings at airports, border crossings, and partner gyms — never continuous GPS. PDPO-compliant, 24-hour retention.',
    time: '2d ago',
    type: 'news',
    source: 'hsbc',
  },
];

export function createAllocationInsight(scenario, allocatedAt) {
  return {
    id: `ai-${scenario.id}-${Date.now()}`,
    title: scenario.insightTitle,
    body: scenario.insight,
    time: `Today at ${allocatedAt}`,
    type: scenario.highlightCategory === 'travel' ? 'travel' : 'alert',
    scenario: scenario.id,
    source: 'ai',
  };
}

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

export function buildInitialInsights(scenarioId = 'tokyo', allocatedAt) {
  const scenario = SCENARIOS[scenarioId];
  return [
    createAllocationInsight(scenario, allocatedAt),
    ...HSBC_NEWS,
    {
      id: 'info-floors',
      title: 'Coverage floor reminder',
      body: 'Every category floor is HKD 5 except Life (fixed at HKD 90). AI cannot drop below these.',
      time: '1d ago',
      type: 'info',
      source: 'system',
    },
  ];
}

export function buildInitialNotifications(scenarioId = 'tokyo', allocatedAt) {
  const scenario = SCENARIOS[scenarioId];
  return [
    createAllocationNotification(scenario, allocatedAt),
    {
      id: 'notif-news',
      title: 'HSBC Life product update',
      body: 'Location checkpoints are now enabled for your account. See Settings for details.',
      time: 'Today',
      type: 'info',
      read: false,
      source: 'hsbc',
    },
  ];
}
