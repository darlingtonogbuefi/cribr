// src\app\layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { updateSession } from "../../supabase/middleware";
import { ThemeProvider } from "@/components/theme-provider";
import { TempoInit } from "@/components/tempo-init";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tempo - Modern SaaS Starter",
  description: "A modern full-stack starter template powered by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const request = {
    cookies: cookies(),
    headers: headers(),
    nextUrl: new URL("http://localhost"), // or your deployed base URL
  } as any;

  await updateSession(request); // ✅ ensure session is refreshed

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
