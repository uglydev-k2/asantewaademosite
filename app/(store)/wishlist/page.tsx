"use client";

import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { useWishlistStore } from "@/lib/store/wishlist-store";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      {!items.length ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-slate-600">No saved products yet.</p>
          <Link href="/shop" className="mt-3 inline-block text-sm font-semibold text-emerald-700">
            Continue shopping →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
