//  src\components\TranscriptSearch.tsx

// src/components/TranscriptSearch.tsx

"use client";

import { useEffect, useState } from "react";
import { getOrCreateGuestId } from "@/utils/guestId";
import SearchBar from "./SearchBar";

type CachedTranscript = {
  transcript: string;
  metadata: any;
  source: string;
};

type TranscriptSearchProps = {
  userId?: string | null;
};

export default function TranscriptSearch({ userId = null }: TranscriptSearchProps) {
  const [guestId, setGuestId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState<string | null>(null);

  // Ensure guestId is generated only on the client
  useEffect(() => {
    if (!userId) {
      const id = getOrCreateGuestId();
      setGuestId(id);
    }
  }, [userId]);

  function getCacheKey(url: string) {
    if (userId) return `user_transcript_cache_${userId}_${url}`;
    if (guestId) return `guest_transcript_cache_${guestId}_${url}`;
    return `transcript_cache_unknown_${url}`;
  }

  async function fetchTranscript(url: string) {
    if (!userId && !guestId) {
      // Still initializing guestId
      return;
    }

    setLoading(true);
    setError(null);
    setTranscript(null);
    setVideoTitle(null);
    setVideoUrl(url);

    const cacheKey = getCacheKey(url);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed: CachedTranscript = JSON.parse(cached);
        setTranscript(parsed.transcript);
        setVideoTitle(parsed.metadata?.title || null);
        setLoading(false);
        return;
      } catch {
        // ignore parse errors
      }
    }

    try {
      const response = await fetch("/api/transcripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, guestId, userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch transcript");
      }

      setTranscript(data.transcript);
      setVideoTitle(data.metadata?.title || null);

      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setTranscript(null);
    setError(null);
    setVideoTitle(null);
    setVideoUrl("");
  }

  function downloadLink(format: string) {
    return `/api/transcripts/download?url=${encodeURIComponent(
      videoUrl
    )}&format=${format}`;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SearchBar onSubmit={fetchTranscript} onClear={handleClear} />

        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        {loading && (
          <div className="text-center my-8">
            <svg
              className="animate-spin mx-auto h-10 w-10 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="mt-4 text-gray-600">
              Transcribing video, please wait...
            </p>
          </div>
        )}

        {transcript && (
          <section className="mt-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">
              Transcript{videoTitle ? `: ${videoTitle}` : ""}
            </h2>
            <pre className="whitespace-pre-wrap bg-white p-4 rounded border max-h-96 overflow-auto">
              {transcript}
            </pre>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {["txt", "json", "srt", "vtt", "md", "csv"].map((format) => (
                <a
                  key={format}
                  href={downloadLink(format)}
                  className="text-xs px-2 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 rounded text-center transition w-full"
                  download={`transcript.${format}`}
                >
                  {format.toUpperCase()}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
