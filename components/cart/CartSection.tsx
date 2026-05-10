"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatGHS } from "@/lib/utils";

export function CartSection() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const removeItem = useCartStore((state) => state.removeItem);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Cart Preview</h2>
        <Link href="/cart" className="text-sm font-semibold text-emerald-700">
          View cart →
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Your cart is empty. Add products to see them here.</p>
      ) : (
        <div className="mt-3 space-y-2">
          {items.slice(0, 3).map((item) => (
            <div key={item.product.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <div className="min-w-0 pr-3">
                <p className="truncate">{item.product.name}</p>
                <p className="whitespace-nowrap text-xs text-slate-500">
                  x{item.quantity} · {formatGHS((item.product.salePrice ?? item.product.price) * item.quantity)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          ))}
          <p className="pt-1 text-sm font-semibold">Subtotal ({itemCount} items): {formatGHS(total)}</p>
        </div>
      )}
    </section>
  );
}
