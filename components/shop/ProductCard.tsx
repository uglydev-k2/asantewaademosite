"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { StoreProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { formatGHS } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types/product";

export function ProductCard({ product }: { product: StoreProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem(product.id));
  const outOfStock = product.stock < 1;
  const cartReadyProduct: Product = {
    id: String(product.id),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images,
    rating: product.rating,
    reviewCount: product.reviews_count,
    ecosystems: ["alexa"],
    stock: product.stock,
    brand: "Asantewaa Imports",
    sku: `AI-${product.id}`,
    setupDifficulty: "Beginner",
    category: product.category_slug
  };

  return (
    <article className={cn("group rounded-xl border bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", outOfStock && "opacity-80")}>
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden rounded-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={800}
          height={800}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <button
          aria-label="Add to wishlist"
          onClick={(event) => {
            event.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2"
        >
          <Heart className={cn("h-4 w-4", hasItem && "fill-emerald-700 text-emerald-700")} />
        </button>
        <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
          {outOfStock ? "Out of Stock" : product.badge ?? "Best value"}
        </span>
      </Link>
      <div className="space-y-2 p-2">
        <Link href={`/shop/${product.slug}`} className="line-clamp-2 text-sm font-semibold text-slate-900">
          {product.name}
        </Link>
        <p className="text-base font-bold text-emerald-700">{formatGHS(product.price)}</p>
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.rating} ({product.reviews_count})
        </p>
        <Button onClick={() => addItem(cartReadyProduct)} disabled={outOfStock} className="w-full bg-emerald-700 hover:bg-emerald-800">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
