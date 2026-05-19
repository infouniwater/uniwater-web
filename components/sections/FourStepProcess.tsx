import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
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
    <Section padding="default" tone="plain" id={id}>
      <div className="max-w-3xl mb-8 md:mb-12">
        <Eyebrow className="mb-4">Our process</Eyebrow>
        <Heading level={2} className="mb-4">What we do.</Heading>
        <Body className="text-mute text-lede font-light">
          From first water test to monthly service, the same UNIWATER team owns the system.
        </Body>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8">
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
            />
          );
        })}
      </div>
    </Section>
  );
}
