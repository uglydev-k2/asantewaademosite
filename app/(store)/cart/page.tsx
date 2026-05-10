"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatGHS } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (!items.length) {
    return (
      <div className="rounded-2xl border p-10 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">Discover premium imports for your home and business.</p>
        <Link href="/shop" className="mt-4 inline-block">
          <Button className="bg-emerald-700 hover:bg-emerald-800">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cart</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between gap-3 rounded-xl border p-4">
            <div className="min-w-0">
              <p className="font-semibold">{item.product.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="h-8 w-8 rounded-md border text-sm font-semibold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="h-8 w-8 rounded-md border text-sm font-semibold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="ml-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatGHS((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
              <p className="text-xs text-slate-500">{formatGHS(item.product.salePrice ?? item.product.price)} each</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border p-4">
        <p className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">{formatGHS(total)}</span>
        </p>
      </div>
      <Link href="/checkout">
        <Button className="w-full bg-emerald-700 hover:bg-emerald-800 md:w-auto">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}
