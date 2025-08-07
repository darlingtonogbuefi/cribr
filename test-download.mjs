// test-download.mjs
import youtubedl from 'youtube-dl-exec';

// Use the custom yt-dlp binary path
const customYtDlp = youtubedl.create('C:/tools/yt-dlp/yt-dlp.exe');

customYtDlp('https://youtu.be/duPZb6ZSAW8', {
  extractAudio: true,
  audioFormat: 'mp3',
  output: 'test.mp3',
  ffmpegLocation: 'C:/ffmpeg/bin/ffmpeg.exe',
}).then(output => {
  console.log('Download successful:', output);
}).catch(error => {
  console.error('Error running yt-dlp:', error);
});
