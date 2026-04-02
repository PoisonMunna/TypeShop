import { ActiveTab, CartSummary } from "../types";

// Props are strictly typed - can't pass wrong data!
interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  summary: CartSummary;
}

export function Header({ activeTab, onTabChange, summary }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🛍️ TypeShop</h1>
        <p className="tagline">Type-safe shopping experience</p>

        <nav className="nav-tabs">
          <button
            className={`tab-btn ${activeTab === "shop" ? "active" : ""}`}
            onClick={() => onTabChange("shop")}
          >
            🏪 Shop
          </button>
          <button
            className={`tab-btn ${activeTab === "cart" ? "active" : ""}`}
            onClick={() => onTabChange("cart")}
          >
            🛒 Cart
            {summary.totalItems > 0 && (
              <span className="cart-badge">{summary.totalItems}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}