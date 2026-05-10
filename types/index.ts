export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface StoreProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price?: number;
  images: string[];
  category_slug: string;
  stock: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  badge?: "Top sellers" | "Premium picks" | "Best value" | "Just landed";
  rating: number;
  reviews_count: number;
  created_at: string;
}
