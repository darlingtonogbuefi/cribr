"use client";

export default function CommunityPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cribr Community</h1>

      <p>
        Join the Cribr community to share ideas, request features, and collaborate with fellow users passionate about video transcription and AI.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Where to Connect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><a href="https://github.com/darlingtonogbuefi/cribr/discussions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Discussions</a> — Talk about bugs, features, and development.</li>
          <li><a href="https://twitter.com/cribrapp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a> — Follow for updates and news.</li>
          <li><a href="https://discord.gg/cribr-community" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Discord Server</a> — Real-time chat and support.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contributing</h2>
        <p>
          Interested in contributing code or ideas? Check out the <a href="https://github.com/darlingtonogbuefi/cribr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub repo</a> and submit pull requests or issues.
        </p>
      </section>
    </main>
  );
}
