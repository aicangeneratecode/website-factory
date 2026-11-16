# Clothing Store order setup

Set the shop name, locale, currency, delivery charge and contact handles in
`site.json`. For the current demo catalog, a source price of 25 is displayed
as 2,500 RSD via the demo multiplier. Set the multiplier to 1 for a client
catalog that stores final RSD amounts. A zero delivery charge is rendered
as delivery by arrangement.

Set the WhatsApp contact to a full international number and Instagram to its
profile username. Verify both belong to the client before setting demo to
false. The buyer sends the order in the messenger. The storefront retains
the cart when the buyer copies the order or opens a messenger.

## Catalog source

The demo builds from local `products.json` and `homepage.json`. Product
`_id` values are used in URLs and should remain stable. Each image uses
`{ "asset": { "url": "/images/clothing-store/example.jpg" } }`.

To build from a client's published Sanity dataset, set `catalog` to
`{ "provider": "sanity", "projectId": "CLIENT_PROJECT_ID", "dataset": "production" }`.
Use the schema in `studio/` in the client's project. The storefront reads
published data at build time and rebuilds to publish updates. Do not reuse
the demo project or put credentials in `site.json`.

## Standalone deployment

Use a separate repository or checkout per client. Configure the store and
catalog here, set SITE_URL to the client domain in Cloudflare, and use
`npm ci` and `npm run build:storefront`. Publish only `dist-storefront/`
with directory-index URL serving. The shop is at /, with catalog data at
/data/. The Website Factory command `npm run build` still publishes the
showcase to dist/ with the shop at /clothing-store/.

Before delivery, verify the client's catalog and messenger contacts. Demo
exports block crawling. Client exports generate a sitemap with a real
SITE_URL and keep cart and checkout out of indexing.

## Branding and delivery

Set brand.tagline and optionally brand.logo to an image in public/.
brand.ink and brand.surface style the footer and order accents. Choose
shipping.mode: arranged, fixed or free. In fixed mode shippingCost is
included in the cart total and uses the same units as product prices.
shipping.description is shown on the delivery page. Enable the channels
the client accepts using orders.whatsapp and orders.instagram.

## Client-owned Sanity Studio

In the studio directory, create a local .env file with
SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET matching the client
catalog configuration. These identify the client project and dataset.
Install with npm ci and run npm run dev in that directory.
Enter the optional homepage content in Serbian Latin and activate only
complete sections. Review, follower and response-time figures should
come from confirmed client data.
