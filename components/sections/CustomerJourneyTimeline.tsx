/**
 * Customer journey timeline — replaces SVG-004 (public/images/infographics/
 * landscape|portrait/customer-journey.svg).
 *
 * The SVG version used absolute pixel positioning with manual line breaks,
 * which broke on every text edit and clipped at the viewBox edges. This
 * native version uses CSS grid + flexbox so text auto-wraps and spacing
 * stays correct at every breakpoint.
 *
 * Layout:
 *   - Mobile (< md):  vertical stack, 1 column, full width per stage
 *   - Tablet+ (md):   horizontal 5-column timeline with arrow connectors
 *
 * Edit copy directly in STAGES — no positioning math required.
 */

const STAGES: ReadonlyArray<{
  num: string;
  title: string;
  window: string;
  body: string;
  icon: 'clipboard' | 'document' | 'valve' | 'checklist' | 'monitor';
}> = [
  {
    num: '01',
    title: 'Survey',
    window: 'Within 24 hours',
    body: 'Engineer visits, tests water on site, audits plumbing.',
    icon: 'clipboard',
  },
  {
    num: '02',
    title: 'Quote',
    window: 'Within 48 hours',
    body: 'Itemised proposal with system options and BOM.',
    icon: 'document',
  },
  {
    num: '03',
    title: 'Install',
    window: 'Within 7 days',
    body: 'Engineering team installs at agreed location.',
    icon: 'valve',
  },
  {
    num: '04',
    title: 'Handover',
    window: 'Same day',
    body: 'System commissioned. Parameters logged. Walkthrough complete.',
    icon: 'checklist',
  },
  {
    num: '05',
    title: 'Service',
    window: 'Monthly · for life',
    body: 'Engineer returns every month. Parameters checked. Report filed.',
    icon: 'monitor',
  },
];

function StageIcon({ name, className }: { name: typeof STAGES[number]['icon']; className?: string }) {
  // SVG primitives extracted from the original customer-journey.svg. Stroke
  // colour inherits via `color: currentColor` so the parent's text-navy
  // tints the icon to match.
  const common = {
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="6" y="5" width="12" height="16" rx="1.2" {...common} strokeWidth="1.5" />
          <rect x="9" y="3" width="6" height="3.5" rx="0.5" {...common} strokeWidth="1.5" />
          <path d="M8.5 10 L9.5 11 L11.5 9" {...common} strokeWidth="1.3" />
          <line x1="13" y1="10" x2="16" y2="10" {...common} strokeWidth="1.3" />
          <circle cx="9" cy="14" r="0.7" fill="currentColor" />
          <line x1="11" y1="14" x2="16" y2="14" {...common} strokeWidth="1.3" />
          <circle cx="9" cy="17.5" r="0.7" fill="currentColor" />
          <line x1="11" y1="17.5" x2="15" y2="17.5" {...common} strokeWidth="1.3" />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="5" y="3" width="12" height="15" {...common} strokeWidth="1.5" />
          <line x1="7.5" y1="7" x2="14.5" y2="7" {...common} strokeWidth="1.3" />
          <line x1="7.5" y1="10" x2="14.5" y2="10" {...common} strokeWidth="1.3" />
          <line x1="7.5" y1="13" x2="12" y2="13" {...common} strokeWidth="1.3" />
          <circle cx="16" cy="17" r="3" {...common} strokeWidth="1.5" />
          <path d="M14.5 19.5 L14.5 22 L16 21 L17.5 22 L17.5 19.5" {...common} strokeWidth="1.5" />
        </svg>
      );
    case 'valve':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <line x1="2" y1="12" x2="7" y2="12" {...common} strokeWidth="1.5" />
          <line x1="17" y1="12" x2="22" y2="12" {...common} strokeWidth="1.5" />
          <line x1="4" y1="11" x2="4" y2="13" {...common} strokeWidth="1" />
          <line x1="19" y1="11" x2="19" y2="13" {...common} strokeWidth="1" />
          <rect x="7" y="9" width="10" height="6" rx="1" {...common} strokeWidth="1.5" />
          <line x1="12" y1="9" x2="12" y2="4.5" {...common} strokeWidth="1.5" />
          <line x1="9.5" y1="4.5" x2="14.5" y2="4.5" {...common} strokeWidth="1.5" />
        </svg>
      );
    case 'checklist':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="3" y="5" width="18" height="11" rx="1" {...common} strokeWidth="1.5" />
          <line x1="12" y1="16" x2="12" y2="19" {...common} strokeWidth="1.5" />
          <line x1="8" y1="20" x2="16" y2="20" {...common} strokeWidth="1.5" />
          <path d="M5.5 13 L8.5 11 L11 12 L14.5 9 L18.5 8" {...common} strokeWidth="1.4" />
          <line x1="5.5" y1="14.5" x2="18.5" y2="14.5" {...common} strokeWidth="0.7" opacity="0.4" />
        </svg>
      );
    case 'monitor':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="10" r="6" {...common} strokeWidth="1.5" />
          <path d="M9 18.5 L9 21 L15 21 L15 18.5" {...common} strokeWidth="1.5" />
          <line x1="8" y1="21" x2="16" y2="21" {...common} strokeWidth="1.5" />
          <line x1="6.5" y1="10" x2="7.3" y2="10" {...common} strokeWidth="1" />
          <line x1="12" y1="4.5" x2="12" y2="5.3" {...common} strokeWidth="1" />
          <line x1="17.5" y1="10" x2="16.7" y2="10" {...common} strokeWidth="1" />
          <line x1="12" y1="10" x2="15" y2="7" {...common} strokeWidth="1.3" />
          <circle cx="12" cy="10" r="0.8" fill="currentColor" />
        </svg>
      );
  }
}

export function CustomerJourneyTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 gap-x-4 lg:gap-x-6">
      {STAGES.map((stage, i) => {
        const isLast = i === STAGES.length - 1;
        return (
          <div
            key={stage.num}
            className="relative flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Horizontal connector — desktop only, between stages. Sits at the
                vertical centre of the icon circle (top-[58px] = 12px stage-num
                + 4px gap + 28px circle half-height). */}
            {!isLast && (
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-[60px] left-[calc(50%+28px)] right-[-50%] -mr-[28px] border-t border-soft/60"
              />
            )}
            {/* Stage label */}
            <div className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-teal mb-2 md:mb-3">
              Stage {stage.num}
            </div>
            {/* Node circle */}
            <div className="relative w-14 h-14 rounded-full border-2 border-navy bg-offwhite flex items-center justify-center mb-4 z-10 text-navy">
              <StageIcon name={stage.icon} className="w-6 h-6" />
            </div>
            {/* Title */}
            <h3 className="font-sans text-h3 font-normal text-navy mb-1 leading-tight">
              {stage.title}
            </h3>
            {/* Time window */}
            <div className="text-caption font-medium text-navy/85 mb-2">
              {stage.window}
            </div>
            {/* Body — text-wrap balance produces even line breaks across the
                5 columns so no stage looks visually heavier than its peers. */}
            <p className="text-caption text-navy/70 leading-snug [text-wrap:balance]">
              {stage.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
