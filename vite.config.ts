import { defineConfig } from 'vite';

// GitHub Pages project-page hosting: served from /beat-mapper/, build output
// goes to /docs so Pages can serve directly from the docs folder on main.
export default defineConfig({
  base: '/beat-mapper/',
  build: {
    outDir: 'docs',
  },
});
