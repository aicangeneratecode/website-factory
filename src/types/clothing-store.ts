export interface ClothingStoreConfig {
  name: string;
  description: string;
  basePath: string;
  previewImage: string;
  demo: boolean;
  newsletterUrl?: string;
  catalog: { provider: "json" } | { provider: "sanity"; projectId: string; dataset: string };
  locale: string;
  currency: string;
  priceMultiplier: number;
  shippingCost: number;
  shipping?: { mode: "arranged" | "fixed" | "free"; description: string };
  brand?: { tagline?: string; logo?: string; ink?: string; surface?: string };
  orders?: { whatsapp: boolean; instagram: boolean };
  contact: { whatsapp: string; instagram: string };
}
