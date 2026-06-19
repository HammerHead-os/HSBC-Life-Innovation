/** Real-world data sources that drive allocation and parametric / standard claims. */
export const TRIGGER_GROUPS = [
  {
    category: 'Life',
    color: '#DB0011',
    summary: 'Fixed HKD 90 allocation. Payout only on verified mortality events.',
    triggers: [
      {
        label: 'Death certificate',
        detail: 'Certified copy from the Hong Kong Death Registry or hospital mortuary. Beneficiary payout follows policy schedule — no self-reporting.',
      },
      {
        label: 'Terminal illness (accelerated benefit)',
        detail: 'Specialist physician certification with ≤12 months life expectancy, reviewed by HSBC Life medical board.',
      },
    ],
  },
  {
    category: 'Health',
    color: '#E8A0A8',
    summary: 'Boosts when medical or high-injury activity risk is verified — not from a gym membership payment alone.',
    triggers: [
      {
        label: 'Hospital or clinic visit',
        detail: 'eHealth Authority (eHA) discharge summary or itemised clinic invoice submitted via the app. AI triage matches MCC and diagnosis codes.',
      },
      {
        label: 'Sports & adventure activity',
        detail: 'Verified venue check-in at a registered partner (e.g. Kai Tak Climbing Centre) plus an active session booking — confirms you are on-site, not just paying a monthly gym fee.',
      },
      {
        label: 'Physiotherapy / rehab',
        detail: 'Referral letter from a registered practitioner and treatment receipts for injury claims linked to a covered activity window.',
      },
    ],
  },
  {
    category: 'Travel',
    color: '#3D3D3D',
    summary: 'Reallocation when you are actually in transit. Claims use airline, rail, and airport authority feeds.',
    triggers: [
      {
        label: 'Flight booking + airport gate',
        detail: 'Card transaction at an airline or OTA (MCC 4511) registers intent. Full travel boost activates when boarding is confirmed via airport gate scan or airline departure API.',
      },
      {
        label: 'Flight delay (parametric)',
        detail: 'Airline or OAG feed shows arrival delay ≥3 hours on a covered sector. Payout auto-triggers — no claim form.',
      },
      {
        label: 'Baggage loss or damage',
        detail: 'Property Irregularity Report (PIR) from the airport authority plus airline confirmation of mishandled baggage.',
      },
      {
        label: 'HSR cross-border trip',
        detail: 'Ticket purchase on your HSBC card, then immigration exit record at West Kowloon Station — both required before the Guangzhou travel profile applies.',
      },
      {
        label: 'Daily commute (bus / MTR)',
        detail: 'Octopus or contactless tap matched to a transit merchant category. Short travel window only — not a standalone claim trigger.',
      },
    ],
  },
  {
    category: 'Property',
    color: '#5B7FA5',
    summary: 'Parametric weather payouts and standard claims backed by official reports.',
    triggers: [
      {
        label: 'HKO typhoon signal T8+',
        detail: 'Hong Kong Observatory open API — Signal 8, 9, or 10 confirmed. Parametric property payout in minutes; allocation shifts automatically.',
      },
      {
        label: 'Black rainstorm warning',
        detail: 'HKO Black Rainstorm Signal via government open data feed. Triggers flood-risk allocation boost and eligible parametric cover.',
      },
      {
        label: 'Theft or burglary',
        detail: 'Hong Kong Police Force report (RC number) plus photos of forced entry and an inventory of stolen items. AI cross-checks against claim history.',
      },
      {
        label: 'Fire or civil emergency nearby',
        detail: 'Fire Services Department bulletin or GEO incident feed within your registered home radius. Temporary property and health boost for 24 hours.',
      },
      {
        label: 'Water damage',
        detail: 'Photos, plumber invoice, and — for building-wide incidents — management office incident log or FSD attendance record.',
      },
    ],
  },
  {
    category: 'Cyber',
    color: '#C4926A',
    summary: 'Fraud and breach events verified through bank and government channels.',
    triggers: [
      {
        label: 'Unauthorised card transaction',
        detail: 'HSBC fraud-monitoring alert plus your confirmation in-app. Reversal reference from the card disputes team required before payout.',
      },
      {
        label: 'Phishing or account takeover',
        detail: 'Report filed with HSBC fraud desk and, where applicable, Hong Kong Police Cyber Security and Technology Crime Bureau (CSTCB).',
      },
      {
        label: 'Data breach affecting you',
        detail: 'Notification from hkCERT, a breached merchant on the PDPO register, or a bank letter confirming your credentials were exposed.',
      },
      {
        label: 'Identity theft',
        detail: 'Police report, credit-bureau fraud flag, and evidence of accounts opened in your name without consent.',
      },
    ],
  },
  {
    category: 'Liability',
    color: '#6B9E8A',
    summary: 'Third-party harm or gig-economy exposure — always needs an official incident record.',
    triggers: [
      {
        label: 'Delivery or gig shift',
        detail: 'Platform shift activation (Keeta, Foodpanda courier API) combined with on-road time. Boosts liability cover for the active window only.',
      },
      {
        label: 'Bike or e-scooter rental',
        detail: 'Rental-platform unlock event plus route start. Injury claims need A&E or clinic records and a police report if a third party is involved.',
      },
      {
        label: 'Third-party property damage',
        detail: 'Police report, photos, and repair quote — or a signed admission of liability from the responsible party.',
      },
      {
        label: 'Personal injury to others',
        detail: 'Incident report, witness statements where available, and medical bills issued to the injured party.',
      },
    ],
  },
];

export const TRIGGER_NOTES = [
  'Parametric triggers (HKO signals, flight delay feeds) pay automatically — no form required.',
  'Standard claims need uploaded documents; AI triage targets under 5 minutes for straightforward cases.',
  'Impossible sequences (e.g. Guangzhou checkpoint minutes after a Tokyo flight) are flagged and held for review.',
];
