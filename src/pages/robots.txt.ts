
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://example.com');

  const indexable =
    process.env.SHOWCASE_INDEXABLE === 'true' &&
    base.hostname !== 'example.com';

  const lines = indexable
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', base).href}`
      ]
    : [
        'User-agent: *',
        'Disallow: /'
      ];

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
