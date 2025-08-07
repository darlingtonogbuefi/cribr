//    src\app\(auth)\sign-up\page.tsx

import Link from "next/link";
import { FormMessage } from "@/components/form-message";
import type { Message } from "@/types/message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OAuthButtons } from "@/components/OAuthButtons";
import { signUpAction } from "@/app/actions";

interface SignUpProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SignUpPage({ searchParams }: SignUpProps) {
  const message: Message | null = searchParams.success
    ? { type: "success", message: searchParams.success as string }
    : searchParams.error
    ? { type: "error", message: searchParams.error as string }
    : null;

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <form className="flex flex-col space-y-6" action={signUpAction}>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full"
              pendingText="Creating account..."
              formAction={signUpAction}
            >
              Create Account
            </SubmitButton>

            {message && (
              <div aria-live="polite">
                <FormMessage message={message} />
              </div>
            )}
          </form>

          <div className="flex items-center gap-4 pt-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <OAuthButtons />
        </div>
      </div>
    </>
  );
}
