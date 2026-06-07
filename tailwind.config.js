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
        radar: {
          bg: '#020203',
          grid: '#1a1a2e',
          signal: '#00D4FF',
          accent: '#F59E0B',
          surface: '#040408',
          'surface-overlay': '#05050f',
          'text-primary': '#F1F5F9',
          'text-secondary': '#94A3B8',
          'text-muted': '#8494A8',
        },
      },
      animation: {
        'radar-draw': 'radar-draw 1.5s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'ring-breathe': 'ring-breathe 3s ease-in-out infinite',
        'strip-card-in': 'strip-card-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
      keyframes: {
        'radar-draw': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ring-breathe': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'strip-card-in': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        '400%': '400% 400%',
      },
    },
  },
  plugins: [],
};
