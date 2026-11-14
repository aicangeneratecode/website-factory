// src/components/home/PopularProductsSection.tsx
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useSanityProducts";
import { SectionSkeleton } from "../shared/SectionSkeleton";
import type { PopularProductsSectionData } from "../../types/homepageTypes";

interface PopularProductsSectionProps {
  data?: PopularProductsSectionData;
}

export const PopularProductsSection: React.FC<PopularProductsSectionProps> = ({
  data,
}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products: allProducts, isLoading: productsLoading } = useProducts();
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef(0);
  const dragStartTimeRef = useRef(0);

  // Если данные секции еще не загружены, показываем скелетон
  if (!data) {
    return <SectionSkeleton type="products" />;
  }

  // Если секция отключена, не рендерим
  if (data.isActive === false) {
    return null;
  }

  // Получаем продукты для отображения
  const products = useMemo(() => {
    // Если данные загружаются, возвращаем пустой массив
    if (productsLoading) {
      return [];
    }

    // Если в Sanity есть выбранные продукты, используем их
    if (data?.products && data.products.length > 0) {
      return data.products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        brand: product.brand || "NSF", // ← brand теперь строка из запроса
        images: product.images || ["/images/clothing-store/Tshirt.png"],
        isNew: product.isNew,
        inStock: product.inStock,
        sizes: product.sizes || ["M", "L"],
        category: "men" as const,
        subcategory: "tshirts" as const,
        description: "",
        material: "",
        sku: "",
      }));
    }

    // Иначе берем первые 8 продуктов из всех
    if (allProducts.length > 0) {
      return allProducts.slice(0, 8);
    }

    return [];
  }, [data?.products, allProducts, productsLoading]);

  // Обновление индикатора прогресса при скролле
  useEffect(() => {
    const container = productsRef.current;
    if (!container) return;

    const updateCurrentPage = () => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = 280;
      const page = Math.round(scrollPosition / cardWidth);
      setCurrentPage(page);
    };

    container.addEventListener("scroll", updateCurrentPage);
    return () => container.removeEventListener("scroll", updateCurrentPage);
  }, []);

  // Получаем уникальные бренды из продуктов
  const brands = useMemo(() => {
    if (!products.length) return [{ id: "all", name: "All" }];

    const allBrands = products
      .map((product) => product.brand)
      .filter((brand): brand is string =>
        Boolean(brand && typeof brand === "string")
      );

    const uniqueBrands = Array.from(new Set(allBrands));
    return [
      { id: "all", name: "All" },
      ...uniqueBrands.map((brand) => ({
        id: brand.toLowerCase(),
        name: brand,
      })),
    ];
  }, [products]);

  const filteredProducts =
    selectedBrand === "all"
      ? products
      : products.filter(
          (product) => product.brand?.toLowerCase() === selectedBrand
        );

  const scrollProducts = useCallback(
    (direction: "left" | "right") => {
      if (productsRef.current && !isAnimating && filteredProducts.length > 0) {
        setIsAnimating(true);
        const container = productsRef.current;
        const cardWidth = 280;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
        const newScrollLeft = container.scrollLeft + scrollAmount;

        const maxScroll = container.scrollWidth - container.clientWidth;
        const boundedScroll = Math.max(0, Math.min(newScrollLeft, maxScroll));

        container.scrollTo({
          left: boundedScroll,
          behavior: "smooth",
        });

        setTimeout(() => setIsAnimating(false), 400);
      }
    },
    [isAnimating, filteredProducts.length]
  );

  // Обработчики для перетаскивания мышью
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!productsRef.current) return;

    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    setIsDragging(true);
    const container = productsRef.current;
    dragStartRef.current = e.pageX;
    dragStartTimeRef.current = Date.now();
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !productsRef.current) return;

    const container = productsRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setIsDragging(false);

    const dragDistance = Math.abs(e.pageX - dragStartRef.current);
    const dragDuration = Date.now() - dragStartTimeRef.current;

    if (dragDistance < 5 && dragDuration < 200) {
      const target = e.target as HTMLElement;
      const productCard = target.closest("[data-product-id]");
      if (productCard) {
        const productId = productCard.getAttribute("data-product-id");
        if (productId) {
          handleProductClick(productId);
        }
      }
    }

    if (productsRef.current) {
      productsRef.current.style.cursor = "grab";
      productsRef.current.style.userSelect = "auto";
    }
  };

  // Обработчики для тач-устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!productsRef.current) return;

    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    setIsDragging(true);
    const touch = e.touches[0];
    setTouchStartX(touch.pageX);
    setTouchStartTime(Date.now());
    setScrollLeft(productsRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !productsRef.current) return;

    e.preventDefault();

    const touch = e.touches[0];
    const walk = (touch.pageX - touchStartX) * 1.5;
    productsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    setIsDragging(false);

    const endTouch = e.changedTouches[0];
    const touchDistance = Math.abs(endTouch.pageX - touchStartX);
    const touchDuration = Date.now() - touchStartTime;

    if (touchDistance < 10 && touchDuration < 200) {
      const target = e.target as HTMLElement;
      const productCard = target.closest("[data-product-id]");
      if (productCard) {
        const productId = productCard.getAttribute("data-product-id");
        if (productId) {
          handleProductClick(productId);
        }
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleProductClick = (productId: string) => {
    if (!isDragging) {
      navigate(`/product/${productId}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand || "NSF",
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      size: product.sizes?.[0] || "M",
      image: product.images[0],
      category: product.category,
      inStock: product.inStock,
    });
  };

  // Рассчитываем общее количество страниц
  const totalPages = Math.ceil(filteredProducts.length / 4);

  // Если продукты еще загружаются, показываем скелетон
  if (productsLoading) {
    return <SectionSkeleton type="products" />;
  }

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Заголовок секции из Sanity */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {data?.title || "Popular Products"}
            </h2>
            {data?.subtitle && (
              <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>

          {/* Brand Filter - Glass effect */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="inline-flex gap-2 p-2 glass-effect-enhanced rounded-2xl">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                      selectedBrand === brand.id
                        ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                        : "text-gray-700 hover:bg-white/60 glass-effect-light-enhanced"
                    }`}
                  >
                    <span className="font-medium text-sm whitespace-nowrap">
                      {brand.name}
                    </span>
                    {selectedBrand === brand.id && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollProducts("left")}
              className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-12 glass-effect-light-enhanced rounded-xl shadow-lg items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous products"
              disabled={
                isAnimating ||
                currentPage === 0 ||
                filteredProducts.length === 0
              }
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => scrollProducts("right")}
              className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-12 glass-effect-light-enhanced rounded-xl shadow-lg items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next products"
              disabled={
                isAnimating ||
                currentPage >= totalPages - 1 ||
                filteredProducts.length === 0
              }
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Products Container с поддержкой перетаскивания */}
            <div
              ref={productsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2 cursor-grab select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                if (isDragging) {
                  setIsDragging(false);
                  if (productsRef.current) {
                    productsRef.current.style.cursor = "grab";
                    productsRef.current.style.userSelect = "auto";
                  }
                }
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                scrollBehavior: "smooth",
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    data-product-id={product.id}
                    onClick={(e) => {
                      if (!isDragging) {
                        handleProductClick(product.id);
                      }
                    }}
                    className="flex-shrink-0 w-64 group cursor-pointer"
                  >
                    {/* Product Image with glass effect */}
                    <div className="relative aspect-square glass-effect-enhanced rounded-2xl overflow-hidden mb-4 border border-white/40">
                      <img
                        src={product.images[0] || "/images/clothing-store/Tshirt.png"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {product.isNew && (
                          <span className="glass-effect-light-enhanced text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                            New
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="glass-effect-light-enhanced bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <button
                          onClick={(e) => handleAddToCart(e, product.id)}
                          disabled={!product.inStock}
                          className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingBag className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Product Info */}
                    <div className="px-1">
                      <div className="mb-2">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                          {product.brand}
                        </span>
                      </div>

                      <h3 className="font-medium text-gray-900 text-base mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>

                        <div className="text-gray-400 text-xs font-light">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12 text-gray-500">
                  No products found for this brand
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? "bg-gray-900 w-6"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="lg:hidden">
        <div className="px-4">
          {/* Заголовок секции */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {data?.title || "Popular Products"}
            </h2>
            {data?.subtitle && (
              <p className="text-gray-500 font-light text-sm">
                {data.subtitle}
              </p>
            )}
          </div>

          {/* Mobile Brand Filter */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-1">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedBrand === brand.id
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 border border-gray-200"
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Products */}
          <div
            ref={productsRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  data-product-id={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex-shrink-0 w-48 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square glass-effect-light-enhanced rounded-xl overflow-hidden mb-3">
                    <img
                      src={product.images[0] || "/images/clothing-store/Tshirt.png"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Badges */}
                    {product.isNew && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-white/90 text-gray-900 text-xs rounded-full">
                          New
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="px-1">
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 font-light">
                        {product.brand}
                      </span>
                    </div>

                    <h3 className="font-medium text-gray-900 text-sm mb-2 leading-tight line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        onClick={(e) => handleAddToCart(e, product.id)}
                        disabled={!product.inStock}
                        className="w-8 h-8 glass-effect-light-enhanced rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingBag className="w-3 h-3 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-8 text-gray-500 text-sm">
                No products found for this brand
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
