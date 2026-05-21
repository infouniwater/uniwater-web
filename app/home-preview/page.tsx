import type { Metadata } from 'next';
import { EditorialHeroPreview } from '@/components/sections/EditorialHeroPreview';
import { TrustStripe } from '@/components/sections/TrustStripe';
import { AudienceRouter } from '@/components/sections/AudienceRouter';
import { DayOneArc } from '@/components/sections/DayOneArc';
import { SolutionsOverview } from '@/components/sections/SolutionsOverview';
import { FourStepProcess } from '@/components/sections/FourStepProcess';
import { ProofSection } from '@/components/sections/ProofSection';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { PincodeCheck } from '@/components/ui/PincodeCheck';
import { Section } from '@/components/ui/Section';
import { Caption } from '@/components/ui/Typography';

/**
 * /home-preview — proposed homepage restructure, viewable side-by-side with
 * the live homepage on /. Created 2026-05-21 per Rajat's request: "Don't
 * touch the home page. Create a dummy page in the website itself for me to
 * view and see the changes."
 *
 * No existing files were modified to ship this preview. It uses one new
 * component (EditorialHeroPreview, also created 2026-05-21) plus all the
 * existing section components that already render on /. Section order
 * differs from the live homepage; that's the whole point.
 *
 * `robots: noindex` keeps this off Google so the live / stays the canonical
 * version. Once the restructure is approved, /home-preview can be deleted
 * along with EditorialHeroPreview.tsx in a single cleanup commit.
 */

export const metadata: Metadata = {
  title: 'Homepage preview (internal)',
  description: 'Internal preview of the proposed homepage restructure. Not for public traffic.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function HomePreviewPage() {
  return (
    <>
      {/* Visible internal banner so anyone landing here by accident knows
          they're looking at a preview, not the production homepage. */}
      <div className="bg-navy text-offwhite text-caption text-center py-2">
        Internal preview — proposed homepage restructure. The live homepage is at{' '}
        <a href="/" className="underline underline-offset-4 hover:text-soft">
          uniwater.co.in
        </a>
        .
      </div>

      {/* 1. Hero — new copy */}
      <EditorialHeroPreview />

      {/* 2. Stats strip */}
      <div id="preview-trust-strip">
        <TrustStripe />
      </div>

      {/* Location checker — kept on the preview per Rajat (2026-05-22). Sits
          between the stats strip and the audience picker so a visitor can
          quickly answer "do you even cover my area?" before they engage
          with the picker. Same component as the live homepage previously
          used at the equivalent slot. */}
      <Section padding="tight">
        <div className="max-w-3xl mx-auto">
          <PincodeCheck />
        </div>
      </Section>

      {/* 3. Audience picker — promoted to position 3 */}
      <AudienceRouter />

      {/* 4. Cost-of-cheap-water timeline */}
      <DayOneArc />

      {/* 5. What we install */}
      <SolutionsOverview />

      {/* 6. Four-step process */}
      <FourStepProcess />

      {/* 7. Selected clients */}
      <ProofSection />

      {/* 8. Cities */}
      <CitiesSection />

      {/* Composite homeowner pull-quote — relocated from inside the hero on
          the live homepage to sit just above the final CTA on the proposed
          one. Attribution kept as composite. */}
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
