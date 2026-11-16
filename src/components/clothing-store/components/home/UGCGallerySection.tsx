// src/components/home/UGCGallerySection.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Heart,
  ChevronLeft,
  ChevronRight,
  Hash,
} from "lucide-react";
import { SectionSkeleton } from "../shared/SectionSkeleton";
import type { UGCGallerySectionData, UGCPost } from "../../types/homepageTypes";

interface UGCGallerySectionProps {
  data?: UGCGallerySectionData;
}

export const UGCGallerySection: React.FC<UGCGallerySectionProps> = ({
  data,
}) => {
  // Если данные секции еще не загружены, показываем скелетон
  if (!data) {
    return <SectionSkeleton type="instagram" />;
  }

  // Если секция отключена, не рендерим
  if (data.isActive === false) {
    return null;
  }

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Используем данные из Sanity или значения по умолчанию
  const {
    title = "Zajednica",
    subtitle = "Galerija",
    description = "",
    posts = [],
    ctaText = "",
    ctaLink = "",
    ctaDescription = "",
  } = data;

  // Получаем индексы для трех карточек
  const getSlideIndices = () => {
    if (posts.length === 0) return [0, 0, 0];

    const indices = [];
    // Центральная карточка
    indices[1] = currentIndex % posts.length;
    // Левая карточка
    indices[0] = (currentIndex - 1 + posts.length) % posts.length;
    // Правая карточка
    indices[2] = (currentIndex + 1) % posts.length;

    return indices;
  };

  const [leftIndex, centerIndex, rightIndex] = getSlideIndices();

  // Функции карусели
  const nextSlide = () => {
    if (isAnimating || posts.length <= 1) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevSlide = () => {
    if (isAnimating || posts.length <= 1) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const goToSlide = (index: number) => {
    if (
      isAnimating ||
      index === currentIndex ||
      index < 0 ||
      index >= posts.length
    )
      return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Автовоспроизведение карусели (только если больше 1 поста)
  useEffect(() => {
    if (posts.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, posts.length]);

  // Упрощенные анимационные варианты
  const cardVariants = {
    leftEnter: { x: -60, opacity: 0.3, scale: 0.85 },
    leftCenter: { x: 0, opacity: 0.6, scale: 0.9 },
    leftExit: { x: -60, opacity: 0.3, scale: 0.85 },
    centerEnter: { x: 0, opacity: 0, scale: 0.9 },
    centerCenter: { x: 0, opacity: 1, scale: 1 },
    centerExit: { x: 0, opacity: 0, scale: 0.9 },
    rightEnter: { x: 60, opacity: 0.3, scale: 0.85 },
    rightCenter: { x: 0, opacity: 0.6, scale: 0.9 },
    rightExit: { x: 60, opacity: 0.3, scale: 0.85 },
  };

  // Если нет постов
  if (posts.length === 0) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title} {subtitle}
          </h2>
          <p className="text-gray-500 mb-8">Još nema objava</p>
          <a
            href={ctaLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all"
          >
            <Instagram className="w-5 h-5" />
            <span>{ctaText}</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Desktop Version - 3 Cards with Simple Animation */}
      <section className="hidden lg:block py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header - Fixed Left */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-sm font-light uppercase tracking-wider">
                Stil zajednice
              </span>
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {title}
              <br />
              <span className="text-gray-600">{subtitle}</span>
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl">
              Pogledajte fotografije iz zajednice
            </p>
          </div>

          {/* 3 Cards Carousel - Larger Cards */}
          <div className="relative">
            {/* Navigation Arrows */}
            {posts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-200 z-20 shadow-lg"
                  aria-label="Previous story"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-200 z-20 shadow-lg"
                  aria-label="Next story"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Three Cards Container - Larger */}
            <div className="grid grid-cols-3 gap-10 items-center relative h-[580px]">
              {/* Left Card */}
              <div className="col-span-1 relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={leftIndex}
                    variants={cardVariants}
                    initial="leftEnter"
                    animate="leftCenter"
                    exit="leftExit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                    onClick={prevSlide}
                  >
                    <div className="relative rounded-2xl overflow-hidden cursor-pointer h-full group">
                      {/* Image Container - абсолютный и заполняющий */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={posts[leftIndex]?.imageUrl || "/images/clothing-store/placeholder.jpg"}
                          alt="Fotografija iz galerije"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                      {/* Instagram Badge */}
                      <div className="absolute top-5 right-5 w-11 h-11 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                        <Instagram className="w-5 h-5 text-gray-900" />
                      </div>

                      {/* Tags - Show only first tag */}
                      {posts[leftIndex]?.tags?.[0] && (
                        <div className="absolute top-5 left-5">
                          <span className="px-4 py-2 bg-white/95 text-gray-900 text-sm rounded-full font-medium shadow-md">
                            {posts[leftIndex].tags[0]}
                          </span>
                        </div>
                      )}

                      {/* Likes */}
                      <div className="absolute bottom-5 right-5">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/95 rounded-full shadow-md">
                          <Heart className="w-4 h-4 text-gray-900" />
                          <span className="text-sm font-medium text-gray-900">
                            {posts[leftIndex]?.likes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center Card - Larger */}
              <div className="col-span-1 relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={centerIndex}
                    variants={cardVariants}
                    initial="centerEnter"
                    animate="centerCenter"
                    exit="centerExit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                    onClick={() => setSelectedImage(centerIndex)}
                  >
                    <div className="relative rounded-3xl overflow-hidden cursor-pointer h-full shadow-2xl">
                      {/* Image Container - абсолютный и заполняющий */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={
                            posts[centerIndex]?.imageUrl || "/images/clothing-store/placeholder.jpg"
                          }
                          alt="Fotografija iz galerije"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                      {/* Instagram Badge */}
                      <div className="absolute top-7 right-7 w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-xl">
                        <Instagram className="w-6 h-6 text-gray-900" />
                      </div>

                      {/* Tags - Show up to 2 tags */}
                      <div className="absolute top-7 left-7 flex gap-3">
                        {posts[centerIndex]?.tags
                          ?.slice(0, 2)
                          .map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-white/95 text-gray-900 text-sm rounded-full font-medium shadow-lg"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>

                      {/* Likes */}
                      <div className="absolute bottom-7 right-7">
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/95 rounded-full shadow-lg">
                          <Heart className="w-5 h-5 text-gray-900" />
                          <span className="text-base font-medium text-gray-900">
                            {posts[centerIndex]?.likes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Card */}
              <div className="col-span-1 relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={rightIndex}
                    variants={cardVariants}
                    initial="rightEnter"
                    animate="rightCenter"
                    exit="rightExit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                    onClick={nextSlide}
                  >
                    <div className="relative rounded-2xl overflow-hidden cursor-pointer h-full group">
                      {/* Image Container - абсолютный и заполняющий */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={
                            posts[rightIndex]?.imageUrl || "/images/clothing-store/placeholder.jpg"
                          }
                          alt="Fotografija iz galerije"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                      {/* Instagram Badge */}
                      <div className="absolute top-5 right-5 w-11 h-11 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                        <Instagram className="w-5 h-5 text-gray-900" />
                      </div>

                      {/* Tags - Show only first tag */}
                      {posts[rightIndex]?.tags?.[0] && (
                        <div className="absolute top-5 left-5">
                          <span className="px-4 py-2 bg-white/95 text-gray-900 text-sm rounded-full font-medium shadow-md">
                            {posts[rightIndex].tags[0]}
                          </span>
                        </div>
                      )}

                      {/* Likes */}
                      <div className="absolute bottom-5 right-5">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/95 rounded-full shadow-md">
                          <Heart className="w-4 h-4 text-gray-900" />
                          <span className="text-sm font-medium text-gray-900">
                            {posts[rightIndex]?.likes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Counter */}
            <div className="text-center mt-10">
              <div className="inline-flex items-center gap-3">
                <div className="text-2xl font-bold text-gray-900">
                  {(currentIndex + 1).toString().padStart(2, "0")}
                </div>
                <div className="text-gray-400">/</div>
                <div className="text-gray-500 text-lg">
                  {posts.length.toString().padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            {posts.length > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-3">
                  {posts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-gray-900 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to story ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center">
            <a
              href={ctaLink || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group shadow-lg"
            >
              <Instagram className="w-6 h-6" />
              <span className="text-lg">{ctaText}</span>
              <Hash className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </a>

            <p className="mt-4 text-gray-500 text-sm">{ctaDescription}</p>
          </div>
        </div>
      </section>

      {/* Mobile Version - Clean & Minimal */}
      <section className="lg:hidden py-12">
        <div className="px-4">
          {/* Header - Fixed Left */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-5 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                Zajednica
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {title} {subtitle}
            </h2>

            <p className="text-gray-500 font-light text-sm">{description}</p>
          </div>

          {/* Gallery Container */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative aspect-[4/5] mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                  onClick={() => setSelectedImage(currentIndex)}
                >
                  <div className="rounded-xl overflow-hidden shadow-md cursor-pointer h-full">
                    {/* Image Container - абсолютный и заполняющий */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={
                          posts[currentIndex]?.imageUrl || "/images/clothing-store/placeholder.jpg"
                        }
                        alt="Fotografija iz galerije"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Instagram Badge */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-sm">
                      <Instagram className="w-4 h-4 text-gray-900" />
                    </div>

                    {/* Tags */}
                    <div className="absolute top-3 left-3">
                      {posts[currentIndex]?.tags?.[0] && (
                        <span className="px-3 py-1.5 bg-white/95 text-gray-900 text-xs rounded-full font-medium shadow-sm">
                          {posts[currentIndex].tags[0]}
                        </span>
                      )}
                    </div>

                    {/* Likes */}
                    <div className="absolute bottom-3 right-3">
                      <div className="flex items-center gap-1 px-2 py-1.5 bg-white/95 rounded-full shadow-sm">
                        <Heart className="w-3 h-3 text-gray-900" />
                        <span className="text-xs font-medium text-gray-900">
                          {posts[currentIndex]?.likes || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation and Counter */}
            {posts.length > 1 && (
              <div className="flex items-center justify-between mb-8 px-2">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center active:scale-95 transition-transform bg-white shadow-sm"
                  disabled={isAnimating}
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold text-gray-900">
                    {currentIndex + 1}
                  </div>
                  <div className="text-xs text-gray-500 font-light">
                    od {posts.length}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center active:scale-95 transition-transform bg-white shadow-sm"
                  disabled={isAnimating}
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            )}

            {/* Thumbnails */}
            {posts.length > 1 && (
              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-sm text-gray-900 font-medium">
                    Još objava
                  </div>
                </div>

                <div className="relative px-2">
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-center">
                    {posts.map((post, index) => (
                      <button
                        key={post._key || index}
                        onClick={() => goToSlide(index)}
                        className="flex-shrink-0 w-16 group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden">
                          {/* Image Container */}
                          <div className="absolute inset-0 overflow-hidden">
                            <img
                              src={post.imageUrl || "/images/clothing-store/placeholder.jpg"}
                              alt="Objava iz galerije"
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Active Indicator */}
                          <div
                            className={`absolute inset-0 border-2 transition-all duration-200 ${
                              index === currentIndex
                                ? "border-gray-900"
                                : "border-transparent group-hover:border-gray-300"
                            }`}
                          />

                          {/* Like Counter */}
                          <div className="absolute bottom-1 right-1">
                            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-black/80 rounded-full">
                              <Heart className="w-2 h-2 text-white" />
                              <span className="text-[10px] text-white font-medium">
                                {post.likes || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="text-center">
              <a
                href={ctaLink || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white text-sm font-medium rounded-xl active:scale-95 transition-transform shadow-md"
              >
                <Instagram className="w-4 h-4" />
                <span>{ctaText}</span>
              </a>

              <div className="mt-3 text-xs text-gray-500 font-light px-6">
                {ctaDescription}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal для просмотра фото */}
      <AnimatePresence>
        {selectedImage !== null && posts[selectedImage] && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-md max-h-[80vh] overflow-hidden rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={posts[selectedImage].imageUrl}
                  alt="Uvećana fotografija"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <button
                    className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
                    onClick={() => setSelectedImage(null)}
                  >
                    Zatvori
                  </button>
                  <div className="flex items-center gap-4">
                    {/* Tags */}
                    <div className="flex gap-2">
                      {posts[selectedImage].tags
                        ?.slice(0, 2)
                        .map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Likes */}
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">
                        {posts[selectedImage].likes || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
