// src/app/(auth)/forgot-password/page.tsx

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { forgotPasswordAction } from "@/app/actions";
import Navbar from "@/components/navbar";
import { UrlProvider } from "@/components/url-provider";

// This is correct — gets URL query string params as strings
export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  let message: Message | null = null;

  if (searchParams.success) {
    message = {
      type: "success",
      message: decodeURIComponent(searchParams.success),
    };
  } else if (searchParams.error) {
    message = {
      type: "error",
      message: decodeURIComponent(searchParams.error),
    };
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <UrlProvider>
            <form className="flex flex-col space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                  Reset Password
                </h1>
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    className="text-primary font-medium hover:underline transition-all"
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <SubmitButton
                formAction={forgotPasswordAction}
                pendingText="Sending reset link..."
                className="w-full"
              >
                Reset Password
              </SubmitButton>

              {message && <FormMessage message={message} />}
            </form>
          </UrlProvider>
        </div>
        <SmtpMessage />
      </div>
    </>
  );
}
