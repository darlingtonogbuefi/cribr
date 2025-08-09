"use client";

export default function DocumentationPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cribr Documentation</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
        <p>
          Cribr allows you to transcribe YouTube videos quickly using AI-powered services. Simply paste a YouTube URL, and our app extracts the transcript for you.
          You can sign in with Google to save transcripts and manage your content in your dashboard.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Automatic YouTube video transcript extraction</li>
          <li>Integration with YouTube Transcript and Dumpling AI APIs</li>
          <li>User authentication via Supabase with Google OAuth</li>
          <li>Transcript storage and search using Postgres database</li>
          <li>Fast, serverless deployment via Vercel</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">API Usage</h2>
        <p>
          Currently, Cribr’s API endpoints are private but future versions will offer public access for developers wanting to integrate transcription services into their own apps.
          Stay tuned!
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">FAQ</h2>
        <p><strong>Q: How accurate are the transcripts?</strong><br />
          A: Transcript accuracy depends on the source video's audio clarity and the AI services used (YouTube Transcript API and Dumpling AI). We are continuously working to improve this.
        </p>
        <p><strong>Q: Can I transcribe videos from platforms other than YouTube?</strong><br />
          A: Currently, Cribr supports YouTube only, but future updates may include other platforms.
        </p>
      </section>
    </main>
  );
}
