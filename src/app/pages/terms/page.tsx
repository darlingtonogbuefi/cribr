"use client";

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
        <p>
          By using Cribr, you agree to these Terms of Service and our Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Use of Service</h2>
        <p>
          Cribr is provided for lawful use only. You agree not to use the service to transcribe content you do not have rights to.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">User Responsibilities</h2>
        <p>
          You are responsible for the content you upload and ensure it complies with copyright and applicable laws.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
        <p>
          Cribr is provided “as is” without warranties. We are not liable for any damages arising from the use of the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Modifications</h2>
        <p>
          We may update these terms at any time. Continued use constitutes acceptance of changes.
        </p>
      </section>
    </main>
  );
}
