export function extractVideoId(url: string): string {
  const cleanUrl = url.split("?")[0];
  const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = cleanUrl.match(regex);
  if (!match || !match[1]) throw new Error("Invalid YouTube URL");
  return match[1];
}
