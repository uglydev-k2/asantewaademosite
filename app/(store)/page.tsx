import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Headset, Truck } from "lucide-react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { asantewaaProducts } from "@/lib/data/storefront";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const categories = [
    { name: "Top sellers — Kitchen Essentials", slug: "kitchen-essentials", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200", badge: "Top sellers" },
    { name: "Premium picks — Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200", badge: "Premium picks" },
    { name: "Best value — Fashion & Dresses", slug: "fashion-dresses", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200", badge: "Best value" },
    { name: "Just landed — New Arrivals", slug: "new-arrivals", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200", badge: "Just landed" }
  ];
  const featured = asantewaaProducts.filter((product) => product.is_featured).slice(0, 8);
  const freshStock = [...asantewaaProducts].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="space-y-8 md:space-y-12">
      <HeroCarousel />
      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Find exactly what you need</h2>
          <Link href="/shop" className="text-sm font-semibold text-emerald-700">
            Browse full catalogue →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link href={`/shop?category=${category.slug}`} key={category.slug} className="group relative overflow-hidden rounded-2xl">
              <Image src={category.image} alt={category.name} width={700} height={700} className="h-52 w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">{category.badge}</span>
              <p className="absolute bottom-3 left-3 pr-3 text-sm font-semibold text-white">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Trending Now — Products our customers love</h2>
            <p className="text-sm text-slate-500">Hand-selected favourites with top ratings and fast turnaround.</p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-emerald-700">
            View all products →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Just landed</p>
        <h3 className="mt-2 text-2xl font-semibold">Fresh stock & restocks</h3>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Discover new arrivals — kitchen essentials, electronics, mannequins, dresses, and everyday items at great prices.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {freshStock.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6">
        <h3 className="text-2xl font-semibold">Built on quality, value, and trust</h3>
        <p className="mt-2 text-sm text-slate-600">Every product is hand-selected and quality-checked before dispatch.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 text-sm font-semibold">Verified quality from source</p>
            <p className="text-sm text-slate-500">Products sourced directly from factories and personally inspected.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <Headset className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 text-sm font-semibold">Real support, real people</p>
            <p className="text-sm text-slate-500">Our team helps with product questions and order tracking.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <Truck className="h-6 w-6 text-emerald-700" />
            <p className="mt-3 text-sm font-semibold">Reliable nationwide delivery</p>
            <p className="text-sm text-slate-500">Order from anywhere in Ghana with tracked delivery updates.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-emerald-700 p-8 text-white">
        <h3 className="text-3xl font-bold">Premium products at unbeatable prices.</h3>
        <p className="mt-2 max-w-2xl text-emerald-50">
          Discover quality kitchen essentials, electronics, mannequins, dresses, and more — sourced directly and delivered to your door.
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/shop"><Button className="bg-white text-emerald-700 hover:bg-emerald-50">Start shopping</Button></Link>
          <Link href="/auth/register">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-700">
              Create an account
            </Button>
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-emerald-50">
          <span className="rounded-full bg-white/20 px-3 py-1">Verified quality</span>
          <span className="rounded-full bg-white/20 px-3 py-1">Nationwide delivery</span>
          <span className="rounded-full bg-white/20 px-3 py-1">Accra, Ghana</span>
        </div>
      </section>
      <NewsletterSection />
      <section className="rounded-2xl border bg-white p-6">
        <h3 className="text-xl font-semibold">Explore our sourcing updates</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-slate-50 p-4">
            <h4 className="font-semibold">How to choose durable kitchen essentials</h4>
            <p className="mt-1 text-sm text-slate-500">Simple buying checklist for quality and long-term use.</p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h4 className="font-semibold">What to check before buying mannequins</h4>
            <p className="mt-1 text-sm text-slate-500">Size, finish, durability, and value tips for resellers.</p>
          </article>
          <article className="rounded-xl bg-slate-50 p-4">
            <h4 className="font-semibold">Best value electronics for everyday homes</h4>
            <p className="mt-1 text-sm text-slate-500">Our top practical picks for reliable daily use.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
