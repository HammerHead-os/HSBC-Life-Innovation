const HAZARD_IDS = new Set(['typhoon', 'black_rain', 'fire', 'tornado']);
const LOCATION_IDS = new Set(['gym', 'pool', 'climbing']);
const CHECKPOINT_IDS = new Set(['flight_gate', 'hsr_gate', 'guangzhou']);
const MOBILITY_IDS = new Set(['helloride', 'bus', 'mtr_gate', 'keeta']);

const POPUP_COPY = {
  typhoon: {
    title: 'Typhoon Signal T10',
    body: 'HKO severe weather alert — property cover increased, travel reduced.',
    variant: 'hazard',
  },
  black_rain: {
    title: 'Black rainstorm warning',
    body: 'Severe rain alert — stay indoors. Property protection boosted.',
    variant: 'hazard',
  },
  fire: {
    title: 'Fire alert nearby',
    body: 'Emergency services notified area — property & health cover boosted for 24h.',
    variant: 'hazard',
  },
  tornado: {
    title: 'Tornado warning',
    body: 'Severe wind alert — property protection increased immediately.',
    variant: 'hazard',
  },
  flight_gate: {
    title: 'Airport checkpoint',
    body: 'Ticket + location confirmed — travel & health cover active for your journey.',
    variant: 'checkpoint',
  },
  flight_card: {
    title: 'Flight booked',
    body: 'Ticket registered — waiting for airport gate checkpoint before coverage changes.',
    variant: 'travel',
  },
  tokyo: {
    title: 'Flight detected',
    body: 'CX500 travel window — protection reallocated for your trip.',
    variant: 'travel',
  },
  hsr_gate: {
    title: 'HSR station checkpoint',
    body: 'Ticket + location confirmed — cross-border travel cover active now.',
    variant: 'checkpoint',
  },
  hsr_card: {
    title: 'HSR ticket purchased',
    body: 'Ticket registered — waiting for station gate checkpoint before coverage changes.',
    variant: 'travel',
  },
  guangzhou: {
    title: 'Cross-border commute',
    body: 'XRL boarding detected — travel protection boosted.',
    variant: 'checkpoint',
  },
  helloride: {
    title: 'HelloRide unlocked',
    body: 'Ride started — liability & health cover increased for the trip.',
    variant: 'mobility',
  },
  bus: {
    title: 'Bus ride started',
    body: 'HSBC card tap at bus — short travel window active.',
    variant: 'mobility',
  },
  mtr_gate: {
    title: 'MTR gate tap',
    body: 'HSBC card tap at MTR gate — travel & liability cover adjusted.',
    variant: 'mobility',
  },
  keeta: {
    title: 'Keeta delivery active',
    body: 'Food delivery in progress — liability cover increased.',
    variant: 'mobility',
  },
  climbing: {
    title: 'Rock climbing checkpoint',
    body: 'Kai Tak Climbing Centre — session cover active for 2 hours.',
    variant: 'checkpoint',
  },
  gym: {
    title: 'Gym checkpoint',
    body: 'Registered fitness centre — health & liability cover boosted for your session.',
    variant: 'checkpoint',
  },
  pool: {
    title: 'Swimming pool checkpoint',
    body: 'LCSD pool venue confirmed — health cover increased for your swim window.',
    variant: 'checkpoint',
  },
};

export function getScenarioPopup(scenario) {
  const custom = POPUP_COPY[scenario.id];
  if (custom) return custom;

  let variant = 'default';
  if (HAZARD_IDS.has(scenario.id)) variant = 'hazard';
  else if (LOCATION_IDS.has(scenario.id) || CHECKPOINT_IDS.has(scenario.id)) variant = 'checkpoint';
  else if (MOBILITY_IDS.has(scenario.id)) variant = 'mobility';
  else if (scenario.highlightCategory === 'travel') variant = 'travel';

  return {
    title: scenario.insightTitle,
    body: scenario.insight,
    variant,
  };
}
