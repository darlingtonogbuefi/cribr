import path from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

// Stub: downloadYouTubeAudio without yt-dlp
export async function downloadYouTubeAudio(url: string): Promise<string> {
  console.warn('[yt-dlp removed] Skipping audio download for:', url);

  // Generate a fake audio path (not used, but returned for compatibility)
  const fakePath = path.join(tmpdir(), `${randomUUID()}.mp3`);
  return fakePath;
}

// Stub: getYouTubeMetadata without yt-dlp
export async function getYouTubeMetadata(url: string): Promise<any> {
  console.warn('[yt-dlp removed] Skipping metadata fetch for:', url);

  // Return fallback metadata
  return {
    title: 'Unknown Title',
    channel: 'Unknown Channel',
    thumbnail: null,
    views: 0,
    date: null,
  };
}
