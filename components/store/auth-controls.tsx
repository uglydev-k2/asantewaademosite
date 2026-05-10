"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SignOutButton } from "@/components/store/signout-button";
import { useSessionProfile } from "@/hooks/use-session-profile";

export function AuthControls() {
  const { user, isAdmin, ready } = useSessionProfile();

  const email = useMemo(() => user?.email ?? null, [user]);

  if (!ready) {
    return <div className="h-8 w-[200px]" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/auth/login" className="text-sm font-medium">
          Log in
        </Link>
        <span className="text-slate-300">|</span>
        <Link href="/auth/register" className="text-sm font-medium">
          Create Account
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAdmin ? (
        <Link href="/admin" className="text-sm font-semibold text-emerald-700">
          Admin Dashboard
        </Link>
      ) : null}
      <span className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700">Logged in</span>
      {email ? <span className="max-w-[220px] truncate text-xs text-slate-600">{email}</span> : null}
      <SignOutButton />
    </div>
  );
}
