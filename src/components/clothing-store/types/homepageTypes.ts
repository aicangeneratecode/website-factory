// src/types/homepageTypes.ts

export interface HeroSectionData {
  _id: string;
  isActive: boolean;
  order: number; // ← ДОБАВЛЕНО
  title?: string;
  subtitle?: string;
  mainImage?: string;
  buttonText?: string;
  instagramUsername?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export interface PopularProductsSectionData {
  _id: string;
  isActive: boolean;
  order: number; // ← ДОБАВЛЕНО
  title?: string;
  subtitle?: string;
  products?: Array<{
    _id: string;
    name: string;
    price: number;
    images: string[];
    brand?: string;
    isNew?: boolean;
    inStock: boolean;
    sizes: string[];
    originalPrice?: number;
  }>;
}

export interface CategoryCarouselData {
  _id: string;
  isActive: boolean;
  order: number; // ← ДОБАВЛЕНО
  title?: string;
  subtitle?: string;
  categories?: Array<{
    name: string;
    description?: string;
    image: string;
    link: string;
    buttonText?: string;
  }>;
}

export interface InstagramPost {
  _key: string;
  caption: string;
  likes: number;
  comments: number;
  link: string;
  type: "product" | "behind" | "ugc" | "announcement";
  imageUrl?: string; // для упрощения
}

export interface InstagramFeedSectionData {
  _id: string;
  _type: "instagramFeed";
  isActive: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  handle: string;
  description?: string;
  followers: string;
  postsCount: string;
  posts: InstagramPost[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaFollowText?: string;
  ctaFollowLink?: string;
  ctaDmText?: string;
  ctaDmLink?: string;
  responseTime?: string;
}

// src/types/homepageTypes.ts
export interface UGCPost {
  _key: string;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  isVideo: boolean;
  videoFile?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  videoThumbnail?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  videoUrl?: string;
  likes: number;
  tags: string[];
  user?: {
    username: string;
    avatar?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  };
  imageUrl?: string; // для упрощения
  videoUrlSanity?: string; // для видео из Sanity
  thumbnailUrl?: string; // для видео
}

export interface UGCFilter {
  id: string;
  label: string;
}

export interface UGCGallerySectionData {
  _id: string;
  _type: "ugcGallery";
  isActive: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  description?: string;
  filters: UGCFilter[];
  posts: UGCPost[];
  ctaText?: string;
  ctaLink?: string;
  ctaDescription?: string;
  autoPlay?: boolean;
  loopVideos?: boolean;
  muted?: boolean;
}

export interface ReviewData {
  _key: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  reviewText: string;
  date: string;
  product?: {
    _id: string;
    name: string;
  } | null; // Добавлено null
  productName?: string; // для упрощения
}

export interface ReviewsSectionData {
  _id: string;
  _type: "reviewsSection";
  isActive: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  averageRating?: number;
  totalReviews?: number;
  reviews?: ReviewData[];
  stats?: Array<{
    label: string;
    value: string;
  }>;
}

export interface FAQItem {
  _key: string;
  question: string;
  answer: string;
  category: string;
}

export interface FAQSectionData {
  _id: string;
  _type: "faqSection";
  isActive: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  categories?: string[];
  faqs?: FAQItem[];
  contactEmail?: string;
  instagramHandle?: string;
  instagramLink?: string;
  responseTime?: string;
}

export interface HomepageSections {
  hero: HeroSectionData | null;
  popularProducts: PopularProductsSectionData | null;
  categoryCarousel: CategoryCarouselData | null;
  instagramFeed: InstagramFeedSectionData | null;
  ugcGallery: UGCGallerySectionData | null;
  reviewsSection: ReviewsSectionData | null;
  faqSection: FAQSectionData | null;
}
