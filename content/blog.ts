/**
 * Blog content. Twelve tier-1 posts per BLUEPRINT §14.4, written in the
 * catalogue voice. Posts live here as typed TypeScript until Sanity CMS lands
 * in the wider Sprint 5 content work; swap the import in /blog rendering for a
 * Sanity client at that point — same shape, zero changes to the render layer.
 *
 * Word counts run shorter than the BLUEPRINT spec (1500–2500). These are tier-1
 * launch starts; the content team's role is to expand and review each before
 * the editorial bar is fully met.
 */

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'list'; items: string[] };

export type BlogCategory = 'Chemistry' | 'Decision' | 'Install' | 'Service' | 'Voice';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  category: BlogCategory;
  lede: string;
  body: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'borewell-water-yellow',
    title: 'Why your borewell water is yellow — and what to do about it',
    description:
      'The orange ring under the basin, the metallic taste in your chai. Iron in borewell water — what it is, why it shows up, what actually fixes it.',
    publishedAt: '2026-05-15',
    readingMinutes: 6,
    category: 'Chemistry',
    lede: 'The orange ring at the base of the vanity. The faint stain under the WC rim. The metallic taste in your morning chai. Iron in borewell water is one of the most-overlooked features of Indian residential supply. It is also one of the easier ones to fix — if you treat it in the right order.',
    body: [
      { type: 'p', text: 'Most homeowners learn about iron the same way: a slow accumulation of small symptoms that, twelve to eighteen months in, stop being deniable. The marble grout near the WC takes an orange line. The bathroom\'s CP fittings dull a half-shade. A faint metallic note creeps into the kitchen tap, noticed first in tea and dal. None of this happens because the borewell suddenly worsened — borewell chemistry is remarkably stable year to year. The symptoms compound because nothing has been treating the iron the whole time.' },
      { type: 'h2', text: 'Where iron comes from' },
      { type: 'p', text: 'Iron in residential borewells is dissolved as ferrous iron (Fe2+), invisible in water that is freshly drawn. It oxidises on exposure to air, converting to ferric iron (Fe3+), which is the orange-red form that stains tile grout, marble, and sanitaryware. The conversion happens within seconds of the water sitting in the bowl of a basin, the heater of a geyser, or against the porous edge of cement grout.' },
      { type: 'p', text: 'A borewell tested at 0.5 ppm iron — a level many homeowners assume is "negligible" — will, over a few years, lay down enough cumulative iron oxide to permanently alter the colour of grout, hard-water deposits, and any porous stone the water touches.' },
      { type: 'h2', text: 'Why a softener alone will not solve it' },
      { type: 'p', text: 'A water softener — the most-installed treatment for residential hardness in India — uses ion-exchange resin to swap calcium and magnesium ions for sodium. Iron, in solution, can also bind to the resin. The problem is that ferric iron (the oxidised form) does not release back when the resin regenerates. It coats the resin beads and progressively destroys their capacity.' },
      { type: 'pullquote', text: 'Iron destroys downstream resin. A softener after iron exposure clogs within months, not years.' },
      { type: 'p', text: 'In practice, a softener installed without iron pre-treatment on a borewell carrying 0.5 ppm or more iron will lose half its capacity inside a year. The customer notices the symptoms returning — scale on the geyser, hard-water feel — and assumes the system has failed. The system has not failed. The sequence was wrong.' },
      { type: 'h2', text: 'The right order' },
      { type: 'p', text: 'On a borewell-fed home with any visible iron — yellow water, orange staining, metallic taste — the treatment train looks like this:' },
      { type: 'list', items: ['Sediment filter (catches the upstream silt that scratches downstream valves)', 'Iron filter (oxidises ferrous iron and traps the ferric form in media)', 'Activated carbon filter (removes residual chlorine and the summer chemical taste)', 'Softener (the decisive stage — only now that the resin is protected)'] },
      { type: 'p', text: 'This is the HomeSoft four-stage train. It is the same sequence used in industrial WTPs and in commercial RO pre-treatment, scaled down to residential capacities. Skipping the iron stage is the single most common reason residential water systems fail in year two.' },
      { type: 'h2', text: 'Before you treat: test' },
      { type: 'p', text: 'The ten-minute test that decides everything is the iron-spot test combined with a hardness and TDS reading. A free survey includes it. The number decides the media; the household draw decides the capacity. Without the test, you are guessing. With the test, you know.' },
    ],
  },
  {
    slug: 'iron-hardness-order',
    title: 'Iron, hardness, and the order they should be treated in',
    description:
      'Iron, calcium-magnesium, particulate. Treating them in the wrong order rebuilds the softener inside a year. The right order, explained.',
    publishedAt: '2026-05-29',
    readingMinutes: 5,
    category: 'Chemistry',
    lede: 'Most Indian residential water treatment failures are not equipment failures. They are sequence failures. The right components in the wrong order produce a system that performs for ten months and then stops. The same components in the right order perform for fifteen years.',
    body: [
      { type: 'p', text: 'Groundwater in most Indian cities carries three things you might want to remove: particulate (sand, silt, oxidation products from upstream pipes), iron (dissolved as ferrous, oxidising to ferric), and hardness (calcium and magnesium ions). A drinking-water context adds residual chlorine from municipal treatment and, occasionally, arsenic in the Gangetic and Brahmaputra belts. Each contaminant has its own treatment stage. The stages have to run in the right order.' },
      { type: 'h2', text: 'Stage one: sediment' },
      { type: 'p', text: 'A sediment filter is the cheapest filter in the train and the one doing the most invisible work. It catches the visible particulate — silt from upstream borewell drilling, oxidation flakes from old galvanised mains, sand. Without it, the particulate scratches every valve and tears every membrane downstream. With it, the rest of the train lasts an order of magnitude longer.' },
      { type: 'h2', text: 'Stage two: iron' },
      { type: 'p', text: 'Iron filtration oxidises ferrous iron to ferric and traps the ferric form in a specialised media bed. It must come before softening, because ferric iron coats and destroys softening resin in months. It must come after sediment, because particulate clogs the iron media too. This is the textbook order.' },
      { type: 'h2', text: 'Stage three: carbon' },
      { type: 'p', text: 'Activated carbon adsorbs residual chlorine, the summer chemical taste, and organic matter. Chlorine, while necessary for municipal disinfection, ages CP fittings, gaskets, and rubber seals when it stays in the supply long-term. Carbon strips it without affecting the minerals that follow. Carbon also protects softening resin from chlorine oxidation, which would otherwise gradually degrade capacity.' },
      { type: 'h2', text: 'Stage four: softening' },
      { type: 'p', text: 'Softening is the decisive stage — the one that homeowners actually feel. Ion-exchange resin swaps calcium and magnesium for sodium. The water feels different. Soap lathers. Hair dries softer. Skin stops feeling tight after a shower. Geyser scaling slows to a stop. By the time water reaches this stage, the resin is protected from the three things that would otherwise destroy it: particulate, iron, and chlorine.' },
      { type: 'pullquote', text: 'The wrong sequence is worse than no sequence. A softener placed first burns through resin and convinces the homeowner the system is broken.' },
      { type: 'h2', text: 'When the order changes' },
      { type: 'p', text: 'There are two cases where the order changes. The first is a borewell with no measurable iron and no chlorine — the carbon and iron stages can be omitted, leaving sediment plus softening. The second is an industrial application where downstream RO membranes need protection from hardness scaling — the order becomes sediment, carbon, softening, RO, with optional pre-RO cartridges.' },
      { type: 'p', text: 'Residential homeowners do not need to memorise these variations. They need an engineer who does. The order follows from the water test, every time.' },
    ],
  },
  {
    slug: 'hansgrohe-spec-vs-indian-water',
    title: 'Hansgrohe specifications and Indian water reality',
    description:
      'Premium European fittings ship with a feed-water spec. Most Indian residential supply doesn\u2019t meet it. The mismatch dulls the chrome at 18 months.',
    publishedAt: '2026-06-12',
    readingMinutes: 5,
    category: 'Voice',
    lede: 'Pull the spec sheet of any premium European fitting — Hansgrohe, Grohe, Kohler, Hansa — and the small print near the back will tell you the feed-water conditions under which the warranty applies. Maximum hardness. Maximum iron. Maximum chlorine residual. Most Indian homeowners never read that page. Most Indian water does not meet it.',
    body: [
      { type: 'p', text: 'A homeowner who has spent two lakh on a Hansgrohe Axor shower assembly is not being unreasonable in expecting the chrome to look new for a decade. The brand exists, in part, because the chrome does look new for a decade — in Germany, in Belgium, in the parts of Singapore where municipal water is RO-polished. The fittings are engineered for a particular feed-water envelope.' },
      { type: 'h2', text: 'What the spec sheet says' },
      { type: 'p', text: 'Premium European fittings typically assume feed water with hardness below 120 ppm, iron below 0.1 ppm, residual chlorine below 1 ppm, and pH between 6.5 and 8.0. Inside that envelope, chrome plating retains its finish, internal seals hold for two decades, and ceramic cartridges resist scaling.' },
      { type: 'p', text: 'Outside that envelope, the behaviour changes. Hardness above 180 ppm — common across NCR, Pune, and across most of borewell-fed urban India — deposits calcium carbonate on every wetted surface. Iron above 0.3 ppm leaves orange staining around the spout. Chlorine above 2 ppm — possible at the head of the municipal line in some cities — ages the rubber and silicone seals. None of this is a fault in the fitting. The fitting is performing exactly as designed, on water it was not designed for.' },
      { type: 'h2', text: 'The cost of the mismatch' },
      { type: 'p', text: 'The first symptom is cosmetic. Chrome dulls. The shower head begins to spray unevenly as scale narrows the jets. Within two years, the mineral deposit becomes visible from across the bathroom — a faint whiteness around the spout, a haziness on the body of the shower handle.' },
      { type: 'p', text: 'The second symptom is functional. Ceramic cartridges scale internally; the lever stiffens. The shower head\'s flow rate drops noticeably. Then the seals: chlorine and hardness together harden the rubber, and the diverter starts to drip when off. By the four-year mark, a fitting that should look new is being quietly replaced one part at a time.' },
      { type: 'pullquote', text: 'The fittings are performing exactly as designed, on water they were not designed for.' },
      { type: 'h2', text: 'The architect\'s decision' },
      { type: 'p', text: 'The cleanest moment to address the mismatch is before tile. A whole-house treatment system installed during construction — sediment, iron, carbon, softening — brings every tap inside the spec envelope of the fittings the architect has specified. The cost is a few percent of the fittings budget. The benefit is that the fittings look, feel, and function the way the brand intended for the next two decades.' },
      { type: 'p', text: 'The expensive moment to address it is at year three or four — when the homeowner notices the chrome has lost its edge, and the fix involves not just installing treatment but also replacing fittings that have already aged on un-treated water. Pre-tile, the decision is engineering. Post-tile, it is repair.' },
    ],
  },
  {
    slug: 'how-to-read-a-water-test',
    title: 'How to read a water test report',
    description:
      'TDS, hardness, iron, pH, FRC — five numbers that decide what your water needs. What each one measures, what the thresholds mean, and what to ask the tester.',
    publishedAt: '2026-06-26',
    readingMinutes: 6,
    category: 'Decision',
    lede: 'A water test report is usually a single sheet of paper with five to seven numbers and a stamp. Most homeowners glance at it once and file it. The numbers, read correctly, are the entire design brief for the water system you are about to install. Read them wrong and you size for the wrong problem.',
    body: [
      { type: 'h2', text: 'TDS — total dissolved solids' },
      { type: 'p', text: 'TDS measures the total mineral content of the water in parts per million. It is the most-quoted number and the most-misunderstood. Low TDS does not mean clean water — it just means dilute. High TDS does not mean dirty water — it means concentrated.' },
      { type: 'p', text: 'For drinking, TDS sets the treatment: below 200 ppm, ultrafiltration with UV is sufficient; above 500 ppm, reverse osmosis is the right answer; between 200 and 500, the call depends on hardness, iron, and what the household is actually drinking. For bathing and washing, TDS matters less — hardness matters more.' },
      { type: 'h2', text: 'Hardness — calcium plus magnesium' },
      { type: 'p', text: 'Hardness is the calcium and magnesium concentration in the water, also measured in ppm. It is the single largest factor in how the water feels. Below 60 ppm — soft. Between 60 and 120 — moderately hard. Between 120 and 180 — hard. Above 180 — very hard. Most Indian metropolitan supply runs 60 to 180 ppm. Most borewell-fed homes run 250 to 500 ppm.' },
      { type: 'p', text: 'Hardness causes the scale on the geyser, the dry-skin feel after a shower, the soap that will not lather, and the orange grout (in combination with iron). Softening removes it. Nothing else does.' },
      { type: 'h2', text: 'Iron' },
      { type: 'p', text: 'Iron is measured in ppm. Anything above 0.1 ppm will, given time, stain tile grout, sanitaryware, and porous stone. Anything above 0.3 ppm requires dedicated iron pre-treatment before softening. Anything above 1.0 ppm — common in Guwahati borewells, some Ranchi residential boreholes — requires a substantial iron filter sized to the household draw.' },
      { type: 'h2', text: 'pH' },
      { type: 'p', text: 'pH measures acidity or alkalinity on a 0 to 14 scale, with 7 being neutral. Indian residential supply usually runs 6.8 to 7.6 — slightly alkaline, well within range. Outside 6.5 to 8.5, the water can corrode pipes (low pH) or scale aggressively (high pH). If your pH is outside this range, the survey will flag it and propose neutralisation.' },
      { type: 'h2', text: 'FRC — free residual chlorine' },
      { type: 'p', text: 'FRC measures the chlorine still in the water at the tap, in ppm. Municipal supply usually arrives with 0.2 to 1.0 ppm — enough to disinfect along the way, not enough to taste obviously. Above 1.5 ppm, the chlorine becomes noticeable and starts to age CP fittings and rubber seals. Activated carbon removes it.' },
      { type: 'pullquote', text: 'Five numbers. Each one decides a stage of the system. None of them are optional.' },
      { type: 'h2', text: 'What to ask the tester' },
      { type: 'p', text: 'Two questions matter. First: is this test from the borewell directly, or after the overhead tank? The numbers can differ — sediment settles in the tank, iron oxidises in storage. Second: is the report from the past month or the past year? Borewell chemistry shifts seasonally, especially in monsoon-fed regions. A test from last May is not the same as a test from this November. The right test is taken at the time the system is being sized.' },
    ],
  },
  {
    slug: 'soft-water-vs-salt-water',
    title: 'Soft water vs salt water: what your skin actually feels',
    description:
      'Ion exchange swaps calcium for sodium. Some assume salty water. It does not. What softening actually does to your bath water, plain.',
    publishedAt: '2026-07-10',
    readingMinutes: 4,
    category: 'Chemistry',
    lede: 'Once in a while a homeowner reads that water softeners "add sodium" and assumes the shower water will taste like the sea. It will not. The chemistry of ion exchange is less alarming than it sounds, and the sodium load is small enough to matter to no one except the most salt-restricted diets.',
    body: [
      { type: 'p', text: 'A water softener does one thing: it removes calcium and magnesium ions from the water, replacing them with sodium ions in roughly equivalent quantity. The chemistry is straightforward. Each calcium ion (2+ charge) leaving the resin releases two sodium ions (1+ charge each) to balance the charge. The total ion count goes up slightly; the total mineral mass shifts from calcium-and-magnesium to sodium.' },
      { type: 'h2', text: 'How much sodium' },
      { type: 'p', text: 'For a typical Indian residential setting — feed-water hardness 300 ppm — softening adds roughly 70 mg of sodium per litre of water. By comparison, a teaspoon of table salt contains about 2,300 mg of sodium. A glass of softened water contains less sodium than a slice of bread. The dietary impact for almost everyone is negligible.' },
      { type: 'p', text: 'The two exceptions are infants on formula and adults under strict low-sodium prescription. Both groups should drink reverse-osmosis-treated water, not softened water, because the RO membrane removes the added sodium along with everything else. This is one reason a kitchen-tap drinking-water system is recommended alongside whole-house softening — softening for bathing and washing, RO for drinking and cooking.' },
      { type: 'h2', text: 'What the shower actually feels like' },
      { type: 'p', text: 'Soft water does feel different in the shower, and the difference is sometimes described as "slippery". The slipperiness is real but it is not soap residue or sodium. It is the absence of the calcium-soap precipitate that hard water leaves on skin. On hard water, soap reacts with calcium to form a sticky film that the rinse never fully removes — the squeak you have learned to interpret as "clean" is the squeak of that film. On soft water, the soap rinses away completely. The skin feels softer because nothing is left on it.' },
      { type: 'pullquote', text: 'The "squeaky clean" feel of a hard-water shower is the feel of soap residue. The "slippery" feel of a soft-water shower is the feel of skin without residue.' },
      { type: 'h2', text: 'What softening does not do' },
      { type: 'p', text: 'Softening removes hardness. It does not remove iron, chlorine, TDS, sediment, or organics. A homeowner who installs only a softener on a feed with iron will get a softener that fails inside a year. A homeowner who installs only a softener on a feed with chlorine will get a slightly less chlorinated shower but no taste improvement at the drinking tap. The softener is one stage in a treatment train, not the whole train.' },
    ],
  },
  {
    slug: 'tds-isnt-a-quality-metric',
    title: 'TDS isn\'t a quality metric. Here\'s what is.',
    description:
      'Low TDS is not purer. High TDS is not dirtier. What total dissolved solids actually measures, and the parameter that matters more.',
    publishedAt: '2026-07-24',
    readingMinutes: 5,
    category: 'Voice',
    lede: 'Walk into any premium residential kitchen in India and there is a good chance the under-sink RO unit has a small digital display reading the TDS in parts per million. The number is usually low. The homeowner usually feels good about it. The number, taken alone, says almost nothing about water quality.',
    body: [
      { type: 'p', text: 'TDS — total dissolved solids — is a measure of how much mineral content the water carries. It is reported in parts per million. The standard kitchen-purifier display reads it because it is cheap to measure: a conductivity probe and some math. The marketing around it has trained a generation of Indian homeowners to treat low TDS as the goal. It is not the goal. It is one data point.' },
      { type: 'h2', text: 'What TDS includes' },
      { type: 'p', text: 'The dissolved solids in residential water are mostly minerals — calcium, magnesium, sodium, potassium, bicarbonates, sulphates, chlorides. Some of these are useful (calcium and magnesium are essential dietary minerals). Some are inert. Some, in excess, indicate other problems (high sulphate often correlates with industrial groundwater contamination).' },
      { type: 'p', text: 'TDS does not distinguish between these. A glass of water with 200 ppm of mostly calcium and magnesium — moderately hard mineral water — and a glass with 200 ppm of mostly sodium and chloride — slightly saline industrial groundwater — register identically on a TDS meter. They are very different waters.' },
      { type: 'h2', text: 'What TDS does not include' },
      { type: 'p', text: 'TDS does not measure bacteria, viruses, pesticides, arsenic, fluoride, lead, or any of the contaminants that actually matter for human health. A glass of water can have a TDS of 50 — looks pristine on the meter — and contain enough microbial contamination to cause illness. A glass at 800 ppm can be entirely safe to drink.' },
      { type: 'p', text: 'Aquaguard, Kent, and Eureka Forbes have built a marketing edifice on the TDS display. The display is useful, but only as one signal among several. Treating it as the headline measure has the consequence of teaching homeowners that an RO system stripping every mineral from the water — leaving it at TDS 20 — is the ideal. It is not. Below 80 ppm, the water tastes flat. Below 50 ppm, it is actively missing minerals the body uses.' },
      { type: 'pullquote', text: 'Low TDS is not purity. It is dilution.' },
      { type: 'h2', text: 'What to use instead' },
      { type: 'p', text: 'For deciding the right drinking-water treatment, TDS is a useful first cut: below 200 ppm, ultrafiltration with UV is sufficient; above 500, reverse osmosis is appropriate. Between those bounds, hardness, iron, and use case decide the answer. Beyond that initial sizing, what matters is the full water-test report — pH, hardness, iron, free residual chlorine, microbiological indicators — and, where relevant, arsenic and fluoride screens for the specific region.' },
      { type: 'p', text: 'A reading on the TDS meter is a glance. A water test is the decision. Confusing the two is how homeowners end up paying twelve thousand rupees for a kitchen RO that strips minerals from water that did not need them stripped, while leaving the bathroom water — the water that is actually causing their hair to break and their geyser to scale — entirely untreated.' },
    ],
  },
  {
    slug: 'five-year-cost-of-doing-nothing',
    title: 'The five-year cost of doing nothing',
    description:
      'Geysers replaced. Marble re-polished. Shower heads dulled. Dishwasher on its second service. The cumulative bill for ignoring water chemistry.',
    publishedAt: '2026-08-07',
    readingMinutes: 5,
    category: 'Decision',
    lede: 'On day one, when the new home is handed over, the choice to skip water treatment looks like the cheap option. Five minutes with the plumber. Decided on price. By year five, the cumulative cost of that decision — measured across appliances, fittings, fixtures, and bottled water — has typically exceeded the original system cost two or three times over.',
    body: [
      { type: 'p', text: 'The argument against home water treatment is usually a price argument. A whole-house system costs between one and three lakh, depending on configuration. A kitchen RO is fifteen to thirty thousand. A bathroom-level filter is fourteen to forty thousand. For a homeowner with no symptoms yet, those numbers feel optional. They do not feel optional for the same homeowner three years in.' },
      { type: 'h2', text: 'Year one: barely visible' },
      { type: 'p', text: 'In the first year, the cost of un-treated water is invisible. The geyser works. The fittings still look new. The dishwasher cycles normally. Bottled water deliveries amount to twelve to eighteen thousand rupees a year. That is the only line item on the cost side. The household reports satisfaction.' },
      { type: 'h2', text: 'Year two: the first signs' },
      { type: 'p', text: 'In year two, the cumulative scale in the geyser heating element starts to register. Heating times lengthen by ten to fifteen percent. Energy bills tick up. CP fittings near hard-water exposure — shower heads, taps that see frequent splash — dull noticeably. The marble grout near the WC takes its first faint orange line if iron is present. The dishwasher\'s detergent dose creeps up; cycles run longer.' },
      { type: 'h2', text: 'Year three: the first replacement' },
      { type: 'p', text: 'Year three is usually the first replacement. A geyser failing five to seven years early — common on hard water — costs eight to fifteen thousand rupees. The shower head, dulled and spraying unevenly, gets replaced for two to six thousand. The dishwasher\'s first service call — descaling, replacement of internal seals — runs three to five thousand.' },
      { type: 'h2', text: 'Year four: the marble' },
      { type: 'p', text: 'By year four, the cumulative iron and hardness deposit on marble grout is past the point of household cleaning. Re-polishing or re-grouting a master bathroom runs thirty to eighty thousand rupees depending on stone choice and bath size. The Hansgrohe shower assembly, dulled to a noticeable degree, is either lived with (the homeowner accepts the new aesthetic) or replaced (twenty to fifty thousand for a premium replacement). Glass partitions, etched by hard-water deposits, develop a haze that mineral-deposit cleaners can no longer fully remove.' },
      { type: 'h2', text: 'Year five: the tally' },
      { type: 'p', text: 'By the five-year mark, the cumulative spend on bottled water (₹60,000 to ₹90,000), appliance servicing (₹30,000 to ₹50,000), fitting replacement (₹50,000 to ₹150,000), marble re-polishing (₹30,000 to ₹80,000), and dishwasher repairs (₹15,000 to ₹30,000) puts the total in the range of two to four lakh. The same homeowner who skipped a one-lakh whole-house system on day one has, by year five, spent two to four times that on consequences of the skip.' },
      { type: 'pullquote', text: 'Ten years on, the cumulative cost runs to lakhs. The house ages faster than it should.' },
      { type: 'h2', text: 'What the discipline buys' },
      { type: 'p', text: 'A whole-house system properly designed and properly serviced keeps the geyser performing within spec for its rated lifetime. It keeps the CP fittings looking like the brand promised. It keeps marble grout free of staining. It eliminates the bottled-water line entirely. The system itself, on monthly service, runs for fifteen to twenty years. The arithmetic, even allowing for AMC costs over the period, favours treatment by a substantial margin from year three onward.' },
      { type: 'p', text: 'The argument for home water treatment is not the system. It is the absence of the cost of not having the system. That absence compounds annually.' },
    ],
  },
  {
    slug: 'whole-house-vs-point-of-use',
    title: 'Whole-house vs point-of-use: a decision tree',
    description:
      'Two treatment patterns, very different costs and right-fits. When per-bathroom works, when whole-house works, and how the survey decides.',
    publishedAt: '2026-08-21',
    readingMinutes: 5,
    category: 'Decision',
    lede: 'There are two basic patterns for treating water in an Indian home. Point-of-use means installing a small system at each tap or bathroom that needs treatment — a bathroom filter under the vanity, a kitchen RO at the sink. Whole-house means a single inlet system that treats every drop entering the home, distributed through the existing plumbing. The right choice depends on the home, the chemistry, and the bathrooms.',
    body: [
      { type: 'h2', text: 'Point-of-use: when it fits' },
      { type: 'p', text: 'Point-of-use treatment is the right answer for a one or two-bedroom apartment with a single problem location — usually the master bathroom — and a separate kitchen drinking-water need. Total system cost runs ₹30,000 to ₹70,000 for a BathSoft Mono or Duo plus a kitchen RO. Installation is fast, requires no plumbing-route changes, and disrupts no finished interior.' },
      { type: 'p', text: 'The pattern stops working when the home has multiple bathrooms. A three-bathroom flat with hard-water symptoms across all three needs three bathroom filters — and three monthly service relationships. The economics flip somewhere around bathroom three. At four bathrooms, whole-house treatment is unambiguously cheaper across the system\'s lifetime, even before counting service complexity.' },
      { type: 'h2', text: 'Whole-house: when it fits' },
      { type: 'p', text: 'Whole-house treatment is the right answer for any home with four or more bathrooms, any home with appliances connected to the central plumbing (washing machines, dishwashers, garden taps), and any home where the homeowner wants softened water at every tap rather than just the bathrooms. Total system cost runs ₹50,000 to ₹3,00,000 for a HomeSoft 2K to 6K LPH four-stage train.' },
      { type: 'p', text: 'The argument for whole-house is not just the bathrooms. It is the dishwasher, the washing machine, the garden tap, the kitchen utility sink — every appliance and tap downstream of the inlet inherits softened, filtered water. Geyser scaling slows. Washing machine cycles shorten. CP fittings everywhere last longer. The single point of service is also a single AMC relationship rather than three to five separate ones.' },
      { type: 'h2', text: 'The grey zone' },
      { type: 'p', text: 'A two-to-three bathroom flat with hard water but no iron and no drinking-water issue sits in the grey zone. The decision usually comes down to two questions: are appliances showing wear? and is there a third bathroom likely to be added or refinished in the next five years? Yes to either, whole-house. No to both, per-bathroom is fine.' },
      { type: 'pullquote', text: 'Per-flat point-of-use systems mean per-flat service. One inlet means one contract. For multi-bathroom homes, that is the right design.' },
      { type: 'h2', text: 'How the survey decides' },
      { type: 'p', text: 'A free site survey runs the water test, counts the bathrooms and the appliance load, walks the plumbing routes, and identifies install locations. The recommendation that follows is grounded in three numbers — feed-water chemistry, peak household draw, available install space — not in a catalogue tier. Two homes with identical bathroom counts often end up with different recommendations because the chemistry or the plumbing forces different answers. The survey is where the design happens. The catalogue is where the budget gets confirmed.' },
    ],
  },
  {
    slug: 'inside-your-monthly-service-report',
    title: 'What\'s actually in your monthly service report',
    description:
      'Before, On site, After of a real Uniwater service visit — parameters logged, work performed, what "flag raised" means. The discipline of year four.',
    publishedAt: '2026-09-04',
    readingMinutes: 5,
    category: 'Service',
    lede: 'A Uniwater monthly service visit produces a single-page PDF that lands in the customer\'s inbox by the end of the same day. Most homeowners read it for the first one and then file the rest. The numbers in it, read across twelve months, are the most accurate picture of a home\'s water chemistry that any source produces. They are also the evidence that the system is doing what it was specified to do.',
    body: [
      { type: 'h2', text: 'Before' },
      { type: 'p', text: 'Before the visit, the customer gets a WhatsApp message twenty-four hours ahead. Date. Window. Engineer name. The visit happens when promised. If the customer flags a specific concern in reply — slow flow at one shower, salt re-fill anxiety, a stain that appeared since the last visit — the engineer arrives knowing about it. This is the half of service that homeowners do not usually notice until they have lived with a service company that does not do it.' },
      { type: 'h2', text: 'On site' },
      { type: 'p', text: 'The on-site protocol is the same every visit. The engineer takes a feed-water sample at the inlet and a treated-water sample at a downstream tap. Both run through the test kit: TDS, hardness, iron, pH, free residual chlorine. The numbers go onto the tablet against the design specification for the system. Anything out of range is flagged in the report — not in code, in plain language.' },
      { type: 'p', text: 'After parameter testing, the engineer runs through the maintenance checklist. Backwash verification (cycles ran as scheduled, drain ran clean). Salt top-up (residual quantity weighed, refill added, amount logged). Resin inspection (capacity remaining estimated against months-since-last-regeneration). Leak check (every joint between inlet and outlet, visual). Pressure-gauge readings inlet and outlet. Internal cabinet inspection for moisture or corrosion.' },
      { type: 'p', text: 'Where applicable — for systems with iron pre-treatment, carbon, or UV — the engineer also checks media remaining capacity, lamp hours on the UV, and cartridge condition. Each gets a line in the report.' },
      { type: 'h2', text: 'After' },
      { type: 'p', text: 'The report is generated and sent the same day. It carries the customer\'s install ID, the engineer\'s signed name, the date, the parameter readings (in and out, against spec), the maintenance actions performed, any flags raised, and the next scheduled visit date. The customer\'s archive grows by one PDF every month.' },
      { type: 'p', text: 'Across twelve months, that archive becomes a remarkable thing. Hardness in vs hardness out, charted across the year, tells the story of the resin\'s aging. Iron, charted, reveals seasonal shifts in the borewell. A flag raised in month seven that resolves in month eight is the visible record of a problem caught early and fixed before the customer noticed.' },
      { type: 'pullquote', text: 'A documented report, same day. Parameters in. Parameters out. Work performed. Flags raised. The customer keeps the record. So do we.' },
      { type: 'h2', text: 'What "flag raised" actually means' },
      { type: 'p', text: 'A flag is a specific phrase that means "this parameter is outside the design specification, and we are doing something about it within the SLA." It is not an alarm. It is the system\'s early-warning channel. Common flag types include resin approaching exhaustion (replacement scheduled), iron breakthrough (media regeneration accelerated), pressure drop below threshold (cleaning or component check scheduled). Comprehensive AMC commits to twenty-four-hour response on any flagged fault; Premium AMC commits to twelve.' },
      { type: 'p', text: 'A homeowner who has read every monthly report for three years can usually point to the month when the resin first started showing wear, the season when the borewell\'s iron load shifted, the year the dishwasher\'s feed pressure stabilised. None of this is information that any other water supplier provides. It is the discipline that decides year four.' },
    ],
  },
  {
    slug: 'amc-tiers-honestly',
    title: 'AMC tiers, honestly explained',
    description:
      'Standard quarterly. Comprehensive monthly. Premium monthly with priority. What each tier includes, what it costs, why monthly service compounds.',
    publishedAt: '2026-09-18',
    readingMinutes: 5,
    category: 'Service',
    lede: 'Most water companies in India offer one AMC tier and charge per service visit. Uniwater offers three tiers and prices them honestly against what each one delivers. The decision between tiers is not aspirational — it is a question of what the home\'s water chemistry and the customer\'s service expectations actually need.',
    body: [
      { type: 'h2', text: 'Standard — quarterly' },
      { type: 'p', text: 'The Standard tier ships with four scheduled preventive visits a year. Each visit follows the full Before / On site / After protocol — parameter testing, media inspection, salt top-up, pressure check, written report. Between visits, the customer has on-call response with a forty-eight-hour SLA on flagged faults.' },
      { type: 'p', text: 'Standard is the right tier for low-load installations on stable water chemistry. A 1 to 2 BHK apartment on treated municipal supply with no iron, moderate hardness, and a single bathroom-level filter does not need more than quarterly attention. Standard delivers the operational discipline without paying for capacity the system does not consume.' },
      { type: 'h2', text: 'Comprehensive — monthly' },
      { type: 'p', text: 'The Comprehensive tier is twelve scheduled visits a year. Same protocol, more frequent. Media replacement happens on schedule rather than on complaint. Salt and resin top-ups are included rather than charged separately. The SLA on flagged faults tightens to twenty-four hours.' },
      { type: 'p', text: 'Comprehensive is the right tier for borewell-fed homes, any system with iron pre-treatment, any system with variable supply, and any home where the homeowner wants the relationship to be invisible. Most premium residential customers select Comprehensive. The marginal cost over Standard pays for itself in caught-early flags that would otherwise become household disruptions.' },
      { type: 'h2', text: 'Premium — monthly plus priority' },
      { type: 'p', text: 'The Premium tier is Comprehensive plus a named engineer for the contract life, a customer dashboard with parameter trends, a twelve-hour SLA on flagged faults, and an annual independent water analysis at the end of each contract year.' },
      { type: 'p', text: 'Premium is the right tier for institutions, large complexes, and customers who treat their water as infrastructure rather than utility. Hospitals, hotels, and large villas usually run Premium because their water is part of the operational baseline they cannot afford to have drift quietly.' },
      { type: 'pullquote', text: 'Monthly preventive service lives in Comprehensive and Premium. Standard gets quarterly. We promise what we can scale.' },
      { type: 'h2', text: 'Why monthly matters' },
      { type: 'p', text: 'The difference between quarterly and monthly service is not the frequency — it is the granularity of the parameter record. Quarterly gives four data points a year. Monthly gives twelve. With four data points, a slow drift in resin capacity or a seasonal iron spike is often not visible until the symptoms have appeared at the tap. With twelve, the same drift shows up at month five and gets fixed by month six, before the homeowner ever notices.' },
      { type: 'p', text: 'The compounding effect of monthly service across a decade is what produces a fifteen-year system instead of a five-year one. It is also what produces a customer relationship that the homeowner does not have a reason to evaluate alternatives for. That is the moat. That is the discipline that decides year four.' },
    ],
  },
  {
    slug: 'remineralisation-after-ro',
    title: 'Re-mineralisation after RO: why it matters',
    description:
      'RO strips everything. Re-mineralisation adds back what the body and the taste need. The post-RO stage that turns flat water into real water.',
    publishedAt: '2026-10-02',
    readingMinutes: 4,
    category: 'Chemistry',
    lede: 'Reverse osmosis is the strongest residential treatment available. The membrane removes ninety-six to ninety-nine percent of dissolved minerals, all detectable bacteria, most viruses, and essentially every chemical contaminant of household concern. The water it produces is exceptionally clean. It is also, without correction, exceptionally flat-tasting and missing minerals the body uses.',
    body: [
      { type: 'h2', text: 'What RO strips' },
      { type: 'p', text: 'A reverse-osmosis membrane works by pressure-pushing water through a semipermeable layer that blocks particles, dissolved salts, and organic molecules above a certain size. The water that comes through carries roughly one to four percent of the original dissolved solids. Hardness drops to near zero. TDS, in most residential installations, drops from feed levels of 300 to 800 ppm down to 20 to 60 ppm.' },
      { type: 'p', text: 'The minerals that get removed are not just inconvenient hardness. They are calcium, magnesium, potassium — minerals the body uses, in trace quantities, from drinking water. They are also the minerals that give water its taste. Below about 80 ppm TDS, water starts to taste flat. Below 50, it tastes empty.' },
      { type: 'h2', text: 'What re-mineralisation does' },
      { type: 'p', text: 'A re-mineralisation cartridge sits downstream of the RO membrane and adds back a controlled, small quantity of calcium and magnesium. The output TDS comes up to a comfortable 100 to 150 ppm — well within drinking range, well within taste range, and with the dietary minerals the body expects from water.' },
      { type: 'p', text: 'The cartridge is small, low-pressure, and inexpensive. It does not add chemicals. It uses calcium carbonate beads that slowly dissolve as water passes; the dissolution rate is metered by the contact time and the cartridge\'s internal structure. Replacement is annual or bi-annual depending on water volume.' },
      { type: 'h2', text: 'Why it matters' },
      { type: 'p', text: 'Two reasons. The first is taste — RO water without re-mineralisation tastes noticeably worse than tap water. Most homeowners do not stay loyal to a system that produces water they do not enjoy drinking, even if the chemistry is technically purer. The second is corrosion: very-low-TDS water is mildly aggressive on metal plumbing downstream of the unit. Re-mineralised water sits in a more stable range.' },
      { type: 'pullquote', text: 'Re-mineralised. Doesn\'t taste flat. The cartridge is small. The difference is large.' },
      { type: 'h2', text: 'What to ask' },
      { type: 'p', text: 'When evaluating a kitchen RO, two questions matter. Does the unit include a re-mineralisation stage as standard? And is the output TDS controlled to a target range, or is it just whatever the membrane produces? A well-engineered residential RO targets 80 to 150 ppm output. A unit that produces 20 ppm and considers that a feature has misunderstood what residential drinking water is for.' },
    ],
  },
  {
    slug: 'premium-fittings-slow-disaster',
    title: 'Premium fittings on un-treated water: a slow disaster',
    description:
      'Hansgrohe, Kohler, Grohe — engineered for a feed-water spec most Indian residential supply does not meet. What goes wrong, and when.',
    publishedAt: '2026-10-16',
    readingMinutes: 4,
    category: 'Voice',
    lede: 'The premium-fittings market in India has grown faster than the residential water-treatment market for ten years. The result is a generation of premium bathrooms — Hansgrohe, Grohe, Kohler, Hansa — installed on borewell water, on hard municipal supply, on whatever the building plumbing delivers. The fittings are right. The water is wrong. The disaster is slow, and it is everywhere.',
    body: [
      { type: 'p', text: 'A homeowner who has chosen a Hansgrohe Axor shower is making an aesthetic statement about how the bathroom should feel. The decision involves trade-offs that are obvious — the price, the assembly time, the importation logistics — and one that is not obvious: the water the fitting is going to live on. Every premium fitting manufacturer ships products engineered for a feed-water envelope. Most Indian residential supply sits outside it.' },
      { type: 'h2', text: 'The first eighteen months' },
      { type: 'p', text: 'For the first eighteen months, the fitting performs as expected. Chrome stays bright. Cartridge moves smoothly. Shower head delivers an even spray. The homeowner is happy. The architect is congratulated. The mineral deposit is invisible to the eye and not yet noticeable in flow rate.' },
      { type: 'p', text: 'Underneath, the chemistry is already at work. Calcium and magnesium are depositing on every wetted internal surface — the shower head\'s jets, the cartridge\'s sealing surfaces, the rubber gaskets at every joint. The deposit is microns thick at six months, tens of microns at a year, visible to the naked eye by month eighteen.' },
      { type: 'h2', text: 'Year two: the cosmetic phase' },
      { type: 'p', text: 'In year two, the cosmetic phase begins. The chrome at high-splash zones dulls a half-shade. The shower head\'s spray becomes very faintly uneven. The lever stiffens by a barely-perceptible amount. The homeowner notices only on close inspection or when comparing against a photo from installation. The architect, if asked, will usually explain it as "patina" — which it is not. Patina is the predictable, intended ageing of bronze or copper. This is mineral deposit.' },
      { type: 'h2', text: 'Year three: the functional phase' },
      { type: 'p', text: 'In year three, function starts to slip. The shower head\'s flow rate measurably drops as scale narrows the jets. The diverter develops a slow drip when off — the rubber seal hardened by cumulative chlorine exposure. The Hansgrohe cartridge, scaled internally, starts to require more force to move. The first replacement part order goes in.' },
      { type: 'pullquote', text: 'The fittings are right. The water is wrong. The disaster is slow, and it is everywhere.' },
      { type: 'h2', text: 'What the architect should have known' },
      { type: 'p', text: 'The decision to treat the water is most cheaply made before tile. A whole-house treatment system installed during the build adds a few percent to the bathroom budget and brings every tap inside the spec envelope of the fittings being installed. The same decision made post-tile — once the fittings are showing wear — costs the same in the system plus the replacement parts that have already aged out.' },
      { type: 'p', text: 'No premium-fittings brand will tell you their products fail on Indian water. They will, if asked, point at the feed-water specification page in the manual and explain that performance is conditional on the spec being met. The architect\'s job, increasingly, is to coordinate the water treatment as carefully as they coordinate the fitting selection. The two decisions are one decision.' },
    ],
  },
  {
    slug: 'can-hard-water-cause-hair-fall',
    title: 'Can hard water cause hair fall? What the science actually says',
    description:
      'Hard water doesn\'t cause baldness — but hard, iron-rich water weakens and roughens hair until it breaks. What the evidence shows, the warning signs, and how to fix it at the source.',
    publishedAt: '2026-06-09',
    readingMinutes: 7,
    category: 'Chemistry',
    lede: 'Hair that has started to feel rough, dull and brittle — and more strands in the drain than there used to be — usually sends people to a new shampoo, a diet change, or the dermatologist. One suspect rarely gets tested: the water coming out of the taps. The honest answer is narrower than the internet\'s, and worth getting right.',
    body: [
      { type: 'p', text: 'Start with what hard water does not do. On its own, it does not cause baldness. True hair loss is driven by genetics, hormones, thyroid and nutrition — not by the water you wash in. What hard and iron-rich water does do, and what the evidence actually supports, is weaken the hair shaft, roughen its surface, and leave it far more prone to breakage and shedding. Over months, that breakage looks and feels exactly like hair fall. The distinction matters, because it decides whether treating your water will help.' },
      { type: 'h2', text: 'What "hard water" means here' },
      { type: 'p', text: 'Hard water carries a high load of dissolved minerals — calcium and magnesium, and across the borewell belts of eastern and suburban India, iron and manganese as well. Hardness is measured as calcium carbonate: below 60 ppm is soft, 60 to 120 moderately hard, 120 to 180 hard, above 180 very hard. Most borewell-fed homes in Kolkata, Bhubaneswar, Ranchi and the Terai run well past 250 ppm — and carry dissolved iron on top of it.' },
      { type: 'p', text: 'The Bureau of Indian Standards sets the acceptable limit for iron in drinking water at 0.3 ppm. Untreated borewell supply routinely runs several times higher. That is the water reaching the shower head every morning.' },
      { type: 'h2', text: 'What the water does to hair' },
      { type: 'p', text: 'The research here is honest about its own limits — most of it tests hair strands in a lab rather than living follicles, so it shows what the water does to the hair, not to the growth process. But the pattern is consistent. Strands washed in hard water lose tensile strength: they snap under less force than strands washed in soft water. Wash hair in hard water for a month and it ends up measurably thinner, rougher and coated with mineral deposit.' },
      { type: 'p', text: 'The mechanism is not dramatic. Minerals settle on the cuticle, the cuticle stops lying flat, the strand loses moisture and elasticity, and weakened hair breaks when you comb, tie or towel it. Iron adds its own signature — the same orange residue that stains the basin clings to hair, dulling it and leaving treated or lighter hair looking brassy after a wash.' },
      { type: 'pullquote', text: 'Hard water doesn\'t make hair fall out. It makes hair break — and over months, breakage is hard to tell apart from hair fall.' },
      { type: 'h2', text: 'The scalp' },
      { type: 'p', text: 'The same deposits settle on the scalp, disrupting its moisture barrier and leaving it dry, flaky and itchy. For most people that is an irritation. For anyone living with eczema, psoriasis or seborrheic dermatitis, hard water tends to make it worse — the minerals react with soap to leave a residue that aggravates sensitive skin. A persistently unhealthy scalp is not a good place to grow hair.' },
      { type: 'h2', text: 'How to tell it is the water' },
      { type: 'p', text: 'The signs show up around the house before they show up in the mirror:' },
      { type: 'list', items: ['Soap and shampoo that will not lather or rinse clean', 'Chalky white scale on taps, kettles, geysers and shower heads', 'Reddish or orange-brown stains on basins, tiles and the overhead tank', 'Skin that feels tight after a bath at home — but not when you travel'] },
      { type: 'p', text: 'On the hair itself: a rough, coated feel even after conditioner; more breakage and split ends; dull or fast-fading colour; a dry, itchy scalp. If any of this started after you moved house, or switched from municipal supply to a borewell, the water is the first thing to test — not the last.' },
      { type: 'h2', text: 'Is the damage reversible?' },
      { type: 'p', text: 'Usually, yes. Because hard and iron-rich water damages the hair shaft and the scalp environment rather than killing the follicle, healthy hair tends to return once the cause is removed — provided the follicles are intact and there is no medical reason behind the loss. The fix is upstream: treat the water, not the strand.' },
      { type: 'h2', text: 'What actually fixes it' },
      { type: 'p', text: 'The dependable fix is to stop hard, iron-laden water from reaching any tap in the first place. A whole-house system softens out the calcium and magnesium that roughen hair and scale fittings, and an iron-removal stage takes out the dissolved iron that stains and dulls. Order matters — iron is removed first, because it fouls softening resin if it reaches it untreated. Treating at the inlet protects hair, skin, the geyser, the washing machine and the fittings at once.' },
      { type: 'p', text: 'Shower-head filters help a little, but they treat one tap and clog fast against the iron loads common in our region. Between treatments, a weekly clarifying wash with a chelating agent (EDTA or citric acid on the label) lifts mineral residue, a diluted lemon or vinegar rinse dissolves light buildup, and shorter, cooler showers spare the scalp its natural oils. These manage the symptom. The water is the cause.' },
      { type: 'p', text: 'This is the problem Uniwater is built around: we test your actual water first — hardness, iron and the rest — size the system to your readings rather than a catalogue, and service it monthly so it keeps performing.' },
      { type: 'h2', text: 'When it is not the water' },
      { type: 'p', text: 'Be honest about the bigger picture. A receding hairline, a thinning crown, or distinct bald patches is almost certainly not hard water — it points to genetic or hormonal hair loss, thyroid trouble, or iron-deficiency anaemia, several of which are very treatable. Clean, soft water gives you stronger hair and a calmer scalp; it will not reverse genetic balding. If the fall is heavy or sudden, see a dermatologist or trichologist. Think of water treatment as removing one avoidable source of damage — not as a cure for every kind of hair loss.' },
      { type: 'p', text: 'Which brings it back to the one number nobody checks: what is actually in your water. A water survey reads your hardness and iron before you spend a rupee on a fix — and tells you whether your taps are part of the problem in the first place.' },
    ],
  },
  {
    slug: 'best-water-treatment-company-kolkata',
    title: 'Why Uniwater is the best water treatment company in Kolkata',
    description:
      'Kolkata’s water treatment market is full of catalogue sellers moving the same off-the-shelf units. Here is what ‘best’ should actually be measured against — and where Uniwater stands on each measure.',
    publishedAt: '2026-10-30',
    readingMinutes: 6,
    category: 'Voice',
    lede: '‘Best’ is the word every water treatment company in Kolkata reaches for. It is also the word we are most reluctant to use without something to check it against. Here is the actual list of things that decide whether a company is right for a Kolkata home — survey discipline, treatment sequence, service cadence, real local work — and where Uniwater stands on each one.',
    body: [
      { type: 'p', text: 'Kolkata has no shortage of companies selling water softeners and iron filters. Ballygunge to Salt Lake, New Town to Behala, the pitch is largely the same: a catalogue unit, a price quoted before anyone has seen the water, and a relationship that stops at delivery. Calling one of them ‘the best’ is easy to say and hard to check. So rather than assert it, here is what we think the claim should actually rest on — five measures, checked against how Uniwater is actually built to work in this city.' },
      { type: 'h2', text: 'The water itself decides more than the brand does' },
      { type: 'p', text: 'Kolkata runs on two different water chemistries, and the right system depends on which one a given address sits on. Central Kolkata — Park Street, Alipore, Ballygunge, Hindustan Park — is largely KMC-treated municipal supply, where iron is usually within limits and the lived problem is mild hardness and the occasional chlorine taste. Cross the EM Bypass into Salt Lake, New Town, Rajarhat, or the Behala stretch, and the picture changes: borewell-fed supply commonly carries 0.5–3.5 ppm dissolved iron — several times the BIS aesthetic limit of 0.3 ppm — on top of climbing hardness and TDS. A system sized for one chemistry is the wrong system for the other. A company quoting the same unit for both has not looked at the water. It has looked at the address.' },
      { type: 'h2', text: 'Measure one: does the quote come before or after the water test?' },
      { type: 'p', text: 'Every Uniwater quote follows a free on-site survey — hardness, iron, TDS, pH, and chlorine tested at the tap, not assumed from the postcode. The reading sizes the system; the system decides the price. That is slower than handing over a catalogue and a number. It is also the only way a whole-house train does not fail in month eight because it was sized for a different Kolkata than the one at that address.' },
      { type: 'h2', text: 'Measure two: does iron come before softening?' },
      { type: 'p', text: 'On a borewell-fed Kolkata home, a softener installed without iron pre-treatment loses roughly half its resin capacity within a year — dissolved iron coats the beads, and the softener stops softening long before the AMC contract says it should. The correct sequence is iron filter first, softener second, and it is the same sequence whether the job is a single flat in Rajarhat or the inlet plant for an entire apartment block. A company that sells a softener without asking about iron is selling the wrong half of the system.' },
      { type: 'h2', text: 'Measure three: what does ‘engineered’ actually look like on the ground here?' },
      { type: 'p', text: 'The clearest answer is a Kolkata building we have already done this on. Acasa, a premium residential development by the Malani Group, needed one water standard across every flat rather than a separate point-of-use filter and service contract per unit. Uniwater installed a single building-inlet plant — sediment, iron, carbon, softening — sized to peak draw across the block, with one AMC covering the whole building instead of one per flat. Every tap in every flat now reads under 30 ppm hardness, and Acasa’s project lead put it plainly: ‘Per-flat water systems were going to mean per-flat service. One inlet means one contract. That’s the right design.’ The same discipline runs through Saburi Plywood’s boiler-feed plant near Kolkata and Charnock Hospital’s ward-level drinking water — different scale, same method: survey, size, install, service.' },
      { type: 'pullquote', text: '‘Best’ that cannot point to a building it has actually done the work on is a claim, not a track record.' },
      { type: 'h2', text: 'Measure four: monthly, or only when something breaks?' },
      { type: 'p', text: 'Standard AMC brings four scheduled visits a year; Comprehensive and Premium bring twelve — an engineer at the door on a fixed schedule, not summoned after the geyser has already scaled or the resin has already exhausted. Every visit tests feed and treated water at the tap, checks the backwash cycle, tops up salt, inspects resin capacity, and sends a same-day report with the numbers logged against spec. Twelve data points a year catch a drifting parameter in month five; four data points, or none, catch it once it is already a stained basin. The parts carrying that schedule are named, not generic — Grundfos and Wilo pumps, ResinTech and Tulsion resin, Katalox and Hydranautics media — the same manufacturers specified into industrial plants, scaled down to a residential vessel.' },
      { type: 'h2', text: 'Measure five: is there enough of it to check?' },
      { type: 'p', text: 'Six years in Kolkata. Nine cities across India and Nepal now running the same survey-first method. Over a thousand homes serviced, and roughly 1,200 water surveys booked in the past twelve months alone — a number that comes off a CRM, not a round figure picked for a brochure. Uniwater Solutions Pvt Ltd carries a GSTIN and publishes it; the address at 316 Canal Street, Shribhumi is the same address on the survey booking, the AMC contract, and the GST filing. None of this is dramatic. It is the kind of detail that is only worth publishing if it is actually true.' },
      { type: 'h2', text: 'Check it yourself' },
      { type: 'p', text: 'None of the five measures above are unique to Uniwater as an idea — any water treatment company in Kolkata could, in principle, survey first, sequence iron before softening, name its component brands, and service monthly. Very few actually do all five. Before taking anyone’s word for ‘best’, including ours, it is worth asking each company under consideration:' },
      { type: 'list', items: ['Do they test your water before quoting, or quote from a catalogue?', 'Do they treat iron before softening on a borewell-fed supply — or sell a softener alone?', 'Can they point to a named building or business in Kolkata they have actually installed in?', 'Is service monthly and documented, or only when you call?', 'Will they tell you which resin, media, and pumps are actually inside the vessel?'] },
      { type: 'p', text: 'A company that answers all five honestly is doing the job properly, whether that company is Uniwater or not. We think we hold up on all five — book a free survey and the first one gets checked before you have spent a rupee.' },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}
