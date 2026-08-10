import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { FontaineTransform } from 'fontaine';

export default defineConfig({
  plugins: [
    react(),
    FontaineTransform.vite({
      // Metric-matched local fallbacks: kills the font-swap CLS flash.
      fallbacks: {
        'Inter Variable': ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial'],
        'Space Grotesk Variable': ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial'],
        'JetBrains Mono Variable': ['Courier New', 'monospace'],
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
