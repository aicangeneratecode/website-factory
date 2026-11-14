// src/pages/HomePage.tsx
import React, { useMemo } from "react";
import { HeroSection } from "../components/home/HeroSection";
import { OrderProcessSection } from "../components/home/OrderProcessSection";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { PopularProductsSection } from "../components/home/PopularProductsSection";
import { InstagramFeedSection } from "../components/home/InstagramFeedSection";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { UGCGallerySection } from "../components/home/UGCGallerySection";
import { FAQSection } from "../components/home/FAQSection";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { useHomepageSections } from "../hooks/useHomepageSections";

export const HomePage: React.FC = () => {
  const { sections, isLoading, error } = useHomepageSections();

  // Создаем массив секций с их порядком
  const sortedSections = useMemo(() => {
    const sectionComponents = [
      {
        key: "hero",
        section: sections.hero,
        content: <HeroSection data={sections.hero ?? undefined} />,
        order: sections.hero?.order || 1,
      },
      {
        key: "orderProcess",
        section: null,
        content: <OrderProcessSection />,
        order: 2, // Фиксированный порядок для статических секций
      },
      {
        key: "categoryCarousel",
        section: sections.categoryCarousel,
        content: <CategoryCarousel />,
        order: sections.categoryCarousel?.order || 3,
      },
      {
        key: "popularProducts",
        section: sections.popularProducts,
        content: <PopularProductsSection data={sections.popularProducts ?? undefined} />,
        order: sections.popularProducts?.order || 4,
      },
      {
        key: "instagramFeed",
        section: sections.instagramFeed,
        content: <InstagramFeedSection data={sections.instagramFeed ?? undefined} />,
        order: sections.instagramFeed?.order || 5,
      },
      {
        key: "reviews",
        section: sections.reviewsSection, // Исправлено: было null, теперь sections.reviewsSection
        content: <ReviewsSection data={sections.reviewsSection ?? undefined} />,
        order: sections.reviewsSection?.order || 6,
      },
      {
        key: "ugcGallery",
        section: sections.ugcGallery,
        content: <UGCGallerySection data={sections.ugcGallery ?? undefined} />,
        order: sections.ugcGallery?.order || 7,
      },
      {
        key: "faq",
        section: sections.faqSection, // Было null, теперь sections.faqSection
        content: <FAQSection data={sections.faqSection ?? undefined} />,
        order: sections.faqSection?.order || 8,
      },
      {
        key: "newsletter",
        section: null,
        content: <NewsletterSection />,
        order: 9,
      },
    ];

    // Фильтруем активные секции
    const activeSections = sectionComponents.filter(({ section, key }) => {
      // Статические секции (orderProcess, faq, newsletter) всегда активны
      const staticSections = ["orderProcess", "faq", "newsletter"];
      if (staticSections.includes(key)) return true;

      // Секции из Sanity активны только если isActive === true и section не null
      return section?.isActive === true;
    });

    // Сортируем по полю order
    return activeSections.sort((a, b) => a.order - b.order);
  }, [sections]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Loading homepage...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading homepage sections:", error);
    // Показываем страницу с дефолтными секциями при ошибке
    return (
      <div className="min-h-screen bg-white">
        <HeroSection data={undefined} />
        <OrderProcessSection />
        <CategoryCarousel />
        <PopularProductsSection data={undefined} />
        <InstagramFeedSection data={undefined} />
        <ReviewsSection data={undefined} />{" "}
        <UGCGallerySection data={undefined} />
        <FAQSection />
        <NewsletterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {sortedSections.map(({ key, content }) => (
        <React.Fragment key={key}>{content}</React.Fragment>
      ))}
    </div>
  );
};
