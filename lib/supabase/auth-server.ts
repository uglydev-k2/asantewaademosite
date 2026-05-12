import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

/**
 * Supabase user for Server Components / Route Handlers (anon key + user cookies).
 * Uses getUser() so the JWT is validated and refreshed per Supabase SSR guidance.
 */
export async function getServerAuthUser(): Promise<User | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        try {
          cookieStore.set(name, value, options as never);
        } catch {
          /* Server Components can be read-only; middleware refreshes session. */
        }
      },
      remove(name: string, options: Record<string, unknown>) {
        try {
          cookieStore.set(name, "", { ...options, maxAge: 0 } as never);
        } catch {
          /* ignore */
        }
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user ?? null;
}
