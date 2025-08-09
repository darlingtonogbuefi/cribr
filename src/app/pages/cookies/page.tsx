"use client";

export default function CookiesPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cookies Policy</h1>

      <p>
        Cribr does not use cookies and similar tracking technologies to enhance your experience, analyze usage, and provide personalized content.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">What Cookies We Use</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Essential Cookies:</strong> Required for core functions such as authentication and session management.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how you use Cribr so we can improve it (e.g., Google Analytics).</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
        <p>
          You can control or disable cookies via your browser settings. Note that disabling essential cookies may affect your ability to use some features.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">More Information</h2>
        <p>
          For questions about our cookies policy, contact <a href="mailto:privacy@cribr.co.uk" className="text-blue-600 hover:underline">privacy@cribr.co.uk</a>.
        </p>
      </section>
    </main>
  );
}
