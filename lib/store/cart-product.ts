import type { Product } from "@/lib/types/product";
import type { StoreProduct } from "@/types";

export function toCartProduct(product: StoreProduct): Product {
  return {
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
}
