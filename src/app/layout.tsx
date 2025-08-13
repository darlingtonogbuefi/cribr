// src\app\layout.tsx

// src/app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { updateSession } from "../../supabase/middleware";
import { ThemeProvider } from "@/components/theme-provider";
import ClientWrapper from "../components/ClientWrapper";

import NavbarClient from "@/components/navbar-client";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cribr",
  description: "Get precise transcriptions from YouTube videos",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const request = {
    cookies: cookies(),
    headers: headers(),
    nextUrl: new URL("https://www.cribr.co.uk/"),
  } as any;

  await updateSession(request);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientWrapper>
            {/* Navbar fixed at top */}
            <NavbarClient user={user} />

            {/* Add padding so content is not hidden under navbar */}
            <main className="flex-1 pt-20">{children}</main>

            <Footer />
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
