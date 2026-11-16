import 'dotenv/config';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';

const store = JSON.parse(readFileSync(new URL('./sites/clothing-store-demo/site.json', import.meta.url), 'utf8'));
const site = new URL(process.env.SITE_URL || 'https://example.com');
if (!store.demo && (!process.env.SITE_URL || site.hostname === 'example.com')) {
  throw new Error('Set SITE_URL to the client storefront domain.');
}

export default defineConfig({
  site: site.origin,
  srcDir: './src/storefront-export',
  publicDir: './public',
  outDir: './dist-storefront',
  integrations: [
    react({ include: /clothing-store.*\.tsx$/ }),
    ...(!store.demo ? [sitemap({ filter: (url) => !/\/(cart|checkout)\/?$/.test(url) })] : []),
    {
      name: 'storefront-assets',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const { rm } = await import('node:fs/promises');
          for (const folder of ['projectpro', 'venuepro', 'clinicpro', 'lifeevo']) {
            await rm(new URL(`images/${folder}/`, dir), { recursive: true, force: true });
          }
        },
      },
    },
  ],
  vite: { plugins: [tailwindcss()], define: { 'import.meta.env.PUBLIC_STOREFRONT_ROOT': JSON.stringify('true') } },
});
