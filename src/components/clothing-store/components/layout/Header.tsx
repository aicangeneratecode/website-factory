// src/components/layout/Header.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  ShoppingBag,
  X,
  Instagram,
  Home,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { CartIcon } from "./CartIcon";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const { totalItems } = useCart();
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);

  // Определяем, на главной ли мы странице
  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  // Обработчик скролла с улучшенной логикой
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const headerHeight = headerRef.current?.offsetHeight || 0;

          if (scrollTop > headerHeight * 0.8) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Проверяем начальную позицию
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Закрываем мобильное меню при смене роута
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Определяем цвет текста для мобильной версии
  const getMobileTextColor = () => {
    if (isHomePage && !isScrolled) {
      return "text-white";
    }
    return "text-gray-900";
  };

  // Определяем цвет для десктопной версии (ВСЕГДА ЧЕРНЫЙ на ПК)
  const getDesktopTextColor = () => {
    return "text-gray-900"; // Всегда черный на десктопе
  };

  // Определяем цвет для иконок на десктопе (ВСЕГДА ЧЕРНЫЙ)
  const getDesktopIconColor = () => {
    return "text-gray-900 hover:text-gray-700";
  };

  // Определяем стили для хедера
  const getHeaderStyles = () => {
    const baseStyles =
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700";

    if (isScrolled) {
      return `${baseStyles} bg-white/95 backdrop-blur-lg border-b border-gray-100/30 shadow-sm h-20`;
    }

    if (isHomePage) {
      // На главной в idle - прозрачный фон с черным текстом на десктопе
      return `${baseStyles} bg-transparent h-24`;
    }

    return `${baseStyles} bg-white/95 backdrop-blur-lg border-b border-gray-100/30 h-20`;
  };

  return (
    <>
      <header
        ref={headerRef}
        className={getHeaderStyles()}
        style={{
          transitionProperty:
            "height, background-color, border-color, backdrop-filter, box-shadow",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="h-full">
          <div className="px-4 md:px-6 h-full flex items-center justify-between max-w-7xl mx-auto">
            {/* Left: Mobile Menu Button & Desktop Navigation */}
            <div className="flex items-center h-full">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 md:hidden flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-xl hover:bg-white/10 active:scale-95 ${
                  isHomePage && !isScrolled
                    ? "hover:bg-white/20"
                    : "hover:bg-gray-100"
                }`}
                aria-label="Open menu"
              >
                <Menu size={24} className={getMobileTextColor()} />
              </button>

              <nav className="hidden md:flex items-center gap-2 ml-0">
                {[
                  { name: "Home", path: "/", exact: true },
                  { name: "Catalog", path: "/catalog", exact: false },
                  { name: "Men", path: "/catalog?category=men", exact: false },
                  {
                    name: "Women",
                    path: "/catalog?category=women",
                    exact: false,
                  },
                  { name: "New", path: "/catalog?new=true", exact: false },
                ].map((item) => {
                  let isActive = false;

                  if (item.name === "Home") {
                    isActive = location.pathname === "/";
                  } else if (item.name === "Catalog") {
                    isActive =
                      location.pathname === "/catalog" &&
                      !location.search.includes("category=") &&
                      !location.search.includes("new=true");
                  } else if (item.name === "Men") {
                    // Men активен когда категория=men
                    isActive =
                      location.pathname === "/catalog" &&
                      location.search.includes("category=men");
                  } else if (item.name === "Women") {
                    // Women активен когда категория=women
                    isActive =
                      location.pathname === "/catalog" &&
                      location.search.includes("category=women");
                  } else if (item.name === "New") {
                    // New активен когда new=true
                    isActive =
                      location.pathname === "/catalog" &&
                      location.search.includes("new=true");
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="relative group"
                    >
                      <div
                        className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-600 hover:text-gray-900 "
                        }`}
                      >
                        <span>{item.name}</span>

                        {/* Active indicator  */}
                        {isActive && (
                          <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full" />
                        )}

                        {/* Hover indicator */}
                        {!isActive && (
                          <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Logo - Увеличенный размер */}
            <Link
              to="/"
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center h-full"
            >
              {/* Mobile Logo */}
              <div className="md:hidden">
                <div
                  className={`text-2xl md:text-3xl font-light tracking-tight transition-colors duration-500 ${getMobileTextColor()}`}
                >
                  NSF
                </div>
                {isHomePage && !isScrolled && (
                  <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                )}
              </div>

              {/* Desktop Logo - Всегда черный на ПК */}
              <div className="hidden md:block">
                <div className="text-3xl font-light tracking-tight text-gray-900">
                  NSF
                </div>
                <div className="text-xs font-light mt-1 text-center text-gray-500">
                  Essentials
                </div>
              </div>
            </Link>

            {/* Right: Cart & Instagram */}
            <div className="flex items-center gap-2 h-full">
              {/* Instagram Link - Desktop only */}
              <a
                href="https://instagram.com/NSF_Clothing"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 group hover:bg-gray-100/50"
                aria-label="Instagram"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Instagram
                    size={16}
                    className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300"
                  />
                </div>
              </a>

              {/* Cart Icon */}
              <div className="relative">
                <CartIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient line for scrolled state */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        )}
      </header>

      {/* Mobile Menu - Glass effect */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop with smooth blur */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in-0" />
          </div>

          {/* Menu Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-white/95 backdrop-blur-xl z-50 md:hidden shadow-2xl animate-in slide-in-from-left-8 duration-500">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 glass-effect-light-enhanced rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95"
            >
              <X size={20} className="text-gray-700" />
            </button>

            {/* Menu Content */}
            <div className="h-full flex flex-col pt-24 pb-8 px-6">
              {/* Logo */}
              <div className="mb-12">
                <div className="text-2xl font-light text-gray-900 mb-1">
                  NSF
                </div>
                <p className="text-gray-500 text-sm font-light">Essentials</p>
              </div>

              {/* Main Navigation */}
              <nav className="flex-1 space-y-1">
                {[
                  { name: "Home", path: "/", icon: Home },
                  { name: "Catalog", path: "/catalog" },
                  { name: "Men", path: "/catalog?category=men" },
                  { name: "Women", path: "/catalog?category=women" },
                  { name: "New Arrivals", path: "/catalog?new=true" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100/80"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {Icon && (
                        <Icon
                          size={20}
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-500 group-hover:text-gray-700"
                          }
                        />
                      )}
                      <span className="text-lg font-light">{item.name}</span>
                      <ChevronRight
                        size={16}
                        className={`ml-auto transition-transform duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Support Links */}
              <div className="mb-8">
                <div className="text-xs font-light text-gray-500 uppercase tracking-wider mb-4 px-2">
                  Support
                </div>
                <div className="space-y-1">
                  {[
                    { name: "Contact", path: "/contact" },
                    { name: "Shipping & Returns", path: "/shipping" },
                    { name: "FAQ", path: "/faq" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-3 text-sm text-gray-600 font-light hover:text-gray-900 transition-all duration-300 hover:pl-6 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <a
                  href="https://instagram.com/NSF_Clothing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 glass-effect-light-enhanced rounded-xl hover:shadow-lg transition-all duration-300 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <Instagram size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      @NSF_Clothing
                    </div>
                    <div className="text-xs text-gray-500 font-light">
                      Follow us on Instagram
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
