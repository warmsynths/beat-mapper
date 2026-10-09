import { defineConfig } from 'vite';

// GitHub Pages project-page hosting: served from /beat-mapper/, build output
// goes to /docs so Pages can serve directly from the docs folder on main.
// Two pages: index.html is Cue (the pattern library); capture.html is the
// beatbox transcriber.
export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: { index: 'index.html', capture: 'capture.html' },
      output: {
        entryFileNames: (chunk) => (chunk.name === 'index' ? 'app.js' : '[name].js'),
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
