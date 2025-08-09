//  src\components\TranscriptSearch.tsx

"use client";

import { useEffect, useState } from "react";
import { getOrCreateGuestId } from "@/utils/guestId";
import SearchBar from "./SearchBar";
import YouTubePreviewCard from "./YouTubePreviewCard";

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
  const [metadata, setMetadata] = useState<any | null>(null);

  // Progress state for the progress bar (0 to 1)
  const [progress, setProgress] = useState(0);

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
      return;
    }

    setLoading(true);
    setError(null);
    setTranscript(null);
    setVideoTitle(null);
    setMetadata(null);
    setVideoUrl(url);
    setProgress(0);

    const cacheKey = getCacheKey(url);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed: CachedTranscript = JSON.parse(cached);
        setTranscript(parsed.transcript);
        setVideoTitle(parsed.metadata?.title || null);
        setMetadata(parsed.metadata || null);
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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch transcript");
      }

      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : null;

      if (!response.body || !total) {
        // fallback: no streaming or no content-length, read fully
        const data = await response.json();
        setTranscript(data.transcript);
        setVideoTitle(data.metadata?.title || null);
        setMetadata(data.metadata || null);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } else {
        // Stream and track progress
        const reader = response.body.getReader();
        let receivedLength = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedLength += value.byteLength; // use byteLength here

          setProgress(receivedLength / total);
          console.log(`Progress: ${(receivedLength / total * 100).toFixed(2)}%`);
        }

        const chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.byteLength;
        }

        const resultText = new TextDecoder("utf-8").decode(chunksAll);
        const data = JSON.parse(resultText);

        setTranscript(data.transcript);
        setVideoTitle(data.metadata?.title || null);
        setMetadata(data.metadata || null);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  function handleClear() {
    setTranscript(null);
    setError(null);
    setVideoTitle(null);
    setMetadata(null);
    setVideoUrl("");
    setProgress(0);
  }

  function downloadLink(format: string) {
    return `/api/transcripts/download?url=${encodeURIComponent(videoUrl)}&format=${format}`;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SearchBar onSubmit={fetchTranscript} onClear={handleClear} />

        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        {loading && (
          <div className="w-full max-w-md mx-auto my-8">
            <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className="absolute left-0 top-0 h-2 bg-red-600 transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="mt-4 text-center text-gray-600">
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

        {metadata && (
          <div className="mt-8 max-w-3xl mx-auto">
            <YouTubePreviewCard
              title={metadata.title}
              channel={metadata.channel}
              thumbnail={metadata.thumbnail}
              views={metadata.views}
              likes={metadata.likes}
              date={metadata.date}
            />
          </div>
        )}
      </div>
    </section>
  );
}
