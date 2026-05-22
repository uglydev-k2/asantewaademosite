import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthProtectedPath(pathname: string): boolean {
  if (pathname.startsWith("/admin") || pathname.startsWith("/account") || pathname.startsWith("/wishlist")) {
    return true;
  }
  if (pathname.startsWith("/checkout")) {
    return !pathname.startsWith("/checkout/success") && !pathname.startsWith("/checkout/verify");
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!isAuthProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request: { headers: request.headers } });

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: Record<string, unknown>) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: "", ...options });
        }
      }
    });

    // getSession reads the JWT from cookies (no Supabase HTTP round-trip).
    // getUser() on every request was causing MIDDLEWARE_INVOCATION_TIMEOUT on Edge.
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  } catch {
    return NextResponse.next();
  }

  return response;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/wishlist/:path*",
    "/checkout",
    "/checkout/:path*",
    "/admin/:path*"
  ]
};
