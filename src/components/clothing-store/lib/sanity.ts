import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "6ij9zoxn",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);
