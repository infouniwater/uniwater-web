import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Signika, Bodoni_Moda } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB';
import { MetaPixel } from '@/components/layout/MetaPixel';
import { SITE } from '@/content/site';
import { organizationSchema, websiteSchema, jsonLd } from '@/lib/structured-data';
import './globals.css';

// ITC Avant Garde Gothic — primary display + body face (2026-05-26).
// Self-hosted from /public/fonts/avant-garde/. Four weights cover the
// design system's 400 (Book) / 500 (Medium) / 600 (Demi) / 700 (Bold)
// scale; font-light (300) falls back to Book (400) since this licence
// pack didn't ship a Light cut.
const avantGarde = localFont({
  src: [
    { path: '../public/fonts/avant-garde/avant-garde-book.otf',   weight: '400', style: 'normal' },
    { path: '../public/fonts/avant-garde/avant-garde-medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/avant-garde/avant-garde-demi.otf',   weight: '600', style: 'normal' },
    { path: '../public/fonts/avant-garde/avant-garde-bold.otf',   weight: '700', style: 'normal' },
  ],
  variable: '--font-avant',
  display: 'swap',
  preload: true,
});

// TT Fors — UI workhorse for buttons, nav, eyebrows, captions.
// Self-hosted variable font (single file covers every weight).
const ttFors = localFont({
  src: [
    { path: '../public/fonts/tt-fors/tt-fors-variable.ttf', style: 'normal' },
  ],
  variable: '--font-tt-fors',
  display: 'swap',
  preload: true,
});

// Signika — kept for numeric / data surfaces (TrustStripe stats,
// DayOneArc cost numbers). Tabular-friendly digits.
const signika = Signika({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-signika',
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  variable: '--font-bodoni',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://uniwater.co.in'),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  // Canonical is emitted per-route by middleware.ts via an HTTP `Link`
  // header (read by Google Search). Not declared statically here, because
  // Next.js would otherwise resolve a root-level alternates.canonical to
  // the same URL on every child route — actively harmful for SEO.
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: 'https://uniwater.co.in',
    siteName: SITE.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/og/og-home.png'],
  },
  // Favicon + apple-icon are auto-discovered by Next.js from app/icon.svg and
  // app/apple-icon.png — both point at the official Compact (Coloured) mark.
};

export const viewport: Viewport = {
  themeColor: '#FAFAF7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${avantGarde.variable} ${ttFors.variable} ${signika.variable} ${bodoni.variable}`}>
      <head>
        {/* Site-wide JSON-LD per BLUEPRINT §15.4 — Organization + WebSite. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd([organizationSchema(), websiteSchema()]) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-navy focus:text-offwhite focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <MetaPixel />
      </body>
    </html>
  );
}
