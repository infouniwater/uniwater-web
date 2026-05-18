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
    body: '20 points per qualified referral. 200 points per ₹50,000 of sales credited. Points redeem for cash, vouchers, or product credit — your call.',
  },
  {
    title: 'Spec packs that survive procurement.',
    body: 'You get the technical PDF, the install diagram, and the price-range card for every solution. So the homeowner who asks "what is this?" gets the right answer the first time.',
  },
  {
    title: 'We handle AMC.',
    body: 'Once the install lands, our engineer takes the monthly service. You earn the referral, the customer gets the discipline, and your relationship with them deepens — without you running the AMC schedule.',
  },
];

const STEPS = [
  { n: '01', title: 'Register.', body: 'Name, mobile, business name, city, service area. Two minutes.' },
  { n: '02', title: 'Refer.', body: 'Bring us a lead — a homeowner with water symptoms, a builder asking about whole-house, a project beginning the plumbing phase.' },
  { n: '03', title: 'Install.', body: 'Our engineer surveys and quotes. You stay in the loop. If the install happens, you handle the plumbing portion or refer to our team — your choice.' },
  { n: '04', title: 'Earn.', body: 'Points credited at install handover. Redemption monthly. Statement of account visible in the partner portal when it ships.' },
];

const FAQS = [
  {
    q: 'What counts as a qualified referral?',
    a: 'A homeowner or builder who confirms the survey appointment and meets with our engineer at site. The lead is yours from that moment, regardless of whether they sign on day one.',
  },
  {
    q: 'When do I get paid?',
    a: 'Points credit at install handover. Redemption requests process monthly — typically the first week of the next month, into the bank account or vouchers you select.',
  },
  {
    q: 'Do I have to do the install plumbing myself?',
    a: 'No. If you prefer to refer and have our team handle the install entirely, the referral points are the same. If you want to do the plumbing as part of your usual scope, our engineer coordinates with you on the day. Either path earns the same.',
  },
  {
    q: 'Can I see my points balance?',
    a: 'Your monthly statement comes by WhatsApp from your assigned partner manager — points balance, referral status, redemption history, all in one message. We send it on the first working day of each month.',
  },
  {
    q: 'What if my referral chooses a competitor?',
    a: 'No penalty. We do not lock referrals into exclusivity. If the homeowner chooses someone else, we close the loop and you keep the relationship for the next referral.',
  },
];

export default function ForPlumbersPage() {
  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 lg:py-24">
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
              <Eyebrow>For plumbers &amp; installers</Eyebrow>
              <Display>Earn for every install you bring us.</Display>
              <Lede className="text-mute">
                A referral program built for the plumbers who already know the home. You bring the lead. We do the survey, the design, the install, and the monthly service. You earn — on day one and across the AMC relationship.
              </Lede>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                <Button href="/contact?audience=plumber">Join the program</Button>
                <Button href="#how-it-works" variant="tertiary">
                  How it works
                </Button>
              </div>
              <Caption className="text-mute mt-2">
                Are you an architect or interior designer?{' '}
                <Link href="/for-architects" className="text-teal underline underline-offset-4">
                  Visit the architect program &rarr;
                </Link>
              </Caption>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Photo
                description="A plumber in branded workwear shaking hands with a Uniwater engineer at a site walkthrough"
                assetRef="for-plumbers-hero"
                aspect="four-five"
              />
            </div>
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
