import { createClient } from "@sanity/client";
import products from "../../../../sites/clothing-store-demo/products.json";
import homepage from "../../../../sites/clothing-store-demo/homepage.json";
import { store } from "./storeConfig";
import { homepageQuery, instagramQuery, productsQuery } from "./queries";

const queries = { products: productsQuery, homepage: homepageQuery, instagram: instagramQuery };
const localData = { products, homepage, instagram: null };

type DataName = keyof typeof queries;

export function loadStoreData(name: DataName): Promise<unknown> {
  const config = store.catalog;

  if (config.provider === "json") return Promise.resolve(localData[name]);

  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: "2023-05-03",
    useCdn: false,
  });
  return client.fetch(queries[name]);
}

export async function loadProducts() {
  const data = await loadStoreData("products");
  if (!Array.isArray(data)) throw new Error("Expected a storefront product list.");
  return data as { _id: string; name: string; description?: string | null; images?: { asset?: { url?: string } }[] }[];
}
