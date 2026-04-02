# 🛍️ TypeShop — E-Commerce Cart System

A fully functional e-commerce shopping cart built with **TypeScript + React + Vite**.  
This project demonstrates how TypeScript prevents pricing bugs, invalid data, and runtime errors through strict typing.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📸 Features

### 🏪 Shop Page
- Browse 12 products across 5 categories
- Search products by name
- Filter by category (Electronics, Clothing, Books, Food, Sports)
- View product ratings, stock levels, and pricing
- Add items to cart with stock validation

### 🛒 Cart Page
- View all items in cart
- Increase/decrease item quantity
- Remove individual items
- Clear entire cart
- Real-time price calculations

### 🏷️ Discount System
- Apply coupon codes for discounts
- Percentage-based discounts (e.g., 10% off)
- Fixed-amount discounts (e.g., $20 off)
- Minimum purchase validation
- Remove applied discounts

### 💳 Checkout
- Order summary with subtotal, discount, tax, and total
- Animated success popup on checkout
- Order number generation
- Itemized receipt in popup
- "Continue Shopping" flow after purchase

---

## 🎟️ Available Coupon Codes

| Code     | Type       | Value  | Min Purchase | Description                   |
|----------|------------|--------|--------------|-------------------------------|
| `SAVE10` | Percentage | 10%    | $50.00       | 10% off on orders above $50  |
| `FLAT20` | Fixed      | $20.00 | $100.00      | $20 off on orders above $100 |
| `MEGA25` | Percentage | 25%    | $200.00      | 25% off on orders above $200 |
| `FIRST5` | Fixed      | $5.00  | $0.00        | $5 off on any order          |

---

## 🔷 TypeScript Concepts Demonstrated

| Concept                | Where It's Used                              |
|------------------------|----------------------------------------------|
| `interface`            | Product, CartItem, Discount, CartSummary     |
| `enum`                 | ProductCategory, DiscountType                |
| `union types`          | DiscountResult (success \| failure)          |
| `strict null checks`   | `Discount \| null`, `CartItem \| undefined`  |
| `discriminated unions` | DiscountResult with `success` flag           |
| `React event types`    | `ChangeEvent`, `KeyboardEvent`, `MouseEvent` |
| `custom hooks typing`  | useCart return type                           |
| `generic callbacks`    | `useCallback`, `useMemo` with types          |
| `type assertions`      | Category filter casting                      |
| `optional chaining`    | `cartItem?.quantity ?? 0`                    |

---

## 🛡️ How TypeScript Prevents Bugs

```typescript
// ❌ WITHOUT TypeScript — These bugs are possible:
product.price = "fifty"          // String instead of number
cart.quantity = -5               // Negative quantity
discount.type = "mega-sale"     // Invalid discount type
summary.total = undefined       // Missing calculation

// ✅ WITH TypeScript — All caught at compile time:
product.price: number            // Only numbers allowed
cart.quantity: number             // Validated in logic
discount.type: DiscountType      // Only "percentage" | "fixed"
summary.total: number            // Always calculated
```

## 📁 Project Structure

ecommerce-cart/  
├── public/    
│   └── vite.svg  
├── src/  
│   ├── types/  
│   │   └── index.ts              # All TypeScript interfaces & enums  
│   ├── data/   
│   │   └── products.ts           # Mock product data & discount codes   
│   ├── hooks/   
│   │   └── useCart.ts            # Cart logic (add, remove, discount, totals)   
│   ├── components/   
│   │   ├── Header.tsx            # Navigation header with cart badge  
│   │   ├── ProductCard.tsx       # Individual product display card     
│   │   ├── ProductList.tsx       # Product grid with search & filters   
│   │   ├── CartItemRow.tsx       # Single cart item with quantity controls  
│   │   ├── Cart.tsx              # Cart page with checkout & success popup  
│   │   └── DiscountInput.tsx     # Coupon code input & validation   
│   ├── App.tsx                   # Main app with tab navigation   
│   ├── App.css                   # All styles  
│   └── main.tsx                  # Entry point   
├── index.html   
├── package.json   
├── tsconfig.json    
├── tsconfig.app.json   
├── vite.config.ts   
└── README.md   
