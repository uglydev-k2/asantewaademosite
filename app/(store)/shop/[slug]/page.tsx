import Image from "next/image";
import { notFound } from "next/navigation";
import { asantewaaProducts } from "@/lib/data/storefront";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatGHS } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = asantewaaProducts.find((item) => item.slug === params.slug);
  if (!product) return notFound();
  const related = asantewaaProducts.filter((item) => item.category_slug === product.category_slug && item.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <Image src={product.images[0]} alt={product.name} width={1200} height={900} className="h-[420px] w-full rounded-2xl object-cover" />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.concat(product.images).slice(0, 4).map((img, index) => (
              <Image key={index} src={img} alt={`${product.name} ${index + 1}`} width={300} height={300} className="h-20 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
        <article className="space-y-4 rounded-2xl border bg-white p-6">
          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">{product.badge ?? "Best value"}</span>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-emerald-700">{formatGHS(product.price)}</p>
          <p className="text-sm text-slate-600">{product.description}</p>
          <p className="text-sm font-medium">{product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}</p>
          <div className="flex gap-3">
            <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Add to Cart</button>
            <button className="rounded-lg border px-4 py-2 text-sm font-semibold">Add to Wishlist</button>
          </div>
        </article>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">You may also like</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
