
# Website Factory

Kolekcija statičkih web šablona za poslovne sajtove u Srbiji.

## Stack

- Astro
- Tailwind CSS
- TypeScript
- Static output: `dist/`

## Templates

- ProjectPro — `/projectpro` — renovation demo
- VenuePro — `/venuepro` — event venue demo
- ClinicPro — `/clinicpro` — physiotherapy demo

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

The PVC/ALU variant at `/stolarija` uses the same ProjectPro template with
`sites/stolarija-demo/site.json`. It quotes by opening count and omits the
comparison and testimonials when they are absent from the configuration.

## VenuePro configuration

Edit `sites/venue-demo/site.json` to set the brand, theme, images, room layouts,
packages, location and inquiry options. The fictional demo prepares an inquiry
locally for review and copying. For a real venue, verify the business details
and set `inquiry.recipientEmail` to the venue's address before turning off
`demo`. Visitors can then open the prepared message in their mail app.

## ClinicPro configuration

Edit `sites/physio-demo/site.json` for the clinic name, service descriptions,
team, equipment, price list, FAQ and existing booking link. Optional sections
are omitted when their lists are empty. Replace the sample copy with verified clinic
information before enabling the booking link and turning off demo mode.

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
