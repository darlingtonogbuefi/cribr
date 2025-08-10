"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleAuthButtonProps {
  mode: "signin" | "signup";
  callback: (response: any) => void;
}

export default function GoogleAuthButton({ mode, callback }: GoogleAuthButtonProps) {
  const googleDivRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const lastMode = useRef<string | null>(null);

  // Load Google script once
  useEffect(() => {
    const scriptId = "google-identity-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Initialize or re-render button only when mode changes and script is loaded
  useEffect(() => {
    if (!scriptLoaded || !googleDivRef.current || lastMode.current === mode) return;

    if (window.google) {
      // Clear previous button if any
      googleDivRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback,
        context: mode,
      });

      window.google.accounts.id.renderButton(googleDivRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: mode === "signin" ? "signin_with" : "signup_with",
        logo_alignment: "left",
      });

      lastMode.current = mode;
    }
  }, [mode, callback, scriptLoaded]);

  return (
    <div
      ref={googleDivRef}
      style={{
        marginTop: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 240,
        minHeight: 40,
        visibility: scriptLoaded ? "visible" : "hidden",
      }}
    ></div>
  );
}
