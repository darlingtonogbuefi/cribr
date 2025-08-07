//

import fs from 'fs-extra';
import { assembly } from './assemblyClient';

async function waitForCompletion(id: string) {
  while (true) {
    const transcript = await assembly.transcripts.get(id);
    if (transcript.status === 'completed') return transcript;
    if (transcript.status === 'error') throw new Error(`Transcription error: ${transcript.error}`);
    await new Promise((r) => setTimeout(r, 3000));
  }
}

export async function transcribeAudio(localPath: string): Promise<string> {
  console.log(`[assembly] Uploading audio from: ${localPath}`);
  const buffer = await fs.readFile(localPath);
  const uploadUrl = await assembly.files.upload(buffer);

  const job = await assembly.transcripts.transcribe({
    audio: uploadUrl,
    speech_model: 'universal',
    speaker_labels: true,
  });

  console.log(`[assembly] Waiting for transcript (id: ${job.id})`);
  const result = await waitForCompletion(job.id);

  console.log(`[assembly] Transcription done.`);
  
  if (!result.text) {
    throw new Error('No transcription text found.');
  }

  return result.text;
}
