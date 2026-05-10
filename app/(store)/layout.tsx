import type { ReactNode } from "react";
import Link from "next/link";
import { Heart, Home, Menu, Search, ShoppingBag, User } from "lucide-react";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="bg-emerald-700 px-4 py-2 text-center text-xs font-medium text-white">
        Free Store Pickup Available | Order Online, Pick Up Today
      </div>
      <header className="sticky top-0 z-40 border-b bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="rounded-lg border p-2 text-slate-600 md:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </button>
            <Link href="/" className="text-xl font-black tracking-tight text-emerald-800 md:text-2xl">
              Asantewaa Imports
            </Link>
          </div>
          <div className="relative hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search mannequins, kitchen essentials, electronics..." className="w-full pl-10 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/wishlist" className="rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </Link>
            <Link href="/auth/login" className="rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Login">
              <User className="h-4 w-4" />
            </Link>
            <Link href="/cart" className="rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Cart">
              <ShoppingBag className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search products..." className="w-full pl-10 text-sm" />
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 py-3 text-sm font-medium md:flex">
            <Link href="/shop" className="text-slate-700 hover:text-emerald-700">Shop</Link>
            <Link href="/categories" className="text-slate-700 hover:text-emerald-700">Categories</Link>
            <Link href="/about" className="text-slate-700 hover:text-emerald-700">About</Link>
            <Link href="/contact" className="text-slate-700 hover:text-emerald-700">Contact</Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 pb-24 md:py-8 md:pb-8">{children}</main>
      <footer className="mt-8 border-t bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-black text-emerald-800">Asantewaa Imports</p>
            <p className="mt-2 text-sm text-slate-500">Premium Quality Products For Less.</p>
          </div>
          <div className="text-sm">
            <p className="mb-2 font-semibold">Shop</p>
            <div className="space-y-1 text-slate-500">
              <p>All Products</p>
              <p>Categories</p>
              <p>New Arrivals</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-2 font-semibold">Customer Care</p>
            <div className="space-y-1 text-slate-500">
              <p>Contact Us</p>
              <p>Track My Order</p>
              <p>Returns Policy</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-2 font-semibold">Contact</p>
            <p className="text-slate-500">+233 XX XXX XXXX</p>
            <p className="text-slate-500">info@asantewaaImports.com</p>
          </div>
        </div>
        <div className="border-t px-4 py-4 text-center text-xs text-slate-500">© 2025 Asantewaa Imports. All rights reserved.</div>
      </footer>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-5 text-center text-[11px]">
          <Link href="/" className="flex flex-col items-center gap-1 py-1">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link href="/shop" className="flex flex-col items-center gap-1 py-1">
            <Search className="h-4 w-4" />
            Shop
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-1 py-1">
            <ShoppingBag className="h-4 w-4" />
            Cart
          </Link>
          <Link href="/wishlist" className="flex flex-col items-center gap-1 py-1">
            <Heart className="h-4 w-4" />
            Wishlist
          </Link>
          <Link href="/account" className="flex flex-col items-center gap-1 py-1">
            <User className="h-4 w-4" />
            Account
          </Link>
        </div>
      </nav>
    </div>
  );
}
