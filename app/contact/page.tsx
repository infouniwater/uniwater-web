import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { TextField, TextArea } from '@/components/ui/Form';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { AudiencePrefill } from '@/components/forms/AudiencePrefill';
import { CONTACT, CITIES } from '@/content/site';
import { submitContact } from '@/app/actions/leads';
import { localBusinessSchema, jsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to UNIWATER. Two phones, two emails, head office in Kolkata. Nine cities across India and Nepal.',
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema({})) }}
      />
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Talk to us</Eyebrow>
          <Display>Let&rsquo;s begin.</Display>
          <Lede className="text-mute mt-6">
            Two phones, two emails, head office in Kolkata. Service teams in nine cities. We respond within one business day.
          </Lede>
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
                <h2 className="text-h2-m font-light text-navy mb-2">General enquiry</h2>
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
