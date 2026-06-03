import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { TextField, TextArea } from '@/components/ui/Form';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { AudiencePrefill } from '@/components/forms/AudiencePrefill';
import { CONTACT, CITIES } from '@/content/site';
import { submitContact } from '@/app/actions/leads';
import { localBusinessSchema, jsonLd } from '@/lib/structured-data';

export const metadata: Metadata = buildMetadata({
  path: '/contact',
  title: 'Contact',
  description:
    'Talk to Uniwater. Two phones, two emails, head office in Kolkata. Nine cities across India and Nepal.',
  image: '/og/og-home.png',
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema({})) }}
      />
      {/* Hero — image-with-scrim editorial register, contact-as-decision. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[400px] md:h-[480px] lg:h-[calc(100vh-260px)] lg:min-h-[420px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/bathroom-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/bathroom-tablet.jpg" />
          <img
            src="/images/hero/bathroom-mobile.jpg"
            alt="A luxury bathroom drinking-water filter installed beside a freestanding tub."
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
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
          <div className="w-full lg:max-w-[720px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Talk to us</p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">
              Let&rsquo;s begin.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Two phones, two emails, head office in Kolkata. Service teams in nine cities. We respond within one business day.
            </p>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact information */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-3">Phone</div>
              {CONTACT.phones.map((phone) => (
                <div key={phone} className="text-h3 mb-1">
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-navy hover:text-teal transition-colors duration-200 ease-calm"
                  >
                    {phone}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-3">Email</div>
              <div className="text-h3 mb-1">
                <a
                  href={`mailto:${CONTACT.emails.support}`}
                  className="text-navy hover:text-teal transition-colors duration-200 ease-calm"
                >
                  {CONTACT.emails.support}
                </a>
              </div>
              <Caption className="text-mute mb-4">General &amp; support</Caption>
              <div className="text-h3 mb-1">
                <a
                  href={`mailto:${CONTACT.emails.marketing}`}
                  className="text-navy hover:text-teal transition-colors duration-200 ease-calm"
                >
                  {CONTACT.emails.marketing}
                </a>
              </div>
              <Caption className="text-mute">Marketing &amp; partnerships</Caption>
            </div>

            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-3">Address</div>
              <div className="text-h3 text-navy">{CONTACT.address.line1}</div>
              <div className="text-h3 text-navy">
                {CONTACT.address.city} {CONTACT.address.pin}
              </div>
            </div>

            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-3">Cities served</div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {CITIES.map((c) => (
                  <span key={c.slug} className="text-caption text-ink">
                    {c.name}
                    {c.country === 'Nepal' && (
                      <span className="text-mute"> (NP)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* General enquiry form */}
          <div className="lg:col-span-7">
            <form action={submitContact} className="bg-offwhite border border-hairline p-8 md:p-10 flex flex-col gap-6">
              <Suspense fallback={null}>
                <AudiencePrefill />
              </Suspense>
              <div>
                <h2 className="font-sans text-h2-m font-light text-navy mb-2">General enquiry</h2>
                <Caption className="text-mute">
                  For a survey booking, use{' '}
                  <a href="/book-survey" className="text-teal underline underline-offset-4">
                    /book-survey
                  </a>
                  . For a B2B RFQ, use{' '}
                  <a href="/industrial#rfq" className="text-teal underline underline-offset-4">
                    /industrial
                  </a>
                  .
                </Caption>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField label="Name" name="name" required />
                <TextField label="Email" name="email" type="email" required />
                <TextField label="Mobile" name="mobile" type="tel" className="md:col-span-2" />
                <TextField label="Subject" name="subject" required className="md:col-span-2" />
                <TextArea label="Message" name="message" required rows={6} className="md:col-span-2" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <Caption className="text-mute">We respond within one business day.</Caption>
                <SubmitButton>Send message</SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
