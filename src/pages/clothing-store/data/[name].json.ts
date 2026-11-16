import type { APIRoute } from 'astro';
import { loadProducts, loadStoreData } from '../../../components/clothing-store/lib/sanity';

const names = ['homepage', 'instagram', 'products'] as const;

export function getStaticPaths() {
  return names.map((name) => ({ params: { name }, props: { name } }));
}

export const GET: APIRoute = async ({ props }) => {
  const name = props.name as typeof names[number];
  return Response.json(await (name === 'products' ? loadProducts() : loadStoreData(name)));
};
