import { EditorialHero } from '@/components/sections/EditorialHero';
import { TrustStripe } from '@/components/sections/TrustStripe';
import { AudienceRouter } from '@/components/sections/AudienceRouter';
import { DayOneArc } from '@/components/sections/DayOneArc';
import { SolutionsOverview } from '@/components/sections/SolutionsOverview';
import { FourStepProcess } from '@/components/sections/FourStepProcess';
import { ProofSection } from '@/components/sections/ProofSection';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { Caption } from '@/components/ui/Typography';
import { FOUR_STEPS } from '@/content/education';
import { jsonLd, serviceSchema } from '@/lib/structured-data';

/**
 * Homepage — restructured 2026-05-21 per the homepage-only brief (Rajat).
 *
 * Earlier version had ~14 sections doing the work of an entire site on
 * one page. New shape cuts to 9 sections with the audience picker
 * promoted to position 3 (it's the strongest piece of writing on the
 * page). Sections that left the homepage moved to logical interior
 * pages — nothing was deleted from the codebase.
 *
 *  1. Hero — wellness tagline H1 + audience-naming H2 + two CTAs
 *  2. Trust stripe — 200+ homes · 9 cities · 3+ years · surveys this month
 *  3. Audience router — promoted, "Pick the sentence that sounds like you"
 *  4. Day One arc — cost-of-cheap-water timeline
 *  5. Solutions overview — what we install (3 home + 2 commercial)
 *  6. Four-step process — survey · design · install · service
 *  7. Proof — selected clients (logo wall)
 *  8. Cities — operating footprint
 *  9. Final CTA — preceded by an inline composite-quote pull
 *
 * Sections moved off the homepage (still in the codebase):
 *   - InstallationVersatility  → /solutions/bathroom-filter
 *   - ProblemGrid              → /water-problem-checker (above the form)
 *   - ComparisonBlock          → /why-uniwater
 *   - ServiceSection           → /service
 *   - ToolsSection             → removed (already linked from AudienceRouter)
 *   - EditorialLede            → removed (one-paragraph bridge no longer needed)
 *   - PincodeCheck             → removed from home (still rendered on
 *                                /book-survey, /residential, /remote-site-survey)
 *
 * The composite homeowner pull-quote previously living inside the hero
 * is now inline just above FinalCTA on this page.
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
      {/* 3. Audience picker — promoted from former position 4 */}
      <AudienceRouter />
      {/* 4. Cost-of-cheap-water timeline */}
      <DayOneArc />
      {/* 5. What we install */}
      <SolutionsOverview />
      {/* 6. Process */}
      <FourStepProcess id="how-it-works" />
      {/* 7. Selected clients */}
      <ProofSection />
      {/* 8. Cities */}
      <CitiesSection />

      {/* Composite homeowner pull-quote — relocated from the hero. Sits
          just above the final CTA so the page closes with an emotional
          beat before the action. Attribution kept as composite until the
          post-install review-collection flow ships a verified named-customer
          quote we can publish in its place. */}
      <Section padding="tight" tone="plain">
        <figure className="max-w-3xl mx-auto text-center">
          <blockquote className="font-editorial italic text-navy text-lede md:text-h3 leading-snug [text-wrap:balance]">
            &ldquo;Three years in, the geyser still feels new and the marble grout hasn&rsquo;t taken a stain. The engineer comes back every month and tells us what the water did. That&rsquo;s not normal.&rdquo;
          </blockquote>
          <Caption className="text-mute mt-4">
            &mdash; Composite, based on residential install-handover feedback
          </Caption>
        </figure>
      </Section>

      {/* 9. Final CTA */}
      <FinalCTA />
    </>
  );
}
