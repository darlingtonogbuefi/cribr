// src\app\layout.tsx

// src/app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { updateSession } from "../../supabase/middleware" // Your custom session update logic
import { ThemeProvider } from "@/components/theme-provider"
import { TempoInit } from "@/components/tempo-init"
import ClientWrapper from "../components/ClientWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tempo - Modern SaaS Starter",
  description: "A modern full-stack starter template powered by Next.js",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const request = {
    cookies: cookies(),
    headers: headers(),
    nextUrl: new URL("http://localhost"), // Replace with your deployed URL
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
