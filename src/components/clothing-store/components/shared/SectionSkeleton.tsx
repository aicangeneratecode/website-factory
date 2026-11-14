// src/components/shared/SectionSkeleton.tsx
import React from "react";

interface SectionSkeletonProps {
  type?: "hero" | "products" | "categories" | "instagram" | "reviews";
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  type = "products",
}) => {
  if (type === "hero") {
    return (
      <div className="min-h-screen bg-gray-100 animate-pulse">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
              <div className="space-y-6">
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-xl w-64"></div>
            </div>
            <div className="aspect-[4/5] bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "products") {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                <div className="space-y-3 px-1">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-2xl"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
