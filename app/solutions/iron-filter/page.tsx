import type { Metadata } from 'next';
import Link from 'next/link';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';
import { SOLUTIONS, SOLUTION_SEO } from '@/content/solutions';
import { buildMetadata, resolveOgImage } from '@/lib/seo';

/**
 * /solutions/iron-filter — restored as a standalone, indexable page for the
 * Tier-1 SEO/GEO pass. The 301 to /solutions/whole-house-water-filter has
 * been removed from next.config.js so this route renders directly.
 *
 * Shape: reuses the existing SolutionDetailTemplate (the same template that
 * powers BathSoft / HomeSoft / Drinking-water pages), which already emits:
 *   - Product schema           via productSchema
 *   - Service schema           via serviceSchema
 *   - FAQPage schema           via faqPageSchema (SOLUTION_FAQS['iron-filter'])
 *   - BreadcrumbList schema    via breadcrumbSchema
 *   - Self-referencing canonical via buildMetadata (this file)
 *
 * Iron-filter has no priceFromINR in content/solutions.ts (multi-tier;
 * survey-quoted), so the Product schema omits price -- correct, not a bug.
 *
 * The pillar callout below FinalCTA points search-arriving visitors at
 * /kolkata-iron-water, which carries the locality table and the
 * iron-vs-softener long-form explanation.
 */

const solution = SOLUTIONS['iron-filter'];

export const metadata: Metadata = buildMetadata({
  path: `/solutions/${solution.slug}`,
  title: SOLUTION_SEO[solution.slug].title,
  description: SOLUTION_SEO[solution.slug].description,
  image: resolveOgImage(solution.slug, 'solutions'),
});

export default function Page() {
  return (
    <SolutionDetailTemplate
      solution={solution}
      slotBeforeFinalCTA={
        // DRAFT — review. Pillar callout sits between Related Solutions
        // and FinalCTA so search visitors land on this page first and then
        // step into the long-form Kolkata-specific context.
        <Section padding="default" tone="subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Eyebrow className="mb-2">In your city</Eyebrow>
              <Heading level={2}>Iron in Kolkata water — the long read.</Heading>
              <Body className="text-mute mt-2">
                Why borewell-fed neighbourhoods east of the EM Bypass see iron,
                where it concentrates by locality, and the order treatment
                has to go in to actually work.
              </Body>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Link
                href="/kolkata-iron-water"
                className="group border border-hairline bg-offwhite p-6 flex flex-col gap-3 transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(5,69,95,0.06)]"
              >
                <Eyebrow className="text-teal">Pillar guide</Eyebrow>
                <Heading level={3}>
                  Iron in Kolkata water — stains, causes, and removal.
                </Heading>
                <Body className="text-mute">
                  Locality table (Park Street through Rajarhat), three-stage
                  removal explainer, and a frank read on why
                  &ldquo;zero-maintenance&rdquo; iron filters fail.
                </Body>
                <Caption className="text-teal font-medium mt-2">Read the pillar →</Caption>
              </Link>
            </div>
          </div>
        </Section>
      }
    />
  );
}
