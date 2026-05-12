"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import PaystackPop from "@paystack/inline-js";
import { Building2, CreditCard, Hash, Loader2, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartLineThumb } from "@/components/checkout/cart-line-thumb";
import { Button } from "@/components/ui/button";
import { CURRENCY_SYMBOL, DELIVERY_OPTIONS, estimateDeliveryRange } from "@/lib/checkout/constants";
import { formatVariantLabel, lineImageUrl, lineUnitPrice } from "@/lib/checkout/cart-line";
import { useCartStore, type CartItem } from "@/lib/store/cart-store";
import type { DeliveryFormValues } from "@/lib/checkout/delivery-schema";

function AcceptedCardBrands() {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Accepted cards">
      <svg width="40" height="26" viewBox="0 0 40 26" className="rounded border border-[#E5E7EB] bg-white" aria-hidden>
        <rect width="40" height="26" rx="3" fill="#1A1F71" />
        <text x="8" y="17" fill="white" fontSize="9" fontWeight="bold" fontFamily="system-ui,sans-serif">
          VISA
        </text>
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" className="rounded border border-[#E5E7EB] bg-white" aria-hidden>
        <circle cx="15" cy="13" r="8" fill="#EB001B" />
        <circle cx="25" cy="13" r="8" fill="#F79E1B" />
        <path d="M20 7a8 8 0 000 12 8 8 0 000-12z" fill="#FF5F00" />
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" className="rounded border border-[#E5E7EB] bg-[#016FD0]" aria-hidden>
        <text x="4" y="17" fill="white" fontSize="7" fontWeight="bold" fontFamily="system-ui,sans-serif">
          AMEX
        </text>
      </svg>
    </div>
  );
}

function PaymentMethodCards() {
  const cardClass =
    "flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left shadow-sm transition hover:border-[#CBD5E1]";
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className={cardClass}>
        <div className="flex items-center gap-2 text-[#0F172A]">
          <Smartphone className="h-6 w-6 shrink-0" aria-hidden />
          <span className="text-sm font-bold">Mobile Money</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#374151]">
          <span className="rounded-md bg-[#FFCC00] px-2 py-1 text-[#000]">MTN</span>
          <span className="rounded-md bg-[#E60000] px-2 py-1 text-white">Vodafone</span>
          <span className="rounded-md bg-[#0066CC] px-2 py-1 text-white">AirtelTigo</span>
        </div>
        <p className="text-xs text-[#6B7280]">Pay with your mobile wallet</p>
      </div>
      <div className={cardClass}>
        <div className="flex items-center gap-2 text-[#0F172A]">
          <CreditCard className="h-6 w-6 shrink-0" aria-hidden />
          <span className="text-sm font-bold">Card Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded border border-[#1A1F71] bg-white px-2 py-0.5 text-[10px] font-black tracking-tight text-[#1A1F71]">VISA</span>
          <span className="rounded border border-[#EB001B] bg-white px-2 py-0.5 text-[10px] font-black text-[#EB001B]">MC</span>
        </div>
        <p className="text-xs text-[#6B7280]">Credit or debit card</p>
      </div>
      <div className={cardClass}>
        <div className="flex items-center gap-2 text-[#0F172A]">
          <Building2 className="h-6 w-6 shrink-0" aria-hidden />
          <span className="text-sm font-bold">Bank Transfer</span>
        </div>
        <p className="text-xs text-[#6B7280]">Direct bank transfer</p>
      </div>
      <div className={cardClass}>
        <div className="flex items-center gap-2 text-[#0F172A]">
          <Hash className="h-6 w-6 shrink-0" aria-hidden />
          <span className="text-sm font-bold">USSD</span>
        </div>
        <p className="text-xs text-[#6B7280]">Pay via USSD code</p>
      </div>
    </div>
  );
}

export type PaystackCheckoutFlowProps = {
  step: 1 | 2 | 3;
  setStep: (s: 1 | 2 | 3) => void;
  items: CartItem[];
  delivery: DeliveryFormValues;
  phoneE164: string;
  subtotal: number;
  shippingAmount: number;
  tax: number;
  discount: number;
  total: number;
  userId?: string;
  cartPayload: {
    cartItems: Record<string, unknown>[];
    shippingAddress: Record<string, unknown>;
  };
  placing: boolean;
  setPlacing: (v: boolean) => void;
};

export function PaystackCheckoutFlow({
  step,
  setStep,
  items,
  delivery,
  phoneE164,
  subtotal,
  shippingAmount,
  tax,
  discount,
  total,
  userId,
  cartPayload,
  placing,
  setPlacing
}: PaystackCheckoutFlowProps) {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const placedRef = useRef(false);
  const payingRef = useRef(false);
  const [saveCard, setSaveCard] = useState(false);

  const openPaystack = async () => {
    if (placedRef.current || payingRef.current) return;
    payingRef.current = true;
    setPlacing(true);
    try {
      const initRes = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: delivery.email,
          amount: total,
          cartItems: cartPayload.cartItems,
          shippingAddress: cartPayload.shippingAddress,
          userId,
          saveCard: Boolean(userId && saveCard),
          subtotal,
          shippingCost: shippingAmount,
          tax,
          discount,
          total
        })
      });
      const initBody = (await initRes.json()) as { accessCode?: string; error?: string };
      if (!initRes.ok || !initBody.accessCode) {
        throw new Error(initBody.error ?? "Could not start payment.");
      }

      const paystack = new PaystackPop();
      paystack.resumeTransaction(initBody.accessCode, {
        async onSuccess(transaction) {
          const ref = transaction.reference;
          try {
            const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(ref)}`);
            const body = (await res.json()) as {
              success?: boolean;
              error?: string;
              sessionPayload?: Record<string, unknown>;
            };
            if (!res.ok || !body.success || !body.sessionPayload) {
              throw new Error(body.error ?? "Verification failed.");
            }
            placedRef.current = true;
            try {
              sessionStorage.setItem("installease_checkout_success", JSON.stringify(body.sessionPayload));
            } catch {
              /* ignore */
            }
            clearCart();
            router.push("/checkout/success");
          } catch (e) {
            placedRef.current = false;
            toast.error(e instanceof Error ? e.message : "Could not verify payment.");
          }
        },
        onCancel() {
          toast.error("Payment cancelled.");
        },
        onError(err: { message?: string }) {
          toast.error(err?.message ?? "Payment could not load.");
        }
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment setup failed.");
    } finally {
      payingRef.current = false;
      setPlacing(false);
    }
  };

  return (
    <>
      {step === 2 ? (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Payment details</h2>
          <p className="mt-1 text-sm text-[#6B7280]">All transactions are encrypted and secure.</p>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Accepted on Paystack</p>
            <AcceptedCardBrands />
          </div>

          <div className="mt-8">
            <PaymentMethodCards />
          </div>

          {userId ? (
            <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm text-[#374151]">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#E5E7EB] text-[#0F172A] focus:ring-[#0F172A]"
              />
              <span>Save card for future purchases</span>
            </label>
          ) : null}

          <div className="mt-8 flex flex-col gap-4 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="text-sm font-semibold text-[#0F172A] underline-offset-2 hover:underline" onClick={() => setStep(1)}>
              ← Back to Delivery
            </button>
            <Button type="button" className="h-11 rounded-full bg-[#0F172A] px-8 font-semibold text-white" onClick={() => setStep(3)}>
              Review Order →
            </Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Review &amp; place order</h2>

          <div className="space-y-6 text-sm">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">Delivery to</p>
                <button type="button" className="text-xs font-semibold text-[#0F172A] underline" onClick={() => setStep(1)}>
                  Edit
                </button>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-[#374151]">
                <p className="font-semibold text-[#0F172A]">{delivery.fullName}</p>
                <p className="mt-1">
                  {delivery.line1}
                  {delivery.line2 ? `, ${delivery.line2}` : ""}
                </p>
                <p>
                  {delivery.city}, {delivery.region}
                </p>
                <p>{delivery.country}</p>
                <p className="mt-2 text-[#6B7280]">{phoneE164}</p>
                <p className="mt-2 font-medium text-[#0F172A]">
                  {DELIVERY_OPTIONS.find((o) => o.id === delivery.deliveryMethod)?.title} ·{" "}
                  {estimateDeliveryRange(delivery.deliveryMethod)}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">Payment</p>
                <button type="button" className="text-xs font-semibold text-[#0F172A] underline" onClick={() => setStep(2)}>
                  Edit
                </button>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-[#374151]">
                <p className="font-medium text-[#0F172A]">Paystack</p>
                <p className="mt-1 text-xs text-[#6B7280]">Card, Mobile Money, bank transfer, or USSD — you&apos;ll pick in the secure Paystack window.</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#6B7280]">Items</p>
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => {
                  const img = lineImageUrl(product);
                  const variant = formatVariantLabel(product);
                  return (
                    <li key={product.id} className="flex gap-3">
                      <CartLineThumb imageUrl={img} name={product.name} quantity={quantity} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-[#0F172A]" style={{ fontWeight: 500 }}>
                          {product.name}
                        </p>
                        {variant ? <p className="mt-0.5 text-xs text-[#6B7280]">{variant}</p> : null}
                      </div>
                      <p className="shrink-0 font-semibold text-[#0F172A]">
                        {CURRENCY_SYMBOL}
                        {(lineUnitPrice(product) * quantity).toFixed(2)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Shipping</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {shippingAmount.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Tax</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {tax.toFixed(2)}
                </span>
              </div>
              {discount > 0 ? (
                <div className="mt-2 flex justify-between text-[#16A34A]">
                  <span>Discount</span>
                  <span>
                    −{CURRENCY_SYMBOL}
                    {discount.toFixed(2)}
                  </span>
                </div>
              ) : null}
              <div className="mt-3 flex justify-between border-t border-[#E5E7EB] pt-3 text-base font-bold">
                <span>Total</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-[#6B7280]">
            By placing your order you agree to our{" "}
            <Link href="/terms" className="font-medium text-[#0F172A] underline-offset-2 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-[#0F172A] underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <button
            type="button"
            disabled={placing || placedRef.current}
            onClick={() => void openPaystack()}
            className="flex h-14 w-full flex-col items-center justify-center gap-1 rounded-full bg-[#15803d] text-base font-bold text-white transition hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {placing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing…</span>
              </>
            ) : (
              <>
                <span>
                  Place order — {CURRENCY_SYMBOL}
                  {total.toFixed(2)}
                </span>
                <span className="text-xs font-normal opacity-90">Card · Mobile Money · Bank · USSD</span>
              </>
            )}
          </button>

          <p className="text-center text-xs font-medium text-[#9CA3AF]">Powered by Paystack</p>
        </div>
      ) : null}
    </>
  );
}
