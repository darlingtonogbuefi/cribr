"use client";

export default function SecurityPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Security</h1>

      <p>
        Cribr takes security seriously to protect your data and privacy.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Data Protection</h2>
        <p>
          We use encryption in transit (HTTPS) and at rest to secure your transcripts and personal data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Authentication</h2>
        <p>
          User authentication is managed via Google OAuth, ensuring that we dont require to your PII or credentials to provide you with a secure login and session management.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Incident Response</h2>
        <p>
          In case of a security incident, we have protocols to identify, contain, and notify affected users promptly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Reporting Vulnerabilities</h2>
        <p>
          If you discover any security issues, please report them to <a href="mailto:security@cribr.co.uk" className="text-blue-600 hover:underline">security@cribr.co.uk</a>.
        </p>
      </section>
    </main>
  );
}
