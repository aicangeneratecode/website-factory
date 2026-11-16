import { Instagram, Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { store } from "../../lib/storeConfig";

export function Footer() {
  const instagram = store.contact.instagram.trim().replace(/^@/, "");
  const showInstagram = !store.demo && store.orders?.instagram !== false && /^[A-Za-z0-9._]{1,30}$/.test(instagram);

  return (
    <footer id="store-footer" className="mt-auto border-t border-white/15 bg-gradient-to-t from-gray-950 to-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-6 lg:py-16">
        <div className="mb-8 grid grid-cols-2 gap-3 lg:hidden">
          <Link to="/catalog" className="flex items-center justify-center gap-2 rounded-xl bg-gray-800 p-4 text-center text-sm font-semibold">
            <ShoppingBag size={16} aria-hidden="true" /> Katalog
          </Link>
          <Link to="/shipping" className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-center text-sm font-semibold text-gray-900">
            <Package size={16} aria-hidden="true" /> Dostava
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2 row-start-2 lg:col-span-1 lg:row-start-1">
            <Link to="/" className="text-3xl font-bold tracking-tight">{store.name}</Link>
            {store.brand?.tagline && <p className="mt-2 text-sm text-gray-300">{store.brand.tagline}</p>}
          </div>
          <nav aria-label="Prodavnica" className="grid content-start gap-3 text-sm text-gray-300">
            <h2 className="font-semibold uppercase tracking-wider text-white">Prodavnica</h2>
            <Link to="/catalog" className="hover:text-white">Svi artikli</Link>
            <Link to="/catalog?new=true" className="hover:text-white">Novi artikli</Link>
          </nav>
          <nav aria-label="Pomoć pri kupovini" className="grid content-start gap-3 text-sm text-gray-300">
            <h2 className="font-semibold uppercase tracking-wider text-white">Pomoć</h2>
            <Link to="/faq" className="hover:text-white">Česta pitanja</Link>
            <Link to="/shipping" className="hover:text-white">Dostava</Link>
          </nav>
          <nav aria-label="Poručivanje" className="grid content-start gap-3 text-sm text-gray-300">
            <h2 className="font-semibold uppercase tracking-wider text-white">Poručivanje</h2>
            <Link to="/cart" className="hover:text-white">Korpa</Link>
            {showInstagram && (
              <a href={`https://www.instagram.com/${instagram}/`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
                <Instagram size={16} aria-hidden="true" /> Instagram
              </a>
            )}
          </nav>
        </div>
        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-gray-300">
          {store.demo ? "Demo prodavnica. Porudžbine se ne šalju." : store.name}
        </div>
      </div>
    </footer>
  );
}
