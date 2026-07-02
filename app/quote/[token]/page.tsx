import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Section } from '@/components/ui/Section';
import { Display, Heading, Eyebrow, Lede, Body, Caption } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Countdown } from './Countdown';

// Per-lead, time-sensitive (live countdown) → always render fresh, never index.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Your Uniwater proposal',
  robots: { index: false, follow: false },
};

// Where the sales app serves the public quote JSON + PDF.
const API_BASE = (process.env.SALES_API_BASE || 'https://crm.uniwater.in').replace(/\/$/, '');

type QuoteLine = { name: string; category: string; quantity: number; total_mrp: number };
type QuoteData = {
  reference: string;
  customer_name: string;
  city: string | null;
  lines: QuoteLine[];
  subtotal_mrp: number;
  gst_amount: number;
  grand_total: number;
  gst_note: string;
  discount_pct: number;
  discounted_total: number;
  savings: number;
  offer_active: boolean;
  expires_at: string | null;
  validity_days: number;
  warranty_note: string;
  has_pdf: boolean;
  status: string;
  pdf_url: string | null;
};

const inr = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN');

async function getQuote(token: string): Promise<QuoteData | null> {
  try {
    const res = await fetch(`${API_BASE}/sales/public/quote/${encodeURIComponent(token)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as QuoteData;
  } catch {
    return null;
  }
}

const FEATURES: { title: string; body: string }[] = [
  { title: 'Water-tested design', body: 'Every system is sized to your actual water report and site survey — not a generic package.' },
  { title: 'Certified installation', body: 'Installed and commissioned by trained Uniwater technicians, with a clean handover and demo.' },
  { title: 'Warranty & AMC', body: 'Manufacturer warranty on all vessels, with optional annual maintenance so it keeps performing.' },
  { title: 'One accountable partner', body: 'Design, supply, installation and service — all from Uniwater, tracked end to end.' },
];

export default async function QuotePage({ params }: { params: { token: string } }) {
  const q = await getQuote(params.token);
  if (!q) notFound();

  const showOffer = q.offer_active && q.discount_pct > 0;

  return (
    <>
      {/* Hero */}
      <Section tone="navy" padding="default">
        <div className="container-uw">
          <Eyebrow inverse>Your Uniwater proposal</Eyebrow>
          <Display className="text-offwhite mt-2">Prepared for {q.customer_name}</Display>
          <Lede inverse className="mt-3">
            {q.city ? `${q.city} · ` : ''}Quotation {q.reference ? `#${q.reference}` : ''} — everything your
            water solution includes, in one place.
          </Lede>
        </div>
      </Section>

      {/* Time-bound offer + countdown (only when the salesman set a discount) */}
      {showOffer && q.expires_at && (
        <Section tone="inverse" padding="tight">
          <div className="container-uw">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <Eyebrow inverse>Limited-time offer</Eyebrow>
                <Heading level={2} inverse className="mt-2">
                  Save {inr(q.savings)} — {Math.round(q.discount_pct)}% off if you confirm this week
                </Heading>
                <Body inverse className="mt-2">
                  Special price <span className="font-numeric">{inr(q.discounted_total)}</span>{' '}
                  <span className="line-through opacity-70">{inr(q.grand_total)}</span> — inclusive of GST.
                </Body>
              </div>
              <div className="shrink-0">
                <Caption inverse className="mb-2">Offer ends in</Caption>
                <Countdown expiresAt={q.expires_at} />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" variant="ghost" size="lg">Confirm my order</Button>
              {q.pdf_url && (
                <Button href={q.pdf_url} variant="tertiary" className="text-offwhite">
                  Download PDF quotation ↓
                </Button>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Quote summary */}
      <Section tone="plain" padding="default">
        <div className="container-uw max-w-reading">
          <Eyebrow>What's included</Eyebrow>
          <Heading level={2} className="mt-2">Your quotation</Heading>

          <div className="mt-6 divide-y divide-hairline border-y border-hairline">
            {q.lines.map((l, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3">
                <div>
                  <Body className="!mb-0">{l.name}</Body>
                  <Caption>{l.category} · Qty {l.quantity}</Caption>
                </div>
                <span className="font-numeric text-body whitespace-nowrap">{inr(l.total_mrp)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex justify-between">
              <Body className="!mb-0 text-mute">Subtotal</Body>
              <span className="font-numeric">{inr(q.subtotal_mrp)}</span>
            </div>
            <div className="flex justify-between">
              <Body className="!mb-0 text-mute">of which GST (18%)</Body>
              <span className="font-numeric text-mute">{inr(q.gst_amount)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-hairline pt-2 mt-2">
              <Heading level={3} className="!mb-0">{showOffer ? 'List total' : 'Grand total'}</Heading>
              <span className={`font-numeric text-h3 ${showOffer ? 'line-through text-mute' : 'text-navy'}`}>
                {inr(q.grand_total)}
              </span>
            </div>
            {showOffer && (
              <div className="flex items-baseline justify-between">
                <Heading level={3} className="!mb-0 text-teal">Your price this week</Heading>
                <span className="font-numeric text-h3 text-teal">{inr(q.discounted_total)}</span>
              </div>
            )}
          </div>

          <Caption className="mt-3">{q.gst_note} Quotation valid for {q.validity_days} days.</Caption>

          <div className="mt-6 flex flex-wrap gap-3">
            {q.pdf_url && (
              <Button href={q.pdf_url} variant="secondary" size="lg">Download PDF quotation</Button>
            )}
            <Button href="/contact" variant="primary" size="lg">Talk to us</Button>
          </div>
        </div>
      </Section>

      {/* Why Uniwater (static site features) */}
      <Section tone="subtle" padding="default">
        <div className="container-uw">
          <Eyebrow>Why Uniwater</Eyebrow>
          <Heading level={2} className="mt-2">What you get with us</Heading>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <Heading level={3}>{f.title}</Heading>
                <Body className="!mb-0 mt-2">{f.body}</Body>
              </Card>
            ))}
          </div>
          {q.warranty_note && <Caption className="mt-6">{q.warranty_note}</Caption>}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="tint" padding="tight">
        <div className="container-uw text-center">
          <Heading level={2}>Ready to move ahead?</Heading>
          <Body className="mt-2">
            {showOffer
              ? 'Lock in your offer before it expires — our team will schedule installation at your convenience.'
              : 'Our team will schedule installation at your convenience.'}
          </Body>
          <div className="mt-5 flex justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg">Confirm my order</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
