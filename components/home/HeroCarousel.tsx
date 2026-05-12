"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useInitialSession } from "@/components/providers/auth-session-provider";
import { Button } from "@/components/ui/button";

const slides = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600",
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600"
];

export function HeroCarousel() {
  const session = useInitialSession();
  const signedIn = Boolean(session?.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl">
      <Image src={currentSlide} alt="Asantewaa Imports hero" width={1600} height={800} className="h-[430px] w-full object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/20" />
      <div className="absolute inset-0 flex items-center p-8 md:p-14">
        <div className="max-w-2xl text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Asantewaa Imports · Premium Quality</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            Mannequins, Kitchen Essentials, Electronics & Dresses — All In One Store
          </h1>
          <p className="mt-3 text-sm text-slate-200 md:text-base">
            Verified quality China-sourced products at unbeatable prices. Perfect for homes, businesses, and resellers.
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/shop">
              <Button className="bg-emerald-700 hover:bg-emerald-800">Shop Now</Button>
            </Link>
            {signedIn ? (
              <Link href="/account">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  My account
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  Create account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <button onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800" aria-label="Previous slide">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800" aria-label="Next slide">
        <ChevronRight className="h-4 w-4" />
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setActiveIndex(index)} aria-label={`Go to slide ${index + 1}`} className={`h-2.5 w-2.5 rounded-full ${activeIndex === index ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
