import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App({ basePath }: { basePath: string }) {
  return (
    <CartProvider>
      <Router basename={basePath}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <CartSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/success" element={<section className="mx-auto max-w-3xl px-6 py-24"><h1 className="text-4xl font-bold">Demo checkout complete</h1><p className="mt-4">No order was sent and no payment was taken.</p></section>} />
              <Route path="/shipping" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold">Delivery Information</h1></div>} />
              <Route path="/faq" element={<HomePage />} />
              <Route path="*" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold">Page not found</h1></div>} />
              <Route
                path="/men"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Men's Collection</h1>
                  </div>
                }
              />
              <Route
                path="/women"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Women's Collection</h1>
                  </div>
                }
              />
              <Route
                path="/new"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">New Arrivals</h1>
                  </div>
                }
              />
              <Route
                path="/sale"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Sale</h1>
                  </div>
                }
              />
              <Route
                path="/contact"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                  </div>
                }
              />
              <Route
                path="/about"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">About Us</h1>
                  </div>
                }
              />
              <Route
                path="/delivery"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Delivery Information</h1>
                  </div>
                }
              />
              <Route
                path="/returns"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Returns & Exchanges</h1>
                  </div>
                }
              />
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
