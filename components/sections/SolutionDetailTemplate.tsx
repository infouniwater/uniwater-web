import Link from 'next/link';
import type { Solution } from '@/content/solutions';
import { formatINR, SOLUTIONS } from '@/content/solutions';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Card, ConfigurationCard, SolutionCard } from '@/components/ui/Card';
import { Accordion, AccordionItem, TechSpecRow } from '@/components/ui/Accordion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SolutionStickyCTA } from '@/components/sections/SolutionStickyCTA';
import { productSchema, faqPageSchema, breadcrumbSchema, jsonLd } from '@/lib/structured-data';
import { COMPONENT_MANUFACTURERS, PRIMARY_PHONE_HREF } from '@/content/site';
import { FIVE_PLACES, HOMESOFT_STAGES, TDS_DECISION_TREE } from '@/content/education';
import { Infographic } from '@/components/ui/Infographic';
import { getBlogsForSolution, bookSurveyHrefForSolution } from '@/content/cross-links';

/**
 * Solution detail page template — 12 sections per Blueprint §8.
 *
 * Already-shipped in production. This is a clean re-implementation of the
 * template; per-solution content comes from content/solutions.ts.
 *
 * Per Blueprint §8:
 *   - BathSoft / HomeSoft wordmark shown when present
 *   - Component-manufacturer trust strip on tech-spec accordion
 *   - Catalogue infographic embeds for matching solutions
 */
interface Props {
  solution: Solution;
  /**
   * Optional content slot rendered immediately above the page's final
   * CTA. Used to attach solution-specific sections (e.g. the
   * "five places we've put a system" showcase on the bathroom-filter
   * page after the 2026-05-21 homepage restructure) without duplicating
   * the template body per solution.
   */
  slotBeforeFinalCTA?: React.ReactNode;
}

