import { TranscriptProvider } from "./TranscriptProvider";
import { downloadYouTubeAudio } from "@/lib/downloadAudio";
import { transcribeAudio } from "@/lib/transcribeAudio";
import fs from "fs-extra";

export class AssemblyAIProvider implements TranscriptProvider {
  async getTranscript(_: string, url: string): Promise<{ text: string | null; source: string }> {
    try {
      const localPath = await downloadYouTubeAudio(url);
      try {
        const text = await transcribeAudio(localPath);
        return { text, source: "ai" };
      } finally {
        await fs.remove(localPath);
      }
    } catch (e) {
      console.error("AssemblyAI error:", e);
      return { text: null, source: "ai" };
    }
  }
}
