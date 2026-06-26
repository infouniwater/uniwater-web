/**
 * Science Meter dataset — Uniwater's evidence-led verdicts on the water
 * technologies people ask about.
 *
 * Tiers use Uniwater's own names (Endorsed / Worth watching / Avoid), not the
 * competitor's Passed/Grey/Failed wording.
 *
 * `indicativeStudyVolume` strings are APPROXIMATE and flagged
 * `verifyBeforePublish: true`. They are rendered with a footnote and must NOT
 * be presented as exact citations or emitted into structured data.
 *
 * Hard rule: no mention of arsenic anywhere in this dataset.
 */

export type Tier = 'passed' | 'grey' | 'failed';
export type EvidenceStrength = 'strong' | 'moderate' | 'weak' | 'none';

export interface Technology {
  id: string;
  name: string;
  tier: Tier;
  /** Lower = shown first within its tier. */
  relevanceRank: number;
  whatItDoes: string;
  verdict: string;
  evidenceStrength: EvidenceStrength;
  /** Indicative only — never an exact citation. See verifyBeforePublish. */
  indicativeStudyVolume: string;
  verifyBeforePublish: boolean;
  uniwaterLink?: string;
}

/** Tier display metadata. Text + icon carry the meaning so tiers read without colour. */
export const TIER_META: Record<Tier, { label: string; icon: 'check' | 'eye' | 'cross'; note: string }> = {
  passed: { label: 'Endorsed', icon: 'check', note: 'The evidence supports it.' },
  grey: { label: 'Worth watching', icon: 'eye', note: 'Conditional — real in part, oversold in part.' },
  failed: { label: 'Avoid', icon: 'cross', note: 'The claims do not hold up.' },
};

/** Filter order for the chips: All, then the three tiers. */
export const TIER_ORDER: Tier[] = ['passed', 'grey', 'failed'];

