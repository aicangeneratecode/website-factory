
# Website Factory

Kolekcija statičkih web šablona za poslovne sajtove u Srbiji.

## Stack

- Astro
- Tailwind CSS
- TypeScript
- Static output: `dist/`

## Templates

- ProjectPro — `/projectpro` — renovation demo
- VenuePro — planned
- ClinicPro — planned

The homepage `/` is the template gallery.

## Local development

Requires Node.js 22.12+.

```bash
npm install
npm run check
npm run build
npm run dev
```

## ProjectPro configuration

Edit:

`sites/renovation-demo/site.json`

The demo is fictional. Do not present illustrative photographs or placeholder testimonials as actual completed work or customer reviews.

## Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages.

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `SITE_URL` — full public website URL
- Environment variable: `SHOWCASE_INDEXABLE=false` while testing

Only enable public search indexing after the gallery is ready and its final URL is configured.

## Architecture

- `src/pages/index.astro` — template gallery
- `src/pages/projectpro.astro` — ProjectPro demo route
- `src/templates/ProjectPro.astro` — ProjectPro template
- `src/components/projectpro/` — ProjectPro components
- `src/types/projectpro.ts` — ProjectPro data types
- `sites/renovation-demo/site.json` — demo configuration
- `src/styles/global.css` — shared styles

Client websites must be deployed with verified business information and an appropriate contact handling setup.
