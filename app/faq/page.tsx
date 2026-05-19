import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede } from '@/components/ui/Typography';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { faqPageSchema, jsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about UNIWATER water systems, survey, install, and service.',
};

const CATEGORIES = [
  {
    title: 'About UNIWATER',
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
        q: 'How is UNIWATER different from Aquaguard, Kent, Eureka Forbes?',
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
        a: 'Within 48 hours of booking, across our nine cities. Faster in Kolkata. The Noida team is being assembled — surveys there run on a 5–7 day window until the local base is fully staffed.',
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
        a: 'BathSoft starts at \u20b914,000 MRP (inclusive of 18% GST) for a Mono Manual Plastic configuration. Top of the range is a Trio Automatic SS at \u20b91,20,000 MRP.',
      },
      {
        q: 'What does a whole-house system cost?',
        a: 'HomeSoft starts at \u20b91,00,000 MRP for a 2K LPH base configuration. A 4K or 6K LPH four-stage train with iron pre-treatment runs higher; the survey decides.',
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
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Questions</Eyebrow>
          <Display>What customers ask before they book.</Display>
          <Lede className="text-mute mt-6">
            Survey, install, pricing, service, AMC, warranty. The answers below cover what most prospective customers want to know in advance.
          </Lede>
        </div>
      </section>

      {CATEGORIES.map((cat, ci) => (
        <Section
          key={cat.title}
          padding="default"
          tone={ci % 2 === 0 ? 'plain' : 'subtle'}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Eyebrow className="mb-4">Category</Eyebrow>
              <Heading level={2}>{cat.title}.</Heading>
            </div>
            <div className="lg:col-span-8">
              <Accordion>
                {cat.items.map((item, ii) => (
                  <AccordionItem key={ii} question={item.q} defaultOpen={ci === 0 && ii === 0}>
                    {item.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
      ))}

      <FinalCTA />
    </>
  );
}
