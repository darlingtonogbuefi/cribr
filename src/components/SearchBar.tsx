//   src\components\SearchBar.tsx
//  used to tweak search display UI and handle search submissions
//  also used to reset search state when user clears input

"use client";

import { useState } from "react";

interface SearchBarProps {
  onSubmit: (url: string) => void;
  onClear: () => void;
}

export default function SearchBar({ onSubmit, onClear }: SearchBarProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  const handleClear = () => {
    setUrl("");
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Enter YouTube video, playlist, or channel URL"
        className="rounded border border-gray-300 px-4 py-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          className="w-40 bg-red-600 text-white rounded-full px-4 py-1 hover:bg-red-700 transition"
        >
          Get Transcript
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-40 bg-gray-200 text-gray-700 rounded-full px-4 py-1 hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
