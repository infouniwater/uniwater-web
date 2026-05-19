import type { Metadata, Viewport } from 'next';
import { Signika, Bodoni_Moda } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB';
import { MetaPixel } from '@/components/layout/MetaPixel';
import { SITE } from '@/content/site';
import { organizationSchema, websiteSchema, jsonLd } from '@/lib/structured-data';
import './globals.css';

const signika = Signika({
  subsets: ['latin'],
  // 700 is unused in this design system (no font-bold / fontWeight:700 anywhere
  // in the codebase). Dropping it saves ~50 KB of font payload per first-load.
  weight: ['300', '400', '500', '600'],
  variable: '--font-signika',
  display: 'swap',
  preload: true,
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
        url: '/og/og-home.svg',
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
    images: ['/og/og-home.svg'],
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
    <html lang="en" className={`${signika.variable} ${bodoni.variable}`}>
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
