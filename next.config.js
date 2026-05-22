/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // TODO Sprint 1: configure Cloudinary CDN domain when image pipeline is in place
    remotePatterns: [],
    // AVIF first (30-50% smaller than WebP on photographs) — Next emits a
    // <picture> with AVIF + WebP + JPG fallbacks; modern browsers pick AVIF.
    formats: ['image/avif', 'image/webp'],
    // Cache the optimised variant for 30 days at the Vercel edge.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Production security headers + cache-control. Vercel applies its own
  // CDN cache for /_next/static and /_next/image; we add immutable-cache
  // headers for /images and /downloads so a year-long browser-cache is
  // permitted on the photography + catalogue PDFs (filenames are
  // versioned implicitly by content — when we re-export a catalogue PDF
  // we bump the filename year).
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    // 'unsafe-eval' is required ONLY in dev — Next.js React-Refresh
    // (HMR) calls eval() to swap modules without a full reload, and
    // without this token the dev runtime crashes silently, leaving
    // every client component stuck at its SSR state (no useEffect, no
    // event handlers). Production builds never call eval(), so the
    // production CSP stays strict.
    const scriptSrc = [
      'script-src',
      "'self'",
      "'unsafe-inline'",
      isDev && "'unsafe-eval'",
      'https://connect.facebook.net',
    ].filter(Boolean).join(' ');

    const securityHeaders = [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "img-src 'self' data: https:",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          // 'unsafe-inline' needed for Next's hydration boundary + the JSON-LD <script>
          // tags written via dangerouslySetInnerHTML. Replace with a per-request
          // nonce once GA4/GTM is wired and we move to a strict CSP.
          // Meta Pixel loads from connect.facebook.net and posts events to
          // www.facebook.com/tr (handled by connect-src + img-src https:).
          scriptSrc,
          "connect-src 'self' https://wa.me https://*.odoo.com https://connect.facebook.net https://www.facebook.com",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self' https://wa.me",
        ].join('; '),
      },
    ];
    const longCacheImmutable = [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ];
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/images/:path*', headers: longCacheImmutable },
      { source: '/downloads/:path*', headers: longCacheImmutable },
      { source: '/brand/:path*', headers: longCacheImmutable },
      { source: '/og/:path*', headers: longCacheImmutable },
    ];
  },

  // 301 redirects from legacy slugs per BLUEPRINT §4.2
  async redirects() {
    return [
      {
        source: '/book-water-test',
        destination: '/book-survey',
        permanent: true,
      },
      {
        source: '/solutions/practical-particle-filter',
        destination: '/solutions/sediment-filter',
        permanent: true,
      },
      {
        // Arsenic filter retired — handled by drinking-water (kitchen RO with
        // arsenic-specific stage) per the master catalogue. Preserves any
        // inbound traffic from the old slug.
        source: '/solutions/arsenic-filter',
        destination: '/solutions/drinking-water-solution',
        permanent: true,
      },
      {
        // Covers /cities/water-softener-bangalore, ...kolkata, ...bhubaneswar etc.
        source: '/cities/water-softener-:city',
        destination: '/cities/:city',
        permanent: true,
      },
      {
        // Bangalore decommissioned — nearest replacement city is Noida (NCR,
        // also high-hardness, also a high-rise residential market).
        source: '/cities/bangalore',
        destination: '/cities/noida',
        permanent: true,
      },
      {
        source: '/cities/water-softener-bangalore',
        destination: '/cities/noida',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
