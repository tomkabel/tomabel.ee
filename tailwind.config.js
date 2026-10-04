/** @type {import('tailwindcss').Config} */

// Every value resolves to a custom property declared in src/index.css; this
// file only names them. Colours are OKLCH triplets so `/alpha` still works.
const tone = (v) => `oklch(var(--${v}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Replaced, not extended: a stray `rounded-lg` or `text-[10px]` from the
    // default scale should fail to exist rather than drift from the tokens.
    borderRadius: {
      none: '0',
      DEFAULT: 'var(--radius-hair)',
      hair: 'var(--radius-hair)',
      figure: 'var(--radius-figure)',
      control: 'var(--radius-control)',
      card: 'var(--radius-card)',
      full: '9999px',
    },
    fontSize: {
      xs: ['var(--step--1)', { lineHeight: '1.5' }],
      sm: ['var(--step-0)', { lineHeight: '1.55' }],
      base: ['var(--step-1)', { lineHeight: '1.6' }],
      lg: ['var(--step-2)', { lineHeight: '1.6' }],
      xl: ['var(--step-3)', { lineHeight: '1.5' }],
      '2xl': ['var(--step-4)', { lineHeight: '1.3' }],
      '3xl': ['var(--step-5)', { lineHeight: '1.2' }],
      '4xl': ['var(--step-6)', { lineHeight: '1.12' }],
      '5xl': ['var(--step-7)', { lineHeight: '1.08' }],
      '7xl': ['var(--step-8)', { lineHeight: '1.02' }],
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        serif: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      letterSpacing: {
        label: 'var(--tracking-label)',
      },
      colors: {
        sunken: tone('sunken'),
        background: tone('canvas'),
        surface: tone('surface-1'),
        'surface-2': tone('surface-2'),
        'surface-3': tone('surface-3'),
        overlay: tone('overlay'),
        foreground: tone('ink'),
        muted: tone('ink-muted'),
        'muted-foreground': tone('ink-soft'),
        subtle: tone('ink-faint'),
        border: 'var(--line)',
        'border-strong': 'var(--line-strong)',
        accent: tone('signal'),
        'accent-foreground': tone('signal-ink'),
        warning: tone('caution'),
        danger: tone('fault'),
      },
      maxWidth: {
        measure: 'var(--measure)',
        'measure-display': 'var(--measure-display)',
      },
      spacing: {
        section: 'var(--space-section)',
        'section-tight': 'var(--space-section-tight)',
      },
      boxShadow: {
        elevated: 'var(--elevation-rest)',
        'elevated-accent': 'var(--elevation-raised)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--ease-out)',
        out: 'var(--ease-out)',
      },
      transitionDuration: {
        DEFAULT: 'var(--dur-base)',
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      animation: {
        'rise-in': 'rise-in var(--dur-slow) var(--ease-out) both',
        scan: 'scan 1.4s var(--ease-out) infinite',
      },
      keyframes: {
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(250%)' },
        },
      },
    },
  },
  plugins: [],
};
