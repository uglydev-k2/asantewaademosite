import type { MetadataRoute } from "next";
import { asantewaaProducts } from "@/lib/data/storefront";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "",
    "/shop",
    "/categories",
    "/cart",
    "/checkout",
    "/wishlist",
    "/about",
    "/contact",
    "/order-tracking"
  ];
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date()
    })),
    ...asantewaaProducts.map((product) => ({
      url: `${base}/shop/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
