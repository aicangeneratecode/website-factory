import type { APIRoute } from "astro";
import { store } from "../../components/clothing-store/lib/storeConfig";

export const GET: APIRoute = ({ site }) => new Response(
  store.demo || !site ? "User-agent: *\nDisallow: /\n" :
    `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap-index.xml", site)}\n`,
  { headers: { "Content-Type": "text/plain; charset=utf-8" } },
);
