import React, { useState } from "react";
import { Send } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Subscribing email:", email);
    setEmail("");
    setIsSubmitting(false);
    alert("Thank you for subscribing!");
  };

  return (
    <section className="-mt-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
          Join Our Newsletter
        </h2>
        <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
          Stay up-to-date with our latest collections, exclusive offers, and
          more.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Enter your email address"
              className={`w-full px-5 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-light text-gray-700`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
              required
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "newsletter-email-error" : undefined
              }
            />
            {errors.email && (
              <p
                id="newsletter-email-error"
                className="text-red-500 text-sm mt-1"
              >
                {errors.email}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl font-light hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send
              className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : ""}`}
            />
            <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
          </button>
        </form>
      </div>
    </section>
  );
};
