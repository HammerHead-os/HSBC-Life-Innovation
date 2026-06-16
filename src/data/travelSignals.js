/** Flight & HSR need ticket purchase + location checkpoint before allocation changes. */
export const TRAVEL_FLAGS_KEY = 'mpf-travel-flags';

export const TRAVEL_SIGNALS = {
  flight_card: {
    type: 'ticket',
    flag: 'flightTicket',
    popup: {
      title: 'Flight booked',
      body: 'Ticket registered on your HSBC card. No coverage change yet — full boost activates when you reach the airport gate.',
      variant: 'travel',
      footer: 'Waiting for airport gate checkpoint',
    },
  },
  hsr_card: {
    type: 'ticket',
    flag: 'hsrTicket',
    popup: {
      title: 'HSR ticket purchased',
      body: 'Ticket registered. No coverage change yet — full boost activates at the West Kowloon station gate.',
      variant: 'travel',
      footer: 'Waiting for station gate checkpoint',
    },
  },
  flight_gate: {
    type: 'checkpoint',
    requires: 'flightTicket',
    applies: 'tokyo',
    blockedPopup: {
      title: 'Airport checkpoint detected',
      body: 'Location confirmed at the airport — but no flight ticket on file. Purchase your ticket first, then tap the gate again.',
      variant: 'checkpoint',
      footer: 'No coverage change — ticket required',
    },
  },
  hsr_gate: {
    type: 'checkpoint',
    requires: 'hsrTicket',
    applies: 'guangzhou',
    blockedPopup: {
      title: 'HSR gate checkpoint detected',
      body: 'Location confirmed at West Kowloon Station — but no HSR ticket on file. Purchase your ticket first, then tap the gate again.',
      variant: 'checkpoint',
      footer: 'No coverage change — ticket required',
    },
  },
};

export function loadTravelFlags() {
  try {
    const raw = localStorage.getItem(TRAVEL_FLAGS_KEY);
    return raw ? { flightTicket: false, hsrTicket: false, ...JSON.parse(raw) } : { flightTicket: false, hsrTicket: false };
  } catch {
    return { flightTicket: false, hsrTicket: false };
  }
}

export function saveTravelFlags(flags) {
  localStorage.setItem(TRAVEL_FLAGS_KEY, JSON.stringify(flags));
}

export function isTravelSignal(id) {
  return id in TRAVEL_SIGNALS;
}
