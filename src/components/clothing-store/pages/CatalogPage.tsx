const categoryNames: Record<string, string> = {
  men: "Muškarci", women: "Žene", unisex: "Uniseks",
  tshirts: "Majice", hoodies: "Duksevi", jeans: "Farmerke",
  pants: "Pantalone", shoes: "Obuća", accessories: "Dodaci",
  tracksuits: "Trenerke", jackets: "Jakne", all: "Sve",
};
const categoryLabel = (category: string) => categoryNames[category] ?? category;

import { formatPrice } from "../lib/storeConfig";
// src/pages/CatalogPage.tsx - Обновленная версия с поиском и улучшениями
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FAQSection } from "../components/home/FAQSection";
import {
  Filter,
  ShoppingBag,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
} from "lucide-react";
import { useProducts } from "../hooks/useSanityProducts"; // ← НОВЫЙ ИМПОРТ
import type { Product, Category, Subcategory, Size } from "../types/types";

// FilterSidebar Component - Enhanced Glass Effect
const FilterSidebar: React.FC<{
  selectedCategory: Category | "all";
  setSelectedCategory: (category: Category | "all") => void;
  selectedSubcategory: Subcategory | "all";
  setSelectedSubcategory: (subcategory: Subcategory | "all") => void;
  selectedSizes: string[]; // Изменено на string[]
  setSelectedSizes: (sizes: string[]) => void; // Изменено на string[]
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  showNewOnly: boolean;
  setShowNewOnly: (show: boolean) => void;
  brands: string[];
  sizes: string[]; // Изменено на string[]
  clearFilters: () => void;
  productCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedSizes,
  setSelectedSizes,
  selectedBrands,
  setSelectedBrands,
  showNewOnly,
  setShowNewOnly,
  brands,
  sizes,
  clearFilters,
  productCount,
  searchQuery,
  setSearchQuery,
}) => {
  const categories: (Category | "all")[] = ["all", "men", "women"];
  const subcategories: (Subcategory | "all")[] = [
    "all",
    "tshirts",
    "hoodies",
    "pants",
    "outerwear",
    "accessories",
    "tracksuits",
    "sneakers",
  ];

  const [isAnimating, setIsAnimating] = useState(false);

  const toggleSize = (size: string) => {
    // Изменено на string
    setIsAnimating(true);
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
    setTimeout(() => setIsAnimating(false), 150);
  };

  const toggleBrand = (brand: string) => {
    setIsAnimating(true);
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
    setTimeout(() => setIsAnimating(false), 150);
  };

  return (
    <div className="sticky top-24 transition-all duration-300">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-gray-900 to-transparent"></div>
              <span className="text-gray-500 text-sm font-light uppercase tracking-wider">
                Filteri
              </span>
            </div>
            <div>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 font-light transition-all duration-300 px-3 py-1.5 glass-effect-light-enhanced rounded-lg hover:scale-105 active:scale-95"
              >
                Poništi sve
              </button>
            </div>
          </div>

          {/* Product Count */}
          <div className="pt-2">
            <p className="text-sm text-gray-600 font-light">
              {productCount} {productCount === 1 ? "product" : "products"} found
            </p>
          </div>
        </div>

        {/* Search Input in Sidebar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretražite artikle…"
            className="w-full pl-10 pr-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all duration-300"
          />
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-normal text-gray-900 mb-3">Kategorija</h4>
            <div className="inline-flex gap-2 p-2 glass-effect-enhanced rounded-2xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/60 glass-effect-light-enhanced"
                  }`}
                >
                  <span className="font-medium text-sm whitespace-nowrap">
                    {category === "all"
                      ? "All"
                      : categoryLabel(category)}
                  </span>
                  {selectedCategory === category && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div>
            <h4 className="text-sm font-normal text-gray-900 mb-3">
              Vrsta artikla
            </h4>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className={`px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                    selectedSubcategory === subcategory
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md"
                      : "text-gray-600 hover:bg-white/60 glass-effect-light-enhanced"
                  }`}
                >
                  {subcategory === "all"
                    ? "Sve vrste"
                    : categoryLabel(subcategory)}
                </button>
              ))}
            </div>
          </div>

          {/* New Drop Filter */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group p-3 glass-effect-light-enhanced rounded-xl hover:bg-white/60 transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showNewOnly}
                  onChange={(e) => setShowNewOnly(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-all duration-300 ${
                    showNewOnly
                      ? "bg-gradient-to-r from-gray-900 to-gray-800"
                      : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                      showNewOnly ? "left-5" : "left-1"
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-light text-gray-900">
                  Samo novi artikli
                </span>
              </div>
            </label>
          </div>

          {/* Size Filter */}
          <div>
            <h4 className="text-sm font-normal text-gray-900 mb-3">Veličina</h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-light transition-all duration-300 ${
                    selectedSizes.includes(size)
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md transform scale-105"
                      : "text-gray-600 glass-effect-light-enhanced hover:scale-105"
                  } ${isAnimating ? "animate-pulse" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-sm font-normal text-gray-900 mb-3">Brend</h4>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group p-3 glass-effect-light-enhanced rounded-xl hover:bg-white/60 transition-all duration-300"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
                        selectedBrands.includes(brand)
                          ? "bg-gradient-to-r from-gray-900 to-gray-800 border-transparent"
                          : "border-gray-300 bg-white/80"
                      }`}
                    >
                      {selectedBrands.includes(brand) && (
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toolbar Component - Updated with search
const Toolbar: React.FC<{
  productCount: number;
  sortBy: string;
  setSortBy: (sort: "newest" | "price-low" | "price-high") => void;
  onFilterClick?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobile?: boolean;
}> = ({
  productCount,
  sortBy,
  setSortBy,
  onFilterClick,
  searchQuery,
  setSearchQuery,
  isMobile,
}) => {
  return (
    <div className="space-y-4">
      {/* Mobile Filter Button - Updated */}
      <div className="lg:hidden">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pretražite artikle…"
              className="w-full pl-12 pr-4 py-4 glass-effect-enhanced rounded-2xl border border-white/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all duration-300"
            />
          </div>
        </div>

        <button
          onClick={onFilterClick}
          className="flex items-center justify-between w-full px-5 py-4 glass-effect-enhanced rounded-2xl text-gray-900 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-gray-700" />
            </div>
            <div className="text-left">
              <div className="text-sm font-light text-gray-500">
                Filtrirajte artikle
              </div>
              <div className="text-xs text-gray-400">
                {productCount} products
              </div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Desktop Toolbar */}
      <div className="hidden lg:flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        {/* Search Input - Desktop */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretražite po nazivu ili brendu…"
            className="w-full pl-12 pr-4 py-3.5 glass-effect-light-enhanced rounded-xl border border-white/40 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-6">
          {/* Product Count */}
          <div className="text-center p-4 glass-effect-light-enhanced rounded-2xl">
            <div className="text-xl font-bold text-gray-900 mb-1">
              {productCount}
            </div>
            <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
              Artikli
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "newest" | "price-low" | "price-high"
                )
              }
              className="appearance-none bg-transparent border border-white/40 px-6 py-3.5 pr-10 text-sm font-light text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 glass-effect-enhanced rounded-2xl hover:shadow-lg cursor-pointer w-48"
            >
              <option value="newest" className="bg-white">
                Najnovije prvo
              </option>
              <option value="price-low" className="bg-white">
                Cena rastuće
              </option>
              <option value="price-high" className="bg-white">
                Cena opadajuće
              </option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
};

// SizeIcon Component - Compact size icons
const SizeIcon: React.FC<{ size: string; isAvailable: boolean }> = ({
  size,
  isAvailable,
}) => (
  <div
    className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
      isAvailable
        ? "bg-gray-100 border border-gray-200 text-gray-700"
        : "bg-gray-50 border border-gray-100 text-gray-400"
    }`}
    title={`Veličina ${size}`}
  >
    <span className="text-xs font-medium">{size}</span>
  </div>
);

// ProductCard Component - ПРЯМОУГОЛЬНЫЕ КАРТОЧКИ
const ProductCard: React.FC<{
  product: Product;
  isMobile?: boolean;
}> = ({ product, isMobile = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Adding to cart:", product.id);
  };

  const displayImage =
    isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0];


  return (
    <div
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer w-full h-full"
    >
      {/* Card component */}
      <div className="glass-effect-enhanced rounded-2xl overflow-hidden border border-white/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        {/* Image Container - Different aspect ratio for mobile */}
        <div
          className={`relative ${
            isMobile ? "aspect-[4/5]" : "aspect-[5/6]"
          } overflow-hidden flex-shrink-0`}
        >
          <img
            src={displayImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Image transition overlay */}
          {product.images.length > 1 && (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Glass Effect Badges - Simplified */}
          <div className="absolute top-3 left-3">
            {product.isNew && (
              <span className="px-2 py-1 glass-effect-light-enhanced text-gray-900 text-xs font-medium rounded-full shadow-sm">
                Novo
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-8 h-8 glass-effect-light-enhanced rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gray-900" />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute bottom-3 right-3">
              <span className="px-2 py-1 glass-effect-light-enhanced bg-gray-900/80 text-white text-xs font-medium rounded-full">
                Nema na stanju
              </span>
            </div>
          )}
        </div>

        {/* Product Info - Compact */}
        <div className="p-2 lg:p-4 flex-grow flex flex-col">
          <div className="mb-1.2">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider truncate block">
              {product.brand}
            </span>
          </div>
          <h3 className="font-medium text-gray-900 text-sm lg:text-base -mb-4 lg:mb-2.5 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 flex-grow min-h-[40px]">
            {product.name}
          </h3>

          {/* Size Icons - Hidden on mobile */}
          {!isMobile && (
            <div className="mb-0 lg:mb-3">
              <div className="flex items-center gap-1.5 -mt-6">
                {product.sizes.slice(0, 5).map((size, index) => (
                  <SizeIcon
                    key={`${product.id}-${size}-${index}`}
                    size={size}
                    isAvailable={product.inStock}
                  />
                ))}
                {product.sizes.length > 5 && (
                  <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-medium">
                      +{product.sizes.length - 5}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 lg:pt-3 border-t border-gray-100 mt-auto">
            <div>
              <span className="text-sm lg:text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice && !isMobile && (
                <span className="text-xs text-gray-400 line-through ml-1.5">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="text-gray-400 text-xs font-light flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="hidden sm:inline text-[10px]">
                {product.inStock ? "Na stanju" : "Rasprodato"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProductGrid Component - 2 columns on mobile, 4 on desktop
const ProductGrid: React.FC<{
  products: Product[];
  isMobile: boolean;
}> = ({ products, isMobile }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
      {products.map((product) => (
        <div
          key={product.id} // ← Убедитесь что ключ уникальный
          className="animate-in fade-in-0 duration-500 h-full"
          style={{
            animationDelay: `${Math.random() * 300}ms`, // ← Используем random вместо index
            animationFillMode: "both",
          }}
        >
          <ProductCard product={product} isMobile={isMobile} />
        </div>
      ))}
    </div>
  );
};

// Pagination Component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}> = ({ currentPage, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2.5 glass-effect-light-enhanced rounded-xl text-sm font-light text-gray-900 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prethodna</span>
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-xl text-xs font-medium transition-all duration-300 ${
              currentPage === page
                ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md"
                : "text-gray-600 hover:bg-white/60 glass-effect-light-enhanced"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2.5 glass-effect-light-enhanced rounded-xl text-sm font-light text-gray-900 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        <span className="hidden sm:inline">Sledeća</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Main CatalogPage Component
export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productGridRef = useRef<HTMLDivElement>(null);

  // Используем хук для получения товаров из Sanity
  const { products: allProducts, isLoading, error } = useProducts();

  const urlCategory = searchParams.get("category") as Category | null;
  const urlNew = searchParams.get("new") === "true";

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    urlCategory || "all"
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    Subcategory | "all"
  >("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]); // Изменено на string[]
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(urlNew);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Update filters when URL changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    const urlCategory = newSearchParams.get("category") as Category | null;
    const urlNew = newSearchParams.get("new") === "true";

    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    } else if (!urlCategory && selectedCategory !== "all") {
      setSelectedCategory("all");
    }

    if (urlNew !== showNewOnly) {
      setShowNewOnly(urlNew);
    }
  }, [location.search, selectedCategory, showNewOnly]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedSizes,
    selectedBrands,
    showNewOnly,
    searchQuery,
  ]);

  // Scroll to top when page changes
  useEffect(() => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile && showMobileFilters) {
        setShowMobileFilters(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [showMobileFilters]);

  // Используем allProducts вместо typedMockProducts
  const brands = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return [];

    const allBrands = allProducts
      .map((product) => product.brand)
      .filter((b): b is string => {
        return typeof b === "string" && b.trim() !== "";
      });

    return Array.from(new Set(allBrands)).sort();
  }, [allProducts]);

  const sizes = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return [];

    const allSizes = allProducts.flatMap((product) => {
      return product.sizes || [];
    });

    // Уникальные размеры
    const uniqueSizes = Array.from(new Set(allSizes));

    // Сортировка размеров
    return uniqueSizes.sort((a, b) => {
      const order = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return a.localeCompare(b);
    });
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return [];

    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSubcategory =
        selectedSubcategory === "all" ||
        product.subcategory === selectedSubcategory;

      // Фильтрация по размерам с учетом объектов
      const matchesSizes =
        selectedSizes.length === 0 ||
        product.sizes.some((size) => selectedSizes.includes(size));

      const matchesBrands =
        selectedBrands.length === 0 ||
        (!!product.brand && selectedBrands.includes(product.brand));
      const matchesNew = !showNewOnly || product.isNew;

      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand &&
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

      return (
        matchesCategory &&
        matchesSubcategory &&
        matchesSizes &&
        matchesBrands &&
        matchesNew &&
        matchesSearch
      );
    });
  }, [
    allProducts,
    selectedCategory,
    selectedSubcategory,
    selectedSizes,
    selectedBrands,
    showNewOnly,
    searchQuery,
  ]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sortBy === "newest") {
      sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, productsPerPage]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedSizes([]);
    setSelectedBrands([]);
    setShowNewOnly(false);
    setSortBy("newest");
    setCurrentPage(1);
    setShowMobileFilters(false);
    setSearchQuery("");
  };

  // Показать состояние загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Učitavanje artikala…</p>
          </div>
        </div>
      </div>
    );
  }

  // Показать ошибку
  if (error) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">Error: {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              Osvežite stranicu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Clean mobile design */}
      <div className="pt-20 pb-6 lg:pt-24 lg:pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 lg:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-4 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                Pogledajte kolekciju
              </span>
              <div className="w-4 h-0.5 bg-gray-900"></div>
            </div>

            <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-6 leading-tight tracking-tight">
              Katalog odeće
            </h2>

            <p className="text-gray-500 font-light text-sm lg:text-lg max-w-xl mx-auto leading-relaxed px-4">
              Pronađite artikle po kategoriji, veličini i brendu.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              showNewOnly={showNewOnly}
              setShowNewOnly={setShowNewOnly}
              brands={brands}
              sizes={sizes}
              clearFilters={clearFilters}
              productCount={filteredProducts.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Main Content */}
          <main className="lg:col-span-4">
            {/* Toolbar */}
            <Toolbar
              productCount={filteredProducts.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onFilterClick={() => setShowMobileFilters(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isMobile={isMobile}
            />

            {/* Product Grid */}
            <div ref={productGridRef} className="mb-6 lg:mb-12">
              {paginatedProducts.length > 0 ? (
                <ProductGrid products={paginatedProducts} isMobile={isMobile} />
              ) : (
                <div className="text-center py-12 lg:py-24 glass-effect-enhanced rounded-2xl border border-white/40">
                  <div className="w-14 h-14 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 lg:mb-6">
                    <Search className="w-5 h-5 lg:w-8 lg:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg lg:text-2xl font-light text-gray-900 mb-3">
                    Nema rezultata
                  </h3>
                  <p className="text-gray-500 font-light text-sm lg:text-lg max-w-md mx-auto mb-8">
                    {searchQuery
                      ? "Try a different search term"
                      : "Pokušajte da promenite filtere."}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 text-sm lg:text-base"
                  >
                    <span>Poništite filtere</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-6 lg:mt-8"
            />
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal - Clean design */}
      {isMobile && showMobileFilters && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white animate-in slide-in-from-left-8 duration-300 overflow-y-auto">
            <div className="h-full flex flex-col">
              {/* Clean Header - ONE X button */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-lg font-light text-gray-900">
                  Filtrirajte artikle
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-10 h-10 glass-effect-light-enhanced rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 p-5 space-y-8">
                {/* Search in Mobile Filter */}
                <div>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pretražite artikle…"
                      className="w-full pl-10 pr-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-normal text-gray-900 mb-3">
                    Kategorija
                  </h4>
                  <div className="space-y-2">
                    {(["all", "men", "women"] as (Category | "all")[]).map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-light transition-all duration-300 ${
                            selectedCategory === category
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 bg-gray-50"
                          }`}
                        >
                          {category === "all"
                            ? "Sve kategorije"
                            : categoryLabel(category)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Subcategory Filter */}
                <div>
                  <h4 className="text-sm font-normal text-gray-900 mb-3">
                    Vrsta artikla
                  </h4>
                  <div className="space-y-2">
                    {(
                      [
                        "all",
                        "tshirts",
                        "hoodies",
                        "pants",
                        "sneakers",
                        "accessories",
                      ] as (Subcategory | "all")[]
                    ).map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() =>
                          setSelectedSubcategory(
                            subcategory as Subcategory | "all"
                          )
                        }
                        className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-light transition-all duration-300 ${
                          selectedSubcategory === subcategory
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 bg-gray-50"
                        }`}
                      >
                        {subcategory === "all"
                          ? "Sve vrste"
                          : categoryLabel(subcategory)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-sm font-normal text-gray-900 mb-3">
                    Veličina
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          if (selectedSizes.includes(size)) {
                            setSelectedSizes(
                              selectedSizes.filter((s) => s !== size)
                            );
                          } else {
                            setSelectedSizes([...selectedSizes, size]);
                          }
                        }}
                        className={`px-3 py-2 rounded-xl text-sm font-light transition-all duration-300 ${
                          selectedSizes.includes(size)
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="text-sm font-normal text-gray-900 mb-3">
                    Brend
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => {
                            if (selectedBrands.includes(brand)) {
                              setSelectedBrands(
                                selectedBrands.filter((b) => b !== brand)
                              );
                            } else {
                              setSelectedBrands([...selectedBrands, brand]);
                            }
                          }}
                          className="w-5 h-5 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900"
                        />
                        <span className="text-sm font-light text-gray-600">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* New Arrivals */}
                <div className="pt-4">
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={showNewOnly}
                      onChange={(e) => setShowNewOnly(e.target.checked)}
                      className="w-5 h-5 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900"
                    />
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-light text-gray-900">
                        Samo novi artikli
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-0 bg-white p-5 border-t border-gray-100 space-y-3">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 active:scale-95"
                >
                  Primeni filtere
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full py-3 text-gray-500 font-light text-sm hover:text-gray-700 transition-colors duration-300"
                >
                  Poništite filtere
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="border-t border-gray-200 mb-8 mt-8">
        <div className="mb-8 mt-12 lg:mt-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
};
