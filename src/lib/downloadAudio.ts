import path from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';
import { ffmpegPath } from './ffmpegPath';
import { runYtDlp } from './ytDlpClient'; // spawn-based runner

export async function downloadYouTubeAudio(url: string): Promise<string> {
  const filename = `${randomUUID()}.mp3`;
  const filepath = path.join(tmpdir(), filename);

  console.log(`[yt-dlp] URL: ${url}`);
  console.log(`[yt-dlp] Temp path: ${filepath}`);
  console.log(`[yt-dlp] ffmpeg: ${ffmpegPath}`);

  try {
    await runYtDlp([
      url,
      '--extract-audio',
      '--audio-format', 'mp3',
      '--output', filepath,
      '--ffmpeg-location', ffmpegPath,
      '--quiet',
      '--no-warnings',
    ]);

    console.log(`[yt-dlp] Saved to: ${filepath}`);
    return filepath;
  } catch (err) {
    console.error(`[yt-dlp] Failed:`, err);
    throw err;
  }
}

export async function getYouTubeMetadata(url: string): Promise<any> {
  try {
    const output = await runYtDlp([
      url,
      '--dump-single-json',
      '--skip-download',
      '--quiet',
    ]);

    return JSON.parse(output);
  } catch (err) {
    console.error(`[yt-dlp] Metadata fetch failed:`, err);
    throw err;
  }
}
