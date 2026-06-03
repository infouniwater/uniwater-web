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
import { productSchema, faqPageSchema, breadcrumbSchema, serviceSchema, jsonLd } from '@/lib/structured-data';
import { SOLUTION_FAQS } from '@/content/faqs';
import { COMPONENT_MANUFACTURERS, PRIMARY_PHONE_HREF } from '@/content/site';
import { FIVE_PLACES, HOMESOFT_PLACES, DRINKING_PLACES, TDS_DECISION_TREE } from '@/content/education';
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
            serviceSchema({
              name: `${solution.navLabel} — survey, install, and service`,
              description: solution.shortHeadline,
              url: `/solutions/${solution.slug}`,
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

      {/* Breadcrumb strip — light, sits above the dark hero. */}
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: solution.navLabel },
            ]}
          />
        </div>
      </div>

      {/* 1. Hero — image-with-scrim editorial register. The detail
          page's own heroPhoto becomes the full-bleed background;
          if absent, falls back to the Photo placeholder. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[480px] md:h-[600px] lg:h-[calc(100vh-220px)] lg:min-h-[560px] border-b border-offwhite/10">
        {heroPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0">
            <Photo
              description={`Hero — ${solution.navLabel} installed in a finished home`}
              assetRef={`solution-${solution.slug}-hero`}
              aspect="five-six"
              mobileAspect="sixteen-nine"
            />
          </div>
        )}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }}
          aria-hidden="true"
        />

        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[720px] pb-10 lg:pb-0 flex flex-col gap-4">
            {solution.wordmark && (
              <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
                {solution.wordmark}.
              </p>
            )}
            {/* Render the secondary nav-label line only when it adds
                information. Since the wordmarks are now also the nav
                labels (BathSoft / HomeSoft, 2026-06-03), this line
                only appears on solutions WITHOUT a wordmark -- today
                that's just drinking-water-solution, whose label
                "Drinking water systems" is genuinely different from
                anything in the wordmark slot. */}
            {(!solution.wordmark || solution.wordmark !== solution.navLabel) && (
              <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft/80">
                {solution.navLabel}
              </p>
            )}
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              {solution.shortHeadline}
            </h1>
            {solution.priceFromINR && (
              <p className="text-caption text-offwhite/70 mt-1">
                From{' '}
                <span className="text-offwhite font-medium">{formatINR(solution.priceFromINR)}</span>
                . Final price after the free survey.
              </p>
            )}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline gap-5 sm:gap-7 max-w-full">
              <Link
                href={bookSurveyHref}
                className="inline-flex items-center gap-2 self-start whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a free survey
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a href={PRIMARY_PHONE_HREF} className="group inline-flex self-start text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Or call us
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                </span>
              </a>
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

      {/* 3. How we solve it — per-solution labels so the same grid
          frame reads correctly for bathroom / whole-house (chemistry +
          household + architecture) and for drinking-water (TDS +
          household + plumbing — architecture isn't the right lens for
          a kitchen tap). */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>How we solve it</Eyebrow>
          <Heading level={2} inverse>
            {solution.installContext === 'point-of-use'
              ? 'TDS decides the chemistry. The kitchen decides the rest.'
              : 'Sized to the water, the house, and the people in it.'}
          </Heading>
        </div>
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15 max-w-4xl">
          {(solution.installContext === 'point-of-use'
            ? [
                { label: 'TDS', body: 'decides RO vs UF + UV.' },
                { label: 'Household', body: 'decides single tap vs centralised.' },
                { label: 'Plumbing', body: 'decides under-sink vs counter.' },
              ]
            : [
                { label: 'Chemistry', body: 'decides the media.' },
                { label: 'Household', body: 'decides the capacity.' },
                { label: 'Architecture', body: 'decides where it goes.' },
              ]
          ).map((row) => (
            <div key={row.label} className="bg-navy/30 p-6 md:p-8 flex flex-col gap-2">
              <Eyebrow inverse>{row.label}</Eyebrow>
              <p className="text-body md:text-lede text-offwhite leading-snug">{row.body}</p>
            </div>
          ))}
        </div>
        <EditorialAccent inverse className="mt-10 md:mt-14">
          {solution.installContext === 'point-of-use'
            ? 'A water test, not a sales pitch.'
            : 'Engineered, not bought off a shelf.'}
        </EditorialAccent>
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
        <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
          <div className="max-w-2xl mb-10 flex flex-col gap-4">
            <Eyebrow inverse>{installContent.infographic.eyebrow}</Eyebrow>
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
          {getIncludedItems(solution).map((item) => (
            <Card key={item.title}>
              <div className="flex flex-col gap-4">
                {item.icon && (
                  <div className="w-12 h-12 text-teal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/icons/engineer/${item.icon}`}
                      alt=""
                      aria-hidden="true"
                      className="block w-full h-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <h3 className="text-h3 font-normal text-navy">{item.title}</h3>
                <Body className="text-mute leading-snug">{item.body}</Body>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Where it goes -- DARK with image overlay for alternation.
          HIDDEN on drinking-water 2026-06-03 per Rajat: a kitchen RO
          isn't a "place" decision the way BathSoft (5 hidden niches)
          or HomeSoft (5 plant-room sites) are -- the page reads
          cleaner without it. Same skip-condition applies to section
          7 (Configurations) below. */}
      {solution.installContext !== 'point-of-use' && (
      <Section tone="navy" padding="default" image={{ stem: 'utility' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Where it goes</Eyebrow>
          <Heading level={2} inverse>{installContent.headline}</Heading>
          <Body inverse className="text-offwhite/80 mt-2">{installContent.body}</Body>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {installContent.cards.map((card, i) => {
            const photo = installPhotos[i];
            return (
              <div key={i} className="flex flex-col gap-4">
                {photo ? (
                  <div className="w-full overflow-hidden border border-offwhite/15" style={{ aspectRatio: '4 / 3' }}>
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
                  <h3 className="text-h3 font-normal text-offwhite mb-2 [text-wrap:balance]">{card.title}</h3>
                  <Caption inverse>{card.body}</Caption>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      )}

      {/* Section 6b (Architectural install patterns) removed 2026-06-03
          per Rajat. It duplicated the install-location list rendered by
          section 6 "Where it goes" (both ultimately list false ceiling,
          plumbing duct, wall cabinet, niche, under-counter, utility
          room) and added text without adding information. The
          install-drawing SVGs themselves still ship under
          public/images/install-drawings/ for future use elsewhere. */}

      {/* 7. Configurations -- LIGHT. Hidden on drinking-water 2026-06-03
          per Rajat (same skip as section 6): the RO / UF+UV / centralised
          framing is already on every problem band and config subtitle
          via the TDS thresholds, so a separate "Configurations" grid
          duplicates information without adding any. */}
      {solution.installContext !== 'point-of-use' && (
      <Section padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Configurations</Eyebrow>
          <Heading level={2}>
            Three or four sizes. Decided by load, not by SKU.
          </Heading>
          <Body className="text-mute mt-2">
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
      )}
      {/* Sentinel — SolutionStickyCTA appears below the fold past this line. */}
      <div id="solution-sticky-start" aria-hidden="true" />

      {/* 8. Technical specifications — flipped DARK 2026-06-03 as part
          of the re-alternation after section 6b removal. Configurations
          above just went LIGHT, so this can safely go DARK; PDF below
          flips LIGHT in the same pass. */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Eyebrow inverse>Technical specifications</Eyebrow>
            <Heading level={2} inverse>For the architect, plumber, or engineer.</Heading>
            <Body inverse className="text-offwhite/80 mt-2">
              Surface what matters; collapse what doesn&rsquo;t. Open the rows below for the engineering detail.
            </Body>
            <div className="mt-6">
              <Eyebrow inverse className="mb-3">Components from</Eyebrow>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {COMPONENT_MANUFACTURERS.map((mfr) => (
                  <span key={mfr} className="text-caption text-offwhite/85 font-medium">
                    {mfr}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion inverse>
              <AccordionItem inverse question="Capacity & sizing">
                <dl className="mt-2">
                  {techSpecs.capacity.map((row) => (
                    <TechSpecRow inverse key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
              <AccordionItem inverse question="Materials & media">
                <dl className="mt-2">
                  {techSpecs.materials.map((row) => (
                    <TechSpecRow inverse key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
              <AccordionItem inverse question="Controls & regeneration">
                <dl className="mt-2">
                  {techSpecs.controls.map((row) => (
                    <TechSpecRow inverse key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
              <AccordionItem inverse question="Installation requirements">
                <dl className="mt-2">
                  {techSpecs.install.map((row) => (
                    <TechSpecRow inverse key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 9. PDF data sheet download — flipped LIGHT 2026-06-03 as part
          of the re-alternation after section 6b removal. */}
      <Section padding="tight">
        <div className="border border-hairline p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl flex flex-col gap-2">
            <h3 className="text-h2-m md:text-h2 font-light text-navy [text-wrap:balance]">
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

      {/* 10. FAQ — flipped DARK 2026-06-03. Cadence at this point:
          Tech specs (D) -> PDF (L) -> FAQ (D) -> Real installs (L). */}
      <Section tone="navy" padding="default" image={{ stem: 'bathroom' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Eyebrow inverse>Frequently asked</Eyebrow>
            <Heading level={2} inverse>
              What homeowners ask before they book.
            </Heading>
          </div>
          <div className="lg:col-span-8">
            <Accordion inverse>
              {faqs.map((faq, i) => (
                <AccordionItem inverse key={i} question={faq.q} defaultOpen={i === 0}>
                  {faq.a}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 11. Real installs — flipped LIGHT 2026-06-03 as part of the
          re-alternation after section 6b removal. */}
      <Section tone="subtle" padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Real installs</Eyebrow>
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

      {/* 12. Related solutions — flipped DARK 2026-06-03 as part of the
          re-alternation after section 6b removal. SolutionCard already
          supports inverse via the prop added in commit d5a388a. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Related</Eyebrow>
          <Heading level={2} inverse>You may also want to look at &mdash;</Heading>
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
                inverse
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
                  <h3 className="text-h3 font-normal text-navy mb-3 leading-snug">
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

function getInstallDrawingsForSolution(slug: string): InstallDrawing[] {
  switch (slug) {
    case 'bathroom-filter':
      return BATHROOM_DRAWINGS;
    case 'whole-house-water-filter':
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
  if (slug === 'whole-house-water-filter') {
    // Strict 1:1 to HOMESOFT_PLACES (Utility room / Balcony / Terrace /
    // Basement / Custom cabinet). Balcony and Custom cabinet swapped
    // 2026-06-03 per Rajat: the luxury-villa frame reads as the
    // service-door/balcony aesthetic, and the finished-home-corner
    // frame reads as the joinery-cabinet aesthetic.
    return [
      { src: `${PHOTO_BASE}/whole-house-utility-area.jpg`, alt: 'Two branded Uniwater HomeSoft vessels floor-mounted in a finished home utility area beside the washing machine' },
      { src: `${PHOTO_BASE}/whole-house-luxury-villa.jpg`, alt: 'Three branded Uniwater HomeSoft vessels installed against a finished joinery wall on a luxury villa terrace -- balcony-aesthetic service install' },
      { src: `${PHOTO_BASE}/whole-house-terrace.jpg`, alt: 'Two branded Uniwater HomeSoft vessels on a residential terrace, beachfront villas behind' },
      { src: `${PHOTO_BASE}/wtp-basement.jpg`, alt: 'Branded Uniwater HomeSoft train installed in a villa basement plant room with overhead piping and concrete walls' },
      { src: `${PHOTO_BASE}/whole-house-hero.jpg`, alt: 'Branded Uniwater HomeSoft vessels in a custom joinery-grade enclosure in a finished home corner near tall windows and planting' },
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
      return [
        { src: `${PHOTO_BASE}/whole-house-utility-area.jpg`, alt: 'HomeSoft in the utility area', caption: 'Premium apartment, Salt Lake, Kolkata. Utility-room install.' },
        { src: `${PHOTO_BASE}/whole-house-luxury-villa.jpg`, alt: 'HomeSoft in a luxury villa', caption: 'Independent villa, Patia, Bhubaneswar. Basement plant.' },
        { src: `${PHOTO_BASE}/whole-house-terrace.jpg`, alt: 'HomeSoft on the terrace', caption: 'Penthouse, New Town, Kolkata. Terrace install with gravity feed.' },
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
      return 'homesoft';
    case 'drinking-water-solution':
    default:
      return null;
  }
}


// Per-installContext "What's included" lists. Each list keeps the
// generic Installation / Water-analysis / Warranty / AMC lines but
// tailors the vessel-and-media line and the consumables line so each
// solution feels engineered rather than templated. The optional `icon`
// names a file under /images/icons/engineer/ so each card scans
// visually before the body text is read.
interface IncludedItem { title: string; body: string; icon?: string }

function getIncludedItems(solution: Solution): IncludedItem[] {
  // Generic items shared across every install context. Bodies
  // tightened 2026-06-02 -- single sentences, 10-15 words each.
  const installation: IncludedItem = {
    title: 'Installation',
    body: 'Plumbing, electrical, mounting, commissioning. Documented before handover.',
    icon: 'valve.svg',
  };
  const waterAnalysis: IncludedItem = {
    title: 'Water analysis',
    body: 'Pre + post-install parameter readings. Repeated on every visit.',
    icon: 'sample-tube.svg',
  };
  const warranty: IncludedItem = {
    title: 'One-year warranty',
    body: 'All system components covered. Replacement, not repair-by-letter.',
    icon: 'certificate.svg',
  };

  switch (solution.installContext) {
    case 'bathroom-five-places':
      return [
        {
          title: 'Engineered vessel + media',
          body: 'FRP / SS316 cylinders sized to the bathroom feed. Media tuned to your water.',
          icon: 'pressure-gauge.svg',
        },
        {
          title: 'Hidden install accessories',
          body: 'Brackets, finish-panel hardware, access provisions for ceiling / niche / cabinet / under-counter.',
          icon: 'clipboard.svg',
        },
        installation,
        waterAnalysis,
        warranty,
        {
          title: 'One-year AMC',
          body: 'Monthly engineer visit on Comprehensive. Same person, named, for the contract.',
          icon: 'monitor.svg',
        },
      ];
    case 'whole-house-inlet':
      return [
        {
          title: 'Four-stage train',
          body: 'Sediment + iron + carbon + softening. 2K / 4K / 6K LPH per house.',
          icon: 'pressure-gauge.svg',
        },
        {
          title: 'Brine tank + controls',
          body: 'Salt reservoir for softener regeneration. Manual or automatic per configuration.',
          icon: 'brine-tank.svg',
        },
        installation,
        waterAnalysis,
        warranty,
        {
          title: 'One-year AMC',
          body: 'Monthly visit on Comprehensive. Salt top-up rolled in; no separate bill.',
          icon: 'monitor.svg',
        },
      ];
    case 'point-of-use':
      return [
        {
          title: 'Cartridge stack',
          body: 'RO + carbon + UV/UF as your TDS needs. Re-mineralised post-RO.',
          icon: 'pressure-gauge.svg',
        },
        {
          title: 'Dedicated tap + storage',
          body: 'Chrome under-sink tap or centralised reservoir. Food-grade plumbing throughout.',
          icon: 'clipboard.svg',
        },
        installation,
        waterAnalysis,
        warranty,
        {
          title: 'One-year AMC',
          body: 'Cartridge swap + membrane flush + TDS check on every visit.',
          icon: 'monitor.svg',
        },
      ];
    case 'pretreatment-stage':
      return [
        {
          title: 'Media vessel',
          body: 'FRP / SS316 vessel sized to duty cycle. Media chosen at survey.',
          icon: 'pressure-gauge.svg',
        },
        {
          title: 'Backwash valve + drain',
          body: 'Manual or automatic backwash. Drain sized so regeneration never backs up.',
          icon: 'drain.svg',
        },
        installation,
        waterAnalysis,
        warranty,
        {
          title: 'One-year AMC',
          body: 'Monthly visit. Media check, backwash verify, downstream parameter test.',
          icon: 'monitor.svg',
        },
      ];
    case 'specialised-media':
      return [
        {
          title: 'Resin + vessel',
          body: 'SAC resin in FRP / SS316 vessel. Volume sized to peak draw + buffer.',
          icon: 'pressure-gauge.svg',
        },
        {
          title: 'Brine tank',
          body: 'Salt reservoir on regeneration. Salt top-up rolled into the AMC.',
          icon: 'brine-tank.svg',
        },
        installation,
        waterAnalysis,
        warranty,
        {
          title: 'One-year AMC',
          body: 'Monthly visit. Hardness check, regeneration verify, salt top-up.',
          icon: 'monitor.svg',
        },
      ];
    case 'industrial-skid':
      return [
        {
          title: 'Pre-piped skid',
          body: 'Factory-assembled, tested. FRP / SS316 vessels. Internal piping CPVC / SS316.',
          icon: 'pressure-gauge.svg',
        },
        {
          title: 'Instrumentation',
          body: 'Pressure, flow, conductivity. Single-line diagram on every quote.',
          icon: 'monitor.svg',
        },
        installation,
        waterAnalysis,
        warranty,
        {
          title: 'One-year AMC',
          body: 'Institutional cadence. SLA on flagged faults built into the contract.',
          icon: 'clipboard.svg',
        },
      ];
  }
}

function getInstallContent(solution: Solution) {
  switch (solution.installContext) {
    case 'bathroom-five-places':
      return {
        headline: 'Five places it disappears.',
        body:
          'BathSoft is engineered for real Indian bathrooms \u2014 tight shafts, low ceilings, finished interiors. Specified at site survey. Decided before tile.',
        cards: FIVE_PLACES.map((p) => ({ title: p.location, body: p.description })),
        // BathSoft is a single-point bathroom product family. The
        // four-stage HomeSoft infographic belongs to whole-house
        // surfaces, not here -- leaving infographic undefined hides
        // the section on bathroom pages.
        infographic: undefined,
      };
    case 'whole-house-inlet':
      return {
        headline: 'Five places it goes.',
        body:
          'HomeSoft treats every tap from a single point. Five canonical install locations -- decided at survey, against the house.',
        cards: HOMESOFT_PLACES.map((p) => ({ title: p.location, body: p.description })),
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
        // Drinking water has three real install locations -- not five.
        // Bathroom hides in five places; whole-house lives at five
        // plant-room sites; drinking-water sits visible at the kitchen
        // counter, hidden under the sink cabinet, or scales out to a
        // centralised plant. The TDS chemistry decision shows up
        // separately in the infographic below.
        headline: 'Three places it goes.',
        body:
          'A drinking-water system lives at the kitchen tap, or at a centralised plant for the whole building. The chemistry (RO vs UF + UV) is decided by TDS; the place is decided by the kitchen.',
        cards: DRINKING_PLACES.map((p) => ({ title: p.location, body: p.description })),
        infographic: {
          eyebrow: 'TDS decides the chemistry',
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

// Per-solution Q&A that gets prepended to the generic list. Each solution
// gets 1-2 questions specific to that product family so the FAQ never
// reads as a copy-paste across every detail page.
function getSolutionSpecificFaqs(solution: Solution): Array<{ q: string; a: string }> {
  // Iron-filter and water-softener draw their page-local FAQs from
  // content/faqs.ts (the iron-vs-softener / yellow-water question set),
  // so a single FAQ section + a single FAQPage schema render per page.
  const seeded = SOLUTION_FAQS[solution.slug];
  if (seeded) return seeded;

  switch (solution.slug) {
    case 'bathroom-filter':
      return [
        {
          q: 'How does the system stay hidden after the bathroom is finished?',
          a: 'Five canonical install patterns: false ceiling void, plumbing duct, wall cabinet, wall niche, under-counter. The pattern is chosen at site survey, before tile goes down. Once installed, there is no visible vessel on a wall.',
        },
        {
          q: 'Why a per-bathroom system instead of one whole-house system?',
          a: 'Whole-house treatment is the right answer for most homes \u2014 and the right place to spend \u20b91 lakh+. BathSoft makes sense when the architecture is already finished, when only one or two bathrooms have issues, or when the homeowner wants to start with the bathroom they actually use.',
        },
      ];
    case 'whole-house-water-filter':
      return [
        {
          q: 'What are the four stages of the HomeSoft train?',
          a: 'Sediment removes particulate; iron removes dissolved iron and manganese; carbon adsorbs chlorine and organics; softening swaps calcium and magnesium for sodium. Order matters \u2014 sediment first protects everything downstream. Each stage is optional; the four together are the canonical residential build.',
        },
        {
          q: 'How much space does a 2K / 4K / 6K LPH plant need?',
          a: 'A 2K LPH plant fits in about 6\u00d74 ft. A 4K LPH in 8\u00d74 ft. A 6K LPH in 10\u00d75 ft. Plant rooms, utility corners, terraces, garden corners \u2014 five canonical install locations, decided at site survey.',
        },
      ];
    case 'drinking-water-solution':
      return [
        {
          q: 'How do I know whether I need RO or UF + UV?',
          a: 'TDS decides. Above 500 ppm, RO is the right answer \u2014 followed by re-mineralisation so the water doesn\u2019t taste flat. Below 500 ppm, UF + UV preserves natural minerals while removing pathogens. The survey includes a free TDS test on the spot.',
        },
        {
          q: 'What does "re-mineralised post-RO" mean? Is it healthier?',
          a: 'RO strips everything \u2014 including the calcium and magnesium that give water its taste and contribute to mineral intake. A re-mineralisation cartridge after the RO membrane adds back trace minerals at controlled levels. Yes, it\u2019s healthier than bare RO water.',
        },
      ];
    default:
      return [];
  }
}

function getFaqs(solution: Solution) {
  return [
    ...getSolutionSpecificFaqs(solution),
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
