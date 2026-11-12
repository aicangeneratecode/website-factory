
export interface VenueProConfig {
  template: string;
  demo: boolean;

  brand: {
    name: string;
    descriptor: string;
    monogram: string;
    city: string;
  };

  seo: {
    title: string;
    description: string;
  };

  theme: {
    background: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
  };

  navigation: {
    label: string;
    href: string;
  }[];

  hero: {
    eyebrow: string;
    headline: string;
    highlight: string;
    description: string;
    image: string;
    imageAlt: string;
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };

  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };

  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      subtitle: string;
      image: string;
      imageAlt: string;
    }[];
    note: string;
  };

  sections: {
    id: string;
    number: string;
    title: string;
    description: string;
  }[];
}
