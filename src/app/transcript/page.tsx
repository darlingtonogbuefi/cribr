// src/app/transcript/page.tsx


"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // import the instance, NOT a function
import GuestTranscriptPage from "./GuestTranscriptPage";
import AuthenticatedTranscriptPage from "./AuthenticatedTranscriptPage";
import type { User } from "@supabase/supabase-js";

export default function TranscriptPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user on mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return user ? (
    <AuthenticatedTranscriptPage user={user} />
  ) : (
    <GuestTranscriptPage />
  );
}
