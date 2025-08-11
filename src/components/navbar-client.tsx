// src/components/navbar-client.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import type { User } from "@supabase/supabase-js";

export default function NavbarClient({ user }: { user: User | null }) {
  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white py-4 z-50">
      <div className="w-full px-0 flex justify-between items-center">
        {/* Logo and nav links grouped on the left */}
        <div className="flex items-center gap-12 ml-6">
          <Link href="/" prefetch className="inline-flex items-center">
            <Image
              src="/cribr-logo.jpg"
              alt="Cribr Logo"
              width={60}
              height={14}
              priority
            />
          </Link>

          {/* Navigation links with About after Pricing */}
          <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium text-sm">
            <Link href="/#features" className="hover:text-gray-900">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/pages/about" className="hover:text-gray-900">
              About
            </Link>
            <Link href="/#faq" className="hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/pages/contact" className="hover:text-gray-900">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="flex gap-4 items-center mr-6">
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
