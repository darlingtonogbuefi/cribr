// lib/ytDlpClient.ts
import youtubedl from 'youtube-dl-exec';

// Create a configured yt-dlp instance
export const ytDlpClient = youtubedl.create('C:/tools/yt-dlp/yt-dlp.exe');
