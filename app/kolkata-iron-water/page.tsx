import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd } from '@/components/ui/JsonLd';
import { FaqSection } from '@/components/sections/FaqSection';
import { CityWaterTable } from '@/components/sections/CityWaterTable';
import { FinalCTA } from '@/components/sections/FinalCTA';
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@/lib/structured-data';
import { buildMetadata, resolveOgImage } from '@/lib/seo';
import { KOLKATA_IRON_PILLAR_FAQS } from '@/content/faqs';

/**
 * Tier-1 SEO pillar — "Iron in Kolkata water".
 *
 * High-intent queries (iron-stained basins, yellow borewell water, iron
 * filter cost Kolkata, Salt Lake / New Town borewell safety) all land here.
 * Linked to from /cities/kolkata, /solutions/iron-filter, /solutions/water-
 * softener, and the iron-vs-hardness journal.
 *
 * Marketing copy is DRAFT-marked for Rajat's review. Survey-data table reuses
 * the existing <CityWaterTable> (Kolkata seed in content/city-water-data.ts;
 * every row verified:false, TODO marker present).
 *
 * Schema:
 *   - Article (this page)        — articleSchema with path override
 *   - FAQPage (the FAQ block)     — emitted by <FaqSection>; we also emit a
 *     duplicate FAQPage in the head bundle so the rich result attaches to
 *     the article URL too. Google de-dupes by @type + URL.
 *   - BreadcrumbList              — Home > Kolkata > Iron in Kolkata Water
 */

const PILLAR_PATH = '/kolkata-iron-water';
const PILLAR_TITLE = 'Iron in Kolkata Water: Stains, Causes & Removal | Uniwater';
const PILLAR_DESCRIPTION =
  'Why Kolkata homes get iron in their water — yellow stains, metallic taste, scale — and how Uniwater removes it: a surveyed, sized, and serviced iron filter, often paired with a softener. Locality-level water bands included.';

export function generateMetadata(): Metadata {
  return buildMetadata({
    path: PILLAR_PATH,
    title: PILLAR_TITLE,
    description: PILLAR_DESCRIPTION,
    image: resolveOgImage('kolkata', 'cities'),
  });
}

