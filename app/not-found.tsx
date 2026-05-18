import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Lede, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section padding="loose">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6 items-center">
        <Eyebrow>Not found</Eyebrow>
        <Display>This page isn&rsquo;t here.</Display>
        <Lede className="text-mute">
          The page may have moved, or the link may have a typo. Try one of these instead.
        </Lede>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button href="/">Back to home</Button>
          <Button href="/solutions" variant="secondary">
            Browse solutions
          </Button>
          <Button href="/contact" variant="tertiary">
            Contact us
          </Button>
        </div>
      </div>
    </Section>
  );
}