export const EVIDENCE_LABEL: Record<EvidenceStrength, string> = {
  strong: 'Strong evidence',
  moderate: 'Moderate evidence',
  weak: 'Weak evidence',
  none: 'No credible evidence',
};

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'ro',
    name: 'Reverse Osmosis (RO)',
    tier: 'passed',
    relevanceRank: 1,
    whatItDoes: 'Pushes water through a semi-permeable membrane, leaving dissolved salts, heavy metals, and microbes behind.',
    verdict: 'The global standard for drinking water where TDS is high. We size it to your measured TDS rather than overselling it — over-purified water on low-TDS supply is its own problem, which is why we survey first.',
    evidenceStrength: 'strong',
    indicativeStudyVolume: 'Thousands of peer-reviewed papers; extensive clinical and field validation.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/drinking-water-solution',
  },
  {
    id: 'ion-exchange-softening',
    name: 'Ion-exchange softening (hardness)',
    tier: 'passed',
    relevanceRank: 2,
    whatItDoes: 'Swaps calcium and magnesium ions for sodium across a resin bed, removing the hardness that scales geysers and stiffens skin, hair, and laundry.',
    verdict: 'The correct, proven answer to hard water. The variable is engineering, not principle — resin grade, vessel sizing, and regeneration design decide whether it lasts. This runs inside HomeSoft and BathSoft.',
    evidenceStrength: 'strong',
    indicativeStudyVolume: 'Hundreds of papers; decades of industrial and domestic use.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/whole-house-water-filter',
  },
  {
    id: 'iron-oxidation-filtration',
    name: 'Oxidation + catalytic filtration (iron & manganese)',
    tier: 'passed',
    relevanceRank: 3,
    whatItDoes: 'Aerates or oxidises dissolved iron and manganese so they precipitate, then filters them out through catalytic media before the water reaches your taps.',
    verdict: 'The right treatment for the yellow-stain, orange-marble problem that dominates much of eastern India. Order matters: oxidation and iron removal must come before softening, or the resin fouls. This is core Uniwater engineering.',
    evidenceStrength: 'strong',
    indicativeStudyVolume: 'Well-established water-engineering literature and field practice.',
    verifyBeforePublish: true,
    uniwaterLink: '/kolkata-iron-water',
  },
  {
    id: 'activated-carbon',
    name: 'Activated carbon filtration',
    tier: 'passed',
    relevanceRank: 4,
    whatItDoes: 'Adsorbs chlorine, organic compounds, taste, and odour onto a high-surface-area carbon bed.',
    verdict: 'A quiet workhorse. Does exactly one job well and is a sensible stage in most multi-stage systems. Not a standalone answer to hardness or iron.',
    evidenceStrength: 'strong',
    indicativeStudyVolume: 'Extensive, long-settled literature.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/whole-house-water-filter',
  },
  {
    id: 'uv-disinfection',
    name: 'UV disinfection',
    tier: 'passed',
    relevanceRank: 5,
    whatItDoes: 'Uses ultraviolet light to inactivate bacteria and viruses without chemicals.',
    verdict: 'Effective for microbiologically unsafe but otherwise low-TDS supply. Needs clear water to work, so it sits after filtration, never instead of it.',
    evidenceStrength: 'strong',
    indicativeStudyVolume: 'Strong clinical and public-health evidence base.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/drinking-water-solution',
  },
  {
    id: 'ultrafiltration',
    name: 'Ultrafiltration (UF)',
    tier: 'passed',
    relevanceRank: 6,
    whatItDoes: 'A membrane with pores fine enough to block bacteria and cysts while leaving dissolved minerals in place.',
    verdict: 'A good fit where the water is low in dissolved salts and the risk is microbial, not chemical. We choose UF over RO when your TDS does not justify demineralising.',
    evidenceStrength: 'strong',
    indicativeStudyVolume: 'Established membrane-science literature.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/drinking-water-solution',
  },
  {
    id: 'remineralisation',
    name: 'Post-RO remineralisation',
    tier: 'passed',
    relevanceRank: 7,
    whatItDoes: 'Adds back a controlled amount of calcium and magnesium after RO to correct taste and balance.',
    verdict: 'Sound and worth specifying when RO is needed. It restores what aggressive purification strips. Real chemistry, not a marketing cartridge.',
    evidenceStrength: 'moderate',
    indicativeStudyVolume: 'Moderate but credible literature.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/drinking-water-solution',
  },
  {
    id: 'nanofiltration',
    name: 'Nanofiltration',
    tier: 'passed',
    relevanceRank: 8,
    whatItDoes: 'A membrane between UF and RO that removes hardness and larger organics while passing some monovalent salts.',
    verdict: "A real, useful technology for specific chemistries. Note: this is genuine nanofiltration — not 'nano water', which is an unrelated marketing term with no defined meaning.",
    evidenceStrength: 'moderate',
    indicativeStudyVolume: 'Solid membrane-engineering evidence.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/whole-house-water-filter',
  },
  {
    id: 'vitamin-c-shower-filter',
    name: 'Vitamin-C shower filters (chlorine)',
    tier: 'grey',
    relevanceRank: 9,
    whatItDoes: 'Neutralises chlorine at the showerhead using ascorbic acid.',
    verdict: 'Genuinely reduces chlorine for the length of one shower, which can help sensitive skin. But it does nothing for hardness or iron, and the cartridge depletes fast. A comfort add-on, not a water-treatment system.',
    evidenceStrength: 'moderate',
    indicativeStudyVolume: 'Limited but real evidence for chlorine neutralisation.',
    verifyBeforePublish: true,
  },
  {
    id: 'hydrogen-water',
    name: 'Hydrogen water',
    tier: 'grey',
    relevanceRank: 10,
    whatItDoes: 'Dissolves molecular hydrogen into water on antioxidant claims.',
    verdict: 'Early lab work is interesting; durable human evidence is not there yet, and the hydrogen escapes quickly. Worth watching, not worth budgeting for.',
    evidenceStrength: 'weak',
    indicativeStudyVolume: 'Growing but inconclusive human data.',
    verifyBeforePublish: true,
  },
  {
    id: 'copper-vessel',
    name: 'Copper vessels (Tamra Jal)',
    tier: 'grey',
    relevanceRank: 11,
    whatItDoes: 'Stores water in copper for mild antimicrobial effect.',
    verdict: 'A real cultural practice with a modest antimicrobial basis in small doses. It is not a treatment for hardness, iron, or unsafe supply, and excess copper is its own concern. Keep it as ritual, not infrastructure.',
    evidenceStrength: 'weak',
    indicativeStudyVolume: 'Small studies; cultural rather than clinical weight.',
    verifyBeforePublish: true,
  },
  {
    id: 'tds-mineral-cartridge',
    name: "Mineral / 'TDS controller' cartridges",
    tier: 'grey',
    relevanceRank: 12,
    whatItDoes: "Inline cartridges claiming to adjust minerals or 'enhance' RO output.",
    verdict: 'Quality varies enormously. Proper remineralisation is real; many bolt-on "mineral" cartridges are unverified. Judge the specific product, not the label.',
    evidenceStrength: 'weak',
    indicativeStudyVolume: 'Sparse independent testing.',
    verifyBeforePublish: true,
  },
  {
    id: 'magnetic-descaler',
    name: 'Magnetic / electronic descalers',
    tier: 'failed',
    relevanceRank: 13,
    whatItDoes: 'Clamps a magnet or coil onto the pipe and claims to stop scale without removing hardness.',
    verdict: 'No durable change to water chemistry. Independent trials do not reproduce the scale-reduction claims under real flow. We do not install these and would advise against paying for one.',
    evidenceStrength: 'none',
    indicativeStudyVolume: 'No credible supporting evidence.',
    verifyBeforePublish: true,
  },
  {
    id: 'hardness-shower-filter',
    name: 'Hardness-removing shower filters',
    tier: 'failed',
    relevanceRank: 14,
    whatItDoes: 'Showerhead cartridges claiming to soften water on the spot.',
    verdict: 'Too little media, too high a flow rate. They cannot exchange enough hardness ions in the seconds water passes through. For soft water at the shower you treat upstream, at the feed — which is what BathSoft does.',
    evidenceStrength: 'none',
    indicativeStudyVolume: 'No evidence of meaningful softening at shower flow.',
    verifyBeforePublish: true,
    uniwaterLink: '/solutions/bathroom-filter',
  },
  {
    id: 'alkaline-ionizer',
    name: 'Alkaline water / ionizers (pH-health claims)',
    tier: 'failed',
    relevanceRank: 15,
    whatItDoes: 'Electrically raises water pH on claims of changing body pH.',
    verdict: 'The body tightly regulates its own pH; drinking alkaline water does not override it. As a health technology it does not hold up. (Correcting genuinely acidic supply is a separate, legitimate engineering question.)',
    evidenceStrength: 'weak',
    indicativeStudyVolume: 'Claims unsupported by robust human evidence.',
    verifyBeforePublish: true,
  },
  {
    id: 'structured-water',
    name: "'Structured' / hexagonal water",
    tier: 'failed',
    relevanceRank: 16,
    whatItDoes: 'Claims to reorganise water into special clusters with health benefits.',
    verdict: 'No measurable molecular change, no mechanism, no reproducible benefit. Marketing language, not water treatment.',
    evidenceStrength: 'none',
    indicativeStudyVolume: 'No credible evidence.',
    verifyBeforePublish: true,
  },
  {
    id: 'quantum-water',
    name: "'Quantum' water devices",
    tier: 'failed',
    relevanceRank: 17,
    whatItDoes: "Uses the word 'quantum' to imply advanced treatment.",
    verdict: 'There is no defined physics or biology behind the term as marketed. If a seller cannot tell you the mechanism in plain language, that is your answer.',
    evidenceStrength: 'none',
    indicativeStudyVolume: 'No credible evidence.',
    verifyBeforePublish: true,
  },
  {
    id: 'gemstone-bottles',
    name: 'Crystal / gemstone bottles',
    tier: 'failed',
    relevanceRank: 18,
    whatItDoes: "Suspends gemstones in water for 'energetic' benefit.",
    verdict: 'Pleasant object, zero effect on water quality. Buy it as decor, not as treatment.',
    evidenceStrength: 'none',
    indicativeStudyVolume: 'No evidence.',
    verifyBeforePublish: true,
  },
];

/** Technologies in a given tier, ordered by relevanceRank ascending. */
export function technologiesByTier(tier: Tier): Technology[] {
  return TECHNOLOGIES.filter((t) => t.tier === tier).sort((a, b) => a.relevanceRank - b.relevanceRank);
}
