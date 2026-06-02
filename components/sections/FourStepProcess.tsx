import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading } from '@/components/ui/Typography';
import { ProcessStep } from '@/components/ui/Card';
import { FOUR_STEPS } from '@/content/education';

const STEP_ICONS: Record<string, { src: string; alt: string }> = {
  '01': { src: '/images/icons/engineer/sample-tube.svg', alt: 'Water sample tube' },
  '02': { src: '/images/icons/engineer/clipboard.svg', alt: 'Design clipboard' },
  '03': { src: '/images/icons/engineer/valve.svg', alt: 'Plumbing valve' },
  '04': { src: '/images/icons/engineer/monitor.svg', alt: 'Service monitor with trend line' },
};

/**
 * Four-step process — Survey / Design / Install / Service.
 * Per Blueprint §6.5 and Strategy §3.3 (one of the five operational truths:
 * "We survey before we sell").
 */
export function FourStepProcess({ id }: { id?: string }) {
  return (
    // 2026-06-02: promoted to dark for strict D L D L D L homepage
    // alternation. The engineer-icon process steps render inverse so
    // the icons sit on navy with offwhite tone.
    <Section padding="default" tone="navy" id={id}>
      <div className="max-w-3xl mb-10 md:mb-14 flex flex-col gap-4">
        <Eyebrow inverse>Our process</Eyebrow>
        <Heading level={2} inverse>What we do.</Heading>
        <div className="text-[16px] md:text-lede text-offwhite/80 font-light flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline mt-2">
          <span>Survey</span>
          <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
          <span>Design</span>
          <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
          <span>Install</span>
          <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
          <span>Service</span>
          <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&mdash;</span>
          <span className="italic">the same team, end to end.</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
        {FOUR_STEPS.map((step) => {
          const icon = STEP_ICONS[step.n];
          return (
            <ProcessStep
              key={step.n}
              n={step.n}
              title={step.title}
              body={step.body}
              iconSrc={icon?.src}
              iconAlt={icon?.alt}
              inverse
            />
          );
        })}
      </div>
    </Section>
  );
}
