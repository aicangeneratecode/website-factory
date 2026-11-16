
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
- LifeEvo — `/lifeevo` — fitness and nutrition demo
- Clothing Store — `/clothing-store` — [standalone storefront and handoff](sites/clothing-store-demo/README.md)

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

The unpublished PVC/ALU configuration is saved in `sites/stolarija-demo/site.json`.

## VenuePro configuration

Edit `sites/venue-demo/site.json` to set the brand, theme, images, room layouts,
packages, location and inquiry options. The fictional demo prepares an inquiry
locally for review and copying. For a real venue, verify the business details
and set `inquiry.recipientEmail` to the venue's address before turning off
`demo`. Visitors can then open the prepared message in their mail app.

## ClinicPro configuration

`src/pages/clinicpro.astro` loads the typed site configuration.
`src/templates/ClinicPro.astro` assembles the page from eight section components
in `src/components/clinicpro/`. The configuration type lives in
`src/types/clinicpro.ts`.

Edit `sites/physio-demo/site.json` for the clinic name, service descriptions,
team, equipment, price list, FAQ and existing booking link. Optional sections
are omitted when their lists are empty. Replace the sample copy with verified clinic
information before enabling the booking link and turning off demo mode.

For a real VenuePro site, set `location.city`, `capacity.maxGuests`, and
`events.items` to show the venue facts on the first screen. ProjectPro renders
a before/after comparison when `beforeAfter.verifiedPair` is true.

For a real ClinicPro site, set `bookingUrl`, `bookingPhone`, or both, and turn
off demo mode. Update team profiles with confirmed names, roles and photos.

## Cloudflare deployment

Website Factory deploys from `main` through Cloudflare Workers Builds.

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `SITE_URL` — override the default showcase URL when using a custom domain
- Environment variable: `SHOWCASE_INDEXABLE=false` while testing
- The quote button uses the Website Factory email by default. Override it with the build variable `SHOWCASE_CONTACT_EMAIL` or set `SHOWCASE_CONTACT_WHATSAPP` to a full international number. If both are set, the button uses email.

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
