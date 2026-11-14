import 'dotenv/config';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site,
  output: 'static',
  outDir: './dist',
  integrations: [sitemap(), react({ include: /(?:lifeevo.*\.jsx|clothing-store.*\.tsx)$/ })],
  vite: {
    plugins: [tailwindcss()],
  },
});
