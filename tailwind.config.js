/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk Variable"', '"Geist Variable"', 'system-ui', 'sans-serif'],
        // "Commit Mono" activates automatically once self-hosted (see PR notes);
        // until then it falls through to JetBrains Mono with no visual regression.
        mono: ['"Commit Mono"', '"JetBrains Mono Variable"', 'monospace'],
        serif: ['"Newsreader Variable"', 'Charter', 'Georgia', 'serif'],
      },
      colors: {
        // Engineered multi-tier dark surface system — no pure black, so white
        // body text never halates against a #000 void. Each layer steps up in
        // luminance to read as elevation rather than a flat plane.
        background: '#0A0B0D', // Layer 0 — canvas
        surface: '#111318', // Layer 1 — resting cards / strips
        'surface-2': '#171A21', // Layer 2 — hovered / elevated cards
        foreground: '#F2F4F8',
        muted: '#A2AAB8', // lifted for APCA on the darker canvas
        'muted-foreground': '#8B94A4',
        subtle: '#6C7788',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.14)',
        // Single precision phosphor accent, reserved for semantic signals and
        // focus. Sharper and higher-contrast than the old #22C55E; no glow.
        accent: '#34D399',
        'accent-foreground': '#04130D',
        warning: '#F5B544',
        danger: '#F87171', // integrity-mismatch / destructive signal only
      },
      boxShadow: {
        // Specular top highlight + diffused depth, tuned for dark surfaces.
        elevated: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 8px 30px -12px rgba(0,0,0,0.7)',
        'elevated-accent': 'inset 0 1px 0 0 rgba(52,211,153,0.14), 0 18px 44px -18px rgba(0,0,0,0.85)',
      },
      animation: {
        'rise-in': 'rise-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
      keyframes: {
        'caret-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
