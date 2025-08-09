"use client";

export default function PressPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Press & Media</h1>

      <p className="mb-4">
        Cribr is an innovative web app transforming how video content from YouTube is transcribed and made accessible. Since launching, Cribr has gained attention for its AI-driven transcription pipeline, ease of use, and cost-effective domain setup.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Press Kit</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a href="/press/cribr-logo.png" target="_blank" className="text-blue-600 hover:underline">Cribr Logo</a>
          </li>
          <li>
            <a href="/press/cribr-screenshots.zip" target="_blank" className="text-blue-600 hover:underline">App Screenshots</a>
          </li>
          <li>
            <a href="/press/cribr-fact-sheet.pdf" target="_blank" className="text-blue-600 hover:underline">Fact Sheet</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact</h2>
        <p>
          For media inquiries, interviews, or partnerships, please reach out to <a href="mailto:press@cribr.co.uk" className="text-blue-600 hover:underline">press@cribr.co.uk</a>.
        </p>
      </section>
    </main>
  );
}
