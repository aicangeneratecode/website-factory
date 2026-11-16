import { loadProducts } from "./sanity";

interface StorefrontRoute {
  params: { path: string | undefined };
  props: { pageTitle?: string; pageDescription?: string; pageImage?: string };
}

export async function storefrontPaths(): Promise<StorefrontRoute[]> {
  const products = await loadProducts();
  const pages = [
    ['catalog', 'Katalog'], ['cart', 'Korpa'], ['checkout', 'Pregled porudЕѕbine'],
    ['men', 'MuЕЎkarci'], ['women', 'ЕЅene'], ['new', 'Novo'],
    ['faq', 'ДЊesta pitanja'], ['shipping', 'Dostava'], ['delivery', 'Dostava'],
  ];
  return [
    { params: { path: undefined }, props: { pageTitle: undefined } },
    ...pages.map(([path, pageTitle]) => ({ params: { path }, props: { pageTitle } })),
    ...products.map(({ _id, name, description, images }) => ({
      params: { path: `product/${_id}` },
      props: { pageTitle: name, pageDescription: description ?? undefined, pageImage: images?.[0]?.asset?.url },
    })),
  ];
}
