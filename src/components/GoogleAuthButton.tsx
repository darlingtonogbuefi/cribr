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

  useEffect(() => {
    if (!scriptLoaded || !googleDivRef.current || lastMode.current === mode) return;

    if (window.google) {
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
      style={{
        marginTop: 24,
        display: "flex",
        justifyContent: "center", // center horizontally
      }}
    >
      <div
        ref={googleDivRef}
        style={{
          visibility: scriptLoaded ? "visible" : "hidden",
          display: "inline-block", // allow the button to size itself
          transform: "translateZ(0)",
          willChange: "transform",
          minWidth: 240, // minimum width for the pill shape
          minHeight: 40,  // minimum height for the pill shape
        }}
      />
    </div>
  );
}
