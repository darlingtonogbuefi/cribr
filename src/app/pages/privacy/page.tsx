"use client";

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p>
        At Cribr, we respect your privacy and are committed to protecting your personal information.
        This policy explains what data we collect, how we use it, and your rights.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Data Collection</h2>
        <p>
          We collect only the information necessary to provide our transcription services, including your email (for authentication) and transcript data you upload or generate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Use of Data</h2>
        <p>
          Your data is used solely to provide and improve the Cribr service. We do not sell your information to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Security</h2>
        <p>
          We employ industry-standard security practices to safeguard your data, including encrypted connections and secure database storage.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your data at any time by contacting <a href="mailto:privacy@cribr.co.uk" className="text-blue-600 hover:underline">privacy@cribr.co.uk</a>.
        </p>
      </section>
    </main>
  );
}
