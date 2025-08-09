//    src\components\ClientWrapper.tsx


"use client"

import { useState, useEffect } from "react"
import { createClient } from "../lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

const supabase = createClient()

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // No Navbar here anymore!
  return <>{children}</>
}
