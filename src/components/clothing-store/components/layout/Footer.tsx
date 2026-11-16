import { Link } from "react-router-dom";
import { store } from "../../lib/storeConfig";

export function Footer() {
  const instagram = store.contact.instagram.trim().replace(/^@/, "");
  const showInstagram = !store.demo && store.orders?.instagram !== false && /^[A-Za-z0-9._]{1,30}$/.test(instagram);

  return (
    <footer className="mt-auto border-t border-gray-200 bg-[var(--store-surface)] text-[var(--store-ink)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-2xl font-bold">{store.name}</Link>
          {store.demo && <p className="mt-3 text-sm text-gray-600">Demo prodavnica. Porudžbine se ne šalju.</p>}
        </div>
        <nav aria-label="Katalog" className="grid content-start gap-3 text-sm">
          <Link to="/catalog">Katalog</Link>
          <Link to="/catalog?new=true">Novi artikli</Link>
          <Link to="/cart">Korpa</Link>
        </nav>
        <nav aria-label="Pomoć pri kupovini" className="grid content-start gap-3 text-sm">
          <Link to="/faq">Česta pitanja</Link>
          <Link to="/shipping">Dostava</Link>
          {showInstagram && <a href={`https://www.instagram.com/${instagram}/`} target="_blank" rel="noreferrer">Instagram</a>}
        </nav>
      </div>
    </footer>
  );
}
