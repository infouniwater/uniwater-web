import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { CONTACT, CITIES, SITE, WHATSAPP_HREF, COMPANY_REGISTRATION, SOCIAL_HANDLES, LAUNCH_FLAGS } from '@/content/site';

const SOLUTIONS_LINKS = [
  { href: '/solutions/bathroom-filter', label: 'BathSoft' },
  { href: '/solutions/whole-house-water-filter', label: 'HomeSoft' },
  { href: '/solutions/drinking-water-solution', label: 'Drinking water' },
  { href: '/industrial', label: 'Industrial / WTP' },
];

const RESOURCES_LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/why-uniwater', label: 'Why Uniwater' },
  { href: '/water-problem-checker', label: 'Water checker' },
  { href: '/remote-site-survey', label: 'Remote survey' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/blog', label: 'Journal' },
  { href: '/faq', label: 'FAQ' },
  { href: '/for-trade', label: 'For the trade' },
  { href: '/downloads/uniwater-homeowner-catalogue-2026.pdf', label: 'Homeowner catalogue (PDF)', external: true },
  { href: '/downloads/uniwater-commercial-catalogue-2026.pdf', label: 'Commercial catalogue (PDF)', external: true },
];

const ABOUT_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/service', label: 'Service' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-offwhite mt-24">
      <div className="container-uw py-16 md:py-20">
        {/* 2026-05-25 — lg grid widened from cols-5 to cols-12 so each
            link group sits in its own column and the longest labels
            (e.g. "Commercial catalogue (PDF)") get a column wide enough
            to hold them on one line. Previous layout stacked Cities +
            About into the same column, making it 15 items tall — about
            double the height of every other column. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand column */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Logo inverse showTagline />
            <div className="flex flex-col gap-1 text-caption text-offwhite/80">
              <div>{SITE.legalName}</div>
              <div>{CONTACT.address.line1}</div>
              <div>{CONTACT.address.city} {CONTACT.address.pin}</div>
              <div className="mt-2 text-offwhite/60 text-[12px]">
                {/* Double-gate: only render CIN when the flag is on AND
                    the value is real (non-empty). Prevents shipping a
                    placeholder string if showCIN flips before the MCA
                    CIN lands in site.ts. */}
                {LAUNCH_FLAGS.showCIN && COMPANY_REGISTRATION.CIN && (
                  <div>CIN: {COMPANY_REGISTRATION.CIN}</div>
                )}
                <div>GSTIN: {COMPANY_REGISTRATION.GSTIN}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-caption">
              {CONTACT.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
                >
                  {phone}
                </a>
              ))}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
                <span>WhatsApp us</span>
              </a>
              <a
                href={`mailto:${CONTACT.emails.support}`}
                className="text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
              >
                {CONTACT.emails.support}
              </a>
              <a
                href={`mailto:${CONTACT.emails.marketing}`}
                className="text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
              >
                {CONTACT.emails.marketing}
              </a>
            </div>
          </div>

          {/* Solutions column */}
          <div className="lg:col-span-2">
            <h4 className="text-eyebrow font-medium uppercase text-soft mb-5">Solutions</h4>
            <ul className="flex flex-col gap-3 font-ui">
              {SOLUTIONS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column — col-span-3 because labels like
              "Commercial catalogue (PDF)" need the extra width to
              avoid wrapping. */}
          <div className="lg:col-span-3">
            <h4 className="text-eyebrow font-medium uppercase text-soft mb-5">Resources</h4>
            <ul className="flex flex-col gap-3 font-ui">
              {RESOURCES_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      download
                      className="text-caption text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-caption text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Cities column — 2-col sub-grid keeps the 9-city list compact
              vertically (it used to stack 9 tall, dominating the row
              height). */}
          <div className="lg:col-span-2">
            <h4 className="text-eyebrow font-medium uppercase text-soft mb-5">Cities</h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-3 font-ui">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/cities/${city.slug}`}
                    className="text-caption text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About column — moved out of the Cities column 2026-05-25 so
              it gets its own footprint instead of stacking awkwardly
              underneath the 9-city list. */}
          <div className="lg:col-span-2">
            <h4 className="text-eyebrow font-medium uppercase text-soft mb-5">About</h4>
            <ul className="flex flex-col gap-3 font-ui">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-offwhite/80 hover:text-soft transition-colors duration-200 ease-calm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-offwhite/15 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-caption text-offwhite/60">
            &copy; {new Date().getFullYear()} {SITE.legalName}
          </div>
          {LAUNCH_FLAGS.showSocial && (
          <div className="flex items-center gap-5">
            {/* Per-icon double-gate: even when the flag is on, each link
                renders only if its URL in SOCIAL_HANDLES is non-empty.
                So a half-claimed set (e.g. only Instagram up) still
                ships cleanly, no broken-href placeholders. */}
            {SOCIAL_HANDLES.instagram && (
              <a
                href={SOCIAL_HANDLES.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Uniwater on Instagram"
                className="text-offwhite/70 hover:text-soft transition-colors duration-200 ease-calm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            )}
            {SOCIAL_HANDLES.linkedin && (
              <a
                href={SOCIAL_HANDLES.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Uniwater on LinkedIn"
                className="text-offwhite/70 hover:text-soft transition-colors duration-200 ease-calm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5 1.13 1 2.5 1 4.98 2.119 4.98 3.5zM.22 8h4.56v14H.22V8zM7.34 8h4.37v1.91h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.16c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.26V22H7.34V8z"/>
                </svg>
              </a>
            )}
            {SOCIAL_HANDLES.youtube && (
              <a
                href={SOCIAL_HANDLES.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Uniwater on YouTube"
                className="text-offwhite/70 hover:text-soft transition-colors duration-200 ease-calm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12c0 1.9.2 3.8.5 5.8a3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 002.1-2.1c.3-2 .5-3.9.5-5.8a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                </svg>
              </a>
            )}
            {SOCIAL_HANDLES.facebook && (
              <a
                href={SOCIAL_HANDLES.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Uniwater on Facebook"
                className="text-offwhite/70 hover:text-soft transition-colors duration-200 ease-calm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.1 22V12.5H6V8.7h3.1V6c0-3 1.9-4.7 4.6-4.7 1.3 0 2.5.1 2.9.1v3.3h-1.9c-1.5 0-1.8.7-1.8 1.7v2.3h3.6l-.5 3.8h-3.1V22h-3.7z"/>
                </svg>
              </a>
            )}
          </div>
          )}
          <div className="text-caption text-offwhite/60 italic">
            {SITE.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
