import { createClient } from "@supabase/supabase-js";
import { asantewaaCategories, asantewaaProducts } from "../lib/data/storefront";

async function seed() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables.");
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { error: categoriesError } = await supabase.from("categories").upsert(asantewaaCategories, { onConflict: "slug" });
  if (categoriesError) throw categoriesError;

  const { data: categories } = await supabase.from("categories").select("id, slug");
  const idBySlug = new Map(categories?.map((category) => [category.slug, category.id]) ?? []);

  const products = asantewaaProducts.map((product) => ({
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    compare_price: product.compare_price ?? null,
    images: product.images,
    category_id: idBySlug.get(product.category_slug),
    stock: product.stock,
    is_featured: product.is_featured,
    is_new_arrival: product.is_new_arrival
  }));

  const { error: productsError } = await supabase.from("products").upsert(products, { onConflict: "slug" });
  if (productsError) throw productsError;

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
