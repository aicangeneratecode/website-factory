import { store } from "../lib/storeConfig";
// src/hooks/useInstagramFeed.ts
import { useEffect, useState } from "react";
import type { InstagramFeedSectionData } from "../types/homepageTypes";

export const useInstagramFeed = () => {
  const [data, setData] = useState<InstagramFeedSectionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`${store.basePath.replace(/\/$/, "")}/data/instagram.json`);
        if (!response.ok) throw new Error("Unable to load store data.");
        const result = await response.json();

        if (result) {
          setData(result);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Error fetching Instagram feed:", err);
        setError("Failed to load Instagram feed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  return { data, isLoading, error };
};
