import { store } from "../../lib/storeConfig";
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white/95 backdrop-blur-md z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          aria-label="Zatvorite meni"
        >
          <X size={20} className="text-gray-700" />
        </button>

        {/* Logo */}
        <div className="mt-4 mb-8">
          <div className="text-2xl font-light text-gray-900">{store.name}</div>
        </div>

        <nav className="space-y-2">
          <Link
            to="/catalog"
            className="block py-3 px-4 text-lg font-light text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
            onClick={onClose}
          >
            Katalog
          </Link>
          <Link
            to="/catalog?category=men"
            className="block py-3 px-4 text-lg font-light text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
            onClick={onClose}
          >
            Muškarci
          </Link>
          <Link
            to="/catalog?category=women"
            className="block py-3 px-4 text-lg font-light text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
            onClick={onClose}
          >
            Žene
          </Link>
          <Link
            to="/catalog?new=true"
            className="block py-3 px-4 text-lg font-light text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
            onClick={onClose}
          >
            Novo
          </Link>
        </nav>

        {/* Additional Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="space-y-2">
            <Link
              to="/faq"
              className="block py-2 px-4 text-sm font-light text-gray-500 hover:text-gray-700 transition-colors duration-300"
              onClick={onClose}
            >
              Česta pitanja
            </Link>
            <Link
              to="/shipping"
              className="block py-2 px-4 text-sm font-light text-gray-500 hover:text-gray-700 transition-colors duration-300"
              onClick={onClose}
            >
              Dostava
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
