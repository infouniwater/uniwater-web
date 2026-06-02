import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'For plumbers & installers',
  description:
    'Join the Uniwater plumber program. Earn for every install. Spec packs, install-day support, AMC handoff — you do the plumbing, we do the rest.',
};

const BENEFITS = [
  {
    title: 'Earn on every install.',
    body: '20 points per qualified referral. 200 points per ₹50,000 of sales. Cash, vouchers, or product credit — your call.',
  },
  {
    title: 'Spec packs that survive procurement.',
    body: 'Technical PDF, install diagram, price-range card for every solution. The homeowner who asks "what is this?" gets the right answer the first time.',
  },
  {
    title: 'We handle AMC.',
    body: 'Our engineer takes monthly service after handover. You earn the referral; the customer gets the discipline. No AMC schedule to run.',
  },
];

const STEPS = [
  { n: '01', title: 'Register.', body: 'Name, mobile, business, city, service area. Two minutes.' },
  { n: '02', title: 'Refer.', body: 'Bring a homeowner with symptoms, a builder asking about whole-house, or a project at plumbing phase.' },
  { n: '03', title: 'Install.', body: 'Our engineer surveys and quotes. You handle plumbing or refer to our team — your call.' },
  { n: '04', title: 'Earn.', body: 'Points credit at handover. Redemption monthly. Statement by email; partner portal in development.' },
];

const FAQS = [
  {
    q: 'What counts as a qualified referral?',
    a: 'A homeowner or builder who meets our engineer at site. The lead is yours from that moment, sign-day notwithstanding.',
  },
  {
    q: 'When do I get paid?',
    a: 'Points credit at handover. Redemption processes monthly — first week of the following month, into the account or vouchers you select.',
  },
  {
    q: 'Do I have to do the install plumbing myself?',
    a: 'No. Refer-only and refer-plus-plumbing earn the same. Our engineer coordinates on the day either way.',
  },
  {
    q: 'Can I see my points balance?',
    a: 'WhatsApp statement from your partner manager on the first working day of each month — balance, referrals, redemption history.',
  },
  {
    q: 'What if my referral chooses a competitor?',
    a: 'No penalty. No exclusivity. We close the loop; you keep the relationship for the next referral.',
  },
];

export default function ForPlumbersPage() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/plant-room-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/plant-room-tablet.jpg" />
          <img src="/images/hero/plant-room-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">For plumbers &amp; installers</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Earn for every install you bring us.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              A referral program built for the plumbers who already know the home. You bring the lead. We do the survey, the design, the install, and the monthly service. You earn &mdash; on day one and across the AMC relationship.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline gap-5 sm:gap-7 max-w-full">
              <Link
                href="/contact?audience=plumber"
                className="inline-flex items-center gap-2 self-start whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Join the program
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="group inline-flex items-center gap-1.5 self-start text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full"
              >
                <span className="border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  How it works
                </span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <p className="text-caption text-offwhite/65 mt-2">
              Are you an architect or interior designer?{' '}
              <Link href="/for-architects" className="text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30">
                Visit the architect program &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">What you earn</Eyebrow>
          <Heading level={2}>Three things, every install.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <Card key={b.title}>
              <Heading level={3} className="mb-3">{b.title}</Heading>
              <Body className="text-mute">{b.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="default" tone="subtle" id="how-it-works">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">How it works</Eyebrow>
          <Heading level={2}>Register. Refer. Install. Earn.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <div className="text-[56px] md:text-[64px] font-light leading-none text-teal">{step.n}</div>
              <Heading level={3}>{step.title}</Heading>
              <Body className="text-mute">{step.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Frequently asked</Eyebrow>
          <Heading level={2}>What partners ask before they register.</Heading>
        </div>
        <div className="border-t border-hairline">
          {FAQS.map((faq, i) => (
            <details key={i} className="group border-b border-hairline" open={i === 0}>
              <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-h3 font-medium text-navy pr-4">{faq.q}</span>
                <span aria-hidden="true" className="flex-shrink-0 transition-transform duration-250 ease-calm group-open:rotate-45 text-teal">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="pb-6 pr-12 text-body text-ink/85 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
        <Caption className="mt-8 text-mute italic">
          Registration runs via{' '}
          <a href="/contact?audience=plumber" className="text-teal underline underline-offset-4">the contact form</a>{' '}
          — we follow up by WhatsApp with your partner ID and your assigned partner manager.
        </Caption>
      </Section>

      <FinalCTA
        headline="Ready to start earning?"
        sub="Send us your name, mobile, business name, and service area. Your partner manager calls within one business day."
        primaryCTA={{ label: 'Join the program', href: '/contact?audience=plumber' }}
      />
    </>
  );
}
