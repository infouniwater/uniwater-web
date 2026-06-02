/**
 * JSON-LD structured-data builders per BLUEPRINT §15.4.
 *
 * Each helper returns a plain object that callers stringify into a
 * <script type="application/ld+json"> tag. Schemas follow schema.org and
 * Google's Rich Results guidance.
 *
 * Site-wide schemas (Organization, WebSite) inject from the root layout.
 * Per-page schemas (LocalBusiness, FAQPage, Article, BreadcrumbList,
 * Product) inject from the relevant page.
 */

import { SITE, CONTACT, NAMED_CLIENTS, SOCIAL_URLS, LAUNCH_FLAGS, CITIES } from '@/content/site';

// All nine service cities, by name — used as the Service `areaServed` so each
// solution declares the full India + Nepal footprint, not just two countries.
const SERVICE_CITY_NAMES = CITIES.map((c) => c.name);

const SITE_URL = 'https://uniwater.co.in';

// --- Site-wide ---

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/uniwater-compact-coloured.png`,
    description: SITE.description,
    foundingDate: '2020',
    slogan: SITE.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.line1,
      addressLocality: CONTACT.address.city,
      postalCode: CONTACT.address.pin,
      addressCountry: 'IN',
    },
    contactPoint: CONTACT.phones.map((phone, i) => ({
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: i === 0 ? 'customer support' : 'sales',
      email: i === 0 ? CONTACT.emails.support : CONTACT.emails.marketing,
      areaServed: ['IN', 'NP'],
      availableLanguage: ['English', 'Hindi', 'Bengali'],
    })),
    areaServed: ['India', 'Nepal'],
    knowsAbout: [
      'Water treatment',
      'Whole-house water filtration',
      'Iron filter',
      'Water softener',
      'Reverse osmosis',
      'Building water-treatment plant',
    ],
    // Populated from SOCIAL_HANDLES once handles are claimed. Gated on
    // LAUNCH_FLAGS.showSocial so we don't tell Google our official sameAs
    // URLs are placeholder accounts that don't post anything.
    sameAs: (LAUNCH_FLAGS.showSocial ? SOCIAL_URLS : []) as readonly string[],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE_URL}#organization` },
    inLanguage: 'en-IN',
  };
}

// --- Per-page ---

export function localBusinessSchema(opts: {
  cityName?: string;
  citySlug?: string;
  /** Localities served from this city — appended to areaServed. */
  localities?: readonly string[];
}) {
  const id = opts.citySlug ? `${SITE_URL}/cities/${opts.citySlug}#localbusiness` : `${SITE_URL}#localbusiness`;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': id,
    name: opts.cityName ? `Uniwater — ${opts.cityName}` : SITE.name,
    image: `${SITE_URL}/images/installs/hero-duo-iron-softener-ss316.jpg`,
    url: opts.citySlug ? `${SITE_URL}/cities/${opts.citySlug}` : SITE_URL,
    telephone: CONTACT.phones[0],
    email: CONTACT.emails.support,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.line1,
      addressLocality: opts.cityName ?? CONTACT.address.city,
      postalCode: opts.cityName ? undefined : CONTACT.address.pin,
      addressCountry: 'IN',
    },
    areaServed: opts.cityName
      ? [opts.cityName, ...(opts.localities ?? [])]
      : ['India', 'Nepal'],
    priceRange: '₹₹₹',
    parentOrganization: { '@id': `${SITE_URL}#organization` },
  };
}

export function faqPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', '@id': `${SITE_URL}#organization`, name: SITE.name },
    publisher: { '@id': `${SITE_URL}#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    timeRequired: `PT${post.readingMinutes}M`,
    inLanguage: 'en-IN',
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  /** Optional steps for HowTo-style enrichment (e.g. survey → design → install → service). */
  steps?: Array<{ name: string; text: string }>;
}) {
  const fields: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith('http') ? opts.url : `${SITE_URL}${opts.url}`,
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: SERVICE_CITY_NAMES,
    serviceType: 'Water treatment design, installation, and service',
  };
  if (opts.steps && opts.steps.length > 0) {
    fields.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${opts.name} — process`,
      itemListElement: opts.steps.map((step, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: step.name,
          description: step.text,
        },
      })),
    };
  }
  return fields;
}

export function productSchema(opts: {
  name: string;
  slug: string;
  description: string;
  priceFromINR?: number;
}) {
  const fields: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    brand: { '@type': 'Brand', name: SITE.name },
    url: `${SITE_URL}/solutions/${opts.slug}`,
    category: 'Water treatment system',
  };
  if (opts.priceFromINR) {
    fields.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: opts.priceFromINR,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}#organization` },
    };
  }
  return fields;
}

/**
 * Review schema for /testimonials.
 *
 * Emits an itemReviewed → Organization with one nested Review per quote.
 * Deliberately NO AggregateRating: the site collects no numeric star ratings,
 * and inventing a rating value would be fabrication. When real ratings start
 * arriving at handover, add `reviewRating` per item and an AggregateRating here.
 */
export function reviewSchema(
  reviews: Array<{ quote: string; name: string; org?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE.name,
    url: SITE_URL,
    review: reviews.map((r) => ({
      '@type': 'Review',
      reviewBody: r.quote,
      author: {
        '@type': 'Person',
        name: r.org ? `${r.name}, ${r.org}` : r.name,
      },
      itemReviewed: { '@id': `${SITE_URL}#organization` },
    })),
  };
}

/**
 * Helper to render an array of schemas as a single JSON-LD script payload.
 * Use as: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([schemaA, schemaB]) }} />
 */
export function jsonLd(schemas: unknown[] | unknown): string {
  const arr = Array.isArray(schemas) ? schemas : [schemas];
  return JSON.stringify(arr.length === 1 ? arr[0] : arr);
}
