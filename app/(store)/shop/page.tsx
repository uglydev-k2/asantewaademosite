import Link from "next/link";
import { asantewaaProducts } from "@/lib/data/storefront";
import { ProductCard } from "@/components/shop/ProductCard";
import { CartSection } from "@/components/cart/CartSection";

const PAGE_SIZE = 12;

export default function ShopPage({
  searchParams
}: {
  searchParams: { category?: string; page?: string; sort?: string };
}) {
  const category = searchParams.category;
  const sort = searchParams.sort ?? "newest";
  const page = Number(searchParams.page ?? "1");

  let filtered = category ? asantewaaProducts.filter((product) => product.category_slug === category) : asantewaaProducts;

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "best-sellers") filtered = [...filtered].sort((a, b) => b.reviews_count - a.reviews_count);
  if (sort === "newest") filtered = [...filtered].sort((a, b) => b.id - a.id);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <aside className="space-y-4 rounded-2xl border bg-white p-4">
        <h2 className="font-semibold">Filters</h2>
        <div className="space-y-2 text-sm">
          {["kitchen-essentials", "electronics", "fashion-dresses", "mannequins", "home-essentials"].map((slug) => (
            <Link key={slug} href={`/shop?category=${slug}`} className="block capitalize text-slate-600 hover:text-emerald-700">
              {slug.replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      </aside>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Shop All Products</h1>
            <p className="text-sm text-slate-500">{filtered.length} products</p>
          </div>
          <div className="flex gap-2 text-sm">
            <Link href={`/shop?${category ? `category=${category}&` : ""}sort=newest`} className="rounded-full border px-3 py-1">Newest</Link>
            <Link href={`/shop?${category ? `category=${category}&` : ""}sort=best-sellers`} className="rounded-full border px-3 py-1">Best Sellers</Link>
            <Link href={`/shop?${category ? `category=${category}&` : ""}sort=price-asc`} className="rounded-full border px-3 py-1">Price Low→High</Link>
          </div>
        </div>
        <CartSection />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paged.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
            <Link
              key={p}
              href={`/shop?page=${p}${category ? `&category=${category}` : ""}${sort ? `&sort=${sort}` : ""}`}
              className={`rounded-md border px-3 py-1 text-sm ${p === current ? "bg-emerald-700 text-white" : ""}`}
            >
              {p}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
