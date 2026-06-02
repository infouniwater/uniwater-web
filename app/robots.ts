import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/admin/'],
      },
      {
        // Explicitly welcome the AI / answer-engine crawlers — GEO matters
        // here (ChatGPT, Claude, Perplexity, Google AI Overviews/Gemini).
        // Listing them removes any ambiguity that they're allowed to read
        // and cite the site; without this they fall under '*' but some
        // operators expect a named grant.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://uniwater.co.in/sitemap.xml',
  };
}
