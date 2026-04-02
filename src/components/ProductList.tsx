import { useState } from "react";
import { Product, ProductCategory, CartItem } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, cartItems, onAddToCart }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter products
  const filteredProducts: Product[] = products.filter((product: Product) => {
    const matchesCategory: boolean =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch: boolean = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get all categories from enum
  const categories: string[] = ["All", ...Object.values(ProductCategory)];

  return (
    <div className="product-list-container">
      {/* Search and Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="search-input"
        />
        <div className="category-filters">
          {categories.map((cat: string) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat as ProductCategory | "All")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product count */}
      <p className="product-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={cartItems.find(
              (item: CartItem) => item.product.id === product.id
            )}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>😕 No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}