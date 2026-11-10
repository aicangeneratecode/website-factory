export type Link = { label: string; href: string };

export type Service = {
  number: string;
  title: string;
  description: string;
  points: string[];
};

export type GalleryItem = {
  title: string;
  category: string;
  description: string;
  /** Local image in /public; omit to show a visual placeholder */
  image?: string;
  alt?: string;
  tone: 'sand' | 'clay' | 'sage' | 'ink';
};

export type Review = {
  quote: string;
  author: string;
  detail: string;
  /** True while text is illustrative, not a real verified review */
  example?: boolean;
};

export type SiteConfig = {
  demoMode: boolean;
  brand: { name: string; tag: string; initials: string };
  seo: {
    title: string;
    description: string;
    locale: string;
    image: string;
    robots: 'index,follow' | 'noindex,nofollow';
  };
  navigation: Link[];
  hero: {
    eyebrow: string;
    headline: string;
    emphasis: string;
    description: string;
    primary: Link;
    secondary: Link;
    image?: string;
    imageAlt?: string;
    note: string;
  };
  services: { eyebrow: string; title: string; lead: string; items: Service[] };
  gallery: { eyebrow: string; title: string; lead: string; items: GalleryItem[] };
  reviews: { eyebrow: string; title: string; items: Review[] };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phone: string;
    phoneHref: string;
    email: string;
    city: string;
    hours: string;
    instagram?: string;
  };
  footer: { note: string };
};
