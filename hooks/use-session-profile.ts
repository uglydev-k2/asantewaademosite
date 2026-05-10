"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { Session, User } from "@supabase/supabase-js";

function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createBrowserClient(url, anonKey);
}

export interface UseSessionProfileResult {
  /** Full session when available — useful if you need access token expiry, etc. */
  session: Session | null;
  user: User | null;
  role: string | null;
  isAdmin: boolean;
  ready: boolean;
}

/**
 * Tracks Supabase auth + profiles.role in browser, and triggers router.refresh() on changes
 * so server components pick up refreshed cookies issued by middleware.
 */
export function useSessionProfile(): UseSessionProfileResult {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setReady(true);
      return undefined;
    }

    const syncRole = async (user: User | null) => {
      if (!user) {
        setRole(null);
        return;
      }
      const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      if (error) setRole(null);
      else setRole(data?.role ?? null);
    };

    let cancelled = false;

    const hydrate = async (nextSession: Session | null) => {
      if (cancelled) return;
      setSession(nextSession);
      await syncRole(nextSession?.user ?? null);
      if (!cancelled) setReady(true);
    };

    void supabase.auth.getSession().then(({ data }) => hydrate(data.session ?? null));

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void hydrate(nextSession);
      router.refresh();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  const user = session?.user ?? null;

  return {
    session,
    user,
    role,
    isAdmin: role === "admin",
    ready
  };
}
