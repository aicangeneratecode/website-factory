import { formatPrice } from "../lib/storeConfig";
// src/pages/ProductPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Instagram,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Heart,
  Package,
  Check,
  ArrowRight,
} from "lucide-react";
import { useProduct, useProducts } from "../hooks/useSanityProducts"; // Импортируем хуки Sanity
import type { Product, Size, Category, Subcategory } from "../types/types";
import { useCart } from "../context/CartContext";

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Используем хук Sanity для получения товара
  const {
    product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(productId);

  // Используем хук Sanity для получения всех товаров (для related products)
  const { products: allProducts, isLoading: allProductsLoading } =
    useProducts();

  const { addItem } = useCart();

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      // sizes теперь всегда массив строк
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Get related products из Sanity
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts || allProductsLoading) return [];
    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category || p.brand === product.brand)
      )
      .slice(0, 4);
  }, [product, allProducts, allProductsLoading]);

  // Показываем скелетон при загрузке
  if (productLoading) {
    return <ProductPageSkeleton />;
  }

  // Показываем ошибку если есть
  if (productError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 glass-effect-enhanced rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            Učitavanje nije uspelo
          </h1>
          <p className="text-gray-500 mb-6">{productError}</p>
          <button
            onClick={() => navigate("/catalog")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Nazad na katalog</span>
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 glass-effect-enhanced rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            Artikal nije pronađen
          </h1>
          <button
            onClick={() => navigate("/catalog")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Nazad na katalog</span>
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !product) return;

    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand ?? "",
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantity,
      size: selectedSize,
      image: product.images[0],
      category: product.category,
      inStock: product.inStock,
    });

    console.log("Добавлено в корзину:", {
      product: product.id,
      size: selectedSize,
      quantity: quantity,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const shareOnViber = () => {
    const productUrl = window.location.href;
    const text = `Pogledajte ${product.name} — ${formatPrice(product.price)}`;
    const viberUrl = `viber://forward?text=${encodeURIComponent(
      text + " " + productUrl
    )}`;
    window.open(viberUrl, "_blank");
  };


  return (
    <div className="min-h-screen py-18">
      {/* Enhanced Sticky Navigation - Glass effect */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 transition-all duration-300 hover:gap-4"
            >
              <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
              </div>
              <span className="text-sm font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Nazad
              </span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                />
              </button>
              <button
                onClick={() => navigate("/catalog")}
                className="px-4 py-2 glass-effect-light-enhanced rounded-xl text-sm font-medium text-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Katalog
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images - Enhanced Glass Effect */}
            <div className="space-y-6">
              {/* Main Image with InstagramFeedSection style */}
              <div className="relative group">
                <div className="glass-effect-enhanced aspect-square rounded-3xl overflow-hidden border border-white/40 shadow-soft">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    } group-hover:scale-105`}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl" />

                  {/* Badges - Instagram style */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1.5 glass-effect-light-enhanced text-gray-900 text-xs font-medium rounded-full shadow-sm backdrop-blur-sm">
                        Novi artikal
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="px-3 py-1.5 glass-effect-light-enhanced bg-gray-900/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        Nema na stanju
                      </span>
                    )}
                  </div>

                  {/* Share Button */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-12 h-12 glass-effect-light-enhanced rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                      <Share2 className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-effect-light-enhanced rounded-xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-900" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-effect-light-enhanced rounded-xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-6 left-6 px-3 py-1.5 glass-effect-light-enhanced rounded-full text-sm font-light text-gray-900 backdrop-blur-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>

                {/* Instagram Feed Style Grid Indicator */}
                {product.images.length > 1 && (
                  <div className="flex justify-center mt-4">
                    <div className="flex gap-1">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-8 h-1 rounded-full transition-all duration-500 ${
                            currentImageIndex === index
                              ? "bg-gray-900 w-12"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails Grid - Instagram style */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`glass-effect-light-enhanced aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                        currentImageIndex === index
                          ? "border-gray-900 shadow-sm"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info*/}
            <div className="space-y-8">
              {/* Header with */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-6 h-0.5 bg-gray-900"></div>
                    <span className="text-gray-500 text-sm font-light uppercase tracking-wider">
                      {product.brand}
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                    {product.name}
                  </h1>

                  {/* Price and Rating Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <div className="text-3xl font-light text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-lg text-gray-400 font-light line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="glass-effect-light-enhanced rounded-2xl p-6">
                  <p className="text-gray-600 font-light leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Trust Badges - Grid like InstagramFeedSection stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      icon: Truck,
                      label: "Free Shipping",
                      desc: "Worldwide",
                    },
                    {
                      icon: RotateCcw,
                      label: "30-Day Returns",
                      desc: "Easy returns",
                    },
                    {
                      icon: Shield,
                      label: "2-Year Warranty",
                      desc: "Quality guarantee",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 glass-effect-light-enhanced rounded-xl hover:shadow-lg transition-all duration-300 group"
                    >
                      <item.icon className="w-5 h-5 text-gray-600 mx-auto mb-3 group-hover:text-gray-900 transition-colors duration-300" />
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 font-light">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-normal text-gray-900">
                    Izaberite veličinu
                  </h3>
                  <button className="text-xs text-gray-500 font-light hover:text-gray-900 transition-colors duration-200">
                    Vodič za veličine
                  </button>
                </div>
                <div className="inline-flex gap-2 p-2 glass-effect-enhanced rounded-2xl">
                  {product.sizes.map((size, index) => (
                    <button
                      key={`${product.id}-${size}-${index}`}
                      onClick={() => setSelectedSize(size)}
                      disabled={!product.inStock}
                      className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                          : "text-gray-700 hover:bg-white/60 glass-effect-light-enhanced"
                      } ${
                        !product.inStock ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="font-medium text-sm">{size}</span>
                      {selectedSize === size && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/40 glass-effect-enhanced rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 active:scale-95"
                    >
                      -
                    </button>
                    <span className="w-12 h-12 flex items-center justify-center text-gray-900 font-medium bg-white/10 border-l border-r border-white/20">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 active:scale-95"
                    >
                      +
                    </button>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.inStock ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm text-gray-500 font-light">
                      {product.inStock
                        ? "Na stanju"
                        : "Nema na stanju"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !product.inStock}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>Dodajte u korpu</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
              </div>

              {/* Product Details - Instagram style grid */}
              <div className="pt-8 border-t border-gray-100/50">
                <h4 className="text-sm font-normal text-gray-900 mb-6">
                  Detalji artikla
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Brand", value: product.brand },
                    { label: "Category", value: product.category },
                    { label: "Material", value: "Premium Cotton" },
                    { label: "Fit", value: "Regular" },
                    { label: "Care", value: "Machine Wash" },
                    { label: "SKU", value: product.id },
                  ].map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 glass-effect-light-enhanced rounded-xl hover:shadow-sm transition-all duration-300"
                    >
                      <span className="text-sm text-gray-500 font-light">
                        {detail.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Sharing - Instagram CTA style */}
              <div className="pt-8 border-t border-gray-100/50">
                <div className="flex flex-wrap gap-4">

                  <button
                    onClick={shareOnViber}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 group flex-1 min-w-[200px] shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Podelite na Viberu</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products - Instagram grid style */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-100/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-light mb-3">
                    <div className="w-6 h-0.5 bg-gray-900"></div>
                    <span>POGLEDAJTE JOŠ</span>
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 mb-2">
                    Slični artikli
                  </h2>
                </div>

                <button
                  onClick={() => navigate("/catalog")}
                  className="inline-flex items-center gap-2 px-6 py-3 glass-effect-light-enhanced text-gray-900 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group"
                >
                  <span>Pogledajte sve</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="glass-effect-enhanced rounded-2xl overflow-hidden border border-white/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                        {product.isNew && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 glass-effect-light-enhanced text-gray-900 text-xs font-medium rounded-full">
                              Novo
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="mb-2">
                          <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
                            {product.brand}
                          </span>
                        </div>

                        <h3 className="font-medium text-gray-900 text-sm mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </span>

                          <button className="w-8 h-8 glass-effect-light-enhanced rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <ShoppingBag className="w-3 h-3 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Loading Skeleton with Instagram style
const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl animate-pulse"></div>
              <div className="w-20 h-10 glass-effect-light-enhanced rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Skeleton */}
            <div className="space-y-6">
              <div className="glass-effect-enhanced aspect-square rounded-3xl animate-pulse"></div>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="glass-effect-light-enhanced aspect-square rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="w-3/4 h-12 bg-gray-200 rounded animate-pulse mb-6"></div>
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="glass-effect-light-enhanced rounded-2xl p-6">
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="glass-effect-light-enhanced rounded-xl p-4 animate-pulse"
                    >
                      <div className="w-5 h-5 bg-gray-200 rounded mx-auto mb-3"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection Skeleton */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="inline-flex gap-2 p-2 glass-effect-enhanced rounded-2xl">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-10 glass-effect-light-enhanced rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Buttons Skeleton */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass-effect-enhanced rounded-2xl overflow-hidden">
                    <div className="w-12 h-12 bg-gray-200 animate-pulse"></div>
                    <div className="w-12 h-12 bg-gray-300 animate-pulse"></div>
                    <div className="w-12 h-12 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                  <div className="w-32 h-14 glass-effect-light-enhanced rounded-2xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
