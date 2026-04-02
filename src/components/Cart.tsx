import { useState } from "react";
import { CartItem, Discount, CartSummary, DiscountResult } from "../types";
import { CartItemRow } from "./CartItemRow";
import { DiscountInput } from "./DiscountInput";

interface CartProps {
  cartItems: CartItem[];
  summary: CartSummary;
  appliedDiscount: Discount | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClearCart: () => void;
  onApplyDiscount: (code: string) => DiscountResult;
  onRemoveDiscount: () => void;
}

export function Cart({
  cartItems,
  summary,
  appliedDiscount,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  onApplyDiscount,
  onRemoveDiscount,
}: CartProps) {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Handle checkout
  const handleCheckout = (): void => {
    // Generate random order number
    const randomOrder: string =
      "ORD-" + Date.now().toString(36).toUpperCase() + "-" +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    setOrderNumber(randomOrder);
    setShowSuccess(true);
  };

  // Close popup and clear cart
  const handleCloseSuccess = (): void => {
    setShowSuccess(false);
    onClearCart();
  };

  // ── Empty Cart View ───────────────────────
  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Success Popup Modal ──────────────── */}
      {showSuccess && (
        <div className="success-overlay" onClick={handleCloseSuccess}>
          <div
            className="success-modal"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="success-animation">✅</div>
            <h2 className="success-title">Order Placed Successfully!</h2>
            <p className="success-subtitle">
              Thank you for your purchase! 🎉
            </p>

            <div className="order-details-box">
              <div className="order-detail-row">
                <span>Order Number</span>
                <span className="order-number">{orderNumber}</span>
              </div>
              <div className="order-detail-row">
                <span>Items Purchased</span>
                <span>{summary.totalItems} items</span>
              </div>
              <div className="order-detail-row">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              {summary.discountAmount > 0 && (
                <div className="order-detail-row discount-row">
                  <span>Discount</span>
                  <span>-${summary.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="order-detail-row">
                <span>Tax</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div className="order-detail-row order-total-row">
                <span>Total Paid</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="purchased-items">
              <h4>Items in your order:</h4>
              {cartItems.map((item: CartItem) => (
                <div key={item.product.id} className="purchased-item">
                  <span className="purchased-emoji">
                    {item.product.image}
                  </span>
                  <span className="purchased-name">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="purchased-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <p className="delivery-note">
              📦 Estimated delivery: 3-5 business days
            </p>
            <p className="email-note">
              📧 Confirmation email has been sent!
            </p>

            <button
              className="success-close-btn"
              onClick={handleCloseSuccess}
            >
              🛍️ Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* ── Cart Content ─────────────────────── */}
      {!showSuccess && (
        <div className="cart-container">
          <div className="cart-header">
            <h2>🛒 Shopping Cart ({summary.totalItems} items)</h2>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Clear All
            </button>
          </div>

          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item: CartItem) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>

            {/* Cart Summary Sidebar */}
            <div className="cart-sidebar">
              <DiscountInput
                onApplyDiscount={onApplyDiscount}
                onRemoveDiscount={onRemoveDiscount}
                appliedDiscount={appliedDiscount}
              />

              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${summary.subtotal.toFixed(2)}</span>
                </div>
                {summary.discountAmount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-${summary.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>${summary.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${summary.total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  💳 Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}