/**
 * Service content — Before / On site / After protocol per catalogues.
 * AMC tiered honestly per Blueprint §0 hardened decision 5 and Critique §2.6.
 */

export const SERVICE_PROTOCOL = [
  {
    label: 'Before.',
    body:
      '24-hour notice. Date. Window. Engineer name. The visit happens when promised.',
  },
  {
    label: 'On site.',
    body:
      'Parameter testing \u2014 TDS, hardness, iron, pH, FRC \u2014 against design specification. Backwash verification. Salt top-up. Resin assessment. Leak inspection. Pressure check.',
  },
  {
    label: 'After.',
    body:
      'A documented report, same day. Parameters in. Parameters out. Work performed. Flags raised. The customer keeps the record. So do we.',
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
      'Institutions and customers who treat water as infrastructure. Named engineer + dashboard.',
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
