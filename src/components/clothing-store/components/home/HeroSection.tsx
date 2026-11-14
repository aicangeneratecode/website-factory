// src/components/home/HeroSection.tsx
import React from "react";
import {
  ArrowRight,
  Instagram,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { HeroSectionData } from "../../types/homepageTypes";

interface HeroSectionProps {
  data?: HeroSectionData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  // Если секция отключена, не рендерим
  if (data?.isActive === false) {
    return null;
  }

  // Значения по умолчанию
  const title = data?.title || "NSF";
  const subtitle = data?.subtitle || "Essentials";
  const buttonText = data?.buttonText || "Shop Now";
  const mainImage = data?.mainImage || "/images/clothing-store/IMG_3375.jpg";
  const instagramUsername = data?.instagramUsername || "nsf_clothing";
  const stats = data?.stats || [
    { value: "200+", label: "Customers" },
    { value: "4.8★", label: "Rating" },
    { value: "24h", label: "Response" },
  ];

  return (
    <>
      {/* Mobile Version - Fixed Structure */}
      <section className="lg:hidden min-h-[60svh] flex flex-col justify-end relative overflow-hidden bg-black pt-20 pb-6">
        {/* Fixed Background with Sanity image */}
        <div className="absolute inset-0">
          <img
            src={mainImage}
            alt="NSF Clothing Collection"
            className="w-full h-full object-cover object-center"
          />
          {/* Fixed gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
        </div>

        {/* Fixed Content Structure */}
        <div className="relative z-10 w-full px-4 pb-8 safe-area-inset-bottom">
          <div className="space-y-4">
            {/* Fixed Instagram Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white rounded-full text-xs font-light">
              <Instagram className="w-3 h-3" />
              <span>@{instagramUsername.replace("@", "")}</span>
            </div>

            {/* Fixed Heading Structure */}
            <div className="space-y-1">
              <h1 className="text-4xl font-light text-white tracking-tight leading-none">
                {title}
              </h1>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extralight text-white/90 tracking-wide">
                  {subtitle}
                </h2>
                <Sparkles className="w-3.5 h-3.5 text-white/70" />
              </div>
            </div>

            {/* Fixed Description Text */}
            <div>
              <p className="text-sm text-white/80 font-light leading-relaxed max-w-xs">
                Premium basics for modern living.
              </p>
              <p className="text-sm text-white/80 font-light leading-relaxed max-w-xs -mt-5">
                Quality materials, timeless style.
              </p>
            </div>

            {/* Fixed CTA Buttons Structure */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white text-gray-900 rounded-xl font-normal active:scale-95 transition-all duration-200 transform shadow-sm text-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{buttonText}</span>
              </a>

              <a
                href={`https://instagram.com/${instagramUsername.replace(
                  "@",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-transparent border border-white/40 text-white rounded-xl font-normal active:scale-95 transition-all duration-200 transform text-sm backdrop-blur-sm"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow</span>
              </a>
            </div>

            {/* Fixed Stats Structure */}
            <div className="flex justify-between pt-4 px-2 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs font-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Scroll Indicator */}
        <div className="pt-6">
          <div className="py-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-1 text-white/50">
              <div className="w-px h-4 bg-white/30 animate-pulse"></div>
              <span className="text-xs font-light">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Version - Fixed Structure */}
      <section className="hidden lg:block py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Fixed Split Layout */}
          <div className="grid grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Fixed Left Column Structure */}
            <div className="space-y-8">
              {/* Fixed Instagram Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect-light-enhanced rounded-full">
                <Instagram className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">
                  @{instagramUsername.replace("@", "")}
                </span>
              </div>

              {/* Fixed Headings Structure */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-7xl font-bold text-gray-900 tracking-tight leading-none">
                    {title}
                  </h1>
                  <div className="inline-flex items-center gap-3 mt-2">
                    <h2 className="text-5xl font-semibold text-gray-600">
                      {subtitle}
                    </h2>
                    <Sparkles className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                {/* Fixed Description */}
                <p className="text-xl text-gray-600 font-light max-w-lg leading-relaxed">
                  Premium basics for modern living.
                  <span className="block mt-2 text-gray-500">
                    Quality materials, timeless style, effortless elegance.
                  </span>
                </p>
              </div>

              {/* Fixed CTA Buttons Structure */}
              <div className="flex gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </a>

                <a
                  href={`https://instagram.com/${instagramUsername.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 glass-effect-enhanced text-gray-900 rounded-2xl font-medium hover:shadow-lg transition-all duration-500 transform hover:scale-105 active:scale-95 group border border-white/40"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Follow on Instagram</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </div>

              {/* Fixed Stats Structure */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 glass-effect-light-enhanced rounded-2xl"
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-xs font-light uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fixed Trend Indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-500 font-light">
                <TrendingUp className="w-4 h-4" />
                <span>+15% growth this month</span>
              </div>
            </div>

            {/* Fixed Right Column Structure */}
            <div className="relative">
              {/* Fixed Image Container */}
              <div className="relative">
                <div className="glass-effect-enhanced aspect-[4/5] rounded-3xl overflow-hidden border border-white/40 shadow-2xl">
                  <img
                    src={mainImage}
                    alt={`${title} ${subtitle} Collection`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/5"></div>
                </div>

                {/* Fixed Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-gray-300/10 to-transparent rounded-full blur-2xl -z-10"></div>

                {/* Fixed Category Tags */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 glass-effect-light-enhanced text-gray-900 text-sm rounded-full font-medium">
                    Hoodies
                  </span>
                  <span className="px-3 py-1.5 glass-effect-light-enhanced text-gray-900 text-sm rounded-full font-medium">
                    Denim
                  </span>
                  <span className="px-3 py-1.5 glass-effect-light-enhanced text-gray-900 text-sm rounded-full font-medium">
                    Essentials
                  </span>
                </div>
              </div>

              {/* Fixed Floating Stats */}
              <div className="absolute -left-6 top-1/3">
                <div className="glass-effect-enhanced p-4 rounded-2xl border border-white/40 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">8.9</div>
                    <div className="text-gray-500 text-xs font-light">
                      Quality Score
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Scroll Indicator */}
          <div className="mt-16 text-center">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm font-light tracking-wide">
                Explore Collections
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
