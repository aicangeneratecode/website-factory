// src/components/layout/CartSidebar.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  ChevronRight,
  Truck,
  Package,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export const CartSidebar: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shippingCost,
    total,
    totalItems,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    closeCart();
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Your Cart
                      </h2>
                      <p className="text-sm text-gray-500 font-light">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCart}
                    className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 glass-effect-light-enhanced rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 font-light mb-6">
                    Add some items to get started
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate("/catalog");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="glass-effect-light-enhanced rounded-2xl p-4 border border-white/30"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-gray-500 font-light mb-2">
                            {item.brand} • Size: {item.size}
                          </p>

                          <div className="flex items-center justify-between">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200"
                              >
                                -
                              </button>
                              <span className="text-sm font-medium text-gray-900 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200"
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-sm font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-light">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-light">Shipping</span>
                    <span
                      className={
                        shippingCost === 0
                          ? "text-green-600 font-medium"
                          : "font-medium text-gray-900"
                      }
                    >
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>

                  {subtotal < 100 && (
                    <div className="text-xs text-gray-500 font-light">
                      Add {formatPrice(100 - subtotal)} more for free shipping
                    </div>
                  )}

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={handleViewCart}
                    className="w-full py-3 glass-effect-light-enhanced text-gray-900 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>View Full Cart</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-gray-500 font-light hover:text-gray-700 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
