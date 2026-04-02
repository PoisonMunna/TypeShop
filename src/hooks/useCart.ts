import { useState, useMemo, useCallback } from "react";
import {
  CartItem,
  Product,
  Discount,
  DiscountType,
  CartSummary,
  UseCartReturn,
  DiscountResult,
} from "../types";
import { availableDiscounts } from "../data/products";

const TAX_RATE: number = 0.08; // 8% tax

export function useCart(): UseCartReturn {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);

  // ── Add item to cart ──────────────────────
  const addToCart = useCallback(
    (product: Product): void => {
      setCartItems((prev: CartItem[]) => {
        // Check if already in cart
        const existingItem: CartItem | undefined = prev.find(
          (item: CartItem) => item.product.id === product.id
        );

        if (existingItem) {
          // Don't exceed stock!
          if (existingItem.quantity >= product.stock) {
            alert(`Sorry! Only ${product.stock} items in stock.`);
            return prev;
          }
          // Increase quantity
          return prev.map((item: CartItem) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        // Add new item
        return [...prev, { product, quantity: 1 }];
      });
    },
    []
  );

  // ── Remove item from cart ─────────────────
  const removeFromCart = useCallback(
    (productId: string): void => {
      setCartItems((prev: CartItem[]) =>
        prev.filter((item: CartItem) => item.product.id !== productId)
      );
    },
    []
  );

  // ── Update quantity ───────────────────────
  const updateQuantity = useCallback(
    (productId: string, quantity: number): void => {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      setCartItems((prev: CartItem[]) =>
        prev.map((item: CartItem) => {
          if (item.product.id === productId) {
            // TypeScript ensures stock is a number
            const validQty: number = Math.min(quantity, item.product.stock);
            return { ...item, quantity: validQty };
          }
          return item;
        })
      );
    },
    [removeFromCart]
  );

  // ── Clear entire cart ─────────────────────
  const clearCart = useCallback((): void => {
    setCartItems([]);
    setAppliedDiscount(null);
  }, []);

  // ── Apply discount code ───────────────────
  const applyDiscount = useCallback(
    (code: string): DiscountResult => {
      const upperCode: string = code.toUpperCase().trim();

      // Find the discount
      const discount: Discount | undefined = availableDiscounts.find(
        (d: Discount) => d.code === upperCode
      );

      if (!discount) {
        return { success: false, message: "❌ Invalid coupon code!" };
      }

      // Calculate current subtotal
      const subtotal: number = cartItems.reduce(
        (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
        0
      );

      // Check minimum purchase
      if (subtotal < discount.minPurchase) {
        return {
          success: false,
          message: `❌ Minimum purchase of $${discount.minPurchase.toFixed(2)} required!`,
        };
      }

      setAppliedDiscount(discount);
      return {
        success: true,
        discount,
        message: `✅ Coupon "${discount.code}" applied! ${discount.description}`,
      };
    },
    [cartItems]
  );

  // ── Remove discount ───────────────────────
  const removeDiscount = useCallback((): void => {
    setAppliedDiscount(null);
  }, []);

  // ── Calculate summary (memoized) ──────────
  const summary: CartSummary = useMemo(() => {
    const subtotal: number = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
      0
    );

    const totalItems: number = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );

    // Calculate discount amount based on type
    let discountAmount: number = 0;
    if (appliedDiscount) {
      switch (appliedDiscount.type) {
        case DiscountType.PERCENTAGE:
          discountAmount = (subtotal * appliedDiscount.value) / 100;
          break;
        case DiscountType.FIXED:
          discountAmount = appliedDiscount.value;
          break;
        // TypeScript will warn if we miss a case!
      }
      // Discount can't be more than subtotal
      discountAmount = Math.min(discountAmount, subtotal);
    }

    const afterDiscount: number = subtotal - discountAmount;
    const tax: number = afterDiscount * TAX_RATE;
    const total: number = afterDiscount + tax;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      totalItems,
    };
  }, [cartItems, appliedDiscount]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    appliedDiscount,
    summary,
  };
}