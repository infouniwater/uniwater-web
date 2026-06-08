import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Lede, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { CONTACT } from '@/content/site';
import { ThankYouConversionFire } from './ThankYouConversionFire';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your enquiry has been received. We respond within one business day.',
  robots: { index: false, follow: true },
};

type Source = 'book-survey' | 'contact' | 'industrial-rfq' | 'remote-site-survey';

const MESSAGES: Record<Source, { eyebrow: string; headline: string; body: string }> = {
  'book-survey': {
    eyebrow: 'Survey requested',
    headline: 'Thank you. We have your details.',
    body: 'An engineer from your nearest city team will call within one business day to confirm the survey window. The visit takes 30 to 60 minutes and includes a free on-site water test. No quote until the survey is done.',
  },
  contact: {
    eyebrow: 'Enquiry received',
    headline: 'Thank you. We will be in touch.',
    body: 'Your enquiry has reached the right inbox. We respond within one business day. For anything urgent, the two phone numbers below get straight to the team.',
  },
  'industrial-rfq': {
    eyebrow: 'RFQ submitted',
    headline: 'Thank you. An engineer is reviewing.',
    body: 'A Uniwater engineer (not a sales rep) will respond within one business day with a single clarifying question or confirmation. A system layout, bill of materials, and price typically follow within five working days. If you have drawings or a water-test report ready to share, email them to support@uniwater.co.in referencing the email address you provided.',
  },
  'remote-site-survey': {
    eyebrow: 'Remote brief submitted',
    headline: 'Thank you. We have your brief.',
    body: 'We respond within 48 hours with a remote design and quote. To complete the picture, please email your bathroom layout, plumbing photos, and (if available) a recent water-test report to support@uniwater.co.in — reference the email address you provided so the brief and the attachments land together.',
  },
};

const DEFAULT_MESSAGE = {
  eyebrow: 'Thank you',
  headline: 'We have your details.',
  body: 'We respond within one business day. If anything is urgent, the two phone numbers below get straight to the team.',
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { source?: string };
}) {
  const source = searchParams.source as Source | undefined;
  const m = source && source in MESSAGES ? MESSAGES[source] : DEFAULT_MESSAGE;

  return (
    <Section padding="loose">
      <ThankYouConversionFire source={source} />
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-5 items-center">
        <Eyebrow>{m.eyebrow}</Eyebrow>
        <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.1] text-navy max-w-[22ch] [text-wrap:balance]">
          {m.headline}
        </h1>
        <Lede className="text-mute mt-1">{m.body}</Lede>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-full">
          <Button href="/" size="lg">Back to home</Button>
          <Button href="/solutions" variant="secondary" size="lg">
            Browse solutions
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-hairline w-full">
          <Body className="text-mute">Prefer to talk to a person?</Body>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            {CONTACT.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-navy hover:text-teal transition-colors duration-200 ease-calm underline underline-offset-4"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
