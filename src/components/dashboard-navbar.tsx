"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardNavbar() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      alert("Error signing out: " + error.message);
      return;
    }

    router.push("/sign-in");
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="w-full px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-800"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          cribr
        </Link>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={loading}>
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                {loading ? "Signing out..." : "Sign out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
