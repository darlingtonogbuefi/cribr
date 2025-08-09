// src/app/page.tsx

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import PricingSection from "@/components/PricingSection";
import {
  ArrowUpRight,
  NotebookPen,
  Brain,
  Lightbulb,
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
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Harness the power of AI to transcribe YouTube videos quickly and
              accurately, helping you learn faster, create smarter, and build
              better AI models.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students & Learners */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-purple-600">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
                <NotebookPen className="text-red-600" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
                Students & Learners
              </p>
              <h3 className="text-xl font-bold mb-4">
                Your AI Study Partner on YouTube
              </h3>
              <p className="mb-6 text-gray-700">
                Master any subject <strong>faster</strong>. Get instant answers
                from <strong>thousands of hours</strong> of YouTube content.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  🧠 <strong>Build knowledge faster:</strong> Transform entire
                  educational channels into your personal AI tutor.
                </li>
                <li>
                  📚 <strong>Study smarter:</strong> Turn semester-long lectures
                  into interactive Q&A sessions.
                </li>
                <li>
                  🎯 <strong>Straight to the source:</strong> Get answers with
                  exact video references and timestamps. No more scrubbing
                  through videos to find the answer.
                </li>
              </ul>
            </div>

            {/* YouTubers & Content Creators */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-purple-600">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
                <Lightbulb className="text-red-600" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
                YouTubers & Content Creators
              </p>
              <h3 className="text-xl font-bold mb-4">
                Your AI-Powered YouTube Growth Assistant
              </h3>
              <p className="mb-6 text-gray-700">
                Chat with <strong>successful channels</strong> in your niche.
                Generate <strong>endless content ideas</strong> and learn what
                makes videos <strong>go viral</strong>.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  🔥 <strong>Decode virality:</strong> Study viral title
                  patterns and formats from any channel in your niche.
                </li>
                <li>
                  💡 <strong>Content idea machine:</strong> Generate video ideas
                  based on what already works.
                </li>
                <li>
                  ✍️ <strong>Script analysis:</strong> Analyze scripts and
                  writing styles of your favourite creators.
                </li>
                <li>
                  🔍 <strong>Find content gaps:</strong> Discover untapped
                  topics your competitors haven't covered yet.
                </li>
              </ul>
            </div>

            {/* Researchers & Developers */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-purple-600">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
                <Brain className="text-red-600" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
                Researchers & Developers
              </p>
              <h3 className="text-xl font-bold mb-4">
                Build Better AI with YouTube Knowledge
              </h3>
              <p className="mb-6 text-gray-700">
                <strong>Extract transcripts in bulk</strong> from YouTube for
                AI/LLM training, in one click.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  ⚡ <strong>Lightning fast:</strong> Process channels with
                  thousands of video transcripts in just minutes.
                </li>
                <li>
                  📊 <strong>Multi-format export:</strong> Export data in
                  Markdown, JSON, CSV, or custom formats for training.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get your YouTube transcripts in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste YouTube URL</h3>
              <p className="text-gray-600">
                Copy and paste any YouTube video URL into our input field
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Transcription</h3>
              <p className="text-gray-600">
                Our AI processes the video and generates accurate transcripts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download & Use</h3>
              <p className="text-gray-600">
                Choose your format and download the transcript instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-red-100">Videos Transcribed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-red-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-red-100">Export Formats</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      <Footer />
    </div>
  );
}
