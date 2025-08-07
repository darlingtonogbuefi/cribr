//  src\app\protected\reset-password\page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { resetPasswordAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import type { Message } from "@/types/message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import Navbar from "@/components/navbar-client";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (error) {
      setMessage({ type: "error", message: decodeURIComponent(error) });
      setLoading(false);
      return;
    }

    if (success) {
      setMessage({ type: "success", message: decodeURIComponent(success) });
      setLoading(false);
      return;
    }

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            setMessage({ type: "error", message: error.message });
          } else {
            const url = new URL(window.location.href);
            url.searchParams.delete("access_token");
            url.searchParams.delete("refresh_token");
            window.history.replaceState({}, "", url.toString());
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await resetPasswordAction(formData);
    setMessage(result);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar user={null} />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">Reset Password</h1>
              <p className="text-sm text-muted-foreground">Enter and confirm your new password</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
            </div>

            <SubmitButton className="w-full" pendingText="Resetting...">
              Reset Password
            </SubmitButton>

            {message && <FormMessage message={message} />}
          </form>
        </div>
      </div>
    </>
  );
}
