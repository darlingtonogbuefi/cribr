//  src\app\auth\callback\route.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const redirectTo = url.searchParams.get("redirect_to") || "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/sign-in", url.origin));
  }

  const nextCookies = cookies();

  // Create the redirect response early
  const res = NextResponse.redirect(new URL(redirectTo, url.origin));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read cookies from request
        getAll: () =>
          nextCookies.getAll().map((c) => ({
            name: c.name,
            value: c.value,
          })),
        // Set cookies on the response
        setAll: (cookies) => {
          cookies.forEach((cookie) => {
            res.cookies.set(cookie.name, cookie.value, cookie);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth exchange error:", error.message);
    return NextResponse.redirect(new URL("/sign-in?error=OAuthFailed", url.origin));
  }

  // Return the response with session cookies attached
  return res;
}
