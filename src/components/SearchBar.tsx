//   src\components\SearchBar.tsx
//  used to tweak search display UI and handle search submissions
//  also used to reset search state when user clears input

"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSubmit: (url: string) => void;
  onClear: () => void;
}

export default function SearchBar({ onSubmit, onClear }: SearchBarProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  const handleClear = () => {
    setUrl("");
    onClear();
  };

  const handleBulkTranscribe = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "#pricing";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex flex-col gap-3 items-center"
    >
      <div className="relative w-[800px] max-w-full">
        <input
          type="text"
          placeholder="Enter YouTube video, playlist, or channel URL"
          className="
            pr-10
            border
            border-gray-300
            py-2
            px-4
            w-full
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            transition
            rounded-md
          "
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
        >
          <Search size={18} />
        </button>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          className="w-32 bg-red-600 text-white rounded-md px-3 py-1 hover:bg-red-700 transition text-sm"
        >
          Transcribe
        </button>

        <button
          type="button"
          onClick={handleBulkTranscribe}
          className="w-36 bg-red-600 text-white rounded-md px-3 py-1 hover:bg-red-700 transition text-sm"
        >
          Bulk Transcribe
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-32 bg-gray-200 text-gray-800 rounded-md px-3 py-1 hover:bg-gray-300 transition text-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
