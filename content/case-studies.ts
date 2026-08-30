/**
 * Case study seed data — Blueprint §7.12 lists Charnock, Birat, Shyam Steel,
 * Saburi, Acasa, GM Group as the initial slate.
 *
 * Stubs are sketched here; only one detail page is fully rendered (Charnock)
 * as the template per the agreed scoping.
 *
 * Full-detail entries include `body` (rendered on /case-studies/[slug]) and
 * `testimonial` (surfaced on /testimonials and rendered as the quote on the
 * detail page). One source of truth for both surfaces.
 */

export type CaseStudySector = 'Healthcare' | 'Hospitality' | 'Education' | 'Manufacturing' | 'Residential';

/** Commercial model behind the deployment. Added 2026-08-31 alongside the
 *  first Clean Water as a Service (Prabhav) case studies -- lets the list
 *  page and detail page distinguish a subscription client from a
 *  buy-and-AMC one instead of presenting them identically. Existing 6
 *  entries left unset (all capex-amc); only new subscription entries set
 *  this explicitly. */
export type CaseStudyModel = 'subscription' | 'capex-amc';

export interface CaseStudyBody {
  brief: string;
  challenge: string;
  solution: string;
  outcomes: Array<{ value: string; label: string }>;
  /** Optional 2026-08-31: a case study is real and publishable on the
   *  strength of brief/challenge/solution/outcomes alone. Do not fill
   *  these in with an invented quote to satisfy a UI slot -- leave both
   *  undefined until a real, attributable quote exists. */
  quote?: string;
  attribution?: string;
}

