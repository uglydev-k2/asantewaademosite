import Link from "next/link";
import { ArrowUpRight, Boxes, LayoutGrid, Package, ShoppingCart, Store } from "lucide-react";

const actions = [
  { href: "/admin/products/new", label: "New product", desc: "Add SKU, images, pricing", icon: Package, accent: "from-emerald-600 to-teal-600" },
  { href: "/admin/orders", label: "Orders", desc: "Fulfillment & status", icon: ShoppingCart, accent: "from-slate-700 to-slate-900" },
  { href: "/admin/inventory", label: "Inventory", desc: "Stock & alerts", icon: Boxes, accent: "from-amber-500 to-orange-600" },
  { href: "/shop", label: "Live storefront", desc: "Preview customer view", icon: Store, accent: "from-emerald-500 to-cyan-600" }
];

export function AdminQuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-2">
        <LayoutGrid className="h-5 w-5 text-emerald-700" />
        <h2 className="text-lg font-semibold">Command shortcuts</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.href}
              href={a.href}
              className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-emerald-200 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-emerald-900"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${a.accent} text-white shadow-sm`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                  {a.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </p>
                <p className="text-xs text-slate-500">{a.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
