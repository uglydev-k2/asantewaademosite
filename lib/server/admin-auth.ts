import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function createAuthServerClient() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() {},
      remove() {}
    }
  });
}

export async function requireAdminPageAccess() {
  const supabase = createAuthServerClient();
  if (!supabase) redirect("/auth/login?next=/admin");

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/admin");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }
}

export async function requireAdminApiAccess() {
  const supabase = createAuthServerClient();
  if (!supabase) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
    };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    };
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();

  if (!profile || profile.role !== "admin") {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 })
    };
  }

  return { ok: true as const, userId: user.id };
}
