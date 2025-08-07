import { ytDlpClient } from './ytDlpClient';
import { ffmpegPath } from './ffmpegPath';
import path from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

export async function downloadYouTubeAudio(url: string): Promise<string> {
  const filename = `${randomUUID()}.mp3`;
  const filepath = path.join(tmpdir(), filename);

  console.log(`[yt-dlp] URL: ${url}`);
  console.log(`[yt-dlp] Temp path: ${filepath}`);
  console.log(`[yt-dlp] ffmpeg: ${ffmpegPath}`);

  try {
    await ytDlpClient(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: filepath,
      ffmpegLocation: ffmpegPath,
      quiet: true,
      noWarnings: true,
    });

    console.log(`[yt-dlp] Saved to: ${filepath}`);
    return filepath;
  } catch (err) {
    console.error(`[yt-dlp] Failed:`, err);
    throw err;
  }
}

// --- Added this function to fix the missing import error ---
export async function getYouTubeMetadata(url: string): Promise<any> {
  try {
    const result = await ytDlpClient(url, {
      dumpSingleJson: true,
      skipDownload: true,
      quiet: true,
    });

    return result;
  } catch (err) {
    console.error(`[yt-dlp] Metadata fetch failed:`, err);
    throw err;
  }
}
