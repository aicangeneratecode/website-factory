// src/components/layout/CartIcon.tsx
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const CartIcon: React.FC = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative group"
      aria-label={`Cart ${totalItems > 0 ? `(${totalItems} items)` : ""}`}
    >
      <div className="w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300">
        <ShoppingBag className="w-5 h-5 text-gray-700" />
      </div>

      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-sm animate-bounce-once">
          {totalItems > 9 ? "9+" : totalItems}
        </div>
      )}
    </button>
  );
};
