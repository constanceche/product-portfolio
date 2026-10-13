import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The deploy workflow passes these in from actions/configure-pages, so the same
// config works for a <user>.github.io repo, a project repo, or a custom domain.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
