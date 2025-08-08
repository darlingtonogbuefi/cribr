"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "../../../lib/supabaseClient"

const supabase = createClient()

export default function SignInPage() {
  const router = useRouter()
  const googleDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.handleSignInWithGoogle = async (response: any) => {
      const token = response.credential

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token,
      })

      if (error) {
        console.error("Supabase sign-in error:", error)
        alert("Failed to sign in with Google.")
        return
      }

      router.push("/dashboard")
    }

    const scriptId = "google-identity-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.id = scriptId
      script.onload = () => renderGoogleButton()
      document.body.appendChild(script)
    } else {
      renderGoogleButton()
    }

    function renderGoogleButton() {
      if (window.google && googleDivRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: window.handleSignInWithGoogle!,
          context: "signin",
        })

        window.google.accounts.id.renderButton(googleDivRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "signin_with",
          logo_alignment: "left",
        })
      }
    }
  }, [router])

  return (
    <main style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link href="/sign-up" style={styles.link}>
            Sign up
          </Link>
        </p>

        <div ref={googleDivRef} style={{ marginTop: 24 }}></div>

        <p style={styles.note}>
          We only use Google for authentication. Your Google data is safe and secure.
        </p>
      </div>
    </main>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  box: {
    border: "2px solid #c8b6ff", // light purple
    borderRadius: 12,
    padding: 32,
    maxWidth: 400,
    width: "100%",
    textAlign: "center" as const,
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "bold" as const,
  },
  linkText: {
    marginBottom: 24,
    fontSize: 14,
  },
  link: {
    color: "#7c3aed",
    textDecoration: "underline",
    cursor: "pointer",
  },
  note: {
    marginTop: 24,
    fontSize: 13,
    color: "#6b7280",
  },
}
