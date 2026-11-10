# Website Factory

Universal static website starter for Serbian small businesses.

**Stack:** Astro 7, Tailwind CSS 4, TypeScript, static HTML output to `dist/`.

## Quick start

Requires Node.js 22.12+.

```bash
npm install
npm run dev
npm run check
npm run build
```

Open the Astro URL printed by `npm run dev`.

## Client setup

1. Edit `src/data/site.ts` for brand, copy, service cards, gallery, reviews, and contact.
2. Add client photos under `public/images`, then set their paths in the data file.
3. Replace placeholder reviews and demo contact details with verified customer information.
4. Set `SITE_URL=https://client-domain.rs` in environment variables (see `.env.example`).
5. Set `demoMode: false` and `seo.robots: 'index,follow'` only when ready for production.
6. Run `npm run check && npm run build`. Deploy `dist/` using Vercel (Astro framework preset).

The demo brand FORMA is fictional and ships with indexing turned off.

## Project layout

- `src/components/`: Header, Hero, Services, Gallery, Reviews, Contact, Footer
- `src/data/site.ts`: one typed configuration file per site
- `src/types/site.ts`: content shape
- `src/layouts/BaseLayout.astro`: SEO, Open Graph, JSON-LD
- `src/styles/global.css`: Tailwind and design tokens
- `src/pages/robots.txt.ts`: preview/production robots policy
- `astro.config.mjs`: static output + sitemap
- `.github/workflows/ci.yml`: automated type and build verification

### Deployment note

Do not publish a real client's site before replacing demo names, information, imagery, reviews and social preview. Astro static sites have no contact-form backend by default; the contact section uses phone/email links.

The next stages will add theme variations, business templates and automated client site generation.