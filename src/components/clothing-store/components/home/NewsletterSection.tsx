import { Send } from "lucide-react";
import { store } from "../../lib/storeConfig";

const action = "inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-light text-white transition-colors hover:bg-gray-800";

export function NewsletterSection() {
  const url = store.newsletterUrl?.trim();
  if (!store.demo && !url) return null;

  return (
    <section className="-mt-12 px-5 py-16 text-center md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-3xl font-light tracking-tight text-gray-900 md:text-4xl">Novosti iz kolekcije</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
          Saznajte više o novim kolekcijama i ponudama.
        </p>
        {store.demo ? (
          <div className="mx-auto max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input type="email" disabled aria-label="Adresa e-pošte" placeholder="Adresa e-pošte" className="min-w-0 flex-1 rounded-xl border border-gray-300 px-5 py-3 text-gray-700 placeholder:text-gray-600" />
              <button type="button" disabled className={action + " cursor-not-allowed opacity-60"}><Send size={16} /> Prijavite se</button>
            </div>
            <p className="mt-3 text-sm text-gray-600">Prijava u demo prodavnici nije aktivna.</p>
          </div>
        ) : (
          <a href={url} className={action}><Send size={16} /> Prijavite se za novosti</a>
        )}
      </div>
    </section>
  );
}
