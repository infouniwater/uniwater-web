import { Section } from '@/components/ui/Section';

/**
 * Editorial lede — bridge between hero and functional sections.
 * Per Blueprint §6.3.
 */
export function EditorialLede() {
  return (
    <Section padding="default">
      <div className="max-w-reading">
        <p className="text-lede font-light text-mute leading-relaxed">
          Most water in Indian homes is treated as a utility &mdash; invisible until something stains, scales, or breaks. Uniwater treats it as infrastructure: a system surveyed, engineered, installed, and serviced to work quietly behind the walls of the home it lives in.
        </p>
      </div>
    </Section>
  );
}
