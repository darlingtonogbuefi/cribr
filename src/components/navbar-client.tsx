// src/components/navbar-client.tsx
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import type { User } from "@supabase/supabase-js";

export default function NavbarClient({ user }: { user: User | null }) {
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
      <div className="w-full px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-3xl font-bold text-gray-800 hover:text-gray-900"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          xcribr
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>Dashboard</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-800 hover:text-gray-900"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
