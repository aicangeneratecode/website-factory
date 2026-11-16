import { store } from "../lib/storeConfig";
// src/hooks/useHomepageSections.ts
import { useState, useEffect } from "react";
import type {
  HeroSectionData,
  PopularProductsSectionData,
  CategoryCarouselData,
  InstagramFeedSectionData,
  UGCGallerySectionData,
  HomepageSections,
} from "../types/homepageTypes";

export function useHomepageSections() {
  const [sections, setSections] = useState<HomepageSections>({
    hero: null,
    popularProducts: null,
    categoryCarousel: null,
    instagramFeed: null,
    ugcGallery: null,
    reviewsSection: null,
    faqSection: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${store.basePath.replace(/\/$/, "")}/data/homepage.json`);
        if (!response.ok) throw new Error("Unable to load store data.");
        const data = await response.json();

        setSections({
          hero: data.hero || null,
          popularProducts: data.popularProducts || null,
          categoryCarousel: data.categoryCarousel || null,
          instagramFeed: data.instagramFeed || null,
          ugcGallery: data.ugcGallery || null,
          reviewsSection: data.reviewsSection || null,
          faqSection: data.faqSection || null,
        });
      } catch {
        setError("Sadržaj prodavnice trenutno nije dostupan.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, isLoading, error };
}
