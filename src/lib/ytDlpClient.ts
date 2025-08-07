import { spawn } from 'child_process';

const ytDlpPath = 'C:/tools/yt-dlp/yt-dlp.exe';

export async function runYtDlp(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = spawn(ytDlpPath, args);

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`yt-dlp exited with code ${code}\n${stderr}`));
      }
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
}