export function SolutionDetailTemplate({ solution, slotBeforeFinalCTA }: Props) {
  // Variant: install-context section content differs per solution type
  const installContent = getInstallContent(solution);
  const techSpecs = getTechSpecs(solution);
  const faqs = getFaqs(solution);
  const bookSurveyHref = bookSurveyHrefForSolution(solution.slug);
  const cutawaySlug = getCutawayForSolution(solution.slug);
  const heroPhoto = getHeroPhotoForSolution(solution.slug);
  const installPhotos = getInstallPhotosForSolution(solution.slug);
  const realInstallPhotos = getRealInstallPhotosForSolution(solution.slug);

  return (
    <>
      {/* JSON-LD per BLUEPRINT §15.4 — Product + FAQ + Breadcrumb. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            productSchema({
              name: solution.navLabel,
              slug: solution.slug,
              description: solution.shortHeadline,
              priceFromINR: solution.priceFromINR,
            }),
            faqPageSchema(faqs),
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Solutions', url: '/solutions' },
              { name: solution.navLabel, url: `/solutions/${solution.slug}` },
            ]),
          ]),
        }}
      />

      {/* 1. Hero */}
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: solution.navLabel },
            ]}
          />
        </div>
        <div className="container-uw">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-8 pb-12 lg:pt-12 lg:pb-24">
            {/* Text panel — first on mobile (was second). */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {solution.wordmark && (
                <div className="text-eyebrow font-medium uppercase text-teal">
                  {solution.wordmark}.
                </div>
              )}
              <Eyebrow>{solution.navLabel}</Eyebrow>
              <Heading level={1} className="text-display-m md:text-h1 font-light leading-tight">
                {solution.shortHeadline}
              </Heading>
              {solution.priceFromINR && (
                <p className="text-caption text-mute">
                  From{' '}
                  <span className="text-ink font-medium">
                    {formatINR(solution.priceFromINR)}
                  </span>
                  . Final price after free survey. EMI from{' '}
                  <span className="text-ink font-medium">
                    {formatINR(Math.round(solution.priceFromINR / 12))}/month
                  </span>{' '}
                  via Bajaj Finserv / Snapmint.
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                <Button href={bookSurveyHref}>Book a free survey</Button>
                <Button href={PRIMARY_PHONE_HREF} variant="tertiary">
                  Or call us
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              {heroPhoto ? (
                <div className="w-full overflow-hidden border border-hairline aspect-[16/9] sm:aspect-[1/1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    className="block w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <Photo
                  description={`Hero — ${solution.navLabel} installed in a finished home`}
                  assetRef={`solution-${solution.slug}-hero`}
                  aspect="five-six"
                  mobileAspect="sixteen-nine"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. The problem this solves */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">The problem this solves</Eyebrow>
          <Heading level={2}>What changes when the water is right.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
          {solution.problemBands.map((band, i) => (
            <div key={i} className="bg-offwhite p-8 md:p-10 flex gap-5">
              <div className="text-eyebrow font-medium uppercase text-teal flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-body text-ink leading-relaxed">{band}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. How Uniwater solves it */}
      <Section tone="subtle" padding="default">
        <div className="max-w-3xl mb-8">
          <Eyebrow className="mb-4">How we solve it</Eyebrow>
          <Heading level={2}>
            Sized to the water, the house, and the people in it.
          </Heading>
        </div>
        <div className="max-w-reading">
          <Lede className="text-mute mb-6">
            Every Uniwater {solution.navLabel.toLowerCase()} starts with a free water test and a site survey. The chemistry decides the media. The household decides the capacity. The architecture decides where it goes.
          </Lede>
          <Body className="text-mute mb-6">
            Catalogue sizes are starting points, not the sale. Our 17-rule auto-suggest engine generates a bill of materials specific to your water analysis, pressure, and draw &mdash; not a generic SKU pulled off a shelf.
          </Body>
          <EditorialAccent>
            Engineered, not bought off a shelf.
          </EditorialAccent>
        </div>
      </Section>

      {/* 3b. Inside the vessel — SVG-006 product cutaway. Only when a cutaway maps. */}
      {cutawaySlug && (
        <Section padding="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <Eyebrow className="mb-4">Inside the vessel</Eyebrow>
              <Heading level={2}>The engineering, in section.</Heading>
              <Body className="text-mute mt-4">
                What the system looks like on the cutaway. Media bed, distributor, freeboard, control head &mdash; the visible engineering that decides what the water does over the next fifteen years.
              </Body>
            </div>
            <div className="hidden md:block lg:col-span-8 bg-offwhite border border-hairline p-6 md:p-8">
              {/* Cutaway hidden on mobile — 1800×1050 SVG with 14–18px labels
                  compresses to ~3–4px on a phone. Eyebrow/heading/body above
                  carry the message at small sizes. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/product-cutaways/${cutawaySlug}/landscape.svg`}
                alt={`${solution.navLabel} — engineering cross-section showing vessel internals, media bed, distributor, and control head`}
                className="block w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Section>
      )}

      {/* 4. Optional infographic embed — for the catalogue-mapped solutions */}
      {installContent.infographic && (
        <Section tone="navy" padding="default">
          <div className="max-w-2xl mb-10">
            <Eyebrow className="text-soft mb-4">{installContent.infographic.eyebrow}</Eyebrow>
            <Heading level={2} inverse>
              {installContent.infographic.headline}
            </Heading>
          </div>
          <Infographic
            assetName={installContent.infographic.asset}
            description={installContent.infographic.description}
            aspect="16/9"
          />
        </Section>
      )}

      {/* 5. What's included */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">What&rsquo;s included</Eyebrow>
          <Heading level={2}>Everything to put it in. Everything to keep it running.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INCLUDED_ITEMS.map((item) => (
            <Card key={item.title}>
              <h3 className="text-h3 font-semibold text-navy mb-3">{item.title}</h3>
              <Body className="text-mute">{item.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Where it goes */}
      <Section tone="subtle" padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Where it goes</Eyebrow>
          <Heading level={2}>{installContent.headline}</Heading>
          <Body className="text-mute mt-4">{installContent.body}</Body>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {installContent.cards.map((card, i) => {
            const photo = installPhotos[i];
            return (
              <div key={i} className="flex flex-col gap-4">
                {photo ? (
                  <div className="w-full overflow-hidden border border-hairline" style={{ aspectRatio: '4 / 3' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="block w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <Photo
                    description={`${card.title} — install context`}
                    assetRef={`${solution.slug}-install-${i + 1}`}
                    aspect="four-three"
                  />
                )}
                <div>
                  <h3 className="text-h3 font-semibold text-navy mb-2">{card.title}</h3>
                  <Caption className="text-mute">{card.body}</Caption>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 6b. Architectural install patterns — SVG-003 drawings, shown only
              when the solution has canonical patterns mapped. */}
      {(() => {
        const drawings = getInstallDrawingsForSolution(solution.slug);
        if (drawings.length === 0) return null;
        return (
          <Section padding="default">
            <div className="mb-12 max-w-3xl">
              <Eyebrow className="mb-4">Architectural patterns</Eyebrow>
              <Heading level={2}>How the system fits, on paper.</Heading>
              <Body className="text-mute mt-4">
                Section drawings of the install patterns we use most often for this system. Pre-tile, mid-construction, or as a retrofit &mdash; the right pattern is decided at survey, against the house.
              </Body>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${drawings.length >= 3 ? 'lg:grid-cols-3' : ''} gap-3 sm:gap-6`}>
              {drawings.map((d) => (
                <figure key={d.file} className="flex flex-col gap-3 bg-offwhite border border-hairline p-4 sm:p-6">
                  {/* Drawing hidden on mobile — the SVG canvas is 1000×700
                      with 12-14px labels that render at ~5px on a 375px phone,
                      i.e. unreadable. The title + body in the figcaption below
                      carry the install pattern in plain language. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.file}
                    alt={d.alt}
                    loading="lazy"
                    decoding="async"
                    className="hidden sm:block w-full h-auto"
                  />
                  <figcaption>
                    <h3 className="text-h3-m font-medium text-navy">{d.title}</h3>
                    <Caption className="text-mute mt-1">{d.body}</Caption>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>
        );
      })()}

      {/* 7. Configurations */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Configurations</Eyebrow>
          <Heading level={2}>
            Three or four sizes. Decided by load, not by SKU.
          </Heading>
          <Body className="text-mute mt-4">
            We don&rsquo;t expose part numbers. The configuration is decided at survey based on bathroom count, household draw, and water chemistry.
          </Body>
        </div>
        <div
          className={`grid grid-cols-1 gap-6 ${
            solution.configurations.length === 2
              ? 'md:grid-cols-2 max-w-3xl'
              : solution.configurations.length === 3
              ? 'md:grid-cols-3'
              : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {solution.configurations.map((config, i) => (
            <ConfigurationCard
              key={config.name}
              name={config.name}
              subtitle={config.subtitle}
              description={config.description}
              recommended={i === 1 && solution.configurations.length === 3}
            />
          ))}
        </div>
      </Section>
      {/* Sentinel — SolutionStickyCTA appears below the fold past this line. */}
      <div id="solution-sticky-start" aria-hidden="true" />

      {/* 8. Technical specifications */}
      <Section tone="subtle" padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">Technical specifications</Eyebrow>
            <Heading level={2} className="mb-4">For the architect, plumber, or engineer.</Heading>
            <Body className="text-mute mb-6">
              Surface what matters; collapse what doesn&rsquo;t. Open the rows below for the engineering detail.
            </Body>
            <div className="mt-8">
              <div className="text-eyebrow font-medium uppercase text-mute mb-3">
                Components from
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {COMPONENT_MANUFACTURERS.map((mfr) => (
                  <span key={mfr} className="text-caption text-ink font-medium">
                    {mfr}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion>
              <AccordionItem question="Capacity & sizing">
                <dl className="mt-2">
                  {techSpecs.capacity.map((row) => (
                    <TechSpecRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
              <AccordionItem question="Materials & media">
                <dl className="mt-2">
                  {techSpecs.materials.map((row) => (
                    <TechSpecRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
              <AccordionItem question="Controls & regeneration">
                <dl className="mt-2">
                  {techSpecs.controls.map((row) => (
                    <TechSpecRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
              <AccordionItem question="Installation requirements">
                <dl className="mt-2">
                  {techSpecs.install.map((row) => (
                    <TechSpecRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 9. PDF data sheet download */}
      <Section padding="tight">
        <div className="border border-hairline p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-h2-m md:text-h2 font-light text-navy mb-2">
              Take the spec to your architect.
            </h3>
            <Body className="text-mute">
              A 2-page PDF data sheet with capacities, materials, dimensions, and the install diagram.
            </Body>
          </div>
          <Button href={`/data-sheets/${solution.slug}.pdf`} variant="secondary">
            Download data sheet
          </Button>
        </div>
      </Section>

      {/* 10. FAQ */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">Frequently asked</Eyebrow>
            <Heading level={2}>
              What homeowners ask before they book.
            </Heading>
          </div>
          <div className="lg:col-span-8">
            <Accordion>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} question={faq.q} defaultOpen={i === 0}>
                  {faq.a}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 11. Real installs */}
      <Section tone="subtle" padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Real installs</Eyebrow>
          <Heading level={2}>Where these systems are running today.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {(realInstallPhotos.length > 0 ? realInstallPhotos : [null, null, null]).slice(0, 3).map((photo, i) => (
            <div key={i} className="flex flex-col gap-3 sm:gap-4">
              {photo ? (
                <div className="w-full overflow-hidden border border-hairline aspect-[1/1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="block w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <Photo
                  description={`Real install — ${solution.navLabel} at a customer home`}
                  assetRef={`${solution.slug}-real-install-${i + 1}`}
                  aspect="sixteen-nine"
                />
              )}
              <Caption className="text-mute">
                {photo?.caption ??
                  (i === 0
                    ? '3-BHK, Salt Lake, Kolkata. Borewell with iron and hardness.'
                    : i === 1
                    ? '5-BHK villa, Patia, Bhubaneswar. Mixed municipal supply.'
                    : 'Boutique hotel, Siliguri. 16 rooms.')}
              </Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* 12. Related solutions */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Related</Eyebrow>
          <Heading level={2}>You may also want to look at &mdash;</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.related.slice(0, 3).map((relSlug) => {
            const rel = SOLUTIONS[relSlug];
            return (
              <SolutionCard
                key={relSlug}
                href={`/solutions/${relSlug}`}
                title={rel.navLabel}
                description={rel.shortHeadline}
                photoDescription={`${rel.navLabel} install`}
                photoRef={`solution-${relSlug}-related`}
              />
            );
          })}
        </div>
      </Section>

      {/* 13. Related reading — editorial bridge into the Journal. */}
      {(() => {
        const relatedPosts = getBlogsForSolution(solution.slug);
        if (relatedPosts.length === 0) return null;
        const gridClass =
          relatedPosts.length === 2
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'
            : 'grid grid-cols-1 md:grid-cols-3 gap-6';
        return (
          <Section padding="default" tone="subtle">
            <div className="mb-12 max-w-3xl">
              <Eyebrow className="mb-4">Related reading</Eyebrow>
              <Heading level={2}>The thinking behind this system.</Heading>
              <Body className="text-mute mt-4">
                Pieces from the Journal that cover the chemistry, the decision, and the practice this solution rests on.
              </Body>
            </div>
            <div className={gridClass}>

              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-offwhite border border-hairline p-6 md:p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
                >
                  <div className="flex items-center gap-3 mb-4 text-eyebrow font-medium uppercase">
                    <span className="text-teal">{post.category}</span>
                    <span className="text-mute/50">/</span>
                    <span className="text-mute">{post.readingMinutes} min</span>
                  </div>
                  <h3 className="text-h3 font-semibold text-navy mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <Body className="text-mute text-caption">{post.description}</Body>
                  <div className="mt-5 flex items-center gap-2 text-teal text-caption font-medium">
                    <span>Read article</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        );
      })()}

      {/* Sentinel — SolutionStickyCTA hides past this line. */}
      <div id="solution-sticky-end" aria-hidden="true" />

      {slotBeforeFinalCTA}

      <FinalCTA primaryCTA={{ label: 'Book a free survey', href: bookSurveyHref }} />
      <SolutionStickyCTA bookSurveyHref={bookSurveyHref} />
    </>
  );
}

// ---- Content helpers ----

// Maps the marketing-site solution slugs to the SVG-006 cutaway folders in
// public/images/product-cutaways/. Solutions with no dedicated cutaway return
// null and the hero falls back to the <Photo> placeholder.
// Per the SVG-003 v2 README's canonical "which install fits which solution"
// mapping. Drawing file paths resolve from public/images/install-drawings/.
interface InstallDrawing {
  file: string;
  title: string;
  body: string;
  alt: string;
}

const BATHROOM_DRAWINGS: InstallDrawing[] = [
  {
    file: '/images/install-drawings/bathroom/01-false-ceiling.svg',
    title: '01 · False-ceiling',
    body: 'Vessels in the void above the suspended ceiling. Equipment hidden until access panel removed.',
    alt: 'Bathroom false-ceiling install — section view of vessels in ceiling void',
  },
  {
    file: '/images/install-drawings/bathroom/04-plumbing-duct.svg',
    title: '04 · Plumbing duct',
    body: 'Vertical install in concealed riser shaft. Routes within existing infrastructure, no architectural intervention.',
    alt: 'Bathroom plumbing-duct install — section view of vessels in riser',
  },
  {
    file: '/images/install-drawings/bathroom/06-wall-cabinet.svg',
    title: '06 · Wall cabinet',
    body: 'Cabinet mounted ON the wall with serviceable doors. Finished interior, no construction needed.',
    alt: 'Bathroom wall-cabinet install — section view of vessels behind cabinet',
  },
  {
    file: '/images/install-drawings/bathroom/07-wall-niche.svg',
    title: '07 · Wall niche',
    body: 'Recess cut INTO the wall, flush with tile. Architecture-grade — vessels become part of the wall.',
    alt: 'Bathroom wall-niche install — section view of recessed vessels',
  },
];

const WHOLE_HOUSE_DRAWINGS: InstallDrawing[] = [
  {
    file: '/images/install-drawings/whole-house/02-utility-room.svg',
    title: '02 · Utility room',
    body: 'Indoor controlled environment. Easiest service access, full 4-stage train fits.',
    alt: 'Whole-house utility-room install — plant in dedicated indoor space',
  },
  {
    file: '/images/install-drawings/whole-house/03-terrace.svg',
    title: '03 · Terrace',
    body: 'Rooftop install with weather hood. Uses existing OHT gravity-feed, exposed to elements.',
    alt: 'Whole-house terrace install — rooftop plant with weather hood',
  },
  {
    file: '/images/install-drawings/whole-house/04-basement.svg',
    title: '04 · Basement',
    body: 'Villa basement plant room. Centralised, sump pit handles backwash, full 4-stage train fits.',
    alt: 'Whole-house basement install — full 4-stage plant in plant room',
  },
];

const DRINKING_WATER_DRAWINGS: InstallDrawing[] = [
  {
    file: '/images/install-drawings/bathroom/05-under-basin.svg',
    title: '05 · Under-basin',
    body: 'Point-of-use install under the kitchen vanity. Service via cabinet door, no impact on finishes.',
    alt: 'Under-basin install — section view of compact unit under vanity',
  },
];

const IRON_FILTER_DRAWINGS: InstallDrawing[] = [
  {
    file: '/images/install-drawings/whole-house/04-basement.svg',
    title: '04 · Basement',
    body: 'Iron filter as part of the basement plant. Treats every tap from a single point.',
    alt: 'Whole-house basement install — iron stage of 4-stage plant',
  },
  {
    file: '/images/install-drawings/whole-house/05-garden.svg',
    title: '05 · Garden',
    body: 'At the borewell source. Accommodates iron + softener + carbon train under weather hood.',
    alt: 'Whole-house garden install — plant at borewell source',
  },
];

function getInstallDrawingsForSolution(slug: string): InstallDrawing[] {
  switch (slug) {
    case 'bathroom-filter':
      return BATHROOM_DRAWINGS;
    case 'whole-house-water-filter':
    case 'sediment-filter':
    case 'activated-carbon-filter':
      return WHOLE_HOUSE_DRAWINGS;
    case 'iron-filter':
      return IRON_FILTER_DRAWINGS;
    case 'water-softener':
      return WHOLE_HOUSE_DRAWINGS;
    case 'drinking-water-solution':
      return DRINKING_WATER_DRAWINGS;
    default:
      return [];
  }
}

// ---- Canva photography map ----

interface PhotoAsset {
  src: string;
  alt: string;
  caption?: string;
}

const PHOTO_BASE = '/images/photography';

function getHeroPhotoForSolution(slug: string): PhotoAsset | null {
  switch (slug) {
    case 'bathroom-filter':
      return {
        src: `${PHOTO_BASE}/bathroom-filter-hero.jpg`,
        alt: 'BathSoft bathroom filter installed in a marble luxury bathroom with brass freestanding tub, recessed niche housing two stainless cylinders behind a glass partition',
      };
    case 'whole-house-water-filter':
      return {
        src: `${PHOTO_BASE}/whole-house-hero.jpg`,
        alt: 'HomeSoft whole-house water filter — two branded Uniwater vessels installed in a finished home corner near windows and plants',
      };
    case 'iron-filter':
      return {
        src: `${PHOTO_BASE}/whole-house-terrace.jpg`,
        alt: 'Iron filter install — branded Uniwater inlet vessels treating borewell water at a residential terrace, preventing iron staining downstream',
      };
    case 'water-softener':
      return {
        src: `${PHOTO_BASE}/whole-house-luxury-villa.jpg`,
        alt: 'Water softener install — three branded Uniwater vessels treating hard water at a luxury villa, protecting downstream appliances and fittings',
      };
    case 'sediment-filter':
      return {
        src: `${PHOTO_BASE}/whole-house-utility-area.jpg`,
        alt: 'Sediment filter install — branded Uniwater inlet vessels handling pre-treatment in a home utility area, protecting downstream stages from particulate',
      };
    case 'activated-carbon-filter':
      return {
        src: `${PHOTO_BASE}/whole-house-terrace-water-tank.jpg`,
        alt: 'Activated carbon filter install — branded Uniwater vessels removing chlorine and chemical taste, installed near the overhead water tank on a terrace',
      };
    case 'drinking-water-solution':
      return {
        src: `${PHOTO_BASE}/drinking-water-home.jpg`,
        alt: 'Glass of Uniwater drinking water on a marble kitchen counter, family in soft focus in the background',
      };
    default:
      return null;
  }
}

function getInstallPhotosForSolution(slug: string): PhotoAsset[] {
  if (slug === 'bathroom-filter') {
    // Strict 1:1 to FIVE_PLACES (False ceiling / Hidden niche / Wall
    // cabinet / Under-counter / Utility room). Same photo mapping as
    // InstallationVersatility on the homepage.
    return [
      { src: `${PHOTO_BASE}/bathroom-filter-ceiling-installation.jpg`, alt: 'Stainless cylinder mounted in the suspended-ceiling void of a finished bathroom, accessed via a removable panel' },
      { src: `${PHOTO_BASE}/bathroom-filter-hero.jpg`, alt: 'Two stainless cylinders recessed in a wall niche behind a marble shower glass — part of the bathroom architecture, not bolted onto it' },
      { src: `${PHOTO_BASE}/bathroom-filter-wall-cabinet.jpg`, alt: 'Stainless vessel housed inside a wall cabinet behind a finish door, flush with the bathroom wall' },
      { src: `${PHOTO_BASE}/bathroom-filter-under-basin.jpg`, alt: 'Compact vessels installed under the vanity counter beside the trap, hidden behind the cabinet door' },
      { src: `${PHOTO_BASE}/whole-house-utility-area.jpg`, alt: 'Two branded Uniwater vessels floor-mounted in the home utility area beside the washing machine' },
    ];
  }
  return [];
}

function getRealInstallPhotosForSolution(slug: string): PhotoAsset[] {
  switch (slug) {
    case 'bathroom-filter':
      return [
        { src: `${PHOTO_BASE}/bathroom-filter-wall-cabinet.jpg`, alt: 'Bathroom filter inside a wall cabinet', caption: '3-BHK, Salt Lake, Kolkata. Borewell with iron and hardness.' },
        { src: `${PHOTO_BASE}/bathroom-filter-under-basin.jpg`, alt: 'Bathroom filter under the vanity', caption: '5-BHK villa, Ballygunge, Kolkata. Mixed municipal supply.' },
        { src: `${PHOTO_BASE}/bathroom-filter-ceiling-installation.jpg`, alt: 'Bathroom filter in the ceiling void', caption: 'Boutique hotel, Bhubaneswar. 16 rooms.' },
      ];
    case 'whole-house-water-filter':
    case 'water-softener':
      return [
        { src: `${PHOTO_BASE}/whole-house-utility-area.jpg`, alt: 'HomeSoft in the utility area', caption: 'Premium apartment, Salt Lake, Kolkata. Utility-room install.' },
        { src: `${PHOTO_BASE}/whole-house-luxury-villa.jpg`, alt: 'HomeSoft in a luxury villa', caption: 'Independent villa, Patia, Bhubaneswar. Basement plant.' },
        { src: `${PHOTO_BASE}/whole-house-terrace.jpg`, alt: 'HomeSoft on the terrace', caption: 'Penthouse, New Town, Kolkata. Terrace install with gravity feed.' },
      ];
    case 'iron-filter':
    case 'sediment-filter':
    case 'activated-carbon-filter':
      return [
        { src: `${PHOTO_BASE}/whole-house-luxury-villa.jpg`, alt: 'HomeSoft 4-stage train in a luxury villa', caption: 'Borewell-fed villa, Guwahati. Iron-pre-treatment train.' },
        { src: `${PHOTO_BASE}/whole-house-terrace-water-tank.jpg`, alt: 'HomeSoft near the overhead water tank on the terrace', caption: 'Villa near Siliguri. Terrace install near the OHT.' },
        { src: `${PHOTO_BASE}/whole-house-utility-area.jpg`, alt: 'HomeSoft in the utility area', caption: 'Mid-rise apartment, Bhubaneswar. Utility-room install.' },
      ];
    case 'drinking-water-solution':
      // Third slot intentionally falls through to the Photo placeholder
      // until a real cafe / commercial drinking-water install photo lands.
      // Previously held bathroom-filter-under-basin.jpg dressed as a
      // "boutique cafe" install — wrong product context.
      return [
        { src: `${PHOTO_BASE}/drinking-water-home.jpg`, alt: 'Drinking water at the kitchen counter', caption: 'Family residence, Lake Town, Kolkata. Under-sink RO.' },
        { src: `${PHOTO_BASE}/drinking-water-home-2.jpg`, alt: 'Drinking water in the kitchen', caption: 'Apartment, Salt Lake, Kolkata. Centralised drinking-water unit.' },
      ];
    default:
      return [];
  }
}

function getCutawayForSolution(slug: string): 'bathsoft' | 'homesoft' | 'commercial-ro' | 'dm' | null {
  switch (slug) {
    case 'bathroom-filter':
      return 'bathsoft';
    case 'whole-house-water-filter':
    case 'iron-filter':
    case 'water-softener':
    case 'sediment-filter':
    case 'activated-carbon-filter':
      // These are stages of the HomeSoft 4-stage train; the homesoft cutaway
      // shows the full train with the relevant stage emphasised.
      return 'homesoft';
    case 'drinking-water-solution':
    default:
      return null;
  }
}


const INCLUDED_ITEMS = [
  {
    title: 'Engineered vessel + media',
    body: 'FRP or SS316 vessel, sized to your draw and chemistry. Media chosen for the specific problem.',
  },
  {
    title: 'Controls & valves',
    body: 'Manual or automatic regeneration. Pressure gauges and flow meters where they matter.',
  },
  {
    title: 'Installation',
    body: 'Plumbing, electrical, mounting, and commissioning. Documented before handover.',
  },
  {
    title: 'Water analysis',
    body: 'Pre-install and post-install parameter readings. Filed with your quote.',
  },
  {
    title: 'One-year warranty',
    body: 'All system components covered. Replacement, not repair-by-letter.',
  },
  {
    title: 'One-year AMC included',
    body: 'Monthly preventive service on Comprehensive / Premium tiers. Standard tier gets quarterly.',
  },
];

function getInstallContent(solution: Solution) {
  switch (solution.installContext) {
    case 'bathroom-five-places':
      return {
        headline: 'Five places it disappears.',
        body:
          'BathSoft is engineered for real Indian bathrooms \u2014 tight shafts, low ceilings, finished interiors. Specified at site survey. Decided before tile.',
        cards: FIVE_PLACES.map((p) => ({ title: p.location, body: p.description })),
        infographic: {
          eyebrow: 'The four-stage train',
          headline: 'Sediment. Iron. Carbon. Softening.',
          asset: 'homesoft-four-stage.svg',
          description:
            'Diagram of the four-stage HomeSoft train: sediment → iron → carbon → softening, with optional UV/UF polish for kitchen tap.',
        },
      };
    case 'whole-house-inlet':
      return {
        headline: 'One inlet. Every tap.',
        body:
          'HomeSoft treats every tap from a single point. Sits in the utility area, plant room, or garden corner. Out of sight, out of conversation.',
        cards: HOMESOFT_STAGES.map((s) => ({ title: `${s.stage} — ${s.name}`, body: s.body })),
        infographic: {
          eyebrow: 'The four-stage train',
          headline: 'Sediment. Iron. Carbon. Softening.',
          asset: 'homesoft-four-stage.svg',
          description:
            'Diagram of the four-stage HomeSoft train: sediment → iron → carbon → softening, sized for residential 2K/4K/6K LPH bands.',
        },
      };
    case 'point-of-use':
      return {
        headline: 'The kitchen is the one tap.',
        body:
          'Drinking water gets its own treatment, sized to your TDS. Wall-mounted, under-sink, or centralised \u2014 the plumbing decides where it goes.',
        cards: TDS_DECISION_TREE.map((t) => ({
          title: `${t.range} \u2192 ${t.answer}`,
          body: t.description,
        })),
        infographic: {
          eyebrow: 'TDS decides',
          headline: 'Test the TDS first.',
          asset: 'tds-decision-tree.svg',
          description:
            'Decision tree: TDS below 200 ppm → UF + UV; 200–500 ppm → test & consult; above 500 ppm → RO with re-mineralisation.',
        },
      };
    case 'pretreatment-stage':
      return {
        headline: 'Upstream of everything else.',
        body:
          'Iron, sediment, and chlorine are pretreatment stages. They protect downstream resin, membranes, and softening media \u2014 or those systems fail faster.',
        cards: [
          { title: 'Inlet', body: 'Treats every tap from a single point.' },
          { title: 'Pre-softener', body: 'Sits ahead of softening resin to prevent fouling.' },
          { title: 'Pre-RO', body: 'Sits ahead of RO membranes to prevent rapid clogging.' },
        ],
        infographic: undefined,
      };
    case 'specialised-media':
      return {
        headline: 'Specific media for a specific problem.',
        body:
          'General sediment and carbon filtration will not remove dissolved minerals or trace metals. A specialised media filter does one thing well.',
        cards: [
          { title: 'Resin selection', body: 'SAC, SBA, or mixed-bed \u2014 chosen by what needs to leave.' },
          { title: 'Vessel grade', body: 'FRP for residential. SS316 for premium and institutional.' },
          { title: 'Regeneration', body: 'Manual on simple installs. Brine-automatic on larger loads.' },
        ],
        infographic: undefined,
      };
    case 'industrial-skid':
      return {
        headline: 'Skid-mounted, instrumented, serviceable.',
        body:
          'Industrial systems ship as pre-piped skids with pressure gauges, flow meters, and a single-line diagram on every quote.',
        cards: [
          { title: 'Skid', body: 'Pre-piped, factory-tested, transported as one unit.' },
          { title: 'Instrumentation', body: 'Pressure, flow, conductivity at every relevant stage.' },
          { title: 'Bypass', body: 'For service. Built in, not bolted on.' },
        ],
        infographic: undefined,
      };
  }
}

function getTechSpecs(solution: Solution) {
  // Defaults — per-solution overrides could live in content/solutions.ts in v1.1.
  return {
    capacity: [
      {
        label: 'Capacity range',
        value:
          solution.slug === 'whole-house-water-filter'
            ? '2,000 \u2014 6,000 LPH'
            : solution.slug === 'drinking-water-solution'
            ? '15 \u2014 100 LPH'
            : '500 \u2014 6,000 LPH (sized per bathroom or whole-house)',
      },
      { label: 'Service flow', value: 'Sized to peak household draw' },
      { label: 'Backwash flow', value: '1.5\u00d7 service flow' },
    ],
    materials: [
      { label: 'Vessel', value: 'FRP / SS316 (Plastic or Stainless Steel)' },
      { label: 'Media', value: 'Per-solution — selected at survey' },
      { label: 'Internal piping', value: 'CPVC / SS316' },
    ],
    controls: [
      { label: 'Mode', value: 'Manual or Automatic' },
      { label: 'Regeneration', value: 'Timer-based or volumetric on Automatic models' },
      { label: 'Indicators', value: 'Pressure gauges; flow indicator on Automatic models' },
    ],
    install: [
      { label: 'Inlet pressure', value: '1.5 \u2014 4.5 kg/cm\u00b2' },
      { label: 'Power', value: '230V AC for Automatic models; none for Manual' },
      { label: 'Drain', value: 'Adjacent to install location' },
      { label: 'Space', value: 'Sized per configuration; see install diagram' },
    ],
  };
}

// Per-installContext answer to "How long does installation take?" The
// previous single binary branched only on whole-house-water-filter and
// gave the bathroom-day answer for iron / softener / sediment / carbon,
// which all ship whole-house variants too.
function getInstallDurationAnswer(solution: Solution): string {
  switch (solution.installContext) {
    case 'bathroom-five-places':
      return 'Most bathroom installs complete in a single day. Larger configurations or wall-recess installs may extend to two days.';
    case 'whole-house-inlet':
      return 'A whole-house install typically takes one to two days. The bulk of the time is in the plumbing, not the equipment.';
    case 'point-of-use':
      return 'A point-of-use kitchen install completes in a half-day. Centralised drinking-water systems for villas or offices take one to two days depending on plumbing.';
    case 'pretreatment-stage':
    case 'specialised-media':
      // Multi-tier products: bathroom variant is a day, whole-house is
      // one to two days. Give both so the visitor self-locates.
      return 'A bathroom install completes in a single day. A whole-house install typically takes one to two days, with most of the time spent on plumbing rather than equipment.';
    default:
      return 'Most home installs complete in one to two days. The exact timing depends on plumbing complexity and is confirmed at the survey.';
  }
}

function getFaqs(solution: Solution) {
  return [
    {
      q: 'Do I need to know my TDS or hardness before booking a survey?',
      a: 'No. The survey includes a free water test on the spot. The engineer takes the reading and walks you through what it means before any quote.',
    },
    {
      q: 'How long does installation take?',
      a: getInstallDurationAnswer(solution),
    },
    {
      q: 'What if my supply chemistry changes over the years?',
      a: 'Monthly service includes parameter testing. If the chemistry drifts \u2014 borewells often do over years \u2014 we recalibrate media, regeneration cycles, and dosing.',
    },
    {
      q: 'Can I see what the system would cost before the survey?',
      a:
        solution.priceFromINR
          ? `${solution.navLabel.charAt(0).toUpperCase() + solution.navLabel.slice(1)} starts at ${formatINR(solution.priceFromINR)} (MRP inclusive of 18% GST). Final price is set after the free survey, based on your specific water and home.`
          : 'We publish "starting from" ranges on the relevant pages. Final price is set after the free survey, based on your specific water and home.',
    },
    {
      q: 'Is the AMC included? What does it cover?',
      a: 'Year one of AMC is included with every install. Standard tier is quarterly, Comprehensive is monthly. Both include parameter testing, media inspection, and a same-day written report.',
    },
  ];
}
