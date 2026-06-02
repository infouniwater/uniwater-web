import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body } from '@/components/ui/Typography';
import { CatalogueDownloadCard } from '@/components/ui/CatalogueDownloadCard';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CATALOGUES } from '@/content/site';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Tools, guides, and references for understanding your water and choosing the right system. Download the homeowner and commercial catalogues.',
};

const RESOURCES = [
  {
    href: '/water-problem-checker',
    title: 'Water-problem checker',
    body: 'A 60-second quiz. Tell us what you’ve noticed; get a sized recommendation and the right next step.',
  },
  {
    href: '/remote-site-survey',
    title: 'Remote site survey',
    body: 'For NRI buyers, out-of-city projects, and pre-construction enquiries. Upload your layout and water test.',
  },
  {
    href: '/blog',
    title: 'Journal',
    body: 'Long-form writing on water chemistry, premium home engineering, and the practice of running a water system.',
  },
  {
    href: '/faq',
    title: 'FAQ',
    body: 'Most-asked questions about survey, install, service, AMC, and warranty.',
  },
  {
    href: '/case-studies',
    title: 'Case studies',
    body: 'Where Uniwater systems run today — hospitals, hotels, factories, schools, premium homes.',
  },
  {
    href: '/why-uniwater',
    title: 'Why Uniwater',
    body: 'Brand positioning, what we don’t claim, and a frank decision tree against other categories.',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[400px] md:h-[480px] lg:h-[calc(100vh-260px)] lg:min-h-[420px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/under-counter-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/under-counter-tablet.jpg" />
          <img src="/images/hero/under-counter-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Resources</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">Tools, guides, references.</h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Everything we publish for prospective customers, architects, plumbers, and curious homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogues — premium-brand brochure positioning. Open downloads,
          no email gating. Both catalogues are the 2026 editions used by
          the sales engineers and architect/specifier partners. */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Catalogues</Eyebrow>
          <Heading level={2} className="mb-4">
            The 2026 catalogues, in your hands.
          </Heading>
          <Body className="text-mute">
            Two PDFs that document everything we build, install, and service. Free to download, no form to fill in.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATALOGUES.map((c) => (
            <CatalogueDownloadCard key={c.slug} catalogue={c} />
          ))}
        </div>
      </Section>

      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Tools &amp; references</Eyebrow>
          <Heading level={2}>For homeowners, specifiers, and the curious.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group block bg-offwhite border border-hairline p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
            >
              <h3 className="text-h3 font-semibold text-navy mb-3">{r.title}</h3>
              <Body className="text-mute mb-6">{r.body}</Body>
              <div className="flex items-center gap-2 text-teal text-caption font-medium">
                <span>Open</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
