import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'pub',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vooglaadija: resolve(__dirname, 'vooglaadija-presentation-1.html'),
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
