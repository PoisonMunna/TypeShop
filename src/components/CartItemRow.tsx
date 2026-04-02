import { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const itemTotal: number = item.product.price * item.quantity;

  return (
    <div className="cart-item-row">
      <div className="cart-item-image">{item.product.image}</div>
      <div className="cart-item-details">
        <h4>{item.product.name}</h4>
        <p className="cart-item-price">${item.product.price.toFixed(2)} each</p>
      </div>
      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
        >
          −
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        <span>${itemTotal.toFixed(2)}</span>
      </div>
      <button
        className="remove-btn"
        onClick={() => onRemove(item.product.id)}
        title="Remove item"
      >
        🗑️
      </button>
    </div>
  );
}