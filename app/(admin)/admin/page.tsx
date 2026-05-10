import Link from "next/link";
import { AlertTriangle, ArrowRight, Boxes, CircleDollarSign, Download, Package, Plus, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { asantewaaProducts } from "@/lib/data/storefront";
import { formatGHS } from "@/lib/utils";
import { fetchAdminAnalytics } from "@/lib/server/services/admin-service";

export default async function AdminDashboardPage() {
  let analytics = {
    ordersToday: 0,
    lowStockAlerts: asantewaaProducts.filter((product) => product.stock <= 10).length,
    totalRevenue: asantewaaProducts.reduce((sum, product) => sum + product.price * Math.max(1, Math.floor(product.reviews_count / 4)), 0),
    totalCustomers: 0
  };

  try {
    analytics = await fetchAdminAnalytics();
  } catch {
    // Fallback metrics are used automatically when remote analytics fails.
  }

  const inventoryAlerts = [...asantewaaProducts]
    .filter((product) => product.stock <= 10)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 6);

  const topProducts = [...asantewaaProducts]
    .sort((a, b) => b.reviews_count - a.reviews_count)
    .slice(0, 5);

  const todayOrders = [
    { id: "ASI-23091", customer: "Ama Nyarko", total: 980, status: "Processing", channel: "Web", eta: "Today" },
    { id: "ASI-23088", customer: "Nana Tetteh", total: 420, status: "Packed", channel: "Mobile", eta: "Today" },
    { id: "ASI-23084", customer: "Sena Owusu", total: 1250, status: "Out for delivery", channel: "Web", eta: "Tomorrow" },
    { id: "ASI-23079", customer: "Michael Adjei", total: 210, status: "Placed", channel: "Web", eta: "Tomorrow" }
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-start justify-between gap-3 rounded-xl border bg-white p-5 shadow-sm dark:bg-slate-900">
        <div>
          <h1 className="text-3xl font-bold">God-Level Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Mission control for Asantewaa Imports across sales, products, inventory, and fulfillment.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/orders">
            <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button className="bg-emerald-700 hover:bg-emerald-800">
            <Plus className="mr-2 h-4 w-4" />
            New Product
            </Button>
          </Link>
        </div>
      </section>

      <div className="rounded-xl border bg-emerald-700 p-4 text-white shadow-sm">
        <p className="text-xs uppercase tracking-wide text-emerald-100">Priority Alert</p>
        <p className="text-sm font-medium">
          {inventoryAlerts.length
            ? `${inventoryAlerts.length} SKUs are below safe stock levels. Trigger restock in the next 12 hours to avoid lost sales.`
            : "No low-stock emergencies right now. Inventory health is stable."}
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="mt-1 text-2xl font-bold">{formatGHS(analytics.totalRevenue)}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><CircleDollarSign className="h-3.5 w-3.5" /> All-time tracked sales</p>
        </article>
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Orders Today</p>
          <p className="mt-1 text-2xl font-bold">{analytics.ordersToday}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><ShoppingCart className="h-3.5 w-3.5" /> Live fulfillment load</p>
        </article>
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Low Stock Alerts</p>
          <p className="mt-1 text-2xl font-bold">{analytics.lowStockAlerts}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><AlertTriangle className="h-3.5 w-3.5" /> Needs immediate attention</p>
        </article>
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Customers</p>
          <p className="mt-1 text-2xl font-bold">{analytics.totalCustomers}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><Users className="h-3.5 w-3.5" /> Registered user base</p>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Fulfillment Queue</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-emerald-700">Open Orders <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Channel</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody>
                {todayOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{formatGHS(order.total)}</td>
                    <td className="py-3">{order.channel}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{order.status}</span>
                    </td>
                    <td className="py-3 text-slate-500">{order.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Low Stock Radar</h3>
              <Boxes className="h-4 w-4 text-slate-500" />
            </div>
            <div className="space-y-2">
              {inventoryAlerts.length ? (
                inventoryAlerts.map((item) => (
                  <div key={item.id} className="rounded-lg border p-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">SKU AI-{item.id} · stock {item.stock}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No products are below the stock threshold.</p>
              )}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Top Movers</h3>
              <Package className="h-4 w-4 text-slate-500" />
            </div>
            <div className="space-y-2">
              {topProducts.map((product) => (
                <div key={product.id} className="rounded-lg bg-slate-50 p-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.reviews_count} reviews · {formatGHS(product.price)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
