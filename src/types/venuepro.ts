
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

  events: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      id: string;
      number: string;
      category: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      topics: string[];
      cta: string;
    }[];
    note: string;
  };

  capacity: {
    eyebrow: string;
    title: string;
    description: string;
    layouts: {
      id: 'banquet' | 'cocktail' | 'conference';
      number: string;
      label: string;
      title: string;
      description: string;
      features: string[];
    }[];
    note: string;
    footerText: string;
  };

  packages: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      number: string;
      name: string;
      subtitle: string;
      title: string;
      description: string;
      topics: string[];
      featured: boolean;
      cta: string;
    }[];
    note: string;
  };

  advantages: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      number: string;
      title: string;
      description: string;
    }[];
    note: string;
  };

  location: {
    eyebrow: string;
    title: string;
    description: string;
    city: string;
    address: string;
    mapsUrl: string;
    details: {
      label: string;
      value: string;
    }[];
    note: string;
  };

  inquiry: {
    eyebrow: string;
    title: string;
    description: string;
    recipientEmail: string;
    eventTypes: string[];
    note: string;
  };

}
