import { WHATSAPP_HREF_GENERIC } from '@/content/nepal-waas';
import { HeroCTAs } from './HeroCTAs';

/**
 * Fixed bottom CTA bar shown only on mobile (<md breakpoint).
 *
 * The bar's content is the same <HeroCTAs/> primary-pill +
 * secondary-arrow grammar used by the hero and the DM card -- one
 * pattern, three placements. theme="on-light" pairs the teal pill
 * against the offwhite bar background. layout="row" forces the two
 * CTAs onto a single line (the hero's default stack would double the
 * bar height on mobile, which the user can't afford to lose).
 *
 * Safe-area inset: env(safe-area-inset-bottom) is added to the bar's
 * padding so the buttons clear the iOS home indicator. The Nepal
 * page adds a matching pb buffer to its main column so the bar
 * never occludes the last section above the global footer.
 *
 * Replaces the previous single-WhatsApp pill that lived inside
 * WaterAsAServiceClient.tsx (removed there) and the brief dual-
 * button (WhatsApp + Book-a-survey) version this file held earlier.
 */
export function StickyMobileCTABar() {
  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-offwhite border-t border-hairline shadow-[0_-4px_16px_rgba(5,69,95,0.10)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Quick actions"
      role="region"
    >
      <div className="container-uw py-3">
        <HeroCTAs
          theme="on-light"
          layout="row"
          whatsappHref={WHATSAPP_HREF_GENERIC}
          secondaryHref="#lead-form"
          contactPayload={{ source: 'sticky-bar' }}
        />
      </div>
    </div>
  );
}
