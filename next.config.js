/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // TODO Sprint 1: configure Cloudinary CDN domain when image pipeline is in place
    remotePatterns: [],
  },

  // Production security headers — applied site-wide. CSP is permissive
  // for now to accommodate inline JSON-LD scripts and Next's hydration
  // boundary scripts; tighten with a nonce-based policy once GA4/GTM ship.
  async headers() {
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
          "script-src 'self' 'unsafe-inline'",
          "connect-src 'self' https://wa.me https://*.odoo.com",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self' https://wa.me",
        ].join('; '),
      },
    ];
    return [
      { source: '/(.*)', headers: securityHeaders },
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
    ];
  },
};

module.exports = nextConfig;
