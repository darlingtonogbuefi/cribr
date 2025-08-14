
//   works with main homepage/landing page
// src/components/hero.tsx

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Check } from "lucide-react";

// Dynamically import the search bar (client component)
const TranscriptSearch = dynamic(() => import("./TranscriptSearch"), {
  ssr: false,
});

type HeroProps = {
  userId?: string | null;
};

export default function Hero({ userId = null }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-70" />
      <div className="relative pt-16 pb-32 sm:pt-24 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Transform{" "}
              <span className="inline-block bg-gray-200 rounded-full px-6 py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  YouTube Videos
                </span>
              </span>{" "}
              into Accurate Transcripts
            </h1>

            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Get precise transcriptions with speaker detection and timestamps.
            </p>

            <div className="mb-12">
              <TranscriptSearch userId={userId} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/#pricing"
                className="inline-flex min-w-[230px] justify-center items-center px-8 py-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
              >
                Bulk Transcribe
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex min-w-[230px] justify-center items-center px-8 py-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
              >
                Dearest Yetunde
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Speaker detection included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Multiple export formats</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Accurate timestamps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
