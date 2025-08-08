//   src\app\auth\callback\page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "success" | "error">("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setStatus("error");
        setErrorMessage("Authentication failed. Please try signing in again.");
        return;
      }

      setStatus("success");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    };

    checkSession();
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      {status === "checking" && <p>Checking session...</p>}
      {status === "success" && <p>Successfully signed in! Redirecting...</p>}
      {status === "error" && (
        <>
          <p className="text-red-600">{errorMessage}</p>
          <button className="mt-4 underline text-blue-600" onClick={() => router.push("/sign-in")}>
            Back to Sign In
          </button>
        </>
      )}
    </main>
  );
}
