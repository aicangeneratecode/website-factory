import config from '../../../../sites/clothing-store-demo/site.json';
import type { ClothingStoreConfig } from '../../../types/clothing-store';

const catalog = config.catalog as { provider: string; projectId?: string; dataset?: string };

function resolveCatalog(): ClothingStoreConfig["catalog"] {
  if (catalog.provider === "json") return { provider: "json" };
  if (catalog.provider === "sanity" && catalog.projectId && catalog.dataset) {
    return { provider: "sanity", projectId: catalog.projectId, dataset: catalog.dataset };
  }
  throw new Error("Set catalog.provider to json, or configure a client Sanity projectId and dataset.");
}

function resolveShipping(): ClothingStoreConfig["shipping"] {
  const shipping = config.shipping as { mode: string; description: string } | undefined;
  if (!shipping) return undefined;
  const { mode, description } = shipping;
  if (mode !== "arranged" && mode !== "fixed" && mode !== "free") {
    throw new Error("Set shipping.mode to arranged, fixed or free.");
  }
  if (mode === "fixed" && (!Number.isFinite(config.shippingCost) || config.shippingCost < 0)) {
    throw new Error("Set shippingCost to a non-negative amount.");
  }
  return { mode, description };
}

export const store: ClothingStoreConfig = {
  ...config,
  basePath: import.meta.env.PUBLIC_STOREFRONT_ROOT === "true" ? "/" : config.basePath,
  catalog: resolveCatalog(),
  shipping: resolveShipping(),
};

const formatter = new Intl.NumberFormat(store.locale, {
  style: "currency",
  currency: store.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (amount: number) => formatter.format(amount * store.priceMultiplier);

export const shippingMode = store.shipping?.mode ?? (store.shippingCost > 0 ? "fixed" : "arranged");

export function shippingLabel(cost: number) {
  if (shippingMode === "arranged") return "Po dogovoru";
  return shippingMode === "free" ? "Besplatno" : formatPrice(cost);
}
