// src\lib\transcript\extractVideoId.ts

// src/lib/transcript/extractVideoId.ts
export function extractVideoId(inputUrl: string): string {
  try {
    const parsed = new URL(inputUrl.trim());
    let id = "";

    if (parsed.hostname.includes("youtu.be")) {
      // Short form
      id = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      // Standard, shorts, or embed
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v") || "";
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1];
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1];
      }
    }

    // Remove any query fragments from id
    id = id.split("?")[0].split("&")[0];

    if (!id || id.length !== 11) {
      throw new Error("Invalid YouTube URL");
    }

    return id;
  } catch {
    throw new Error("Invalid YouTube URL");
  }
}
