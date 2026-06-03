/**
 * System selector — replaces SVG-005 (public/images/infographics/
 * comparison-tree.svg).
 *
 * The SVG version had two layout bugs that were impossible to fix in
 * place: (1) hand-coded y-offsets between text lines were smaller than
 * the font size, so multi-line headings and the italic "below this need"
 * paragraphs overlapped each other; (2) the branch columns were fixed
 * at 528px wide, so any copy edit that ran longer than that overflowed.
 *
 * This native component uses CSS grid (3 columns desktop, 1 column
 * mobile) with auto-wrapping text — copy can change freely without any
 * positioning maintenance.
 */

interface Leaf {
  product: string;
  detail: string;
}

interface SubFork {
  label: string;
  body: string;
  leaves: Leaf[];
}

interface Branch {
  num: string;
  heading: string;
  tag: string;
  subForks: SubFork[];
  below: { cat: string; body: string };
}

const BRANCHES: ReadonlyArray<Branch> = [
  {
    num: '01',
    heading: 'Drinking water only',
    tag: 'The kitchen tap. The water people drink, not the water they shower in.',
    subForks: [
      {
        label: 'One family, one kitchen',
        body: 'Test the TDS first.',
        leaves: [
          { product: 'UF + UV', detail: 'Below 200 ppm. Pathogens go, minerals stay.' },
          { product: 'Test & consult', detail: '200–500 ppm. Borderline.' },
          { product: 'RO + UV', detail: 'Above 500 ppm. Borewells. Mineral correction.' },
        ],
      },
      {
        label: 'Centralised drinking for an office, school, hotel, hospital',
        body: 'Daily volume decides the system.',
        leaves: [
          { product: 'Centralised RO', detail: '25 / 50 / 100 LPH for institutions.' },
          { product: 'Commercial RO', detail: '500 to 50,000 LPH for large supply.' },
        ],
      },
    ],
    below: {
      cat: 'Point-of-use cartridge filters',
      body:
        'e.g. tap-mount and shower-head filters on Amazon (₹1K–4K). They don’t reduce TDS or hardness; they sequester it. DIY install, 6-month cartridge swap. Honest about what they can’t do.',
    },
  },
  {
    num: '02',
    heading: 'Whole bathroom, whole house',
    tag: 'Soft water at every shower, every sink, every appliance.',
    subForks: [
      {
        label: 'One bathroom — high demand or visible install',
        body: 'Sized to the bathroom’s load.',
        leaves: [
          { product: 'BathSoft Mono', detail: 'Single shower. Standard CP.' },
          { product: 'BathSoft Duo', detail: 'Rain shower + jets, or two together.' },
          { product: 'BathSoft Trio', detail: 'Steam, jacuzzi, multiple outlets.' },
        ],
      },
      {
        label: 'Whole house — villa, multi-bath, borewell or variable supply',
        body: 'Sediment → iron → carbon → softener. Sized to the home.',
        leaves: [
          { product: 'HomeSoft 2K', detail: '3–4 bathrooms.' },
          { product: 'HomeSoft 4K', detail: '5–6 bathrooms, small villas.' },
          { product: 'HomeSoft 6K', detail: 'Large villas, duplexes.' },
        ],
      },
    ],
    below: {
      cat: 'Mass-market residential softeners',
      body:
        'e.g. dealer-sold ion-exchange softeners from large home-appliance brands (₹15K–60K). Real softening. Service depends on the dealer. Often not tuned for borewell-fed homes or multi-stage treatment.',
    },
  },
  {
    num: '03',
    heading: 'A building, a hotel, a hospital, a complex',
    tag: 'Every flat, every room, every floor. Treated once, at the inlet.',
    subForks: [
      {
        label: 'Sized for the load',
        body: 'Specified after site survey and water analysis.',
        leaves: [
          { product: 'WTP 8K', detail: 'Small complexes, mid-rise. Boutique hotels.' },
          { product: 'WTP 12K', detail: 'Mid-size societies, schools. Hospitals to 100 beds.' },
          { product: 'WTP 18K', detail: 'Large complexes, hospitality. Mid-size institutions.' },
          { product: 'WTP 24K', detail: 'Large mixed-use, large hotels. Campuses.' },
          { product: 'WTP 30K', detail: 'Industrial campuses, multi-block developments.' },
        ],
      },
    ],
    below: {
      cat: 'Local plumbing contractor with generic vessels',
      body:
        'Works if your in-house plant team will own service, resin, salt, and consumables for fifteen years. Stops working when the team turns over.',
    },
  },
];

function LeafCard({ leaf }: { leaf: Leaf }) {
  return (
    <div className="border-l-[3px] border-teal bg-offwhite px-4 py-3 border-y border-r border-hairline">
      <div className="text-body font-bold text-navy leading-tight">{leaf.product}</div>
      <div className="text-caption text-navy/80 leading-snug mt-1">{leaf.detail}</div>
    </div>
  );
}

function SubForkBlock({ sub }: { sub: SubFork }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-teal mb-2">
          Sub-fork
        </div>
        <h4 className="text-body font-normal text-navy leading-snug">{sub.label}</h4>
        <p className="text-caption text-mute leading-snug mt-1">{sub.body}</p>
      </div>
      <div className="flex flex-col gap-2">
        {sub.leaves.map((leaf, i) => (
          <LeafCard key={i} leaf={leaf} />
        ))}
      </div>
    </div>
  );
}

function BranchColumn({ branch }: { branch: Branch }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-teal mb-2">
          Branch {branch.num}
        </div>
        <h3 className="font-sans text-h3 font-normal text-navy leading-tight">{branch.heading}</h3>
        <p className="font-editorial italic text-body text-navy/70 leading-snug mt-2">
          {branch.tag}
        </p>
        <div className="h-px w-9 bg-teal mt-4" />
      </div>
      <div className="flex flex-col gap-7">
        {branch.subForks.map((sub, i) => (
          <SubForkBlock key={i} sub={sub} />
        ))}
      </div>
      <div className="mt-auto pt-5 border-t border-hairline">
        <div className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-mute mb-2">
          Below this need
        </div>
        <div className="text-body font-normal text-navy leading-snug mb-2">
          {branch.below.cat}
        </div>
        <p className="font-editorial italic text-caption text-mute leading-snug">
          {branch.below.body}
        </p>
      </div>
    </div>
  );
}

export function SystemSelectorTree() {
  return (
    <div>
      {/* Root question — card-style header above the three branches */}
      <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto border border-hairline bg-offwhite px-6 py-5 sm:px-8 sm:py-6">
        <div className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-teal mb-2">
          The root question
        </div>
        <div className="text-h2-m md:text-h2 font-normal text-navy leading-tight">
          What does your water need treated?
        </div>
      </div>

      {/* 3 branches — vertical stack on mobile, 3 columns on tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
        {BRANCHES.map((branch) => (
          <BranchColumn key={branch.num} branch={branch} />
        ))}
      </div>
    </div>
  );
}
