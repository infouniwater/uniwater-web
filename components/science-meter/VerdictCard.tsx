import Link from 'next/link';
import { Caption } from '@/components/ui/Typography';
import type { Technology, Tier } from '@/content/science-meter';
import { TIER_META, EVIDENCE_LABEL } from '@/content/science-meter';

/** Tier icons — text label + icon carry the verdict so it reads without colour. */
function TierIcon({ icon }: { icon: 'check' | 'eye' | 'cross' }) {
  const props = { width: 15, height: 15, viewBox: '0 0 16 16', fill: 'none' } as const;
  if (icon === 'check') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === 'eye') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M1 8s2.6-4.3 7-4.3S15 8 15 8s-2.6 4.3-7 4.3S1 8 1 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="8" cy="8" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg {...props} aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const TIER_CLASS: Record<Tier, string> = {
  passed: 'text-teal border-teal/40 bg-teal/5',
  grey: 'text-ink border-hairline bg-subtle',
  failed: 'text-navy border-navy/25 bg-offwhite',
};

export function VerdictCard({ tech }: { tech: Technology }) {
  const meta = TIER_META[tech.tier];
  return (
    <article className="h-full bg-offwhite border border-hairline p-6 md:p-7 flex flex-col gap-4">
      <h3 className="text-h3 font-medium text-navy leading-snug [text-wrap:balance]">{tech.name}</h3>

      <span
        className={`self-start inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-eyebrow font-medium uppercase tracking-wide ${TIER_CLASS[tech.tier]}`}
      >
        <TierIcon icon={meta.icon} />
        {meta.label}
      </span>

      <p className="text-body text-mute leading-relaxed">{tech.verdict}</p>

      <div className="mt-auto pt-4 border-t border-hairline flex flex-col gap-2">
        <Caption className="text-mute">
          <span className="text-ink font-medium">What it does &mdash; </span>
          {tech.whatItDoes}
        </Caption>
        <Caption className="text-mute">
          {EVIDENCE_LABEL[tech.evidenceStrength]} &middot; {tech.indicativeStudyVolume}
        </Caption>
        {tech.uniwaterLink && (
          <Link
            href={tech.uniwaterLink}
            className="mt-1 inline-flex items-center gap-1.5 text-teal text-caption font-medium"
          >
            See how we engineer it
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M11 7 7 3M11 7l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}
