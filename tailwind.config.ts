import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand — per BLUEPRINT §3.1. Locked.
        navy: '#05455F',        // Primary surfaces, headings, dark CTAs
        teal: '#1B9BB4',        // Links, secondary CTAs, accent
        soft: '#87D0CD',        // Decorative, water-flow motion
        tint: '#D5EEF1',        // Section backgrounds, callouts
        // Neutrals — warm, never cool
        offwhite: '#FAFAF7',    // Default page background — dominant ≥60%
        subtle: '#F4F1ED',      // Alternating section background
        ink: '#1F1F1F',         // Body text
        mute: '#555555',        // Secondary text, captions
        hairline: '#E5E1DA',    // Borders, dividers — warm, never cool grey
        // Status — form contexts only
        success: '#2E8B57',
        warning: '#B8860B',
        error: '#B22222',
      },
      fontFamily: {
        // Default sans = ITC Avant Garde Gothic. Carries body copy,
        // H1 (Display), H2, H3 — everything that uses font-sans /
        // the default <body> font.
        sans: ['var(--font-avant)', 'system-ui', 'sans-serif'],
        // UI workhorse = TT Fors. Buttons, nav, eyebrows, captions —
        // apply via `font-ui` class.
        ui: ['var(--font-tt-fors)', 'system-ui', 'sans-serif'],
        // Numeric / data = Signika. TrustStripe stats, DayOneArc cost
        // numbers, anywhere a tabular figure carries the meaning —
        // apply via `font-numeric` class.
        numeric: ['var(--font-signika)', 'system-ui', 'sans-serif'],
        // Editorial accent = Bodoni Moda Italic. Pull-quotes, the
        // price-anchor italic line.
        editorial: ['var(--font-bodoni)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Per BLUEPRINT §3.2 type scale
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.12em' }],
        'caption': ['0.875rem', { lineHeight: '1.4' }],
        'body': ['1.0625rem', { lineHeight: '1.6' }],          // 17px
        'lede': ['1.3125rem', { lineHeight: '1.5' }],          // 21px
        'h3': ['1.375rem', { lineHeight: '1.3' }],             // 22px
        'h3-d': ['1.375rem', { lineHeight: '1.3' }],
        'h2-m': ['1.625rem', { lineHeight: '1.2' }],           // 26px mobile
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],         // 32px desktop
        'h1-m': ['2.25rem', { lineHeight: '1.15' }],           // 36px mobile
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],        // 48px
        'display-m': ['3rem', { lineHeight: '1.05' }],         // 48px mobile
        'display': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }], // 72px
      },
      spacing: {
        // 4-pt baseline — per BLUEPRINT §3.3
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
        '40': '10rem',    // 160px
        '50': '12.5rem',  // 200px
      },
      maxWidth: {
        'container': '1280px',
        'reading': '720px',  // single-column reading max
      },
      transitionTimingFunction: {
        'calm': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '600': '600ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 250ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 30s linear both',
      },
    },
  },
  plugins: [],
};

export default config;
