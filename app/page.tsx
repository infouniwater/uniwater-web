import { EditorialHero } from '@/components/sections/EditorialHero';
import { TrustStripe } from '@/components/sections/TrustStripe';
import { AudienceRouter } from '@/components/sections/AudienceRouter';
import { DayOneArc } from '@/components/sections/DayOneArc';
import { SensoryBeat } from '@/components/sections/SensoryBeat';
import { SymptomStrip } from '@/components/sections/SymptomStrip';
import { SolutionsOverview } from '@/components/sections/SolutionsOverview';
import { InstallationVersatility } from '@/components/sections/InstallationVersatility';
import { FourStepProcess } from '@/components/sections/FourStepProcess';
import { ProofSection } from '@/components/sections/ProofSection';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { CityGuides } from '@/components/sections/CityGuides';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FOUR_STEPS } from '@/content/education';
import { jsonLd, serviceSchema } from '@/lib/structured-data';

/**
 * Homepage — restructured 2026-05-21 per the homepage-only brief (Rajat).
 *
 * Earlier version had ~14 sections doing the work of an entire site on
 * one page. New shape (now 10 sections) cuts most of that, with the
 * audience picker promoted to position 3 (it's the strongest piece of
 * writing on the page). Sections that left the homepage moved to
 * logical interior pages — nothing was deleted from the codebase.
 *
 *  1. Hero — wellness tagline H1 + audience-naming H2 + two CTAs
 *  2. Trust stripe — 200+ homes · 9 cities · 3+ years · surveys last 12 months
 *  3. Audience router — promoted, "Pick the sentence that sounds like you"
 *  4. Day One arc — cost-of-cheap-water timeline
 *  5. Solutions overview — what we install (3 home + 2 commercial)
 *  6. Installation versatility — five photographed install locations.
 *     Re-added 2026-05-22 per Rajat: "add places we have installed in
 *     hidden spaces section in homepage". Sits between Solutions (what)
 *     and Process (how) so the visitor sees WHERE the system goes
 *     before they read about delivery.
 *  7. Four-step process — survey · design · install · service
 *  8. Proof — selected clients (logo wall)
 *  9. Cities — operating footprint
 * 10. Final CTA — page closes straight into it (composite quote
 *     removed 2026-05-22, see Part 5.3 note below).
 *
 * Sections moved off the homepage (still in the codebase):
 *   - ProblemGrid              → /water-problem-checker (above the form)
 *   - ComparisonBlock          → /why-uniwater
 *   - ServiceSection           → /service
 *   - ToolsSection             → removed (already linked from AudienceRouter)
 *   - EditorialLede            → removed (one-paragraph bridge no longer needed)
 *   - PincodeCheck             → removed from home (still rendered on
 *                                /residential and /industrial)
 */
export default function HomePage() {
  const homeService = serviceSchema({
    name: 'Engineered home water — survey, design, install, service',
    description:
      'Uniwater surveys, designs, installs, and monthly-services whole-house, bathroom, and drinking-water systems. The same team owns the system from first water test onward.',
    url: '/',
    steps: FOUR_STEPS.map((step) => ({
      name: step.title.replace(/\.$/, ''),
      text: step.body,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeService) }}
      />
      {/* 1. Hero */}
      <EditorialHero />
      {/* 2. Stats strip */}
      <div id="trust-strip">
        <TrustStripe />
      </div>
      {/* 2b. Sensory beat — the felt layer before the engineering argument */}
      <SensoryBeat />
      {/* 2c. Symptom-led self-diagnosis → routes into the 60-second checker */}
      <SymptomStrip />
      {/* 3. Audience picker — promoted from former position 4 */}
      <AudienceRouter />
      {/* 4. Cost-of-cheap-water timeline */}
      <DayOneArc />
      {/* 5. What we install */}
      <SolutionsOverview />
      {/* 6. Where we install — five hidden-install locations */}
      <InstallationVersatility />
      {/* 7. Process */}
      <FourStepProcess id="how-it-works" />
      {/* 8. Selected clients */}
      <ProofSection />
      {/* 9. Cities */}
      <CitiesSection />
      {/* 9b. City guides -- pillar pages, currently Kolkata iron. Data-
              driven; future Guwahati / Noida / Salt Lake pillars append
              to the array in CityGuides.tsx with no markup change. */}
      <CityGuides />

      {/* Composite homeowner pull-quote previously rendered here was removed
          2026-05-22 per Part 5.3 of the homepage-restructure-2 brief.
          Reasoning: the prior attribution ("Composite, based on residential
          install-handover feedback") reads as "we made this up from real
          feedback" and hurts trust more than it helps. Real testimonials
          exist in content/case-studies.ts but they're all B2B-operations-
          toned (hospital, plywood, steel plant) — they would tonally clash
          with the homepage's residential-wellness pitch. Until a real
          residential testimonial lands from the post-install review-
          collection flow, the page closes directly into the final CTA. */}

      {/* 10. Final CTA */}
      <FinalCTA />
    </>
  );
}
