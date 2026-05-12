"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Circle({ n, step, label }: { n: 1 | 2 | 3; step: 1 | 2 | 3; label: string }) {
  const done = step > n;
  const current = step === n;
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition sm:h-11 sm:w-11",
          done && "border-[#16A34A] bg-[#16A34A] text-white",
          current && !done && "border-[#0F172A] bg-[#0F172A] text-white shadow-md",
          !done && !current && "border-[#E5E7EB] bg-white text-[#9CA3AF]"
        )}
      >
        {done ? <Check className="h-5 w-5" strokeWidth={2.5} /> : n}
      </div>
      <span
        className={cn(
          "mt-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide sm:text-[11px]",
          current || done ? "text-[#0F172A]" : "text-[#9CA3AF]"
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Connector({ filled }: { filled: boolean }) {
  return (
    <div
      className="mx-0.5 mt-5 h-0.5 min-w-[0.5rem] flex-1 rounded-full sm:mx-1 sm:mt-[22px] sm:min-w-[1rem]"
      style={{ background: filled ? "#16A34A" : "#E5E7EB" }}
      aria-hidden
    />
  );
}

export function CheckoutStepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="mb-8 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
      <div className="mx-auto flex max-w-2xl items-start justify-between">
        <Circle n={1} step={step} label="Delivery" />
        <Connector filled={step > 1} />
        <Circle n={2} step={step} label="Payment" />
        <Connector filled={step > 2} />
        <Circle n={3} step={step} label="Review" />
      </div>
    </div>
  );
}
