import { store } from "./lib/storeConfig";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { CartSidebar } from "./components/layout/CartSidebar";

function App({ basePath, factoryDemo }: { basePath: string; factoryDemo: boolean }) {
  return (
    <CartProvider>
      <Router basename={basePath}>
        <div className="min-h-screen flex flex-col">
          <Header factoryDemo={factoryDemo} />
          <CartSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/faq" element={<section className="mx-auto max-w-3xl space-y-6 px-5 py-16">
                <h1 className="text-4xl font-bold">Česta pitanja</h1>
                <details><summary className="cursor-pointer font-semibold">Kako da poručim?</summary><p className="mt-2">Izaberite veličinu, dodajte artikle u korpu i otvorite pregled porudžbine. Ako je kanal za poručivanje podešen, pošaljite tekst prodavnici.</p></details>
                <details><summary className="cursor-pointer font-semibold">Kada je porudžbina potvrđena?</summary><p className="mt-2">Kada prodavnica potvrdi dostupnost artikala, cenu dostave i način plaćanja.</p></details>
                <Link to="/catalog" className="inline-block underline">Pogledajte katalog</Link>
              </section>} />
              <Route path="/shipping" element={<section className="mx-auto max-w-3xl space-y-6 px-5 py-16">
                <h1 className="text-4xl font-bold">Dostava</h1>
                <p>{store.shipping?.description || "Trošak i rok dostave proverite sa prodavnicom pre potvrde porudžbine."}</p>
                <Link to="/cart" className="inline-block underline">Pogledajte korpu</Link>
              </section>} />
              <Route path="/delivery" element={<Navigate to="/shipping" replace />} />
              <Route path="/men" element={<Navigate to="/catalog?category=men" replace />} />
              <Route path="/women" element={<Navigate to="/catalog?category=women" replace />} />
              <Route path="/new" element={<Navigate to="/catalog?new=true" replace />} />
              <Route path="*" element={<section className="mx-auto max-w-3xl px-5 py-16">
                <h1 className="text-4xl font-bold">Stranica nije pronađena</h1>
                <Link to="/catalog" className="mt-6 inline-block underline">Nazad na katalog</Link>
              </section>} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
