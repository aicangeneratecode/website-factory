import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, store, shippingLabel, shippingMode } from "../lib/storeConfig";

export function CheckoutPage() {
  const { items, subtotal, shippingCost, total } = useCart();
  const [status, setStatus] = useState("");
  const whatsapp = store.contact.whatsapp.replace(/[+ ().-]/g, "");
  const instagram = store.contact.instagram.trim().replace(/^@/, "");
  const canWhatsApp = !store.demo && store.orders?.whatsapp !== false && /^[1-9][0-9]{6,14}$/.test(whatsapp);
  const canInstagram = !store.demo && store.orders?.instagram !== false && /^[A-Za-z0-9._]{1,30}$/.test(instagram);
  const summary = [
    `Porudžbina — ${store.name}`,
    ...items.map(({ name, size, quantity, price }) =>
      `• ${name} | Veličina: ${size} | ${quantity} × ${formatPrice(price)} = ${formatPrice(quantity * price)}`),
    `Artikli: ${formatPrice(subtotal)}`,
    `Dostava: ${shippingLabel(shippingCost)}`,
    `Ukupno: ${formatPrice(total)}${shippingMode === "arranged" ? " + dostava po dogovoru" : ""}`,
  ].join("\n");

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Tekst je kopiran.");
    } catch {
      setStatus("Označite tekst iznad i kopirajte ga ručno.");
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <Link to="/cart" className="text-sm font-semibold underline">← Nazad u korpu</Link>
      <h1 className="mt-5 text-4xl font-bold">Pregled porudžbine</h1>
      {items.length === 0 ? (
        <p className="mt-5">Korpa je prazna. <Link to="/catalog" className="underline">Pogledajte katalog</Link></p>
      ) : (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-8">
          <label className="block text-sm font-semibold" htmlFor="order-summary">Tekst porudžbine</label>
          <textarea id="order-summary" readOnly value={summary} rows={Math.min(16, items.length + 5)} className="mt-3 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm leading-7" />
          <div className="mt-5 flex flex-wrap gap-3">
            {canWhatsApp && (
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--store-ink)] px-5 py-3 text-sm font-bold text-white">Otvori WhatsApp</a>
            )}
            <button type="button" onClick={copyOrder} className="rounded-xl border border-gray-500 px-5 py-3 text-sm font-bold">Kopirajte porudžbinu</button>
            {canInstagram && (
              <a href={`https://www.instagram.com/${instagram}/`} target="_blank" rel="noreferrer" className="rounded-xl border border-gray-500 px-5 py-3 text-sm font-bold">Otvori Instagram profil</a>
            )}
          </div>
          {store.demo && <p className="mt-4 text-sm text-gray-700">Demo prikaz. Porudžbina se ne šalje.</p>}
          {canWhatsApp && <p className="mt-4 text-sm text-gray-700">Proverite tekst u WhatsApp-u i pošaljite poruku.</p>}
          {canInstagram && <p className="mt-4 text-sm text-gray-700">Kopirajte tekst, otvorite Instagram profil i nalepite ga u poruku koju ćete poslati.</p>}
          {!store.demo && !canWhatsApp && !canInstagram && <p className="mt-4 text-sm text-gray-700">Slanje porudžbine trenutno nije dostupno.</p>}
          <p role="status" className="mt-3 text-sm">{status}</p>
        </div>
      )}
    </section>
  );
}
