import { EditorialHero } from '@/components/sections/EditorialHero';
import { TrustStripe } from '@/components/sections/TrustStripe';
import { PincodeCheck } from '@/components/ui/PincodeCheck';
import { Section } from '@/components/ui/Section';
import { AudienceRouter } from '@/components/sections/AudienceRouter';
import { InstallationVersatility } from '@/components/sections/InstallationVersatility';
import { EditorialLede } from '@/components/sections/EditorialLede';
import { DayOneArc } from '@/components/sections/DayOneArc';
import { ProblemGrid } from '@/components/sections/ProblemGrid';
import { FourStepProcess } from '@/components/sections/FourStepProcess';
import { SolutionsOverview } from '@/components/sections/SolutionsOverview';
import { ComparisonBlock } from '@/components/sections/ComparisonBlock';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FOUR_STEPS } from '@/content/education';
import { jsonLd, serviceSchema } from '@/lib/structured-data';

/**
 * Homepage — 15-section sequence, ordered to lead with the brand's strongest
 * USP (installation versatility — "the system disappears") immediately after
 * the trust stripe and audience routing. Repetition between TrustStripe and
 * ProofSection eliminated: TrustStripe carries the headline numbers, Proof
 * is now the named-client wall.
 *
 *  1. Hero — positioning + pricing anchor + residential pull-quote
 *  2. Trust stripe — 200+ homes · 9 cities · 3+ years · surveys this month
 *  3. Audience router — pick the sentence that sounds like you
 *  4. Installation versatility — PROMOTED. The USP: the system disappears
 *  5. Editorial lede — bridge
 *  6. Day One vs 18 months vs 10 years — three-column timeline
 *  7. Problem grid — meet them at the symptom
 *  8. Four-step process — survey · design · install · service
 *  9. Solutions overview — what we install
 * 10. Comparison — what most sellers do vs us
 * 11. Service section — inverse navy, "show up every month"
 * 12. Proof — named-client wall (no stats; TrustStripe has them)
 * 13. Cities — operating footprint
 * 14. Tools — self-serve
 * 15. Final CTA
 */
export default function HomePage() {
  const homeService = serviceSchema({
    name: 'Engineered home water — survey, design, install, service',
    description:
      'UNIWATER surveys, designs, installs, and monthly-services whole-house, bathroom, and drinking-water systems. The same team owns the system from first water test onward.',
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
      <EditorialHero />
      <TrustStripe />
      <Section padding="tight">
        <div className="max-w-3xl mx-auto">
          <PincodeCheck />
        </div>
      </Section>
      <AudienceRouter />
      <InstallationVersatility />
      <EditorialLede />
      <DayOneArc />
      <ProblemGrid />
      <FourStepProcess id="how-it-works" />
      <SolutionsOverview />
      <ComparisonBlock />
      <ServiceSection />
      <ProofSection />
      <CitiesSection />
      <ToolsSection />
      <FinalCTA />
    </>
  );
}
