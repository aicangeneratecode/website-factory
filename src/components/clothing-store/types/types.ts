// Product Types
export type Category = "men" | "women" | "unisex" | "accessories";

export type Subcategory =
  | "tshirts"
  | "hoodies"
  | "pants"
  | "outerwear"
  | "accessories"
  | "tracksuits"
  | "sneakers";

// Для размеров как объектов (из Sanity)
export interface SizeObject {
  code: string;
  name: string;
  category: string;
}

// Для обратной совместимости (в корзине и других местах)
export type Size = string;

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  subcategory: Subcategory;
  sizes: Size[];
  brand?: string;
  colors?: string[];
  images: string[];
  description: string;
  material?: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  sku?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size: Size; // Просто строка!
  image: string;
  category: Category;
  inStock: boolean;
}

export interface CarouselCategory {
  id: string;
  name: string;
  image: string;
  link: string;
  description: string;
  category?: Category; // Для связи с реальными товарами
}

// Order Types
export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  deliveryMethod: "delivery" | "pickup";
  comment?: string;
  totalPrice: number;
  createdAt: Date;
  status: "new" | "confirmed" | "processing" | "completed";
}

// Filter Types
export interface FilterOptions {
  category?: Category;
  subcategories?: Subcategory[];
  priceRange?: [number, number];
  sizes?: Size[];
  brand?: string[];
  colors?: string[];
  isNew?: boolean;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "newest" | "popular";
}

// UI Types
export interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Collection {
  id: string;
  title: string;
  image: string;
  buttonText: string;
  link: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ProductPageProps {
  product: Product;
}
