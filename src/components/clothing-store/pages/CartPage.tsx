// src/pages/CartPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  RotateCcw,
  Instagram,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    total,
    totalItems,
  } = useCart();

  const [isClearing, setIsClearing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        {/* Header */}
        <div className="border-b border-gray-100">
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
                  Back
                </span>
              </button>

              <button
                onClick={() => navigate("/catalog")}
                className="px-4 py-2 glass-effect-light-enhanced rounded-xl text-sm font-medium text-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center py-20">
              <div className="w-20 h-20 glass-effect-light-enhanced rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>

              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-light text-gray-900">
                  Your cart is empty
                </h1>
                <p className="text-gray-500 font-light text-lg max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/catalog")}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl"
                >
                  <span>Browse Collection</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </button>

                <a
                  href="https://instagram.com/nsf_clothing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 glass-effect-enhanced text-gray-900 rounded-2xl font-medium hover:shadow-lg transition-all duration-500 transform hover:scale-105 active:scale-95 group border border-white/40"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Shop on Instagram</span>
                  <MessageCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      {/* Header */}
      <div className="border-b border-gray-100">
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
                Back
              </span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleClearCart}
                className={`px-4 py-2 glass-effect-light-enhanced rounded-xl text-sm font-medium text-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isClearing ? "animate-pulse" : ""
                }`}
              >
                Clear All
              </button>
              <button
                onClick={() => navigate("/catalog")}
                className="px-4 py-2 glass-effect-light-enhanced rounded-xl text-sm font-medium text-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Shopping Cart
                </h1>
                <p className="text-gray-500 font-light">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatPrice(total)}
                </div>
                <p className="text-sm text-gray-500 font-light">Total amount</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-effect-enhanced rounded-2xl overflow-hidden border border-white/40 shadow-soft"
                    >
                      <div className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div
                            onClick={() =>
                              navigate(`/product/${item.productId}`)
                            }
                            className="flex-shrink-0 cursor-pointer group"
                          >
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-3">
                              <div>
                                <h3
                                  onClick={() =>
                                    navigate(`/product/${item.productId}`)
                                  }
                                  className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:text-gray-700 transition-colors duration-300"
                                >
                                  {item.name}
                                </h3>
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="text-gray-500 font-light">
                                    {item.brand}
                                  </span>
                                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                  <span className="text-gray-500 font-light">
                                    Size: {item.size}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 glass-effect-light-enhanced rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-500 hover:text-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity Selector */}
                              <div className="flex items-center gap-2">
                                <div className="flex items-center border border-white/40 glass-effect-light-enhanced rounded-xl overflow-hidden">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 active:scale-95"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-10 h-10 flex items-center justify-center text-gray-900 font-medium bg-white/10 border-l border-r border-white/20">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 active:scale-95"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="text-sm text-gray-500 font-light ml-3">
                                  {formatPrice(item.price)} each
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-xl font-bold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Summary Card */}
                <div className="glass-effect-enhanced rounded-2xl border border-white/40 shadow-soft p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Shipping</span>
                      <span
                        className={
                          shippingCost === 0
                            ? "text-green-600 font-medium"
                            : "font-medium text-gray-900"
                        }
                      >
                        {shippingCost === 0
                          ? "FREE"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>

                    {subtotal < 100 && (
                      <div className="text-sm text-gray-500 font-light py-2 px-3 glass-effect-light-enhanced rounded-xl">
                        Add {formatPrice(100 - subtotal)} more for free shipping
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100/50 pt-6 mb-6">
                    <div className="flex justify-between text-xl">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="glass-effect-light-enhanced rounded-2xl border border-white/30 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3">
                      <Truck className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-light block">
                        Free Shipping
                      </span>
                    </div>
                    <div className="text-center p-3">
                      <RotateCcw className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-light block">
                        30-Day Returns
                      </span>
                    </div>
                    <div className="text-center p-3">
                      <Shield className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-light block">
                        Secure Payment
                      </span>
                    </div>
                    <div className="text-center p-3">
                      <Package className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-light block">
                        Fast Delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instagram CTA */}
                <div className="glass-effect-enhanced rounded-2xl border border-white/40 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Shop on Instagram
                      </h4>
                      <p className="text-sm text-gray-500 font-light">
                        Get personalized service
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://instagram.com/nsf_clothing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center py-3 glass-effect-light-enhanced text-gray-900 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
