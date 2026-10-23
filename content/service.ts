/**
 * Service content — Before / On site / After protocol per catalogues.
 * AMC tiered honestly per Blueprint §0 hardened decision 5 and Critique §2.6.
 */

export const SERVICE_PROTOCOL = [
  {
    label: 'Before.',
    body:
      'You get 24 hours’ notice with the date, time window and engineer’s name. The visit happens when we said it would.',
  },
  {
    label: 'On site.',
    body:
      'We test TDS, hardness, iron, pH and FRC against the design spec, check the backwash, top up salt, assess the resin, look for leaks and check the pressure.',
  },
  {
    label: 'After.',
    body:
      'A written report the same day: readings in and out, work done and any flags raised. You keep a copy and so do we.',
  },
] as const;

// AMC tiers — honest, scalable, per Blueprint §0 + Critique §2.6.
// "Monthly preventive service" lives in Comprehensive + Premium. Standard is quarterly.
// AMC pricing is the residential indicative band — final price varies by
// system capacity, age, and AMC tier. "From ₹X/year + GST" is the
// honest framing we use on the site.
export const AMC_TIERS = [
  {
    name: 'Standard',
    cadence: 'Quarterly preventive visits',
    summary:
      'Four visits a year plus on-call. Low-load installs, stable chemistry.',
    annualFromINR: 9600,
    inclusions: [
      'Quarterly preventive visits with documented report',
      '24-hour SLA on flagged faults',
      'Media inspection and verification',
      'Resin top-up as required',
      'Parameter testing on every visit',
    ],
  },
  {
    name: 'Comprehensive',
    cadence: 'Monthly preventive visits',
    summary:
      'Twelve visits a year. Right for borewell-fed homes and any iron / scale / variable supply.',
    annualFromINR: 18000,
    inclusions: [
      'Monthly preventive visits with documented report',
      '24-hour SLA on flagged faults',
      'Media replacement on schedule, not on complaint',
      'Salt and resin top-ups included',
      'Pressure-gauge calibration, leak inspection',
      'Same-day written report to customer',
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    cadence: 'Monthly visits + priority response',
    summary:
      'For institutions, and homes that want the closest watch on their water. Named engineer and a dashboard.',
    annualFromINR: 30000,
    inclusions: [
      'Everything in Comprehensive',
      'Named engineer for the contract life',
      'Customer dashboard with parameter trends',
      '12-hour SLA on flagged faults',
      'Annual independent water analysis',
      'AMC anniversary report',
    ],
  },
] as const;

export const TWELVE_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;
