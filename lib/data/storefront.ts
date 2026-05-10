import type { Category, StoreProduct } from "@/types";

export const asantewaaCategories: Category[] = [
  {
    id: 1,
    name: "Kitchen Essentials",
    slug: "kitchen-essentials",
    image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1200",
    description: "Cookware, storage, and practical kitchen tools."
  },
  {
    id: 2,
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1200",
    description: "Reliable gadgets and everyday electronics."
  },
  {
    id: 3,
    name: "Fashion & Dresses",
    slug: "fashion-dresses",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200",
    description: "Affordable fashion, dresses, and accessories."
  },
  {
    id: 4,
    name: "Mannequins",
    slug: "mannequins",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200",
    description: "Display mannequins for retail and tailoring."
  },
  {
    id: 5,
    name: "Home Essentials",
    slug: "home-essentials",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200",
    description: "Useful home picks for comfort and organization."
  }
];

const baseProducts: Omit<StoreProduct, "id" | "created_at">[] = [
  { name: "Premium Female Display Mannequin", slug: "premium-female-display-mannequin", description: "Full body mannequin with stable base for boutiques and showrooms.", price: 950, compare_price: 1150, images: ["https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1200"], category_slug: "mannequins", stock: 12, is_featured: true, is_new_arrival: true, badge: "Just landed", rating: 4.8, reviews_count: 22 },
  { name: "Kitchen Knife Set (8 pcs)", slug: "kitchen-knife-set-8pcs", description: "Stainless steel knife set with stand for daily cooking.", price: 220, images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1200"], category_slug: "kitchen-essentials", stock: 45, is_featured: true, is_new_arrival: false, badge: "Top sellers", rating: 4.6, reviews_count: 38 },
  { name: "Portable Blender 2-in-1", slug: "portable-blender-2-in-1", description: "Rechargeable blender ideal for smoothies and shakes.", price: 180, images: ["https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=1200"], category_slug: "kitchen-essentials", stock: 24, is_featured: false, is_new_arrival: true, badge: "Just landed", rating: 4.5, reviews_count: 17 },
  { name: "Smart Android TV Box", slug: "smart-android-tv-box", description: "4K streaming box with voice remote and app store access.", price: 540, compare_price: 620, images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200"], category_slug: "electronics", stock: 34, is_featured: true, is_new_arrival: false, badge: "Premium picks", rating: 4.7, reviews_count: 53 },
  { name: "Wireless Headphones Pro", slug: "wireless-headphones-pro", description: "Noise-reducing over-ear headphones with long battery life.", price: 390, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200"], category_slug: "electronics", stock: 18, is_featured: true, is_new_arrival: false, badge: "Premium picks", rating: 4.8, reviews_count: 66 },
  { name: "Mini Bluetooth Speaker", slug: "mini-bluetooth-speaker", description: "Compact speaker with rich sound and splash resistance.", price: 150, images: ["https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1200"], category_slug: "electronics", stock: 50, is_featured: false, is_new_arrival: true, badge: "Just landed", rating: 4.4, reviews_count: 21 },
  { name: "Elegant Floral Maxi Dress", slug: "elegant-floral-maxi-dress", description: "Flowing floral maxi dress for events and weekend outings.", price: 280, images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200"], category_slug: "fashion-dresses", stock: 26, is_featured: true, is_new_arrival: false, badge: "Best value", rating: 4.6, reviews_count: 44 },
  { name: "Classic Office Midi Dress", slug: "classic-office-midi-dress", description: "Smart midi dress for office and formal meetings.", price: 230, images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200"], category_slug: "fashion-dresses", stock: 40, is_featured: false, is_new_arrival: false, badge: "Best value", rating: 4.3, reviews_count: 18 },
  { name: "2-Tier Dish Drying Rack", slug: "2-tier-dish-drying-rack", description: "Sturdy rack for drying plates, cups, and cutlery.", price: 175, images: ["https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?q=80&w=1200"], category_slug: "kitchen-essentials", stock: 28, is_featured: false, is_new_arrival: true, badge: "Top sellers", rating: 4.2, reviews_count: 14 },
  { name: "Heavy Duty Male Mannequin", slug: "heavy-duty-male-mannequin", description: "Durable male mannequin with realistic proportions.", price: 980, images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200"], category_slug: "mannequins", stock: 10, is_featured: true, is_new_arrival: false, badge: "Premium picks", rating: 4.7, reviews_count: 13 },
  { name: "Child Display Mannequin", slug: "child-display-mannequin", description: "Kid-sized mannequin ideal for children wear displays.", price: 720, images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200"], category_slug: "mannequins", stock: 8, is_featured: false, is_new_arrival: true, badge: "Just landed", rating: 4.5, reviews_count: 9 },
  { name: "4L Digital Air Fryer", slug: "4l-digital-air-fryer", description: "Oil-free fryer with touch controls and preset modes.", price: 780, images: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200"], category_slug: "kitchen-essentials", stock: 15, is_featured: true, is_new_arrival: false, badge: "Top sellers", rating: 4.8, reviews_count: 72 },
  { name: "Compact Rice Cooker", slug: "compact-rice-cooker", description: "Reliable rice cooker for small to medium households.", price: 320, images: ["https://images.unsplash.com/photo-1566842600175-97dca489844f?q=80&w=1200"], category_slug: "kitchen-essentials", stock: 27, is_featured: false, is_new_arrival: false, badge: "Top sellers", rating: 4.4, reviews_count: 29 },
  { name: "LED Vanity Ring Light", slug: "led-vanity-ring-light", description: "Adjustable brightness ring light for makeup and content.", price: 260, images: ["https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200"], category_slug: "electronics", stock: 39, is_featured: false, is_new_arrival: true, badge: "Premium picks", rating: 4.5, reviews_count: 34 },
  { name: "Women’s Two-Piece Set", slug: "womens-two-piece-set", description: "Comfortable matching two-piece outfit for casual wear.", price: 210, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200"], category_slug: "fashion-dresses", stock: 33, is_featured: false, is_new_arrival: true, badge: "Best value", rating: 4.3, reviews_count: 25 },
  { name: "Decor Throw Pillow Set", slug: "decor-throw-pillow-set", description: "Set of decorative cushions for living room styling.", price: 140, images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"], category_slug: "home-essentials", stock: 55, is_featured: false, is_new_arrival: false, rating: 4.1, reviews_count: 19 },
  { name: "Foldable Laundry Basket", slug: "foldable-laundry-basket", description: "Space-saving basket with reinforced handles.", price: 95, images: ["https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1200"], category_slug: "home-essentials", stock: 60, is_featured: false, is_new_arrival: true, badge: "Just landed", rating: 4.2, reviews_count: 12 },
  { name: "Luxury Bedding Set", slug: "luxury-bedding-set", description: "Soft queen-size bedding set with pillow cases.", price: 460, images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"], category_slug: "home-essentials", stock: 14, is_featured: true, is_new_arrival: false, rating: 4.7, reviews_count: 40 },
  { name: "Wall-Mount Microwave Shelf", slug: "wall-mount-microwave-shelf", description: "Heavy-duty shelf for microwave and kitchen storage.", price: 190, images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200"], category_slug: "kitchen-essentials", stock: 21, is_featured: false, is_new_arrival: false, rating: 4.4, reviews_count: 16 },
  { name: "Slimline Female Mannequin Matte", slug: "slimline-female-mannequin-matte", description: "Matte-finish mannequin with pose-friendly joints.", price: 1020, images: ["https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?q=80&w=1200"], category_slug: "mannequins", stock: 7, is_featured: true, is_new_arrival: true, badge: "Just landed", rating: 4.9, reviews_count: 11 }
];

export const asantewaaProducts: StoreProduct[] = baseProducts.map((product, index) => ({
  id: index + 1,
  created_at: new Date(Date.now() - index * 86_400_000).toISOString(),
  ...product
}));

