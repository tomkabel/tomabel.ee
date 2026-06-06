import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'pub',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) return 'three';
          if (id.includes('node_modules/ogl')) return 'ogl';
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('RadarChart')) return 'radar';
          if (id.includes('lucide-react')) return 'ui';
          if (id.includes('node_modules/react')) return 'vendor';
        }
      }
    }
  },
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
});
