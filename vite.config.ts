import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { FontaineTransform } from 'fontaine';

// Head order: stylesheet first (the only render-blocking resource), then a
// preload of the body font, then the module script and modulepreloads.
const headOrder = (): Plugin => ({
  name: 'head-order',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      const css = html.match(/\s*<link rel="stylesheet"[^>]*>/)?.[0];
      if (!css) return html;
      const font = Object.keys(ctx.bundle ?? {}).find((f) => /geist-latin-wght-normal.*\.woff2$/.test(f));
      const preload = font
        ? `\n    <link rel="preload" as="font" type="font/woff2" crossorigin href="/${font}">`
        : '';
      return html
        .replace(css, '')
        .replace(/(\s*)(<script type="module")/, `$1${css.trim()}${preload}$1$2`);
    },
  },
});

export default defineConfig({
  plugins: [
    react(),
    headOrder(),
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
