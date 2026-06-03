import type { CatalogueRef } from '@/content/site';
import { Body, Caption } from '@/components/ui/Typography';

/**
 * Catalogue download card — used on /resources, /residential, /industrial,
 * and anywhere the brochure should be one click away.
 *
 * Uses a plain <a download> so the browser downloads the PDF (instead of
 * opening it in a viewer) and the filename comes from the URL itself —
 * which is why the public path is named cleanly
 * (uniwater-homeowner-catalogue-2026.pdf, etc.).
 */

interface Props {
  catalogue: CatalogueRef;
  /** Use 'dark' on inverse-navy sections so the card reads against navy. */
  scheme?: 'light' | 'dark';
}

export function CatalogueDownloadCard({ catalogue, scheme = 'light' }: Props) {
  const isDark = scheme === 'dark';
  return (
    <a
      href={catalogue.href}
      download
      className={`group flex flex-col gap-5 p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)] ${
        isDark
          ? 'bg-navy/40 border border-offwhite/15'
          : 'bg-offwhite border border-hairline'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border ${
            isDark ? 'border-offwhite/20 text-soft' : 'border-hairline text-teal'
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M15 4v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path
              d="M12 12v6m0 0l-3-3m3 3l3-3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <Caption
            className={`uppercase tracking-wide text-eyebrow font-medium ${
              isDark ? 'text-soft' : 'text-teal'
            }`}
          >
            {catalogue.edition} · PDF · {catalogue.sizeMB} MB
          </Caption>
          <h3
            className={`font-sans text-h3 font-normal leading-snug ${
              isDark ? 'text-offwhite' : 'text-navy'
            }`}
          >
            {catalogue.title}
          </h3>
        </div>
      </div>

      <Body className={isDark ? 'text-offwhite/80' : 'text-mute'}>
        {catalogue.description}
      </Body>

      <div
        className={`mt-auto flex items-center gap-2 text-caption font-medium ${
          isDark ? 'text-soft' : 'text-teal'
        }`}
      >
        <span>Download the catalogue</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200 ease-calm group-hover:translate-y-0.5"
        >
          <path
            d="M7 2v8m0 0l-3-3m3 3l3-3M2 12h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}
