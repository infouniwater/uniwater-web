import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading } from '@/components/ui/Typography';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqPageSchema } from '@/lib/structured-data';
import type { Faq } from '@/content/faqs';

/**
 * Reusable inline FAQ block. Renders an accessible disclosure list (via the
 * existing <details>/<summary> Accordion) AND emits FAQPage JSON-LD for its
 * own items, so the schema can never drift from what's on screen.
 *
 * Renders nothing when handed an empty list — safe to drop on any page.
 */
interface FaqSectionProps {
  items: Faq[];
  eyebrow?: string;
  heading?: string;
  /** Dark navy band when true; matches the site's alternating section rhythm. */
  inverse?: boolean;
  /** Optional image stem for the dark-band background texture. */
  imageStem?: string;
}

export function FaqSection({
  items,
  eyebrow = 'Frequently asked',
  heading = 'What homeowners ask before they book.',
  inverse = false,
  imageStem,
}: FaqSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section
      tone={inverse ? 'navy' : 'plain'}
      padding="default"
      image={inverse && imageStem ? { stem: imageStem } : undefined}
    >
      <JsonLd data={faqPageSchema(items)} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
          <Heading level={2} inverse={inverse}>{heading}</Heading>
        </div>
        <div className="lg:col-span-8">
          <Accordion inverse={inverse}>
            {items.map((item, i) => (
              <AccordionItem inverse={inverse} key={i} question={item.q} defaultOpen={i === 0}>
                {item.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