export interface CaseStudyTestimonial {
  /** The role of the quoted person (e.g. "Facilities lead"). */
  name: string;
  /** Short org context shown beneath the role. */
  org: string;
  /** City line. */
  city: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: CaseStudySector;
  city: string;
  outcome: string;
  brief: string;
  fullDetail?: boolean;  // whether the detail page is rendered with full content
  model?: CaseStudyModel;
  body?: CaseStudyBody;
  testimonial?: CaseStudyTestimonial;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'charnock-hospital',
    client: 'Charnock Hospital',
    sector: 'Healthcare',
    city: 'Kolkata',
    outcome: 'Drinking-water RO at point of use, building inlet WTP, monthly AMC.',
    brief: 'Multi-specialty hospital, drinking-water RO at point of use across wards, building inlet WTP for the campus.',
    fullDetail: true,
    testimonial: {
      name: 'Facilities lead',
      org: 'Charnock Hospital',
      city: 'Kolkata',
    },
    body: {
      brief:
        'A multi-specialty hospital in Kolkata required a unified water programme: drinking-water RO at point of use across wards and OPDs, plus building-inlet treatment to protect the campus’ long-running plumbing and equipment.',
      challenge:
        'The existing setup was fragmented — jar deliveries for drinking water, no inlet treatment, scale and iron staining accumulating in laundry and CSSD. AMC was on-call, not preventive. Equipment downtime was rising with no early-warning visibility.',
      solution:
        'Uniwater installed a building inlet WTP (sediment, iron-removal, carbon, softening) sized to peak occupancy, and centralised drinking-water RO with re-mineralisation distributed to point-of-use at ward and OPD level. Comprehensive AMC was contracted from handover: monthly preventive visits, same-day documented reports, 24-hour SLA on flagged faults.',
      outcomes: [
        { value: '0', label: 'Jar deliveries since install' },
        { value: '< 30 ppm', label: 'Hardness at every tap, post-softening' },
        { value: '24h', label: 'SLA on flagged faults' },
        { value: '12', label: 'Service visits a year' },
      ],
      quote:
        'Before Uniwater, water was something we worried about every quarter. After Uniwater, it’s something we read in a monthly report.',
      attribution: 'Facilities lead, Charnock Hospital',
    },
  },
  {
    slug: 'birat-medical-college',
    client: 'Birat Medical College',
    sector: 'Healthcare',
    city: 'Biratnagar, Nepal',
    outcome: 'Campus water treatment + drinking-water RO across teaching and residential blocks.',
    brief: 'Medical college campus water treatment + drinking-water RO across teaching and residential blocks.',
    fullDetail: true,
    testimonial: {
      name: 'Operations head',
      org: 'Birat Medical College',
      city: 'Biratnagar, Nepal',
    },
    body: {
      brief:
        'A medical college campus in Biratnagar needed unified water across teaching blocks, the attached hospital, and faculty and student residences — drinking-water RO at every tap, inlet treatment for the building plumbing, and a single service relationship across the lot.',
      challenge:
        'Mixed feeds (municipal supply with borewell augmentation), inconsistent hardness and iron between blocks, ad-hoc jar deliveries for drinking water, and no preventive service infrastructure. Four supplier relationships, none of them the same.',
      solution:
        'A campus inlet WTP (sediment → iron → carbon → softening) sized to peak student and patient occupancy, plus centralised drinking-water RO with re-mineralisation distributed to point of use across the teaching, ward, and residential blocks. Comprehensive AMC from handover: monthly preventive visits, parameter testing at every tap, same-day reports.',
      outcomes: [
        { value: '0', label: 'Jar deliveries since install' },
        { value: '4 → 1', label: 'Supplier relationships consolidated' },
        { value: '24h', label: 'SLA on flagged faults' },
        { value: '12', label: 'Service visits a year' },
      ],
      quote:
        'We replaced four supplier relationships with one. The water is the same in the lecture halls, the ward, and the residences.',
      attribution: 'Operations head, Birat Medical College',
    },
  },
  {
    slug: 'shyam-steel',
    client: 'Shyam Steel',
    sector: 'Manufacturing',
    city: 'Durgapur, West Bengal',
    outcome: 'Industrial process water, RO + DM in series for plant operations.',
    brief: 'Industrial process water, RO + DM in series for plant operations.',
    fullDetail: true,
    testimonial: {
      name: 'Plant maintenance lead',
      org: 'Shyam Steel',
      city: 'Durgapur',
    },
    body: {
      brief:
        'Shyam Steel’s integrated TMT plant in Durgapur runs continuous boilers and process lines that depend on conductivity-controlled feed water. Existing treatment was a patchwork of vendor systems with no single ownership of outcomes.',
      challenge:
        'Variable bore-well chemistry, silica spiking in monsoon, and inconsistent AMC across three suppliers meant boilers were being blowed-down twice the design frequency. Maintenance cost was rising every quarter; nobody owned the trend.',
      solution:
        'Replaced the patchwork with a single Uniwater train: 30,000 LPH commercial RO (pre-treatment + dosing + membranes) feeding a 6,000 LPH DM plant for boiler feed; cooling-tower make-up taken from the RO permeate. One AMC, monthly engineer visit, parameter trend reviewed by the plant team in person.',
      outcomes: [
        { value: '< 1 µS/cm', label: 'Conductivity at DM outlet' },
        { value: '50%', label: 'Drop in boiler blowdown frequency' },
        { value: '1', label: 'AMC contract (was 3)' },
        { value: '0', label: 'Unscheduled water-related shutdowns since handover' },
      ],
      quote:
        'We replaced three supplier relationships with one. The maintenance team now reads one report a month and knows what the chemistry is doing across the plant.',
      attribution: 'Plant maintenance lead, Shyam Steel Durgapur',
    },
  },
  {
    slug: 'saburi-plywood',
    client: 'Saburi Plywood',
    sector: 'Manufacturing',
    city: 'Kolkata',
    outcome: 'Boiler feed water DM plant + cooling-tower make-up RO.',
    brief: 'Boiler feed water DM plant + cooling-tower make-up RO.',
    fullDetail: true,
    testimonial: {
      name: 'Operations head',
      org: 'Saburi Plywood',
      city: 'Kolkata',
    },
    body: {
      brief:
        'Saburi Plywood’s manufacturing plant near Kolkata operates steam-cured presses for the marine and block-board lines. Boiler feed and cooling-tower make-up were drawn from bore-wells with high hardness and inconsistent iron.',
      challenge:
        'Boiler scaling was forcing an unplanned chemical descaling every six months. The cooling-tower fouling rate was high enough that the operations team was budgeting tower-fill replacements annually — abnormal for a plant of this size.',
      solution:
        'Installed a 4,000 LPH DM plant for boiler feed (acid-cation + base-anion + mixed-bed polish) and a 10,000 LPH commercial RO for cooling-tower make-up. Antiscalant dosing on the RO; monthly conductivity and silica checks on the DM. Both lines covered by a single Comprehensive AMC.',
      outcomes: [
        { value: '> 12 months', label: 'Boiler descaling interval (was 6)' },
        { value: '~ 70%', label: 'Reduction in cooling-tower blowdown' },
        { value: '< 0.5 µS/cm', label: 'DM polish-grade water' },
        { value: '12', label: 'Service visits a year, by name' },
      ],
      quote:
        'Boiler scaling went from a planned twice-yearly disruption to a non-event. We get a parameter report after every visit; the engineer is the same person each month.',
      attribution: 'Operations head, Saburi Plywood',
    },
  },
  {
    slug: 'acasa-by-malani',
    client: 'Acasa by Malani Group',
    sector: 'Residential',
    city: 'Kolkata',
    outcome: 'Building inlet WTP for a premium residential development.',
    brief: 'Building inlet WTP for a premium residential development \u2014 every flat gets the same softened, filtered water.',
    fullDetail: true,
    testimonial: {
      name: 'Project lead',
      org: 'Acasa by Malani Group',
      city: 'Kolkata',
    },
    body: {
      brief:
        'A premium residential development in Kolkata needed single-system water across every flat \u2014 every resident drinking, bathing, and washing in the same softened, filtered supply, without per-flat service. Specified during construction; commissioned at handover.',
      challenge:
        'Per-flat point-of-use systems would have meant dozens of separate service contracts, inconsistent water across flats, and routine maintenance disruption inside finished homes. The Malani build standard required uniform quality at handover.',
      solution:
        'A building inlet WTP at the apartment block \u2014 four-stage train (sediment \u2192 iron \u2192 carbon \u2192 softening) sized to peak draw across all flats \u2014 with centralised distribution from the plant room to every riser. AMC contracted at the building level, not per flat. Architects coordinated the install during construction.',
      outcomes: [
        { value: '1', label: 'Inlet plant, every flat served' },
        { value: '< 30 ppm', label: 'Hardness at every tap' },
        { value: '1', label: 'AMC contract (vs per flat)' },
        { value: '12', label: 'Service visits a year' },
      ],
      quote:
        'Per-flat water systems were going to mean per-flat service. One inlet means one contract. That\u2019s the right design.',
      attribution: 'Project lead, Acasa development',
    },
  },
  {
    slug: 'gm-group',
    client: 'GM Group',
    sector: 'Manufacturing',
    city: 'Multi-site, India',
    outcome: 'Multi-site industrial water with consolidated AMC across three plants.',
    brief: 'Multi-site industrial water programme with consolidated AMC across three plants.',
    fullDetail: true,
    testimonial: {
      name: 'Group procurement lead',
      org: 'GM Group',
      city: 'India',
    },
    body: {
      brief:
        'GM Group operates three manufacturing plants across eastern India, each with a different bore-well source and a different incumbent water-treatment vendor. Procurement wanted a single relationship across all three sites, not three.',
      challenge:
        'Three water vendors meant three AMC contracts, three reporting cadences, three failure modes, and no comparable parameter data across sites. Procurement could not benchmark vendor performance because there was no shared baseline.',
      solution:
        'Surveyed all three plants, standardised the treatment specification (sediment → iron → carbon → softening + RO where DM was needed), consolidated under a single Comprehensive AMC with site-level supervision. One monthly engineer rota covers the three plants; one consolidated parameter dashboard for procurement.',
      outcomes: [
        { value: '3 → 1', label: 'AMC contracts consolidated' },
        { value: '1', label: 'Monthly report per site, comparable across sites' },
        { value: '24 hr', label: 'SLA on flagged faults, any plant' },
        { value: '12', label: 'Visits per site per year' },
      ],
      quote:
        'One vendor across three plants means I can finally compare what good operations look like across sites. The dashboard is the same; the engineer is the same; the report is the same.',
      attribution: 'Group procurement lead, GM Group',
    },
  },
  {
    // Slug matches content/cwaas.ts LIVE_SITES['starwood-chinar-park'] --
    // same site, one source of truth for the underlying facts (flats,
    // line, capacity). Added 2026-08-31 from Rajat's account directly;
    // no quote yet -- see CaseStudyBody.quote comment.
    slug: 'starwood-chinar-park',
    client: 'Starwood, Chinar Park',
    sector: 'Residential',
    city: 'Kolkata',
    outcome: 'Whole-society iron-free water on subscription — two redundant filtration trains, 2.5 years running.',
    brief: 'A 284-flat residential complex in Chinar Park, Kolkata, running on three borewells too iron-heavy to treat cost-effectively with the infrastructure the complex had. Uniwater has run a subscription iron-removal plant on site for two and a half years.',
    fullDetail: true,
    model: 'subscription',
    body: {
      brief:
        'Starwood, a 284-flat residential complex in Chinar Park, Kolkata, draws its water from three borewells running high iron and heavy silt. The complex’s existing infrastructure wasn’t built to treat water like this cost-effectively. Uniwater has run a subscription iron-removal plant on site for two and a half years.',
      challenge:
        'All three borewells ran iron above 2 ppm, with mud and silt coming through at the tap — well past what makes a building livable. Treating water this difficult with the complex’s existing infrastructure wasn’t cost-effective, and the committee had no in-house way to size or run a plant built for genuinely hard raw water.',
      solution:
        'Uniwater installed a 30,000 LPH automatic iron-filtration system, run as two parallel trains rather than one — so a single train can be pulled for maintenance without the complex ever going without treated water. Zero capex to the committee; Uniwater owns, runs, and maintains the plant under the subscription.',
      outcomes: [
        { value: '284', label: 'Flats on iron-free water' },
        { value: '> 99%', label: 'Uptime, on two redundant trains' },
        { value: '2.5 yrs', label: 'Continuous service, same site' },
        { value: '< 0.3 ppm', label: 'Iron held to the Uniwater spec' },
      ],
      // No quote yet -- ask Rajat whether someone at Starwood (committee
      // member, facility staff) is willing to be quoted before adding one.
    },
  },
];
