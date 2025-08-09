"use client";

export default function HelpCenterPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Common Issues</h2>
        <p><strong>Unable to transcribe video:</strong> Check if the video is publicly accessible and that the URL is correct. Private or restricted videos cannot be transcribed.</p>
        <p><strong>Transcript is inaccurate:</strong> Poor audio quality or multiple speakers may reduce accuracy. Try different videos or wait for future improvements.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Account & Authentication</h2>
        <p>If you have trouble logging in or accessing your dashboard, try clearing your browser cache or re-authenticating with Google. For further assistance, contact <a href="mailto:support@cribr.co.uk" className="text-blue-600 hover:underline">support@cribr.co.uk</a>.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact Support</h2>
        <p>Need more help? Reach out to our support team via email at <a href="mailto:support@cribr.co.uk" className="text-blue-600 hover:underline">support@cribr.co.uk</a>.</p>
      </section>
    </main>
  );
}
