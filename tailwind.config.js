/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#0A0A0B',
        surface: '#111114',
        foreground: '#F1F5F9',
        muted: '#94A3B8',
        'muted-foreground': '#64748B',
        subtle: '#475569',
        border: 'rgba(255, 255, 255, 0.05)',
        'border-strong': 'rgba(255, 255, 255, 0.10)',
        accent: '#22C55E',
        'accent-foreground': '#0A0A0B',
        warning: '#F59E0B',
      },
      animation: {
        'caret-blink': 'caret-blink 1.1s steps(2, start) infinite',
        'rise-in': 'rise-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'pulse-dot': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
