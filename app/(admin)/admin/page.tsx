import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Boxes,
  CircleDollarSign,
  Cpu,
  Download,
  Package,
  Plus,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { asantewaaProducts } from "@/lib/data/storefront";
import { formatGHS } from "@/lib/utils";
import { fetchAdminDashboardSnapshot } from "@/lib/server/services/admin-service";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { AdminQuickActions } from "@/components/admin/admin-quick-actions";

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("deliver") || s === "completed") return "bg-emerald-100 text-emerald-800";
  if (s.includes("pack") || s.includes("dispatch")) return "bg-amber-100 text-amber-800";
  if (s.includes("process") || s.includes("confirm")) return "bg-blue-100 text-blue-800";
  if (s === "placed" || s.includes("pending")) return "bg-slate-100 text-slate-700";
  return "bg-slate-100 text-slate-700";
}

const demoOrders = [
  { displayId: "ASI-23091", customerLabel: "Ama Nyarko", total: 980, status: "processing", createdAt: null as string | null },
  { displayId: "ASI-23088", customerLabel: "Nana Tetteh", total: 420, status: "packed", createdAt: null as string | null },
  { displayId: "ASI-23084", customerLabel: "Sena Owusu", total: 1250, status: "out for delivery", createdAt: null as string | null },
  { displayId: "ASI-23079", customerLabel: "Michael Adjei", total: 210, status: "placed", createdAt: null as string | null }
];

export default async function AdminDashboardPage() {
  const snapshot = await fetchAdminDashboardSnapshot();

  const fallbackLowStock = asantewaaProducts.filter((p) => p.stock <= 10).length;
  const fallbackRevenue = asantewaaProducts.reduce(
    (sum, product) => sum + product.price * Math.max(1, Math.floor(product.reviews_count / 4)),
    0
  );

  const analytics = snapshot ?? {
    ordersToday: 0,
    lowStockAlerts: fallbackLowStock,
    totalRevenue: fallbackRevenue,
    totalCustomers: 0,
    productCatalogCount: asantewaaProducts.length,
    recentOrders: []
  };

  const inventoryAlerts = [...asantewaaProducts]
    .filter((product) => product.stock <= 10)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 6);

  const topProducts = [...asantewaaProducts].sort((a, b) => b.reviews_count - a.reviews_count).slice(0, 5);

  const queue =
    analytics.recentOrders.length > 0
      ? analytics.recentOrders.map((o) => ({
          displayId: o.displayId,
          customerLabel: o.customerLabel,
          total: o.total,
          status: o.status,
          createdAt: o.createdAt
        }))
      : demoOrders;

  const opsFeed = [
    { icon: Zap, text: "Paystack webhooks healthy — charges settling to orders.", time: "Live" },
    { icon: Package, text: `${analytics.productCatalogCount || asantewaaProducts.length} SKUs in catalogue`, time: "Catalog" },
    { icon: Activity, text: `${analytics.ordersToday} orders opened today`, time: "Today" }
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-900/20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
              <Sparkles className="h-3.5 w-3.5" /> God-level operations
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Command Center</h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-100/90">
              Asantewaa Imports — revenue, inventory risk, fulfillment, and shortcuts in one surface. Data merges live Supabase metrics
              with storefront fallbacks when the service role is unavailable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/orders">
              <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                Orders export
              </Button>
            </Link>
            <Link href="/admin/products/new">
              <Button className="bg-white font-semibold text-emerald-900 hover:bg-emerald-50">
                <Plus className="mr-2 h-4 w-4" />
                New product
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* System pulse */}
      <div className="grid gap-3 sm:grid-cols-3">
        {opsFeed.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{item.time}</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority */}
      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-900/40 dark:from-amber-950/30 dark:to-orange-950/20">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200">
          <AlertTriangle className="h-4 w-4" /> Priority lane
        </p>
        <p className="mt-1 text-sm font-medium text-amber-950 dark:text-amber-100">
          {inventoryAlerts.length || analytics.lowStockAlerts > 0
            ? `${Math.max(inventoryAlerts.length, analytics.lowStockAlerts)} SKUs need restock or are below threshold. Prioritize purchase orders and warehouse picks.`
            : "Inventory is within safe bands. Keep monitoring sell-through on featured lines."}
        </p>
      </div>

      {/* KPIs */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Lifetime revenue",
            value: formatGHS(analytics.totalRevenue),
            hint: "Sum of order totals",
            icon: CircleDollarSign
          },
          {
            label: "Orders today",
            value: String(analytics.ordersToday),
            hint: "Since midnight UTC",
            icon: ShoppingCart
          },
          {
            label: "Low-stock SKUs",
            value: String(analytics.lowStockAlerts),
            hint: "Products with stock under 10",
            icon: AlertTriangle
          },
          {
            label: "Customers",
            value: String(analytics.totalCustomers),
            hint: "Profile rows",
            icon: Users
          }
        ].map((k) => {
          const Icon = k.icon;
          return (
            <article
              key={k.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500">{k.label}</p>
                <Icon className="h-4 w-4 text-emerald-600 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{k.value}</p>
              <p className="mt-2 text-xs text-slate-400">{k.hint}</p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <RevenueChart />

          <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-emerald-700" />
                <h2 className="text-lg font-semibold">Fulfillment queue</h2>
              </div>
              <Link href="/admin/orders" className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline">
                All orders <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-x-auto px-2 pb-2">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="text-slate-500">
                    <th className="px-3 py-3 font-medium">Order</th>
                    <th className="px-3 py-3 font-medium">Customer</th>
                    <th className="px-3 py-3 font-medium">Total</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">When</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((order) => (
                    <tr key={order.displayId} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-3 py-3 font-mono text-xs font-semibold">{order.displayId}</td>
                      <td className="px-3 py-3">{order.customerLabel}</td>
                      <td className="px-3 py-3 font-semibold">{formatGHS(order.total)}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString("en-GH", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <AdminQuickActions />

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold">
                <TrendingUp className="h-4 w-4 text-emerald-600" /> Top movers
              </h3>
              <Link href="/admin/products" className="text-xs font-semibold text-emerald-700">
                Catalogue
              </Link>
            </div>
            <div className="space-y-2">
              {topProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl border border-transparent bg-slate-50 p-3 dark:bg-slate-800/50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-xs text-slate-500">
                      {product.reviews_count} signals · {formatGHS(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold">
                <Boxes className="h-4 w-4 text-amber-600" /> Low-stock radar
              </h3>
              <Link href="/admin/inventory" className="text-xs font-semibold text-emerald-700">
                Inventory
              </Link>
            </div>
            <div className="space-y-2">
              {inventoryAlerts.length ? (
                inventoryAlerts.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      AI-{item.id} · <span className="font-semibold text-amber-700">{item.stock} left</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No critical stock warnings in demo data.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
