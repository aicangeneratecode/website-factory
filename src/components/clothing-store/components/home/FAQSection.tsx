import React, { useState } from "react";
import { Plus, Minus, Instagram, Mail, ChevronRight } from "lucide-react";
import type { FAQSectionData } from "../../types/homepageTypes";

interface FAQSectionProps {
  data?: FAQSectionData | null;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  // Дефолтные данные если data нет
  const safeData = data || ({} as FAQSectionData);

  // Безопасное извлечение данных с правильными типами
  const title: string = (safeData as any).title || "Frequently Asked Questions";
  const subtitle: string =
    (safeData as any).subtitle ||
    "Everything you need to know about shopping with NSF.";
  const categories: string[] = [
    "All",
    ...((safeData as any).categories || [
      "Shipping & Returns",
      "Orders",
      "Payment",
      "Products",
    ]),
  ];

  // Дефолтные FAQ если нет данных
  const defaultFaqs = [
    {
      _key: "1",
      question: "What is your return policy?",
      answer:
        "We offer 30-day returns for unworn items with original tags. All items must be in their original condition with tags attached.",
      category: "Shipping & Returns",
    },
    {
      _key: "2",
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in most metropolitan areas.",
      category: "Shipping & Returns",
    },
    {
      _key: "3",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
      category: "Shipping & Returns",
    },
    {
      _key: "4",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you will receive a tracking number via email. You can also track your order through your account dashboard.",
      category: "Orders",
    },
    {
      _key: "5",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are securely processed.",
      category: "Payment",
    },
  ];

  const faqs: Array<{
    _key: string;
    question: string;
    answer: string;
    category: string;
  }> =
    (safeData as any).faqs &&
    Array.isArray((safeData as any).faqs) &&
    (safeData as any).faqs.length > 0
      ? (safeData as any).faqs
      : defaultFaqs;

  const contactEmail: string =
    (safeData as any).contactEmail || "support@nsf.com";
  const instagramHandle: string =
    (safeData as any).instagramHandle || "@nsf_clothing";
  const instagramLink: string =
    (safeData as any).instagramLink || "https://instagram.com/nsf_clothing";
  const responseTime: string =
    (safeData as any).responseTime || "Average response time: Under 2 hours";

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column - Title and categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* SUPPORT section with enhanced glass effect */}
                <div className="glass-effect-enhanced p-8 rounded-2xl border border-white/40 shadow-soft">
                  <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-light mb-4">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-gray-900 to-transparent"></div>
                    <span className="uppercase tracking-wider">Support</span>
                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    {title.split(" ")[0]}
                    <br />
                    <span className="text-gray-600 font-semibold">
                      {title.split(" ").slice(1).join(" ")}
                    </span>
                  </h2>

                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {subtitle}
                  </p>

                  {/* Categories with enhanced idle state */}
                  <div className="space-y-3 mb-10">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                          activeCategory === category
                            ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                            : "text-gray-700 bg-white/80 border border-gray-200/60 hover:border-gray-300 hover:bg-white hover:shadow-md glass-effect-light-enhanced"
                        }`}
                      >
                        <span className="font-medium">{category}</span>
                        <div className="flex items-center gap-2">
                          {activeCategory === category && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <div className="w-1 h-1 rounded-full bg-gray-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Contact info */}
                  <div className="pt-8 border-t border-gray-200/50">
                    <p className="text-gray-500 text-sm font-light mb-4">
                      Still have questions?
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="inline-flex items-center gap-3 text-gray-900 font-medium hover:text-gray-700 transition-colors duration-300 group"
                    >
                      <div className="w-12 h-12 glass-effect-light-enhanced rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                        <Mail className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
                      </div>
                      <div>
                        <span className="block font-medium">
                          {contactEmail}
                        </span>
                        <span className="text-gray-500 text-sm font-light">
                          Usually replies in 2 hours
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - FAQs with enhanced idle states */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq._key || index}
                    className="glass-effect-enhanced rounded-2xl overflow-hidden border border-white/40 shadow-soft transition-all duration-300 hover:shadow-md hover:border-white/50"
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="w-full p-8 flex items-start justify-between text-left group hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex-1 pr-8">
                        <div className="inline-flex items-center gap-2 mb-3">
                          <span className="text-xs text-gray-400 font-light bg-white/50 px-2.5 py-1 rounded-full">
                            {faq.category}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300 relative">
                          {faq.question}
                          <span className="absolute -left-6 top-1/2 w-1.5 h-1.5 bg-gray-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </h3>

                        <div
                          className={`transition-all duration-500 ease-in-out ${
                            openIndex === index
                              ? "max-h-48 opacity-100 mt-4"
                              : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                        >
                          <div className="glass-effect-light-enhanced rounded-xl p-5">
                            <p className="text-gray-600 font-light leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0 ml-4">
                        <div className="w-10 h-10 glass-effect-light-enhanced rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:border-gray-300 transition-all duration-300">
                          {openIndex === index ? (
                            <Minus className="w-4 h-4 text-gray-700" />
                          ) : (
                            <Plus className="w-4 h-4 text-gray-700" />
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Need immediate help? section with enhanced idle state */}
              <div className="mt-12 p-8 glass-effect-enhanced rounded-2xl border border-white/40 shadow-soft">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 glass-effect-light-enhanced rounded-xl flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Need immediate help?
                    </h4>
                    <p className="text-gray-500 text-sm font-light">
                      Our support team is available 24/7
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 font-light text-lg mb-8 max-w-xl leading-relaxed">
                  Get personalized assistance through Instagram or email.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 glass-effect-light-enhanced text-gray-900 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group flex-1 min-w-[200px] border border-gray-200/60 hover:border-gray-300"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Message on Instagram</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </a>

                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 group flex-1 min-w-[200px] shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Email</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version - Clean & Minimal */}
      <section className="lg:hidden ">
        <div className="px-4">
          {/* Header - Minimal */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <span className="text-gray-500 text-xs font-light uppercase tracking-wider">
                Support
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              FAQ
              <br />
              <span className="text-gray-600 font-semibold">{title}</span>
            </h2>

            <p className="text-gray-500 font-light text-sm">{subtitle}</p>
          </div>

          {/* Category Tabs - Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-gray-900 text-white font-medium"
                    : "text-gray-600 border border-gray-200 font-light"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3 mb-8">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq._key || index}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full p-4 flex items-start justify-between text-left"
                >
                  <div className="flex-1 pr-4">
                    {/* Question */}
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {faq.question}
                    </h3>

                    {/* Category Tag */}
                    <div className="inline-block">
                      <span className="text-xs text-gray-500 font-light">
                        {faq.category}
                      </span>
                    </div>

                    {/* Answer (when open) */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openIndex === index
                          ? "max-h-32 opacity-100 mt-3"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center">
                      {openIndex === index ? (
                        <Minus className="w-3.5 h-3.5 text-gray-700" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-gray-700" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Contact Section - Minimal */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <h4 className="text-base font-medium text-gray-900 mb-3">
              Still have questions?
            </h4>

            <p className="text-sm text-gray-600 font-light mb-4">
              Our support team is here to help you.
            </p>

            <div className="space-y-3">
              {/* Email Contact */}
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl"
              >
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Email us
                  </div>
                  <div className="text-xs text-gray-500 font-light">
                    {contactEmail}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </a>

              {/* Instagram Contact */}
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl"
              >
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Message on Instagram
                  </div>
                  <div className="text-xs text-gray-500 font-light">
                    {instagramHandle}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </a>
            </div>

            {/* Response Time */}
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-500 font-light">
                {responseTime}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
