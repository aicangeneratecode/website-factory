import React from "react";
import { Instagram, Mail, MessageCircle, ChevronRight } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Mobile Version - Clean & Modern */}
      <footer className="lg:hidden bg-gradient-to-b from-gray-900 to-gray-950 pt-8 pb-20 safe-area-inset-bottom">
        <div className=" px-4">
          {/* Contact Cards - Horizontal Scroll */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-gray-900 "></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider ">
                Get in Touch
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/clothing-store/catalog"
                className="bg-gray-900 text-white rounded-xl p-4 text-center group"
              >
                <div className="text-sm font-medium mb-1">Shop Collection</div>
                <div className="text-xs text-gray-400 font-light">
                  Browse all items
                </div>
              </a>

              <a
                href="https://instagram.com/direct"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 bg-white rounded-xl p-4 text-center group"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  Direct Message
                </div>
                <div className="text-xs text-gray-500 font-light">
                  Order via Instagram
                </div>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-sm font-medium text-gray-800 mb-3">Shop</div>
              <div className="space--y-2">
                <a
                  href="/clothing-store/catalog"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  All Products
                </a>
                <a
                  href="/clothing-store/catalog?category=hoodies"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  Hoodies
                </a>
                <a
                  href="/clothing-store/catalog?category=jeans"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  Jeans
                </a>
                <a
                  href="/clothing-store/catalog?filter=new"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  New Arrivals
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-800 mb-3">
                Support
              </div>
              <div className="space--y-2">
                <a
                  href="/clothing-store/faq"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  FAQ
                </a>
                <a
                  href="/clothing-store/shipping"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  Shipping
                </a>
                <a
                  href="/clothing-store/returns"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  Returns
                </a>
                <a
                  href="/clothing-store/contact"
                  className="block text-gray-600 text-sm font-light hover:text-gray-900"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Brand & Copyright */}
          <div className="pt-6 border-t border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg font-bold text-gray-500">NSF</div>
                <div className="text-xs text-gray-500 font-light">
                  Essentials
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs font-light">
                    © {currentYear} NSF Clothing. Premium essentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop Version - Original */}
      <footer className="hidden lg:block bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-800 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
                  NSF
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  Premium Essentials
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <a
                  href="mailto:support@nsf.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 glass-effect-light-enhanced bg-gray-800/30 rounded-xl flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-gray-300">
                      support@nsf.com
                    </div>
                    <div className="text-gray-500 text-xs font-light">
                      Email Support
                    </div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/nsf_clothing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 glass-effect-light-enhanced bg-gray-800/30 rounded-xl flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-gray-300">
                      @nsf_clothing
                    </div>
                    <div className="text-gray-500 text-xs font-light">
                      Instagram
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-white text-sm mb-6 tracking-wider uppercase">
                  Shop
                </h4>
                <ul className="space-y-3">
                  {[
                    "All Products",
                    "New Arrivals",
                    "Hoodies",
                    "Jeans",
                    "Shoes",
                    "Accessories",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 text-sm font-light hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white text-sm mb-6 tracking-wider uppercase">
                  Support
                </h4>
                <ul className="space-y-3">
                  {[
                    "Contact",
                    "Shipping",
                    "Returns",
                    "Size Guide",
                    "FAQ",
                    "Privacy Policy",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 text-sm font-light hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white text-sm mb-6 tracking-wider uppercase">
                  Connect
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://instagram.com/nsf_clothing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-sm font-light hover:text-white transition-colors duration-300"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:support@nsf.com"
                      className="text-gray-400 text-sm font-light hover:text-white transition-colors duration-300"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-500 text-sm font-light">
                © {currentYear} NSF Clothing. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
