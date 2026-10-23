import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

/**
 * Service is the system — inverse-navy section.
 * Per Blueprint §6.8.
 *
 * "Most defensible thing Uniwater has against competitors."
 * Uses catalogue voice directly.
 */

const SERVICE_PILLARS = [
  {
    title: 'Automated.',
    body: 'Backwash, regeneration and flush run on a timer. Nobody has to turn a valve.',
  },
  {
    title: 'Verified by an engineer.',
    body: 'A site visit every month: pressure check, media inspection, hardness and iron spot test, and a written report.',
  },
  {
    title: 'Owned by us.',
    body: 'If a part needs replacing or recalibrating, we do it. You don’t chase anyone for parts.',
  },
];

interface Props {
  /** Override the default dark treatment with a light variant.
   *  Used where ServiceSection follows a dark hero and would
   *  otherwise create a D D adjacency (e.g. /service). */
  light?: boolean;
}

export function ServiceSection({ light = false }: Props = {}) {
  const inverse = !light;
  return (
    <Section
      tone={light ? 'subtle' : 'inverse'}
      padding="loose"
      image={light ? undefined : { stem: 'utility' }}
    >
      <div className="max-w-3xl mb-8 md:mb-12">
        <Eyebrow inverse={inverse} className="mb-5">Service</Eyebrow>
        <Heading level={2} inverse={inverse} className="text-display-m md:text-[56px] font-light leading-tight">
          Most water companies come when something breaks. We come every month.
        </Heading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-16 mb-8 md:mb-12">
        {SERVICE_PILLARS.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-4">
            <Heading level={3} inverse={inverse}>{pillar.title}</Heading>
            <Body inverse={inverse} className={inverse ? undefined : 'text-mute'}>{pillar.body}</Body>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button href="/service" variant={inverse ? 'ghost' : 'primary'} size="lg">
          How our service works
        </Button>
        <p className={`text-caption italic ${inverse ? 'text-offwhite/60' : 'text-mute'}`}>
          Service is what keeps a system working in year four.
        </p>
      </div>
    </Section>
  );
}
