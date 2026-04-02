import { Product, CartItem } from "../types";

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;  // might not be in cart
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, cartItem, onAddToCart }: ProductCardProps) {
  const inCart: boolean = cartItem !== undefined;
  const cartQty: number = cartItem?.quantity ?? 0;
  const isOutOfStock: boolean = product.stock === 0;

  // Generate star rating display
  const renderStars = (rating: number): string => {
    const full: number = Math.floor(rating);
    const half: boolean = rating % 1 >= 0.5;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
  };

  return (
    <div className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}>
      <div className="product-image">{product.image}</div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-num">{product.rating}</span>
        </div>
        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-stock">
            {isOutOfStock ? "Out of Stock" : `${product.stock} left`}
          </span>
        </div>
        <button
          className={`add-btn ${inCart ? "in-cart" : ""}`}
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock || cartQty >= product.stock}
        >
          {isOutOfStock
            ? "Out of Stock"
            : inCart
            ? `In Cart (${cartQty})`
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}