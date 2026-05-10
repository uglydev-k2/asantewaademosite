"use client";

import { Heart, ShoppingBag } from "lucide-react";
import type { StoreProduct } from "@/types";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { toCartProduct } from "@/lib/store/cart-product";

export function ProductActions({ product }: { product: StoreProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem(product.id));
  const outOfStock = product.stock < 1;

  return (
    <div className="flex gap-3">
      <button
        type="button"
        disabled={outOfStock}
        onClick={() => addItem(toCartProduct(product))}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        <ShoppingBag className="h-4 w-4" />
        Add to Cart
      </button>
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold"
      >
        <Heart className={`h-4 w-4 ${hasItem ? "fill-rose-500 text-rose-500" : ""}`} />
        Add to Wishlist
      </button>
    </div>
  );
}
