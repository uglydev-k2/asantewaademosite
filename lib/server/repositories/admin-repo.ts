import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface AdminDashboardOrderRow {
  id: string;
  displayId: string;
  total: number;
  status: string;
  createdAt: string | null;
  customerLabel: string;
}

export interface AdminDashboardSnapshot {
  ordersToday: number;
  lowStockAlerts: number;
  totalRevenue: number;
  totalCustomers: number;
  productCatalogCount: number;
  recentOrders: AdminDashboardOrderRow[];
}

function shippingCustomerLabel(shipping: unknown): string {
  if (!shipping || typeof shipping !== "object") return "—";
  const o = shipping as Record<string, unknown>;
  const name = o.full_name ?? o.fullName ?? o.name;
  if (typeof name === "string" && name.trim()) return name.trim();
  const email = o.email;
  if (typeof email === "string" && email.trim()) return email.trim();
  return "—";
}

export async function getAdminDashboardSnapshot(): Promise<AdminDashboardSnapshot> {
  const supabase = createServerSupabaseClient();
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

  const [
    ordersTodayRes,
    lowStockRes,
    revenueRes,
    customersRes,
    productsCountRes,
    recentOrdersRes
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }).gte("created_at", startOfDay),
    supabase.from("products").select("*", { count: "exact", head: true }).lt("stock", 10),
    supabase.from("orders").select("total"),
    supabase.from("profiles").select("id"),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("id, total, status, created_at, shipping_address")
      .order("created_at", { ascending: false })
      .limit(10)
  ]);

  if (revenueRes.error) throw revenueRes.error;
  if (customersRes.error) throw customersRes.error;

  const revenue = (revenueRes.data ?? []).reduce((sum, row) => sum + Number(row.total ?? 0), 0);

  const recentOrders: AdminDashboardOrderRow[] = (recentOrdersRes.data ?? []).map((row) => ({
    id: String(row.id),
    displayId: `ASI-${row.id}`,
    total: Number(row.total ?? 0),
    status: row.status ?? "placed",
    createdAt: row.created_at ?? null,
    customerLabel: shippingCustomerLabel(row.shipping_address)
  }));

  return {
    ordersToday: ordersTodayRes.count ?? 0,
    lowStockAlerts: lowStockRes.count ?? 0,
    totalRevenue: revenue,
    totalCustomers: customersRes.data?.length ?? 0,
    productCatalogCount: productsCountRes.count ?? 0,
    recentOrders
  };
}

/** @deprecated Use getAdminDashboardSnapshot for full metrics */
export async function getAdminAnalytics() {
  const snap = await getAdminDashboardSnapshot();
  return {
    ordersToday: snap.ordersToday,
    lowStockAlerts: snap.lowStockAlerts,
    totalRevenue: snap.totalRevenue,
    totalCustomers: snap.totalCustomers
  };
}
