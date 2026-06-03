'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { SOLUTIONS } from '@/content/solutions';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, WHATSAPP_HREF } from '@/content/site';
import { cn } from '@/lib/cn';

const RESIDENTIAL_LINKS = [
  { slug: 'bathroom-filter', label: 'BathSoft' },
  { slug: 'whole-house-water-filter', label: 'HomeSoft' },
  { slug: 'drinking-water-solution', label: 'Drinking water systems' },
];

/** Items inside the Resources dropdown. PDFs render with `download` so the
 *  browser triggers a save dialog instead of opening the PDF inline — the
 *  catalogues are meant to be saved and shared, not browsed in a new tab. */
const RESOURCES_DROPDOWN = [
  {
    label: 'Homeowner catalogue (PDF)',
    href: '/downloads/uniwater-homeowner-catalogue-2026.pdf',
    download: true,
  },
  {
    label: 'Commercial catalogue (PDF)',
    href: '/downloads/uniwater-commercial-catalogue-2026.pdf',
    download: true,
  },
];

const NAV_ITEMS = [
  { label: 'Solutions', href: '/solutions', hasMega: true },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Why Uniwater', href: '/why-uniwater' },
  { label: 'Resources', href: '/resources', hasDropdown: true },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const onIndustrial = pathname?.startsWith('/industrial') ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  // Mega-menu close debounce. Without this, the trigger's onMouseLeave fires
  // the moment the cursor leaves the small "Solutions ⌄" hit area, and the
  // panel unmounts before the cursor reaches it — so the panel's onMouseEnter
  // never fires. Holding the close for 150ms lets the cursor cross the gap.
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  // Same close-debounce pattern for the Resources dropdown so the cursor
  // can cross the gap between the trigger and the floating panel.
  const resourcesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openResources = () => {
    if (resourcesCloseTimer.current) {
      clearTimeout(resourcesCloseTimer.current);
      resourcesCloseTimer.current = null;
    }
    setResourcesOpen(true);
  };
  const scheduleCloseResources = () => {
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    resourcesCloseTimer.current = setTimeout(() => setResourcesOpen(false), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-200 ease-calm',
        'bg-offwhite/95 backdrop-blur',
        scrolled ? 'border-b border-hairline shadow-[0_2px_8px_rgba(5,69,95,0.04)]' : 'border-b border-transparent'
      )}
    >
      <div className="container-uw flex items-center justify-between h-20 md:h-24">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8 font-ui">
          {NAV_ITEMS.map((item) =>
            item.hasMega ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                <Link
                  href={item.href}
                  className="text-[15px] text-ink hover:text-teal transition-colors duration-200 ease-calm flex items-center gap-1"
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
              </div>
            ) : item.hasDropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openResources}
                onMouseLeave={scheduleCloseResources}
              >
                <Link
                  href={item.href}
                  className="text-[15px] text-ink hover:text-teal transition-colors duration-200 ease-calm flex items-center gap-1"
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                {/* Small floating dropdown panel — opens on hover, closes after
                    a 150ms debounce so the cursor can cross the gap to it. */}
                {resourcesOpen && (
                  <div
                    className="absolute left-0 top-full pt-2 min-w-[280px] animate-fade-in z-50"
                    onMouseEnter={openResources}
                    onMouseLeave={scheduleCloseResources}
                  >
                    <div className="bg-offwhite border border-hairline shadow-[0_8px_24px_rgba(5,69,95,0.08)]">
                      <ul className="py-2">
                        {RESOURCES_DROPDOWN.map((entry) => (
                          <li key={entry.href}>
                            <a
                              href={entry.href}
                              download={entry.download || undefined}
                              className="block px-5 py-3 text-body text-ink hover:bg-tint/40 hover:text-teal transition-colors duration-200 ease-calm"
                            >
                              {entry.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] text-ink hover:text-teal transition-colors duration-200 ease-calm"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <Button href="/book-survey" size="md" className="hidden md:inline-flex rounded-full">
            Book a free survey
          </Button>

          {/* Click-to-call (mobile only, beside menu trigger). 44x44 min tap target. */}
          <a
            href={PRIMARY_PHONE_HREF}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-navy hover:text-teal transition-colors duration-200 ease-calm"
            aria-label={`Call Uniwater on ${PRIMARY_PHONE}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile menu trigger — 44x44 min tap target. */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-navy"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Per-audience off-ramp (B2B pages only) per BLUEPRINT §4.1 + Sprint 1.3. */}
      {onIndustrial && (
        <div className="hidden md:block border-t border-hairline bg-subtle">
          <div className="container-uw flex items-center justify-end gap-6 py-2">
            <span className="text-eyebrow font-medium uppercase text-mute">Are you</span>
            <Link
              href="/for-architects"
              className="text-caption text-ink hover:text-teal transition-colors duration-200 ease-calm"
            >
              An architect &rarr;
            </Link>
            <Link
              href="/for-plumbers"
              className="text-caption text-ink hover:text-teal transition-colors duration-200 ease-calm"
            >
              A plumber &rarr;
            </Link>
            <Link
              href="/for-trade"
              className="text-caption text-ink hover:text-teal transition-colors duration-200 ease-calm"
            >
              A dealer &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Mega menu (desktop) */}
      {megaOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-offwhite border-b border-hairline shadow-[0_8px_24px_rgba(5,69,95,0.08)] animate-fade-in"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
        >
          <div className="container-uw py-10 grid grid-cols-2 gap-12">
            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-5">
                For your home
              </div>
              {/* Single column matches the institutions side. 4 items
                  on each side so the divider + see-more link land at
                  the same horizontal position; the "Service & AMC for
                  homes" entry mirrors the right column's "AMC services
                  for institutions" line. Rajat flagged the earlier
                  3-item left column as visibly short next to the
                  4-item right column 2026-06-03. */}
              <ul className="flex flex-col gap-3">
                {RESIDENTIAL_LINKS.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/solutions/${link.slug}`}
                      className="text-body text-ink hover:text-teal transition-colors duration-200 ease-calm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/service"
                    className="text-body text-ink hover:text-teal transition-colors duration-200 ease-calm"
                  >
                    Service &amp; AMC for homes
                  </Link>
                </li>
              </ul>
              {/* Parallel "see all" link to the right-column equivalent;
                  /residential is the homeowner catalogue overview.
                  Cross-link to CWaaS added 2026-06-04 for society
                  committee members -- CWaaS is not sold to individual
                  homeowners but residential SOCIETIES can subscribe.
                  Keeps the same audience in both menu columns. */}
              <div className="mt-8 pt-6 border-t border-hairline flex flex-col gap-3">
                <Link
                  href="/residential"
                  className="inline-flex items-center gap-2 text-teal text-caption font-medium"
                >
                  See all residential solutions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/clean-water-as-a-service#for-residential-societies"
                  className="inline-flex items-center gap-2 text-mute hover:text-teal text-caption transition-colors duration-200 ease-calm"
                >
                  On a society committee? See CWaaS for societies
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-5">
                For institutions &amp; industry
              </div>

              {/* Hero solution -- CWaaS gets a featured callout card per
                  Rajat 2026-06-04 ("special linkage in navbar"). Sits
                  ABOVE the regular item list so it reads as the headline
                  I&I offering, not just one option among many. Uses the
                  tint background + teal border to mirror the /industrial
                  page's CWaaS teaser visual treatment. */}
              <Link
                href="/clean-water-as-a-service"
                className="group block border border-teal/40 bg-tint/40 p-4 mb-5 transition-all duration-200 ease-calm hover:border-teal hover:bg-tint/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-ui font-medium uppercase tracking-wide text-teal">Hero solution</span>
                    <span className="text-body font-medium text-navy">Clean Water as a Service</span>
                    <span className="text-caption text-mute">Zero capex · Guaranteed spec · Fully managed</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-teal transition-transform duration-200 ease-calm group-hover:translate-x-1">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>

              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/industrial" className="text-body text-ink hover:text-teal transition-colors duration-200 ease-calm">
                    Building &amp; society water plants
                  </Link>
                </li>
                <li>
                  <Link href="/industrial" className="text-body text-ink hover:text-teal transition-colors duration-200 ease-calm">
                    Industrial RO plants
                  </Link>
                </li>
                <li>
                  <Link href="/industrial" className="text-body text-ink hover:text-teal transition-colors duration-200 ease-calm">
                    Industrial DM plants
                  </Link>
                </li>
                <li>
                  <Link href="/service" className="text-body text-ink hover:text-teal transition-colors duration-200 ease-calm">
                    AMC services for institutions
                  </Link>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-hairline">
                <Link
                  href="/industrial"
                  className="inline-flex items-center gap-2 text-teal text-caption font-medium"
                >
                  See industrial &amp; institutional solutions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
      {/* Mobile overlay — rendered OUTSIDE the <header> on purpose. The
          header has backdrop-blur which creates a CSS containing block for
          fixed-positioned descendants, so a `fixed inset-0` overlay placed
          inside <header> would be sized to the 80px header bar, not the
          viewport, and render with zero height. */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="lg:hidden fixed inset-0 top-20 md:top-24 bg-offwhite z-40 overflow-y-auto animate-fade-in"
        >
          <nav aria-label="Mobile primary" className="container-uw py-8 flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.hasMega ? (
                <div key={item.label} className="border-b border-hairline">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-4 text-h3 font-medium text-navy"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileSolutionsOpen((open) => !open)}
                      aria-expanded={mobileSolutionsOpen}
                      aria-controls="mobile-solutions-list"
                      aria-label={mobileSolutionsOpen ? 'Hide solutions list' : 'Show solutions list'}
                      className="p-4 -mr-4 text-mute hover:text-teal transition-colors duration-200 ease-calm"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className={cn('transition-transform duration-200 ease-calm', mobileSolutionsOpen ? 'rotate-180' : 'rotate-0')}
                      >
                        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  {mobileSolutionsOpen && (
                    <ul id="mobile-solutions-list" className="pb-4 flex flex-col gap-2 animate-fade-in">
                      {RESIDENTIAL_LINKS.map((link) => (
                        <li key={link.slug}>
                          <Link
                            href={`/solutions/${link.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 pl-1 text-body text-ink hover:text-teal transition-colors duration-200 ease-calm"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                      <li className="pt-2 mt-2 border-t border-hairline">
                        <Link
                          href="/industrial"
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 pl-1 text-body text-ink hover:text-teal transition-colors duration-200 ease-calm"
                        >
                          Industrial &amp; institutional systems
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              ) : item.hasDropdown ? (
                <div key={item.label} className="border-b border-hairline">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-4 text-h3 font-medium text-navy"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileResourcesOpen((open) => !open)}
                      aria-expanded={mobileResourcesOpen}
                      aria-controls="mobile-resources-list"
                      aria-label={mobileResourcesOpen ? 'Hide resources list' : 'Show resources list'}
                      className="p-4 -mr-4 text-mute hover:text-teal transition-colors duration-200 ease-calm"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className={cn('transition-transform duration-200 ease-calm', mobileResourcesOpen ? 'rotate-180' : 'rotate-0')}
                      >
                        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  {mobileResourcesOpen && (
                    <ul id="mobile-resources-list" className="pb-4 flex flex-col gap-2 animate-fade-in">
                      {RESOURCES_DROPDOWN.map((entry) => (
                        <li key={entry.href}>
                          <a
                            href={entry.href}
                            download={entry.download || undefined}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 pl-1 text-body text-ink hover:text-teal transition-colors duration-200 ease-calm"
                          >
                            {entry.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 border-b border-hairline text-h3 font-medium text-navy"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-6">
              <Button href="/book-survey" size="lg" className="w-full">
                Book a free survey
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t border-hairline flex flex-col gap-3">
              <a
                href={PRIMARY_PHONE_HREF}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-body text-navy hover:text-teal transition-colors duration-200 ease-calm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Call us</span>
                <span className="text-mute text-caption ml-auto">{PRIMARY_PHONE}</span>
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-body text-navy hover:text-teal transition-colors duration-200 ease-calm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
                <span>WhatsApp us</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
