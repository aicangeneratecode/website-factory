import type { APIRoute } from 'astro';
import { siteData } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const production = !siteData.demoMode && siteData.seo.robots === 'index,follow' && base.hostname !== 'example.com';
  const body = production
    ? 'User-agent: *\nAllow: /\n\nSitemap: ' + new URL('sitemap-index.xml', base).href + '\n'
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
