import type { APIRoute } from 'astro';
import { client } from '../../../components/clothing-store/lib/sanity';
import { homepageQuery, instagramQuery, productsQuery } from '../../../components/clothing-store/lib/queries';

const queries = { homepage: homepageQuery, instagram: instagramQuery, products: productsQuery };

export function getStaticPaths() {
  return Object.entries(queries).map(([name, query]) => ({ params: { name }, props: { query } }));
}

export const GET: APIRoute = async ({ props }) => {
  const data = await client.withConfig({ useCdn: false }).fetch(props.query);
  return Response.json(data);
};
