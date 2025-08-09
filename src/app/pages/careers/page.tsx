"use client";

export default function CareersPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Careers at Cribr</h1>

      <p className="mb-4">
        At Cribr, we’re passionate about making video content more accessible and searchable through innovative transcription technology. We’re a small, agile team focused on AI, machine learning, and user-centric design.
      </p>

      <p className="mb-4">
        If you’re excited about building scalable AI-powered applications, love working with modern web technologies, and want to make a real impact on content accessibility, we want to hear from you!
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Open Positions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Frontend Engineer</strong> — Build user-friendly interfaces and improve the transcription workflow.
          </li>
          <li>
            <strong>Machine Learning Engineer</strong> — Optimize models and integrate new AI transcription APIs.
          </li>
          <li>
            <strong>Product Manager</strong> — Guide feature development and gather user feedback.
          </li>
        </ul>
      </section>

      <p className="mt-6">
        Interested? Send your CV and portfolio to <a href="mailto:careers@cribr.co.uk" className="text-blue-600 hover:underline">careers@cribr.co.uk</a>.
      </p>
    </main>
  );
}
