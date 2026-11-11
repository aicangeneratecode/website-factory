export interface ProjectProConfig {
  template: string;
  demo: boolean;

  brand: {
    name: string;
    descriptor: string;
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
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    projects: {
      id: string;
      title: string;
      category: string;
      image: string;
      imageAlt: string;
      note: string;
    }[];
  };
  
  beforeAfter: {
    eyebrow: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    beforeAlt: string;
    afterAlt: string;
    verifiedPair: boolean;
  };

  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      number: string;
      title: string;
      description: string;
      details: string[];
      featured: boolean;
    }[];
  };

  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: {
      number: string;
      title: string;
      description: string;
      detail: string;
    }[];
    note: string;
  };

  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      text: string;
      author: string;
      context: string;
      verified: boolean;
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
