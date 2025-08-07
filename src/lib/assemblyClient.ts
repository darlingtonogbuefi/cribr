// lib/assemblyClient.ts
import { AssemblyAI } from 'assemblyai';

export const assembly = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});
