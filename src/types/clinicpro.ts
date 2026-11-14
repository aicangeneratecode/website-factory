interface ClinicImage {
  src: string;
  alt: string;
}

export interface ClinicProConfig {
  brand: string;
  city: string;
  demo: boolean;
  bookingUrl: string;
  bookingCopy?: {
    title: string;
    description: string;
    actionLabel: string;
  };
  heroImage?: string;
  heroImageAlt?: string;
  heroCopy?: {
    specialty: string;
    bookingLabel: string;
    firstVisitLabel: string;
  };
  firstVisit?: { title: string; description: string }[];
  headline: string;
  description: string;
  services: { title: string; description: string; focus?: string; image?: ClinicImage }[];
  team?: { name?: string; title: string; description: string; image?: ClinicImage }[];
  equipmentImage?: ClinicImage;
  equipmentIntro?: string;
  equipment?: { title: string; description: string }[];
  prices?: {
    service: string;
    amount: string;
    description?: string;
    featured?: boolean;
  }[];
  faq: { question: string; answer: string; link?: { href: string; label: string } }[];
}
