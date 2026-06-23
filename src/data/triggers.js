/**
 * Live demo triggers — matches scenarios in the app and signals console.
 * Booth NFC taps simulate these real-world feeds.
 */
export const TRIGGER_GROUPS = [
  {
    title: 'HKO weather & hazard alerts',
    summary: 'Hong Kong Observatory open API and civil emergency feeds. Parametric — no claim form.',
    triggers: [
      {
        label: 'Typhoon Signal T8 / T10',
        source: 'HKO API',
        scenario: 'typhoon',
        detail: 'Official typhoon warning issued. Property cover jumps, travel drops. Parametric payout auto-triggers at T8+.',
        shifts: 'Property ↑ · Travel ↓',
      },
      {
        label: 'Black rainstorm warning',
        source: 'HKO API',
        scenario: 'black_rain',
        detail: 'Black Rainstorm Signal from government open data. Flood-risk property boost; travel reduced while roads are disrupted.',
        shifts: 'Property ↑ · Travel ↓',
      },
      {
        label: 'Tornado / severe wind warning',
        source: 'HKO API',
        scenario: 'tornado',
        detail: 'Severe wind alert on the HKO feed. Same property-heavy profile as extreme weather events.',
        shifts: 'Property ↑ · Travel ↓',
      },
      {
        label: 'Fire or civil emergency nearby',
        source: 'FSD / GEO feed',
        scenario: 'fire',
        detail: 'Fire Services or GEO incident bulletin within your home radius. Property and health boosted for 24 hours.',
        shifts: 'Property ↑ · Health ↑',
      },
    ],
  },
  {
    title: 'Card + verified location (two-step)',
    summary: 'HSBC card registers travel intent. A one-time location checkpoint confirms you are actually en route.',
    triggers: [
      {
        label: 'Flight booked on HSBC card',
        source: 'Card MCC 4511',
        scenario: 'flight_card',
        detail: 'Airline or OTA charge detected. Intent logged — allocation does not change until the airport gate checkpoint fires.',
        shifts: 'Intent only — waiting for gate',
      },
      {
        label: 'Airport gate checkpoint',
        source: 'Airport geofence',
        scenario: 'flight_gate → tokyo',
        detail: 'One-time ping at HKIA departure gate. Requires ticket on file. Unlocks full Tokyo travel profile.',
        shifts: 'Travel ↑ · Health ↑',
      },
      {
        label: 'HSR ticket purchased',
        source: 'Card MCC 4112',
        scenario: 'hsr_card',
        detail: 'High-speed rail ticket on your HSBC card. Intent logged — boost waits for West Kowloon station gate.',
        shifts: 'Intent only — waiting for gate',
      },
      {
        label: 'West Kowloon station gate',
        source: 'Station geofence',
        scenario: 'hsr_gate → guangzhou',
        detail: 'One-time checkpoint at West Kowloon XRL. Requires HSR ticket on file. Unlocks Guangzhou cross-border profile.',
        shifts: 'Travel ↑ · Property ↓',
      },
    ],
  },
  {
    title: 'Mobility & transit taps',
    summary: 'HSBC card taps at bus and MTR, plus rental-platform unlock events. Short risk windows while you are moving.',
    triggers: [
      {
        label: 'HelloRide bike unlock',
        source: 'Rental platform API',
        scenario: 'helloride',
        detail: 'Shared-bike unlock from the operator feed. Liability and health cover scale for the ride window.',
        shifts: 'Liability ↑ · Health ↑',
      },
      {
        label: 'Credit tap at bus',
        source: 'HSBC card · transit MCC',
        scenario: 'bus',
        detail: 'HSBC card tap at the bus fare reader. Short travel and liability window for the journey.',
        shifts: 'Travel ↑ · Liability ↑',
      },
      {
        label: 'Credit tap at MTR gate',
        source: 'HSBC card · MTR feed',
        scenario: 'mtr_gate',
        detail: 'HSBC card tap at the MTR gate. Commute risk window — travel and liability boosted until trip ends.',
        shifts: 'Travel ↑ · Liability ↑',
      },
    ],
  },
  {
    title: 'Gig work & activity checkpoints',
    summary: 'Food-delivery shift status and partner-venue check-ins. Payment alone is not enough — the platform or venue confirms real risk.',
    triggers: [
      {
        label: 'Food delivery shift started',
        source: 'Delivery app API',
        scenario: 'keeta',
        detail:
          'Keeta is a food-delivery platform (like Deliveroo). In the Alex demo he does courier shifts for extra income. When he clocks in, the app’s shift-start API tells HSBC Life he is on the road — liability and health cover scale for that delivery window.',
        shifts: 'Liability ↑ · Health ↑',
      },
      {
        label: 'Kai Tak Climbing Centre checkpoint',
        source: 'Partner venue geofence',
        scenario: 'climbing',
        detail: 'One-time ping at the registered climbing venue. Gym membership payment does not trigger this — only verified on-site arrival.',
        shifts: 'Health ↑ · Liability ↑',
      },
    ],
  },
  {
    title: 'Cyber (HSBC card feed)',
    summary: 'No booth NFC for this one — it runs quietly in the background from your existing HSBC relationship. Stays at the HKD 5 floor until a bank signal fires.',
    triggers: [
      {
        label: 'Unauthorised card transaction flagged',
        source: 'HSBC fraud monitoring',
        scenario: null,
        detail:
          'Real-time fraud engine spots a suspicious charge on your HSBC card. Cyber allocation bumps up and the transaction is blocked — micro-cover for card fraud and credential theft, not enterprise cyber insurance.',
        shifts: 'Cyber ↑',
      },
      {
        label: 'Low mobility / at-home day',
        source: 'Transaction + calendar pattern',
        scenario: null,
        detail:
          'No travel, commute, or gig shift detected — you are mostly at home and online. The AI shifts pool weight toward cyber and property (more screen time, more home exposure). This is why cyber sits higher on a normal WFH day in the product story.',
        shifts: 'Cyber ↑ · Property ↑ · Travel ↓',
      },
    ],
  },
];

export const TRIGGER_NOTES = [
  'Weather triggers come from the HKO open API — the demo signals console simulates a live hazard broadcast.',
  'Location checkpoints are one-time venue pings (airport gate, West Kowloon Station, Kai Tak) — never continuous GPS.',
  'Card + location pairs need both steps: ticket on file first, then the gate checkpoint, before allocation changes.',
  'Keeta = food-delivery gig work in the Alex scenario. Shift-start is the trigger, not a random app install.',
  'Cyber has no NFC box — it moves from HSBC fraud alerts or when the AI sees a low-mobility, at-home day.',
  'Life stays fixed at HKD 90. The AI only moves the remaining HKD 110 pool across the other five categories.',
];
