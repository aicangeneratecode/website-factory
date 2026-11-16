import React, { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Check, Quote } from "lucide-react";
import type { ReviewsSectionData } from "../../types/homepageTypes";
import { SectionSkeleton } from "../shared/SectionSkeleton";

interface ReviewsSectionProps {
  data?: ReviewsSectionData | null;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ data }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Если данные загружаются или нет данных
  if (!data) {
    return <SectionSkeleton />;
  }

  // Безопасная деструктуризация с проверками
  const safeData = data || {};
  const title = safeData.title || "Utisci kupaca";
  const subtitle = safeData.subtitle || "";
  const averageRating = safeData.averageRating ?? (safeData.reviews?.length ? safeData.reviews.reduce((sum, review) => sum + review.rating, 0) / safeData.reviews.length : 0);
  const totalReviews = safeData.totalReviews ?? safeData.reviews?.length ?? 0;
  const reviews = Array.isArray(safeData.reviews) ? safeData.reviews : [];
  const stats = Array.isArray(safeData.stats) ? safeData.stats : [];

  // Если нет отзывов, показываем сообщение
  if (reviews.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
          <p className="text-gray-400 mt-4">Još nema recenzija.</p>
        </div>
      </section>
    );
  }

  // Форматирование даты
  const formatDate = (dateString: string) => {
    if (!dateString) return "Nedavno";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Nedavno";
      }

      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch (error) {
      return "Nedavno";
    }
  };

  // Безопасное получение названия продукта
  const getProductName = (review: any) => {
    if (!review) return "Artikal";

    // Проверяем разные варианты структуры product
    if (review.product?.name) return review.product.name;
    if (review.product?.title) return review.product.title;
    if (typeof review.product === "string") return review.product;
    if (review.productName) return review.productName;

    return "Artikal";
  };

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsRef.current && !isAnimating && reviews.length > 0) {
      setIsAnimating(true);
      const scrollAmount = 320; // Ширина карточки + gap
      reviewsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Обновляем индекс
      if (direction === "right") {
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
      }

      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const goToReview = (index: number) => {
    if (reviewsRef.current && !isAnimating && reviews.length > 0) {
      setIsAnimating(true);
      const scrollAmount = 320 * index;
      reviewsRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const renderStars = (rating: number) => {
    if (!rating || rating < 1 || rating > 5) {
      rating = 5; // Default rating if invalid
    }

    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={
              index < rating ? "text-yellow-500 fill-current" : "text-gray-200"
            }
          />
        ))}
      </div>
    );
  };

  // Форматирование числа отзывов
  const formatReviewCount = (count: number) => {
    if (!count) return "200+";
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return String(count);
  };

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
            <div className="lg:w-2/5 mb-8 lg:mb-0">
              <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-light mb-3">
                <div className="w-6 h-0.5 bg-gray-900"></div>
                <span>UTISCI</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                {title ? title.split(" ")[0] : "What Our"}
                <br />
                <span className="text-gray-600 font-semibold">
                  {title
                    ? title.split(" ").slice(1).join(" ")
                    : "Customers Say"}
                </span>
              </h2>
              <p className="text-gray-500 font-light text-lg max-w-md">
                {subtitle}
              </p>
            </div>

            {/* Quote icon and stats */}
            <div className="flex items-center gap-8">
              <div className="hidden lg:block">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900">
                    {averageRating.toFixed(1)}★
                  </div>
                  <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                    Prosečna ocena
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900">{totalReviews}</div>
                  <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                    Recenzije
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Carousel - Staggered layout */}
          <div className="relative">
            <div
              ref={reviewsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-8 px-6"
            >
              {reviews.map((review: any, index: number) => {
                // Безопасное получение данных отзыва
                const customerName = review.customerName || "Customer";
                const customerLocation = review.customerLocation || "";
                const rating = review.rating || 5;
                const reviewText = review.reviewText || "Great product!";
                const date = review.date ? formatDate(review.date) : "Nedavno";
                const productName = getProductName(review);

                return (
                  <div
                    key={review._key || review._id || `review-${index}`}
                    className={`flex-shrink-0 w-80 md:w-96 transform transition-all duration-500 hover:-translate-y-2 ${
                      index % 2 === 0 ? "mt-0" : "mt-8"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 h-full flex flex-col relative group">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gray-900/10 rounded-tr-2xl"></div>

                      {/* Stars and product */}
                      <div className="mb-6">
                        {renderStars(rating)}
                        <div className="text-xs text-gray-400 font-light mt-3">
                          {productName} • {date}
                        </div>
                      </div>

                      {/* Title - используем первые слова отзыва как заголовок */}
                      <h3 className="text-xl font-light text-gray-900 mb-4 leading-tight">
                        {reviewText.split(" ").slice(0, 3).join(" ")}...
                      </h3>

                      {/* Review text */}
                      <p className="text-gray-600 leading-relaxed flex-grow mb-8 font-light">
                        {reviewText}
                      </p>

                      {/* Author with verified badge */}
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Author initial */}
                            <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-light text-sm">
                              {customerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-gray-900 font-light">
                                {customerName}
                              </p>
                              {customerLocation && (
                                <p className="text-gray-400 text-xs font-light">
                                  {customerLocation}
                                </p>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation arrows */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={() => scrollReviews("left")}
                  className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg items-center justify-center hover:bg-gray-50 transition-all duration-300 border border-gray-200 z-20 hover:scale-110 active:scale-95"
                  aria-label="Prethodni utisci"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <button
                  onClick={() => scrollReviews("right")}
                  className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg items-center justify-center hover:bg-gray-50 transition-all duration-300 border border-gray-200 z-20 hover:scale-110 active:scale-95"
                  aria-label="Sledeći utisci"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {/* Trust indicators - minimal */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl font-light text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm font-light uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version - Clean & Minimal */}
      <section className="lg:hidden">
        <div className="px-4">
          {/* Header - Minimal */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                Recenzije
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              {title ? title.split(" ")[0] : "Customer"}
              <br />
              <span className="text-gray-600 font-semibold">
                {title ? title.split(" ").slice(1).join(" ") : "Testimonials"}
              </span>
            </h2>

            <p className="text-gray-500 font-light text-sm mb-6">{subtitle}</p>

            {/* Stats - Compact */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}★
                </div>
                <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                  Prosečna ocena
                </div>
              </div>
              <div className="w-0.5 h-8 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {formatReviewCount(totalReviews)}
                </div>
                <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                  Recenzije
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Carousel - Staggered layout */}
          <div className="relative -mt-6">
            <div
              ref={reviewsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-8 -mx-3 px-6"
            >
              {reviews.map((review: any, index: number) => {
                // Безопасное получение данных отзыва
                const customerName = review.customerName || "Customer";
                const customerLocation = review.customerLocation || "";
                const rating = review.rating || 5;
                const reviewText = review.reviewText || "Great product!";
                const date = review.date ? formatDate(review.date) : "Nedavno";
                const productName = getProductName(review);

                return (
                  <div
                    key={review._key || review._id || `review-mobile-${index}`}
                    className={`flex-shrink-0 w-80 md:w-96 transform transition-all duration-500 hover:-translate-y-2 ${
                      index % 2 === 0 ? "mt-0" : "mt-8"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 h-full flex flex-col relative group">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gray-900/10 rounded-tr-2xl"></div>

                      {/* Stars and product */}
                      <div className="mb-6">
                        {renderStars(rating)}
                        <div className="text-xs text-gray-400 font-light mt-3">
                          {productName} • {date}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-light text-gray-900 mb-4 leading-tight">
                        {reviewText.split(" ").slice(0, 3).join(" ")}...
                      </h3>

                      {/* Review text */}
                      <p className="text-gray-600 leading-relaxed flex-grow mb-8 font-light">
                        {reviewText}
                      </p>

                      {/* Author with verified badge */}
                      <div className="pt-3 border-t border-gray-100 -mt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Author initial */}
                            <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-light text-sm">
                              {customerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-gray-900 font-light">
                                {customerName}
                              </p>
                              {customerLocation && (
                                <p className="text-gray-400 text-xs font-light">
                                  {customerLocation}
                                </p>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="-mt-8 text-center">
            <div className="text-sm text-gray-500 font-light mb-3">
              Pogledajte kolekciju
            </div>
            <a
              href="#products"
              className="inline-block w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl active:scale-95 transition-transform"
            >
              Pogledajte kolekciju
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
