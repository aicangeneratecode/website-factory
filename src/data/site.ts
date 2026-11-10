import type { SiteConfig } from '../types/site';

/**
 * WEBSITE FACTORY: edit this file to create a new client site.
 * All content below is fictional demo material, not real business claims.
 * Replace content, images, reviews and contacts before publishing a client site.
 */
export const siteData: SiteConfig = {
  demoMode: true,
  brand: {
    name: 'FORMA',
    tag: 'PROSTOR & IDEJE',
    initials: 'F.',
  },
  seo: {
    title: 'FORMA — Enterijer sa karakterom | Beograd',
    description:
      'Demo šablon za lokalni biznis. Moderan, brz i pregledan sajt sa uslugama, galerijom i kontaktom.',
    locale: 'sr_RS',
    image: '/og.svg',
    robots: 'noindex,nofollow',
  },
  navigation: [
    { label: 'Usluge', href: '#usluge' },
    { label: 'Projekti', href: '#projekti' },
    { label: 'Utisci', href: '#utisci' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  hero: {
    eyebrow: 'KREATIVNI STUDIO · BEOGRAD',
    headline: 'Prostor koji',
    emphasis: 'ima svoju priču.',
    description:
      'Spajamo funkcionalnost, mir i detalje u prostore u kojima ćete zaista uživati. Od prve ideje do završnog utiska.',
    primary: { label: 'Započnite projekat', href: '#kontakt' },
    secondary: { label: 'Pogledajte radove', href: '#projekti' },
    note: 'Promišljeni detalji. Jednostavan proces.',
  },
  services: {
    eyebrow: 'ŠTA RADIMO',
    title: 'Dobre ideje. Jasna realizacija.',
    lead: 'Od početnog razgovora do poslednjeg detalja, svaki korak ima svoje mesto.',
    items: [
      {
        number: '01',
        title: 'Koncept i planiranje',
        description: 'Zajedno definišemo potrebe, atmosferu i funkcionalnost prostora.',
        points: ['Uvodne konsultacije', 'Raspored i idejno rešenje'],
      },
      {
        number: '02',
        title: 'Dizajn enterijera',
        description: 'Materijali, boje i proporcije koji čine skladnu celinu.',
        points: ['Vizuelni pravac', 'Izbor materijala'],
      },
      {
        number: '03',
        title: 'Podrška realizaciji',
        description: 'Praktični predlozi i pažnja prema detaljima tokom procesa.',
        points: ['Jasni koraci', 'Završno usklađivanje'],
      },
    ],
  },
  gallery: {
    eyebrow: 'NAŠ PRISTUP',
    title: 'Svaki detalj je važan.',
    lead: 'Galerija je spremna za prave fotografije projekata. Trenutno prikazuje dizajnerske primere.',
    items: [
      { title: 'Toplina doma', category: 'STAMBENI PROSTOR', description: 'Fotografija projekta dolazi ovde', tone: 'sand' },
      { title: 'Savremeni ritam', category: 'RADNI PROSTOR', description: 'Fotografija projekta dolazi ovde', tone: 'sage' },
      { title: 'Mirni detalji', category: 'ENTERIJER', description: 'Fotografija projekta dolazi ovde', tone: 'clay' },
      { title: 'Lična nota', category: 'KONCEPT', description: 'Fotografija projekta dolazi ovde', tone: 'ink' },
    ],
  },
  reviews: {
    eyebrow: 'UTISCI',
    title: 'Poverenje počinje razgovorom.',
    items: [
      {
        quote: 'Ovde će stajati autentično iskustvo vašeg klijenta nakon završenog projekta.',
        author: 'Ime klijenta',
        detail: 'Primer recenzije · zameniti',
        example: true,
      },
      {
        quote: 'Drugi primer pokazuje kako će izgledati recenzija i na mobilnom telefonu.',
        author: 'Ime klijenta',
        detail: 'Primer recenzije · zameniti',
        example: true,
      },
      {
        quote: 'Kada dodate prave utiske, ova sekcija postaje dokaz kvaliteta vašeg rada.',
        author: 'Ime klijenta',
        detail: 'Primer recenzije · zameniti',
        example: true,
      },
    ],
  },
  contact: {
    eyebrow: 'HAJDE DA RAZGOVARAMO',
    title: 'Imate ideju? Dajte joj prostor.',
    description: 'Pišite nam i recite nešto o svom planu. Prvi razgovor je najbolji početak.',
    phone: '+381 60 000 0000',
    phoneHref: '+381600000000',
    email: 'kontakt@example.com',
    city: 'Beograd, Srbija',
    hours: 'Pon–Pet · 09:00–17:00',
  },
  footer: {
    note: 'Promišljeno od prvog detalja.',
  },
};
