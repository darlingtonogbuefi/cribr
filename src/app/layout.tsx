// src\app\layout.tsx

import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { updateSession } from "../../supabase/middleware"
import { ThemeProvider } from "@/components/theme-provider"
import { TempoInit } from "@/components/tempo-init"
import ClientWrapper from "../components/ClientWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cribr",
  description: "A modern full-stack starter template powered by Next.js",
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
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const request = {
    cookies: cookies(),
    headers: headers(),
    nextUrl: new URL("http://localhost"),
  } as any

  await updateSession(request)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  )
}
