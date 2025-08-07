//   src\components\SearchBar.tsx
//  used to tweak search display UI and handle search submissions
//  also used to reset search state when user clears input

"use client";

import { useState } from "react";

interface SearchBarProps {
  onSubmit: (url: string) => void;
  onClear: () => void; // required to avoid runtime error
}

export default function SearchBar({ onSubmit, onClear }: SearchBarProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  const handleClear = () => {
    setUrl(""); // clear input field
    onClear();  // notify parent to reset cache & states
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex gap-2">
      <input
        type="text"
        placeholder="Enter YouTube video, playlist, or channel URL"
        className="flex-grow rounded border border-gray-300 px-4 py-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-6 rounded hover:bg-red-700 transition"
      >
        Get Transcript
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="bg-gray-400 text-white px-4 rounded hover:bg-gray-500 transition"
      >
        Reset
      </button>
    </form>
  );
}
