import React, { useRef, useEffect, useState } from "react";
import type { TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Grid3x3 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  image: string;
  link: string;
  description: string;
}

interface CategoryCarouselProps {
  autoRotate?: boolean;
  rotateInterval?: number;
  isMobileSwipe?: boolean;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  autoRotate = true,
  rotateInterval = 5000,
  isMobileSwipe = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  const [direction, setDirection] = useState(0);

  const categories: Category[] = [
    {
      id: 1,
      name: "Hoodies",
      image: "/images/clothing-store/hoodie.png",
      link: "/catalog?category=hoodies",
      description:
        "Premium comfort and style with our curated hoodie collection. Crafted from the finest materials for everyday luxury.",
    },
    {
      id: 2,
      name: "Jeans",
      image: "/images/clothing-store/True-Religion.png",
      link: "/catalog?category=jeans",
      description:
        "Classic and contemporary fits that redefine denim. Perfect combination of style and comfort for modern living.",
    },
    {
      id: 3,
      name: "Shoes",
      image: "/images/clothing-store/NikeTNTripleWhite-.png",
      link: "/catalog?category=shoes",
      description:
        "Elevate your everyday with premium footwear. From casual sneakers to statement pieces.",
    },
    {
      id: 4,
      name: "Shirts",
      image: "/images/clothing-store/Tshirt.png",
      link: "/catalog?category=shirts",
      description:
        "Essential foundations for your wardrobe. Minimalist designs with maximum comfort and style.",
    },
    {
      id: 5,
      name: "Accessories",
      image: "/images/clothing-store/gucci-belt.png",
      link: "/catalog?category=accessories",
      description:
        "Complete your look with carefully selected accessories. The perfect finishing touches.",
    },
    {
      id: 6,
      name: "Tracksuits",
      image: "/images/clothing-store/tracksuits.png",
      link: "/catalog?category=tracksuits",
      description:
        "Modern athletic wear that blends performance with style. Perfect for active lifestyles.",
    },
  ];

  // Navigation functions
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-rotate with enhanced conditions
  useEffect(() => {
    if (autoRotate && isInView && !isHovering && !isAnimating) {
      const interval = setInterval(() => {
        nextSlide();
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, isAnimating]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Touch swipe handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Animation variants for framer motion
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <>
      {/* Desktop Version - About Section Style */}
      <section className="-mt-8 hidden lg:block py-24 " ref={carouselRef}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Header in InstagramFeedSection style */}
          <div className="flex items-center justify-between mb-16">
            <div className="w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gray-900"></div>
                <span className="text-gray-500 text-sm font-light uppercase tracking-wider">
                  Collections
                </span>
              </div>

              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Explore Our
                <br />
                <span className="text-gray-600 font-semibold">
                  Premium Categories
                </span>
              </h2>

              <p className="text-gray-500 text-xl font-light max-w-xl leading-relaxed">
                Curated essentials for modern living. Each category crafted with
                attention to detail and premium materials.
              </p>
            </div>

            {/* Counter and Stats */}
            <div className="text-right">
              <div className="inline-flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {(currentIndex + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 text-sm font-light">
                    of {categories.length.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="w-0.5 h-12 bg-gradient-to-b from-gray-900/20 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">6</div>
                  <div className="text-gray-500 text-sm font-light">
                    Categories
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Image Section with enhanced glass effect */}
            <div className="relative">
              <div className="glass-effect-enhanced aspect-square rounded-3xl overflow-hidden border border-white/40 shadow-soft relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={currentIndex}
                    src={categories[currentIndex].image}
                    alt={categories[currentIndex].name}
                    className="w-full h-full object-cover"
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </AnimatePresence>

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/5 rounded-3xl" />

                {/* Category badge */}
                <div className="absolute top-6 left-6 px-4 py-2 glass-effect-light-enhanced rounded-full">
                  <span className="text-sm font-medium text-gray-900">
                    {categories[currentIndex].name}
                  </span>
                </div>
              </div>

              {/* Enhanced Navigation Buttons */}
              <div className="absolute bottom-6 right-6 flex gap-3">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 glass-effect-light-enhanced rounded-xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
                  aria-label="Previous category"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-12 h-12 glass-effect-light-enhanced rounded-xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
                  aria-label="Next category"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
                <div className="flex gap-2">
                  {categories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-8 h-1 rounded-full transition-all duration-500 ${
                        currentIndex === index
                          ? "bg-gray-900 w-12"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to ${categories[index].name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                      {categories[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 text-lg font-light leading-relaxed">
                      {categories[currentIndex].description}
                    </p>
                  </div>

                  {/* Enhanced CTA Button */}
                  <div className="pt-4">
                    <a
                      href={categories[currentIndex].link}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Category List Preview */}
              <div className="pt-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => goToSlide(index)}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm ${
                        currentIndex === index
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-white/60 glass-effect-light-enhanced"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced View All Button */}
          <div className="text-center mt-20">
            <a
              href="/clothing-store/catalog"
              className="inline-flex items-center gap-4 px-12 py-6 glass-effect-enhanced text-gray-900 rounded-2xl font-medium hover:shadow-xl transition-all duration-500 transform hover:scale-105 active:scale-95 group border border-white/40"
            >
              <Grid3x3 className="w-5 h-5" />
              <span className="text-lg">View All Categories</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Version - Clean & Modern */}
      <section className="lg:hidden">
        <div className="px-4">
          {/* Animated Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                Collections
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              Premium Categories
            </h2>
          </div>

          {/* Category Tabs - Single Line */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 px-2">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all duration-300 whitespace-nowrap ${
                  currentIndex === index
                    ? "bg-gray-900 text-white shadow-sm font-medium"
                    : "text-gray-600 border border-gray-200 font-light"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Main Card with Modern Design */}
          <div
            className="relative mb-6 max-w-[85%] mx-auto"
            ref={carouselRef}
            onTouchStart={isMobileSwipe ? onTouchStart : undefined}
            onTouchMove={isMobileSwipe ? onTouchMove : undefined}
            onTouchEnd={isMobileSwipe ? onTouchEnd : undefined}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Container with Clean Design */}
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm ">
                  {/* Image Container */}
                  <div className="relative aspect-[5/5] ">
                    <img
                      src={categories[currentIndex].image}
                      alt={categories[currentIndex].name}
                      className="w-full h-full object-cover"
                    />

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                    {/* Category Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {categories[currentIndex].name}
                      </h3>
                    </div>

                    {/* Navigation Arrows - Minimal */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-all"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 text-gray-900" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-all"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-gray-900" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicator - Like Desktop (Minimal Lines) */}
                  <div className="p-4 pt-5">
                    {/* Page Counter */}
                    <div className="text-center text-xs text-gray-500 mb-3 font-light">
                      {currentIndex + 1} of {categories.length}
                    </div>

                    {/* CTA Button - Clean & Modern */}
                    <a
                      href={categories[currentIndex].link}
                      className="block w-full py-3.5 bg-gray-900 text-white text-sm font-medium rounded-xl text-center active:scale-95 transition-transform shadow-sm"
                    >
                      Shop Collection
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};
