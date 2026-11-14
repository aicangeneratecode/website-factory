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

        const response = await fetch("/clothing-store/data/homepage.json");
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
      } catch (err: any) {
        console.error("❌ Ошибка загрузки секций:", err);
        setError(err.message);

        // Дефолтные данные для Instagram
        setSections({
          hero: {
            _id: "default-hero",
            isActive: true,
            order: 1,
            title: "NSF",
            subtitle: "Essentials",
            buttonText: "Shop Now",
            instagramUsername: "nsf_clothing",
            stats: [
              { value: "200+", label: "Customers" },
              { value: "4.8★", label: "Rating" },
              { value: "24h", label: "Response" },
            ],
          },
          popularProducts: {
            _id: "default-popular",
            isActive: true,
            order: 4,
            title: "Popular Products",
            subtitle: "Best selling items this week",
            products: [],
          },
          categoryCarousel: {
            _id: "default-categories",
            isActive: true,
            order: 3,
            title: "Shop by Category",
            subtitle: "Find your perfect style",
            categories: [],
          },
          instagramFeed: {
            _id: "default-instagram",
            _type: "instagramFeed",
            isActive: true,
            order: 5,
            title: "Our Instagram",
            subtitle: "Follow for daily style inspiration",
            handle: "@NSF_Clothing",
            description:
              "Follow for daily style inspiration, new drops, and exclusive content.",
            followers: "5.2K",
            postsCount: "89",
            posts: [],
            ctaTitle: "Shop directly through Instagram",
            ctaDescription:
              "DM us your desired items for personalized service and fastest response.",
            ctaFollowText: "Follow & Shop Now",
            ctaFollowLink: "https://instagram.com/NSF_Clothing",
            ctaDmText: "Send Direct Message",
            ctaDmLink: "https://instagram.com/direct",
            responseTime: "Average response time: Under 2 hours",
          },
          ugcGallery: {
            _id: "default-ugc",
            _type: "ugcGallery",
            isActive: true,
            order: 7,
            title: "Community",
            subtitle: "Stories",
            description: "Real photos from our community",
            filters: [
              { id: "all", label: "All" },
              { id: "hoodie", label: "Hoodies" },
              { id: "basics", label: "Basics" },
              { id: "denim", label: "Denim" },
              { id: "streetwear", label: "Streetwear" },
            ],
            posts: [],
            ctaText: "Share Your Story",
            ctaLink: "https://instagram.com/nsf_clothing",
            ctaDescription: "Tag @nsf_clothing for a chance to be featured",
            autoPlay: true,
            loopVideos: true,
            muted: true,
          },
          reviewsSection: {
            _id: "default-reviews",
            _type: "reviewsSection",
            isActive: true,
            order: 6,
            title: "Customer Reviews",
            subtitle: "What our customers say about us",
            reviews: [],
            stats: [],
          },
          faqSection: {
            _id: "default-faq",
            _type: "faqSection",
            isActive: true,
            order: 8,
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know about shopping with NSF.",
            categories: [
              "Shipping & Returns",
              "Orders",
              "Payment",
              "Products",
              "General",
            ],
            faqs: [],
            contactEmail: "support@nsf.com",
            instagramHandle: "@nsf_clothing",
            instagramLink: "https://instagram.com/nsf_clothing",
            responseTime: "Average response time: Under 2 hours",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, isLoading, error };
}
