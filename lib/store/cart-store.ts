"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/lib/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const productId = String(product.id);
          const existing = state.items.find((item) => String(item.product.id) === productId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                String(item.product.id) === productId ? { ...item, quantity: item.quantity + quantity } : item
              )
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => String(item.product.id) !== String(productId)) })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return { items: state.items.filter((item) => String(item.product.id) !== String(productId)) };
          }
          return {
            items: state.items.map((item) =>
              String(item.product.id) === String(productId) ? { ...item, quantity } : item
            )
          };
        }),
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, item) => {
          const salePrice = (item.product as Product).salePrice;
          return sum + (salePrice ?? item.product.price) * item.quantity;
        }, 0)
    }),
    {
      name: "asantewaa-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
