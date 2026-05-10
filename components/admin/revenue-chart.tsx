"use client";

import { useMemo, useState } from "react";
import type { RevenuePoint } from "@/lib/data/admin-dashboard";
import { revenue30Days, revenue7Days, revenue90Days } from "@/lib/data/admin-dashboard";
import { cn } from "@/lib/utils";
import { formatGHS } from "@/lib/utils";

type Range = "7d" | "30d" | "90d";

const ranges: { id: Range; label: string }[] = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" }
];

function getData(range: Range): RevenuePoint[] {
  if (range === "30d") return revenue30Days;
  if (range === "90d") return revenue90Days;
  return revenue7Days;
}

export function RevenueChart() {
  const [range, setRange] = useState<Range>("7d");
  const data = useMemo(() => getData(range), [range]);
  const max = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Revenue pulse</h2>
          <p className="text-sm text-slate-500">Synthetic trend preview — wire to real aggregates when ready.</p>
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
          {ranges.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRange(item.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                range === item.id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(56px,1fr))] items-end gap-2 rounded-xl bg-slate-100/60 p-4 dark:bg-slate-800/40 sm:gap-3">
        {data.map((point) => (
          <div key={point.label} className="space-y-2 text-center">
            <div className="mx-auto flex h-40 w-full max-w-[48px] items-end rounded-lg bg-slate-200/80 dark:bg-slate-700/80">
              <div
                className="w-full rounded-lg bg-gradient-to-t from-emerald-800 to-emerald-500 transition-all duration-500"
                style={{ height: `${Math.max(10, (point.revenue / max) * 100)}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{point.label}</p>
            <p className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">{formatGHS(point.revenue)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
