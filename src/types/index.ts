// ============================================
// 🔷 THIS IS WHERE TYPESCRIPT SHINES!
// Every piece of data has a strict shape
// ============================================

// Product categories - only these values allowed
export enum ProductCategory {
  ELECTRONICS = "Electronics",
  CLOTHING = "Clothing",
  BOOKS = "Books",
  FOOD = "Food",
  SPORTS = "Sports",
}

// Every product MUST have these fields
export interface Product {
  id: string;
  name: string;
  price: number;         // Always a number, never "10" string!
  image: string;
  category: ProductCategory;
  description: string;
  stock: number;
  rating: number;
}

// Cart item = product + how many user wants
export interface CartItem {
  product: Product;
  quantity: number;       // TS ensures this is always a number
}

// Two types of discounts - using enum
export enum DiscountType {
  PERCENTAGE = "percentage",   // e.g., 10% off
  FIXED = "fixed",             // e.g., $5 off
}

// Discount coupon structure
export interface Discount {
  code: string;
  type: DiscountType;
  value: number;
  minPurchase: number;    // Minimum cart value to apply
  description: string;
}

// Cart totals summary
export interface CartSummary {
  subtotal: number;
  discountAmount: number;
  tax: number;
  total: number;
  totalItems: number;
}

// What our cart hook returns
export interface UseCartReturn {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => DiscountResult;
  removeDiscount: () => void;
  appliedDiscount: Discount | null;
  summary: CartSummary;
}

// Result of applying discount - success or failure
export type DiscountResult =
  | { success: true; discount: Discount; message: string }
  | { success: false; message: string };

// Tab navigation
export type ActiveTab = "shop" | "cart";