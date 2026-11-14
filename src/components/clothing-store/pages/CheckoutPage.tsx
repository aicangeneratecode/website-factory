// src/pages/CheckoutPage.tsx (упрощенная версия)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Lock, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, total } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setIsProcessing(false);
    navigate("/checkout/success");
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-sm font-light uppercase tracking-wider">
                Checkout
              </span>
              <div className="w-6 h-0.5 bg-gray-900"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Order
            </h1>
            <p className="text-gray-500 font-light">
              Secure checkout powered by our Instagram-based service
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Order Summary */}
            <div>
              <div className="glass-effect-enhanced rounded-2xl border border-white/40 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.size} • Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100/50 pt-6 mt-6">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="glass-effect-light-enhanced rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Secure Checkout
                    </h4>
                    <p className="text-sm text-gray-500 font-light">
                      Your payment information is encrypted
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">All cards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <div className="glass-effect-enhanced rounded-2xl border border-white/40 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Contact Information
                    </label>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Shipping Address
                    </label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full name"
                        className="w-full px-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        className="w-full px-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          className="px-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                          required
                        />
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          className="px-4 py-3 glass-effect-light-enhanced rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 glass-effect-light-enhanced rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300">
                        <input
                          type="radio"
                          name="payment"
                          value="instagram"
                          defaultChecked
                          className="w-4 h-4 text-gray-900 bg-white border-gray-300"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            Instagram Direct Message
                          </div>
                          <div className="text-xs text-gray-500 font-light">
                            We'll contact you on Instagram for payment
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 glass-effect-light-enhanced rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          className="w-4 h-4 text-gray-900 bg-white border-gray-300"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            Credit Card
                          </div>
                          <div className="text-xs text-gray-500 font-light">
                            Pay securely with your card
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
