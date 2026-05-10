import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";

async function getAccountRole() {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set() {},
          remove() {}
        }
      }
    );
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return null;
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    return data?.role ?? "customer";
  } catch {
    return null;
  }
}

export default async function AccountPage() {
  const role = await getAccountRole();
  const isAdmin = role === "admin";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">My Account</h1>
        {role ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isAdmin ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"
            }`}
          >
            {isAdmin ? "Admin" : "Customer"}
          </span>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/account" className="rounded-xl border p-4">Profile</Link>
        <Link href="/account/orders" className="rounded-xl border p-4">Orders</Link>
        <Link href="/wishlist" className="rounded-xl border p-4">Wishlist</Link>
        <Link href="/account/devices" className="rounded-xl border p-4">Addresses</Link>
      </div>
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="mt-1 text-sm text-slate-500">Update your account details.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input placeholder="Full name" />
          <input placeholder="Email address" />
          <input placeholder="Phone number" />
          <input placeholder="Password" type="password" />
        </div>
      </section>
      {isAdmin ? (
        <Link href="/admin" className="inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Open Admin Dashboard
        </Link>
      ) : null}
    </div>
  );
}
