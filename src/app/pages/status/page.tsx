"use client";

export default function StatusPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">System Status</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Current Status</h2>
        <p>All systems are operational. Cribr’s AI transcription services, authentication, and database are running smoothly.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Recent Incidents</h2>
        <p>No incidents reported in the last 30 days.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Scheduled Maintenance</h2>
        <p>No maintenance scheduled at this time. We will notify users via email and Twitter if any downtime is expected.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact</h2>
        <p>For status updates or inquiries, contact <a href="mailto:status@cribr.co.uk" className="text-blue-600 hover:underline">status@cribr.co.uk</a>.</p>
      </section>
    </main>
  );
}