export default function KolkataIronWaterPage() {
  const articlePublishedAt = '2026-06-03';
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            slug: 'kolkata-iron-water',
            title: PILLAR_TITLE,
            description: PILLAR_DESCRIPTION,
            publishedAt: articlePublishedAt,
            readingMinutes: 7,
            path: PILLAR_PATH,
          }),
          faqPageSchema(KOLKATA_IRON_PILLAR_FAQS),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Kolkata', url: '/cities/kolkata' },
            { name: 'Iron in Kolkata Water', url: PILLAR_PATH },
          ]),
        ]}
      />

      {/* Breadcrumb strip — light, sits above the dark hero. */}
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Kolkata', href: '/cities/kolkata' },
              { label: 'Iron in Kolkata Water' },
            ]}
          />
        </div>
      </div>

      {/* Hero — image-with-scrim, same vocabulary as the rest of the site.
          Uses the terrace photography so the page reads as Kolkata-specific
          without doubling the bathroom imagery elsewhere on the site. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/terrace-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/terrace-tablet.jpg" />
          <img
            src="/images/hero/terrace-mobile.jpg"
            alt="A Kolkata residential terrace where borewell-fed taps deliver iron-bearing water — the chemistry context for this article."
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.94) 0%, rgba(4,69,95,0.78) 45%, rgba(4,69,95,0.35) 90%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 50%, rgba(4,69,95,0.30) 85%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[820px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              Kolkata · Water chemistry
            </p>
            {/* DRAFT — review */}
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Iron in Kolkata&rsquo;s water &mdash; what it does, and how to get it out.
            </h1>
            {/* DRAFT — review */}
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-2xl">
              A practical guide to why so many Kolkata homes get iron-stained basins
              and yellow laundry, where the problem concentrates across the city,
              and the order treatment has to go in to actually work.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/book-survey"
                className="inline-flex items-center gap-2 self-start whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a free survey
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#by-locality"
                className="group inline-flex self-start text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full"
              >
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Jump to locality table
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. The problem you can see -- LIGHT band. Anchor the article in
          the visible symptom set so a homeowner who searched
          "yellow water Kolkata" sees themselves in paragraph one. */}
      {/* DRAFT — review */}
      <Section padding="default">
        <div className="max-w-reading">
          <Eyebrow className="mb-4">The problem you can see</Eyebrow>
          <Heading level={2} className="mb-6">
            Orange-stained basins, yellow laundry, metallic taste.
          </Heading>
          <Body className="text-mute mb-4">
            Iron in tap water is rarely the first thing a homeowner notices.
            The early signs are everyday: a faint orange tide-line around the
            basin drain, marble vanity tops that lose their polish, white
            shirts that come out of the wash with a yellow cast. Tea tastes
            metallic; coffee turns cloudy. None of it points at the supply
            until you connect the dots.
          </Body>
          <Body className="text-mute mb-4">
            That is iron oxidising. Water that looks perfectly clear at the
            tap can leave a yellow-brown deposit once it meets air &mdash; on
            the side of the basin, inside the kettle, on the towel rail. The
            stain is rust. The fittings, the laundry, and the appliances are
            the visible record of what the water actually carries.
          </Body>
          <Body className="text-mute">
            None of it is a cleaning problem. Stronger detergent, harsher
            descalers, and replacing the basin make no difference. The iron
            has to come out of the supply before it reaches the tap.
          </Body>
        </div>
      </Section>

      {/* 2. Why Kolkata homes get iron -- DARK band, image overlay. Explains
          KMC vs borewell split + falling water table. */}
      {/* DRAFT — review */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Eyebrow inverse>Why Kolkata homes get iron</Eyebrow>
            <Heading level={2} inverse>
              Two supplies, two chemistries.
            </Heading>
          </div>
          <div className="lg:col-span-8 max-w-reading">
            <Body inverse className="text-offwhite/85 mb-4">
              Central Kolkata &mdash; Park Street, Alipore, Ballygunge,
              Hindustan Park &mdash; runs largely on KMC treated municipal
              supply. Iron is usually below the BIS aesthetic limit of 0.3
              mg/L at the tap; the lived problem is mild hardness scale and
              the occasional chlorine taste, not staining.
            </Body>
            <Body inverse className="text-offwhite/85 mb-4">
              Cross the EM Bypass and the picture changes. Salt Lake, New
              Town, Rajarhat, and the Behala stretch sit on the city&rsquo;s
              borewell belt &mdash; either fed wholly from groundwater or
              augmented when the KMC line is short. Borewell water in this
              belt commonly carries iron of 0.5&ndash;3.5 mg/L, well above
              the BIS limit, with hardness and TDS climbing alongside it.
            </Body>
            <Body inverse className="text-offwhite/85">
              The shift is not static. As Kolkata grows east, more apartment
              towers come online with private bores. The shallow water table
              is dropping, drawing iron-rich deeper aquifer water into more
              boreholes. Many homes that were on municipal-only supply five
              years ago now run on a mixed line &mdash; and that is when the
              first yellow stains appear.
            </Body>
            <EditorialAccent inverse className="mt-8">
              Iron is a supply problem, not a fitting problem.
            </EditorialAccent>
          </div>
        </div>
      </Section>

      {/* 3. Where it's worst — locality table. */}
      <div id="by-locality">
        <CityWaterTable
          citySlug="kolkata"
          cityName="Kolkata"
          note="Indicative ranges based on Uniwater survey data — confirmed on site."
        />
      </div>

      {/* 4. Softener vs iron filter -- DARK band so the cadence stays L D L D. */}
      {/* DRAFT — review */}
      <Section tone="navy" padding="default" image={{ stem: 'utility' }}>
        <div className="max-w-reading">
          <Eyebrow inverse className="mb-4">A common confusion</Eyebrow>
          <Heading level={2} inverse className="mb-6">
            &ldquo;Does a water softener remove iron?&rdquo;
          </Heading>
          <Body inverse className="text-offwhite/85 mb-4">
            No. A softener targets hardness &mdash; the calcium and magnesium
            that cause scale. Iron is a different problem with a different
            answer: a dedicated iron-removal filter that oxidises the iron
            and backwashes it out.
          </Body>
          <Body inverse className="text-offwhite/85">
            On most Kolkata borewell-fed homes the right answer is both, in
            the correct order: iron filter first, softener second. Skip the
            iron stage and dissolved iron coats the softener resin within
            months &mdash; the softener stops softening, and the homeowner
            ends up replacing resin instead of fixing the supply. The full
            answer is in the FAQ below.
          </Body>
        </div>
      </Section>

      {/* 5. How iron removal works -- LIGHT band, three-stage explainer. */}
      {/* DRAFT — review */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">How iron removal works</Eyebrow>
          <Heading level={2}>Oxidation. Media filtration. Backwash.</Heading>
          <Body className="text-mute mt-4">
            Dissolved iron is invisible. The filter has to convert it into a
            solid before it can catch it.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="text-[48px] font-light leading-none text-teal">01</div>
            <Heading level={3}>Oxidise.</Heading>
            <Body className="text-mute">
              Dissolved iron is exposed to an oxidising medium &mdash;
              catalytic manganese-oxide bed, or aeration upstream &mdash; and
              converts to insoluble iron particles.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[48px] font-light leading-none text-teal">02</div>
            <Heading level={3}>Filter.</Heading>
            <Body className="text-mute">
              The newly-formed iron particles are caught on the media bed.
              Treated water leaves the vessel clear; iron stays in the bed
              until the next backwash cycle.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[48px] font-light leading-none text-teal">03</div>
            <Heading level={3}>Backwash.</Heading>
            <Body className="text-mute">
              Periodically the flow is reversed at high velocity. The trapped
              iron is flushed to drain, the bed is re-graded, and the filter
              resets ready for the next service interval.
            </Body>
          </div>
        </div>
      </Section>

      {/* 6. Why "zero-maintenance" units fail -- DARK band, honest about
          the failure mode of cheap units. */}
      {/* DRAFT — review */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="max-w-reading">
          <Eyebrow inverse className="mb-4">Why cheap iron filters fail</Eyebrow>
          <Heading level={2} inverse className="mb-6">
            &ldquo;Zero-maintenance&rdquo; is marketing, not engineering.
          </Heading>
          <Body inverse className="text-offwhite/85 mb-4">
            Iron filters need backwashing on a schedule, and the media has a
            finite life. A unit sold as zero-maintenance is one whose owner
            stops being told what to do &mdash; not one that does not need
            doing. Skipped backwash compacts the bed. Compacted bed channels
            the flow; iron passes straight through.
          </Body>
          <Body inverse className="text-offwhite/85">
            The visible failure is the same as the original problem: yellow
            water, stained basins, metallic taste. The owner assumes the
            filter is broken and replaces the unit. The real fix was a
            backwash cycle and a media check &mdash; a five-minute job, every
            month, that none of the catalogue-grade units commit to.
          </Body>
        </div>
      </Section>

      {/* 7. What Uniwater specifies -- LIGHT band. The product pitch, short. */}
      {/* DRAFT — review */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow className="mb-2">What we specify in Kolkata</Eyebrow>
            <Heading level={2}>An iron filter, usually with a softener.</Heading>
            <Body className="text-mute mt-2">
              We survey first. The water test reads iron, hardness, TDS, and
              chlorine. The reading sizes the system. We do not quote without
              the survey.
            </Body>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Link
              href="/solutions/iron-filter"
              className="group border border-hairline bg-offwhite p-6 flex flex-col gap-3 transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(5,69,95,0.06)]"
            >
              <Eyebrow className="text-teal">Iron-removal filter</Eyebrow>
              <Heading level={3}>
                Stage one upstream of everything else.
              </Heading>
              <Body className="text-mute">
                Oxidising media in a vessel sized to your iron load. Monthly
                backwash and inspection rolled into the AMC.
              </Body>
              <Caption className="text-teal font-medium mt-2">
                See the iron filter →
              </Caption>
            </Link>
            <Link
              href="/solutions/water-softener"
              className="group border border-hairline bg-offwhite p-6 flex flex-col gap-3 transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(5,69,95,0.06)]"
            >
              <Eyebrow className="text-teal">Water softener (HomeSoft)</Eyebrow>
              <Heading level={3}>
                Sits downstream of the iron stage on borewell homes.
              </Heading>
              <Body className="text-mute">
                Ion-exchange resin in an FRP / SS316 vessel. Salt top-up and
                regeneration check on every service visit.
              </Body>
              <Caption className="text-teal font-medium mt-2">
                See the water softener →
              </Caption>
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. FAQ block — uses the existing FaqSection (emits FAQPage JSON-LD
          for its own content; we also emit a duplicate at the top so the
          rich result attaches to the article URL). */}
      <FaqSection
        items={KOLKATA_IRON_PILLAR_FAQS}
        eyebrow="Frequently asked"
        heading="Iron in Kolkata water — common questions."
        inverse
        imageStem="bathroom"
      />

      {/* Related reading — pulls the two iron-relevant journal posts. */}
      {/* DRAFT — review */}
      <Section padding="default">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">Related reading</Eyebrow>
          <Heading level={2}>Two journal pieces alongside this one.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/blog/iron-hardness-order"
            className="group border border-hairline bg-offwhite p-6 flex flex-col gap-3 transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(5,69,95,0.06)]"
          >
            <Eyebrow className="text-teal">Journal</Eyebrow>
            <Heading level={3}>Iron, then hardness — the right order.</Heading>
            <Body className="text-mute">
              Why iron pre-treatment has to come before softening on every
              borewell-fed train, and what happens when it doesn’t.
            </Body>
            <Caption className="text-teal font-medium mt-2">Read the journal →</Caption>
          </Link>
          <Link
            href="/blog/five-year-cost-of-doing-nothing"
            className="group border border-hairline bg-offwhite p-6 flex flex-col gap-3 transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(5,69,95,0.06)]"
          >
            <Eyebrow className="text-teal">Journal</Eyebrow>
            <Heading level={3}>The five-year cost of doing nothing.</Heading>
            <Body className="text-mute">
              Geysers replaced, basins re-glazed, laundry written off — the
              compounding cost of untreated borewell water on a luxury home.
            </Body>
            <Caption className="text-teal font-medium mt-2">Read the journal →</Caption>
          </Link>
        </div>
      </Section>

      {/* 9. CTA -- FinalCTA component. Kolkata-specific copy. */}
      {/* DRAFT — review */}
      <FinalCTA
        headline="Get the iron out at the source."
        sub="A free survey reads your water, sizes the system, and quotes a fixed price. Engineer at your door in 24 hours across Kolkata."
        primaryCTA={{ label: 'Book a free survey', href: '/book-survey' }}
      />
    </>
  );
}
