// src/app/page.tsx

import Hero from "@/components/hero";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import {
  NotebookPen,
  Brain,
  Lightbulb,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero userId={user?.id ?? null} />

      {/* Features Section with scroll offset */}
      <section id="features" className="pt-20 -mt-20 py-24 bg-white">
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
            {/* Learning Support */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-purple-600">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
                <NotebookPen className="text-red-600" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
                Learning Support
              </p>
              <h3 className="text-xl font-bold mb-4">
                Your Ultimate AI Study Companion on YouTube
              </h3>
              <p className="mb-6 text-gray-700">
                Master any subject faster with instant access to text transcripts from
                thousands of hours of educational videos on youtube.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  🧠 <strong>Accelerate knowledge:</strong> Turn entire
                  educational channels into your personal AI tutor for faster
                  comprehension.
                </li>
                <li>
                  📚 <strong>Interactive studying:</strong> Transform
                  semester-long lectures into engaging Q&A sessions tailored to
                  your needs.
                </li>
                <li>
                  🎯 <strong>Precise references:</strong> Get exact video
                  timestamps and sources for answers—no more endless scrubbing.
                </li>
              </ul>
            </div>

            {/* Content Creation */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-purple-600">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
                <Lightbulb className="text-red-600" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
                Content Creation
              </p>
              <h3 className="text-xl font-bold mb-4">
                Your AI-Powered YouTube Growth Assistant
              </h3>
              <p className="mb-6 text-gray-700">
                Collaborate with insights from top creators in your niche.
                Generate fresh ideas and discover what drives viral success.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  🔥 <strong>Unlock virality:</strong> Analyze viral titles and
                  formats from leading channels.
                </li>
                <li>
                  💡 <strong>Idea generator:</strong> Produce endless video
                  concepts based on proven trends.
                </li>
                <li>
                  ✍️ <strong>Script insights:</strong> Study the writing and
                  scripting styles of your favorite creators.
                </li>
                <li>
                  🔍 <strong>Find content gaps:</strong> Uncover untapped topics
                  your competitors haven’t covered.
                </li>
              </ul>
            </div>

            {/* Research */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-purple-600">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
                <Brain className="text-red-600" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
                Research
              </p>
              <h3 className="text-xl font-bold mb-4">
                Build Smarter AI with YouTube Knowledge
              </h3>
              <p className="mb-6 text-gray-700">
                Extract bulk YouTube transcripts effortlessly for AI and LLM
                training with a single click.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>
                  ⚡ <strong>Fast processing:</strong> Handle thousands of video
                  transcripts in minutes.
                </li>
                <li>
                  📊 <strong>Flexible exports:</strong> Download data in
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
      <section className="py-3 bg-red-600 text-white">
        <div className="container mx-auto px-3">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2000+</div>
              <div className="text-red-100">Videos Transcribed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-red-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-red-100">Export Formats</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with scroll offset */}
      <section id="pricing" className="pt-20 -mt-20">
        <PricingSection />
      </section>

      {/* FAQ Section with scroll offset */}
      <section id="faq" className="pt-20 -mt-20">
        <FAQSection />
      </section>
    </div>
  );
}
