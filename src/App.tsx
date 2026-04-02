import { useState } from "react";
import { ActiveTab } from "./types";
import { products } from "./data/products";
import { useCart } from "./hooks/useCart";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("shop");
  const cart = useCart();

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        summary={cart.summary}
      />

      <main className="main-content">
        {activeTab === "shop" ? (
          <ProductList
            products={products}
            cartItems={cart.cartItems}
            onAddToCart={cart.addToCart}
          />
        ) : (
          <Cart
            cartItems={cart.cartItems}
            summary={cart.summary}
            appliedDiscount={cart.appliedDiscount}
            onUpdateQuantity={cart.updateQuantity}
            onRemove={cart.removeFromCart}
            onClearCart={cart.clearCart}
            onApplyDiscount={cart.applyDiscount}
            onRemoveDiscount={cart.removeDiscount}
          />
        )}
      </main>

      <footer className="footer">
        <p>🔷 Built with TypeScript + React + Vite — Every variable is type-safe!</p>
      </footer>
    </div>
  );
}

export default App;