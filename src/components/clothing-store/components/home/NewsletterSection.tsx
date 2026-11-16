import { Link } from "react-router-dom";
import { store } from "../../lib/storeConfig";

export function NewsletterSection() {
  const url = store.newsletterUrl?.trim();
  if (!store.demo && !url) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-3xl bg-gray-900 px-6 py-10 text-white sm:px-12">
        <h2 className="text-3xl font-bold">Novosti iz kolekcije</h2>
        {store.demo ? (
          <>
            <p className="mt-3 text-gray-200">Primer sekcije za prijavu na novosti. Prijava u demo prodavnici nije aktivna.</p>
            <Link to="/catalog?new=true" className="mt-5 inline-block underline">Pogledajte nove artikle</Link>
          </>
        ) : (
          <a href={url} className="mt-5 inline-block underline">Prijavite se za novosti</a>
        )}
      </div>
    </section>
  );
}
