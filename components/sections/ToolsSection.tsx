import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';

/**
 * Self-serve tools — surfaced from buried homepage links per Critique §1.7 + Blueprint §6.11.
 */

const TOOLS = [
  {
    label: 'Water-problem checker',
    title: 'Take the 60-second water check.',
    body: 'Tell us what you\u2019ve noticed. Get a sized recommendation and the right next step \u2014 no contact details required until the result.',
    href: '/water-problem-checker',
    cta: 'Start the check',
    photo: 'Hands holding a TDS meter at a kitchen tap',
    assetRef: 'tool-checker',
  },
  {
    label: 'Remote site survey',
    title: 'Out of our cities? Send a remote brief.',
    body: 'Upload your bathroom layout, plumbing photos, and water test report. We respond within 48 hours with a remote design and quote.',
    href: '/remote-site-survey',
    cta: 'Submit a remote brief',
    photo: 'Architectural plan and water test report on a desk',
    assetRef: 'tool-remote',
  },
];

export function ToolsSection() {
  return (
    <Section padding="default" tone="plain">
      <div className="mb-8 md:mb-12 max-w-3xl">
        <Eyebrow className="mb-4">Self-serve</Eyebrow>
        <Heading level={2}>
          You don&rsquo;t have to book a survey to find out where you stand.
        </Heading>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block bg-offwhite border border-hairline transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
          >
            <Photo description={tool.photo} assetRef={tool.assetRef} aspect="sixteen-ten" />
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
              <div className="text-eyebrow font-medium uppercase text-teal">{tool.label}</div>
              <h3 className="text-body sm:text-h2-m md:text-h2 font-semibold sm:font-light text-navy leading-snug">{tool.title}</h3>
              <Body className="text-caption sm:text-body text-mute leading-snug sm:leading-normal">{tool.body}</Body>
              <div className="mt-3 flex items-center gap-2 text-teal text-caption font-medium">
                <span>{tool.cta}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
