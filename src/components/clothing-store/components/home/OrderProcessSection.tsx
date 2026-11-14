import React from "react";
import {
  ShoppingBag,
  MessageCircle,
  Package,
  Instagram,
  ArrowRight,
} from "lucide-react";

export const OrderProcessSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Browse Collection",
      description: "Explore our curated essentials",
      icon: ShoppingBag,
      color: "from-gray-900 to-gray-800",
      accentColor: "group-hover:from-gray-800 group-hover:to-gray-700",
      action: "View Products",
      link: "#products",
    },
    {
      number: "02",
      title: "DM on Instagram",
      description: "Send us your order details",
      icon: MessageCircle,
      color: "from-gray-800 to-gray-700",
      accentColor: "group-hover:from-gray-700 group-hover:to-gray-600",
      action: "Message Us",
      link: "https://instagram.com/nsf_clothing",
    },
    {
      number: "03",
      title: "Receive Order",
      description: "Tracked & secure delivery",
      icon: Package,
      color: "from-gray-900 to-gray-800",
      accentColor: "group-hover:from-gray-800 group-hover:to-gray-700",
      action: "Track Order",
      link: "/tracking",
    },
  ];

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header inspired by InstagramFeedSection */}
          <div className="flex items-start justify-between mb-20">
            <div className="w-1/2">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gray-900"></div>
                <span className="text-gray-500 text-sm font-light uppercase tracking-wider">
                  Process
                </span>
              </div>

              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                How to Order
                <br />
                <span className="text-gray-600 font-semibold">
                  in Three Steps
                </span>
              </h2>
            </div>

            <div className="text-right">
              <a
                href="https://instagram.com/nsf_clothing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <Instagram className="w-5 h-5" />
                <span>Start Order on Instagram</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Steps Grid - Inspired by Instagram grid */}
          <div className="grid grid-cols-3 gap-8 -mt-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="group relative">
                  {/* Background number */}
                  <div className="absolute -top-4 -left-4 text-[140px] font-black text-gray-50/40 leading-none -z-10">
                    {step.number}
                  </div>

                  {/* Step Card with glass effect */}
                  <div className="glass-effect-enhanced rounded-2xl p-8 border border-white/40 shadow-soft transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 h-full">
                    {/* Icon with gradient background */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500 shadow-lg ${step.accentColor}`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Step content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-gray-600 font-light text-lg leading-relaxed">
                        {step.description}
                      </p>

                      {/* Action button */}
                      <a
                        href={step.link}
                        target={
                          step.link.includes("instagram") ? "_blank" : "_self"
                        }
                        rel={
                          step.link.includes("instagram")
                            ? "noopener noreferrer"
                            : ""
                        }
                        className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-700 transition-colors duration-300 group/btn"
                      >
                        <span>{step.action}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </a>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gray-900/20"></div>
                  </div>

                  {/* Connecting line (except last) */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-900/30 to-transparent hidden lg:block"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Version - Compact */}
      <section className="lg:hidden py-4">
        <div className="px-4">
          {/* Compact Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                Process
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              How to Order
              <br />
            </h2>
          </div>

          {/* Compact Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Number - Smaller */}
                  <div className="absolute -left-1 -top-1 w-6 h-6 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center z-10">
                    {step.number.slice(1)}
                  </div>

                  {/* Step Card - More Compact */}
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-xs font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Action - Compact */}
                    <a
                      href={step.link}
                      target={
                        step.link.includes("instagram") ? "_blank" : "_self"
                      }
                      rel={
                        step.link.includes("instagram")
                          ? "noopener noreferrer"
                          : ""
                      }
                      className="inline-flex items-center gap-1 text-xs text-gray-900 font-medium"
                    >
                      <span>{step.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Connector (except last) - Smaller */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-full left-3 w-0.5 h-4 bg-gradient-to-b from-gray-900/20 to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
