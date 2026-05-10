"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionProfile } from "@/hooks/use-session-profile";
import { SignOutButton } from "@/components/store/signout-button";

const iconBtn =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50";

const textLink = "hidden text-sm font-semibold text-emerald-700 hover:underline sm:inline-flex";

export function StoreHeaderAuth() {
  const { user, isAdmin, ready } = useSessionProfile();

  if (!ready) {
    return <div className="h-10 w-10 shrink-0" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/register" className={textLink}>
          Create account
        </Link>
        <Link href="/auth/login" className={cn(iconBtn)} aria-label="Log in">
          <LogIn className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAdmin ? (
        <Link href="/admin" className={cn(iconBtn)} aria-label="Admin Dashboard">
          <LayoutDashboard className="h-4 w-4 text-emerald-700" />
        </Link>
      ) : null}
      <Link href="/account" className={cn(iconBtn)} aria-label="Your account">
        <User className="h-4 w-4 text-emerald-700" />
      </Link>
      <SignOutButton variant="outline" size="sm" className="hidden sm:inline-flex" />
    </div>
  );
}
