"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { signInWithGoogleIdToken } from "@/app/actions"

export default function SignInPage() {
  const googleDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Called by Google Identity Services after sign-in
    window.handleSignInWithGoogle = async (response: any) => {
      const token = response.credential
      try {
        await signInWithGoogleIdToken(token) // server action (no CORS)
      } catch (err) {
        console.error(err)
        alert("Failed to sign in with Google.")
      }
    }

    // Load Google Identity script if not already loaded
    const scriptId = "google-identity-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.id = scriptId
      script.onload = renderGoogleButton
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
  }, [])

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
    border: "2px solid #c8b6ff",
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
