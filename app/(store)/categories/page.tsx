import Image from "next/image";
import Link from "next/link";
import { asantewaaCategories, asantewaaProducts } from "@/lib/data/storefront";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {asantewaaCategories.map((category) => {
          const count = asantewaaProducts.filter((product) => product.category_slug === category.slug).length;
          return (
            <Link key={category.id} href={`/shop?category=${category.slug}`} className="overflow-hidden rounded-2xl border bg-white">
              <Image src={category.image} alt={category.name} width={900} height={600} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h2 className="font-semibold">{category.name}</h2>
                <p className="text-sm text-slate-500">{count} products</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
