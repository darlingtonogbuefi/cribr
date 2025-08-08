// src/app/page.tsx

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import PricingSection from "@/components/PricingSection";
import {
  ArrowUpRight,
  Clock,
  Download,
  Mic,
  Youtube,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar removed here */}

      <Hero userId={user?.id ?? null} />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        {/* ... features content unchanged ... */}
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        {/* ... how it works content unchanged ... */}
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-600 text-white">
        {/* ... stats content unchanged ... */}
      </section>

      {/* Pricing Section */}
      <PricingSection />

      <Footer />
    </div>
  );
}
