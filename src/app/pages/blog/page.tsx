"use client";

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cribr Blog</h1>

      <article>
        <h2 className="text-2xl font-semibold mb-2">How AI is Changing Video Transcription</h2>
        <p className="mb-4">
          Video transcription has come a long way, especially with the rise of AI-powered tools. At Cribr, we harness advanced APIs to extract and process YouTube video content faster and more accurately than traditional methods.
          This makes video content searchable, accessible, and easier to analyze.
        </p>
        <p>
          In this blog, we'll explore the latest trends in AI transcription, challenges with video metadata extraction, and how Cribr’s lightweight approach benefits content creators and researchers alike.
        </p>
      </article>

      <article>
        <h2 className="text-2xl font-semibold mb-2">Using Transcripts to Boost Your Content Strategy</h2>
        <p className="mb-4">
          Transcripts aren’t just for accessibility—they can supercharge your SEO and content repurposing. By converting your videos into text, you can create blogs, summaries, and social media posts effortlessly.
          Cribr makes it simple by automating the transcript generation process directly from YouTube videos.
        </p>
      </article>

      <article>
        <h2 className="text-2xl font-semibold mb-2">Behind the Scenes: Building Cribr</h2>
        <p>
          Discover the tech stack and design choices behind Cribr. From ditching traditional Python backends to leveraging online AI services, our approach prioritizes speed, scalability, and maintainability.
          We’ll also share lessons learned and future plans to keep improving transcription accuracy and usability.
        </p>
      </article>
    </main>
  );
}
