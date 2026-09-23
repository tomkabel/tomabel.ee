import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { FontaineTransform } from 'fontaine';

export default defineConfig({
  plugins: [
    react(),
    FontaineTransform.vite({
      // Metric-matched local fallbacks: kills the font-swap CLS flash. The
      // "<family> fallback" faces this generates are named explicitly in the
      // --font-* stacks in src/index.css, because fontaine cannot see into var().
      fallbacks: {
        'Geist Variable': ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial'],
        'Newsreader Variable': ['Georgia', 'Times New Roman'],
        'Commit Mono': ['Courier New'],
      },
    }),
  ],
  build: {
    outDir: 'pub',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks(id: string) {
          if (id.includes('node_modules/react')) return 'vendor';
          if (id.includes('lucide-react')) return 'ui';
        },
      },
    },
  },
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
