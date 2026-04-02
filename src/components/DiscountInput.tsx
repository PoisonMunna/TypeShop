import { useState } from "react";
import { Discount, DiscountResult } from "../types";
import { availableDiscounts } from "../data/products";

interface DiscountInputProps {
  onApplyDiscount: (code: string) => DiscountResult;
  onRemoveDiscount: () => void;
  appliedDiscount: Discount | null;
}

export function DiscountInput({
  onApplyDiscount,
  onRemoveDiscount,
  appliedDiscount,
}: DiscountInputProps) {
  const [code, setCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleApply = (): void => {
    if (!code.trim()) {
      setMessage("❌ Please enter a coupon code!");
      setIsSuccess(false);
      return;
    }

    const result: DiscountResult = onApplyDiscount(code);
    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      setCode("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <div className="discount-section">
      <h4>🏷️ Have a coupon?</h4>

      {appliedDiscount ? (
        <div className="applied-discount">
          <span className="discount-badge">
            ✅ {appliedDiscount.code} — {appliedDiscount.description}
          </span>
          <button className="remove-discount-btn" onClick={onRemoveDiscount}>
            Remove
          </button>
        </div>
      ) : (
        <div className="discount-input-group">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value.toUpperCase())
            }
            onKeyDown={handleKeyDown}
            className="discount-input"
          />
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}

      {message && (
        <p className={`discount-message ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}

      {/* Show available coupons */}
      <div className="available-coupons">
        <p className="coupons-title">Available coupons:</p>
        {availableDiscounts.map((d: Discount) => (
          <span key={d.code} className="coupon-tag">
            {d.code}
          </span>
        ))}
      </div>
    </div>
  );
}