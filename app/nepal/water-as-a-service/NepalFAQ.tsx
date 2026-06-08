import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { faqPageSchema, jsonLd } from '@/lib/structured-data';

/**
 * Six DWaaS-specific FAQs rendered as a native <details>/<summary>
 * accordion (no client state required) plus a matching FAQPage
 * JSON-LD block so the same Q&As are machine-readable for Google's
 * rich-results surface.
 *
 * Every Q&A is grounded in already-published content on the page
 * (deposit refundable -> Terms; named engineer -> What's included;
 * cities list -> Service area; bill formula -> CompactPlansTable
 * footer). The rendered text and the JSON-LD body MUST stay in
 * lock-step or Google flags the structured data as inaccurate -- the
 * NEPAL_FAQS array below is the single source of truth.
 */

interface FaqEntry {
  q: string;
  a: string;
}

const NEPAL_FAQS: ReadonlyArray<FaqEntry> = [
  {
    q: 'Do I have to buy any equipment?',
    a:
      'No. Uniwater installs and owns the plant on your premises. You pay a refundable security deposit, not capital expenditure.',
  },
  {
    q: 'Is the security deposit really refundable?',
    a:
      'Yes — it is refunded in full when the contract ends, subject to the plant being returned in working condition.',
  },
  {
    q: 'How is my monthly bill calculated?',
    a:
      "Monthly bill = consumption × your plan rate, or the plan's minimum bill, whichever is higher. Prices are in NPR, excluding applicable taxes.",
  },
  {
    q: 'Who maintains the system?',
    a:
      'A named engineer visits every month to backwash, inspect media, spot-test parameters, and leave a written report. If the water stops, we respond 24×7.',
  },
  {
    q: 'What water quality do you check?',
    a:
      'TDS, iron, hardness, and pH are tested at every monthly visit, with a written report each time.',
  },
  {
    q: 'Which areas do you serve?',
    a:
      'Itahari, Biratnagar, Dharan, Damak, Rajbiraj, Lahan, Janakpur, Bardibas, Lalbandi, and Birgunj — with other locations along the East–West Highway corridor on request.',
  },
];

export function NepalFAQ() {
  return (
    <Section padding="default" tone="subtle">
      {/* Structured data -- mirrors NEPAL_FAQS verbatim. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqPageSchema(NEPAL_FAQS.map((f) => ({ q: f.q, a: f.a })))),
        }}
      />

      <div className="max-w-3xl mb-8">
        <Eyebrow className="mb-3">Questions</Eyebrow>
        <Heading level={2}>Six questions buyers ask before they sign.</Heading>
        <Body className="text-mute mt-3">
          The short answers. Tap any question to expand. If something else is
          on your mind, drop it in the lead form&rsquo;s notes field and the
          engineer who calls you back will cover it.
        </Body>
      </div>

      <div className="max-w-3xl flex flex-col gap-2">
        {NEPAL_FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group border border-hairline bg-offwhite open:bg-offwhite open:border-teal/40"
          >
            <summary className="list-none cursor-pointer p-5 md:p-6 flex items-start justify-between gap-4 text-left select-none">
              <span className="font-sans text-body md:text-h3 font-medium text-navy [text-wrap:balance]">
                {faq.q}
              </span>
              <svg
                className="shrink-0 mt-1 transition-transform duration-200 ease-calm group-open:rotate-180 text-teal"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7L9 11L13 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1">
              <Body className="text-mute leading-relaxed">{faq.a}</Body>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
