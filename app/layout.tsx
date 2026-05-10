import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";

const headingFont = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Asantewaa Imports | Premium Quality Products For Less.",
  description: "Quality products, direct from the source. Shop mannequins, electronics, kitchen essentials, fashion and more.",
  openGraph: {
    title: "Asantewaa Imports",
    description: "Premium quality products for less.",
    images: ["/og-image.jpg"]
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let session = null;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    });
    const {
      data: { session: serverSession }
    } = await supabase.auth.getSession();
    session = serverSession;
  }

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans`}>
        <AuthSessionProvider initialSession={session}>{children}</AuthSessionProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
