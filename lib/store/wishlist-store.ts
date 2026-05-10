"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StoreProduct } from "@/types";

interface WishlistState {
  items: StoreProduct[];
  toggleItem: (product: StoreProduct) => void;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
  hasItem: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          return exists
            ? { items: state.items.filter((item) => item.id !== product.id) }
            : { items: [...state.items, product] };
        }),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
      clearWishlist: () => set({ items: [] }),
      hasItem: (productId) => get().items.some((item) => item.id === productId)
    }),
    {
      name: "asantewaa-wishlist",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
