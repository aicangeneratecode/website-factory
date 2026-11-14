import React from "react";
import { Filter, X } from "lucide-react";
import type { Category, Subcategory, Size } from "../../types/types";

interface FilterSidebarProps {
  selectedCategory: Category | "all";
  setSelectedCategory: (category: Category | "all") => void;
  selectedSubcategory: Subcategory | "all";
  setSelectedSubcategory: (subcategory: Subcategory | "all") => void;
  selectedSizes: Size[];
  setSelectedSizes: (sizes: Size[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  showNewOnly: boolean;
  setShowNewOnly: (show: boolean) => void;
  brands: string[];
  sizes: Size[];
  clearFilters: () => void;
  productCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedSizes,
  setSelectedSizes,
  selectedBrands,
  setSelectedBrands,
  showNewOnly,
  setShowNewOnly,
  brands,
  sizes,
  clearFilters,
  productCount,
}) => {
  const categories: (Category | "all")[] = [
    "all",
    "men",
    "women",
    "accessories",
  ];
  const subcategories: (Subcategory | "all")[] = [
    "all",
    "tshirts",
    "hoodies",
    "pants",
    "outerwear",
    "accessories",
    "tracksuits",
    "sneakers",
  ];

  const toggleSize = (size: Size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-900" />
          <h3 className="text-lg font-light text-gray-900">Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 font-light"
        >
          Clear all
        </button>
      </div>

      {/* Product Count */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 font-light">
          {productCount} {productCount === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-normal text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-light transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {category === "all"
                ? "All Categories"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-normal text-gray-900 mb-3">Product Type</h4>
        <div className="space-y-2">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => setSelectedSubcategory(subcategory)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-light transition-all duration-200 ${
                selectedSubcategory === subcategory
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {subcategory === "all"
                ? "All Types"
                : subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* New Drop Filter */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={showNewOnly}
            onChange={(e) => setShowNewOnly(e.target.checked)}
            className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
          />
          <span className="text-sm font-light text-gray-900 group-hover:text-gray-700">
            New Arrivals Only
          </span>
        </label>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-normal text-gray-900 mb-3">Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-2 rounded-lg text-xs font-light transition-all duration-200 ${
                selectedSizes.includes(size)
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-normal text-gray-900 mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
              />
              <span className="text-sm font-light text-gray-600 group-hover:text-gray-900">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
