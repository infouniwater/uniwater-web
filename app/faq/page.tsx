import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede } from '@/components/ui/Typography';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { faqPageSchema, jsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Uniwater water systems, survey, install, and service.',
};

const CATEGORIES = [
  {
    title: 'About Uniwater',
    items: [
      {
        q: 'Are you a water-purifier brand?',
        a: 'No. We&rsquo;re an engineered home water company \u2014 surveys, installs, and monthly service of water systems sized to your specific home and water. We don\u2019t sell off-the-shelf kitchen RO.',
      },
      {
        q: 'Where do you operate?',
        a: 'Seven cities in India (Kolkata, Bhubaneswar, Ranchi, Rourkela, Siliguri, Guwahati, Noida) and two in Nepal (Kathmandu, Biratnagar). Service teams in every city, not subcontracted.',
      },
      {
        q: 'How is Uniwater different from Aquaguard, Kent, Eureka Forbes?',
        a: 'Those are mass-market kitchen purifier brands. We sit in the gap between them and industrial EPC firms: bathroom-level, whole-house, drinking-water, and building-scale systems, surveyed and serviced monthly.',
      },
    ],
  },
  {
    title: 'Survey, design, install',
    items: [
      {
        q: 'Is the survey free?',
        a: 'Yes. An engineer visits your home with a water-testing kit, runs the test, walks you through the results, and proposes a system. No quote is sent without a survey.',
      },
      {
        q: 'How fast can someone visit?',
        a: 'Within 48 hours of booking, across our nine cities. Faster in Kolkata. Newer city teams run on a 5–7 day window while their local base is ramping up.',
      },
      {
        q: 'How long does installation take?',
        a: 'Most residential installs complete in one to two days. Larger whole-house and industrial installs run one to four weeks depending on scope and site readiness.',
      },
      {
        q: 'Do I need to be home for the install?',
        a: 'Someone authorised to make decisions about plumbing and electrical routing should be present. The engineer will need to test every install location before mounting.',
      },
    ],
  },
  {
    title: 'Pricing',
    items: [
      {
        q: 'Why don\u2019t you show exact prices?',
        a: 'Every system is sized to your specific water and home. We show starting-from ranges on the relevant solution pages. Final price is set after the free survey.',
      },
      {
        q: 'What does a bathroom filter cost?',
        a: 'BathSoft Mono starts at \u20b914,000 MRP (inclusive of 18% GST). Duo and Trio configurations scale up from there; tier-wise starting prices are on the bathroom filter page.',
      },
      {
        q: 'What does a whole-house system cost?',
        a: 'HomeSoft starts at \u20b91,00,000 MRP for the 2K LPH base. 4K and 6K LPH four-stage trains with iron pre-treatment scale up; final price is set at survey.',
      },
      {
        q: 'Do you offer EMI?',
        a: 'No. Premium homeowners typically pay outright; we don&rsquo;t want to set up a mass-market financing relationship for what is a long-term service engagement.',
      },
    ],
  },
  {
    title: 'Service & AMC',
    items: [
      {
        q: 'What\u2019s included in the AMC?',
        a: 'Standard tier: quarterly preventive visits with documented reports. Comprehensive: monthly preventive visits. Premium: monthly plus named engineer, customer portal access, 12-hour flagged-fault SLA. Year one is included with every install.',
      },
      {
        q: 'What does a service engineer actually do?',
        a: 'Parameter testing (TDS, hardness, iron, pH, FRC), backwash verification, salt top-up, resin assessment, pressure-gauge calibration, leak inspection, same-day written report.',
      },
      {
        q: 'How fast do you respond to a fault?',
        a: '24-hour SLA on Comprehensive tier. 12-hour SLA on Premium. Standard tier is on-call with a 48-hour SLA.',
      },
      {
        q: 'What happens if I miss a renewal?',
        a: 'Service ceases at the AMC expiry date. You can renew within 30 days at the standard rate; beyond 30 days, a recommissioning visit is required.',
      },
    ],
  },
  {
    title: 'Warranty & service guarantee',
    items: [
      {
        q: 'What\u2019s the warranty?',
        a: 'One year on all system components from install date. Replacement, not repair-by-letter.',
      },
      {
        q: 'What if my system fails inside the warranty?',
        a: 'We replace the failed component free of charge, on-site, within SLA. The customer keeps the failed component and the replacement documentation.',
      },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = CATEGORIES.flatMap((c) => c.items);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(allFaqs)) }}
      />
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[420px] md:h-[500px] lg:h-[calc(100vh-240px)] lg:min-h-[440px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/utility-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/utility-tablet.jpg" />
          <img src="/images/hero/utility-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Questions</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">What customers ask before they book.</h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Survey, install, pricing, service, AMC, warranty. The answers below cover what most prospective customers want to know in advance.
            </p>
          </div>
        </div>
      </section>

      {/* Categories alternate plain (light) -> navy (dark with image
          overlay) so the page reads as D L D L D L after the dark hero.
          Image stem rotates through the photography family so adjacent
          dark bands don't share a background photo. */}
      {CATEGORIES.map((cat, ci) => {
        // Hero above is D. First category (ci=0) must be LIGHT to
        // alternate; second (ci=1) is DARK; and so on.
        const isDark = ci % 2 === 1;
        const darkStems = ['plant-room', 'utility', 'industrial', 'bathroom'];
        const stem = darkStems[Math.floor(ci / 2) % darkStems.length];
        return (
          <Section
            key={cat.title}
            padding="default"
            tone={isDark ? 'navy' : 'plain'}
            image={isDark ? { stem } : undefined}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 flex flex-col gap-4">
                <Eyebrow inverse={isDark}>Category</Eyebrow>
                <Heading level={2} inverse={isDark}>{cat.title}.</Heading>
              </div>
              <div className="lg:col-span-8">
                <Accordion inverse={isDark}>
                  {cat.items.map((item, ii) => (
                    <AccordionItem inverse={isDark} key={ii} question={item.q} defaultOpen={ci === 0 && ii === 0}>
                      {item.a}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Section>
        );
      })}

      <FinalCTA />
    </>
  );
}
