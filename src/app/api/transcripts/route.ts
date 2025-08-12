//  src\app\api\transcripts\route.ts


import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServer";  // fixed import
import { extractVideoId } from "@/lib/transcript/extractVideoId";
import { getYouTubeMetadata } from "@/lib/fetchYouTubeMetadata";
import { getTranscriptFromProviders } from "@/lib/transcript/getTranscriptFromProviders";
import { saveTranscriptToSupabase } from "@/lib/transcript/saveTranscriptToSupabase";
import type { Database } from "@/types/supabase";
import sanitizeHtml from "sanitize-html";

type Transcript = Database["public"]["Tables"]["transcripts"]["Row"];

export async function POST(request: Request) {
  try {
    const { url, guestId } = await request.json();

    if (
      !url ||
      typeof url !== "string" ||
      (!url.includes("youtube.com") && !url.includes("youtu.be"))
    ) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient(); // use server client here

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const videoId = extractVideoId(url);

    // Check if transcript already exists
    let existingArray;
    if (user?.id) {
      const { data } = await supabase
        .from("transcripts")
        .select("*")
        .eq("user_id", user.id)
        .eq("video_id", videoId)
        .order("created_at", { ascending: false });
      existingArray = data;
    } else if (guestId) {
      const { data } = await supabase
        .from("transcripts")
        .select("*")
        .eq("guest_id", guestId)
        .eq("video_id", videoId)
        .order("created_at", { ascending: false });
      existingArray = data;
    } else {
      existingArray = [];
    }

    const existing = existingArray?.[0];

    if (existing) {
      // Sanitize existing transcript and metadata before returning
      const safeTranscript = sanitizeHtml(existing.transcript_text, {
        allowedTags: [],
        allowedAttributes: {},
      });
      const safeMetadata = {
        title: sanitizeHtml(existing.video_title || ""),
        channel: sanitizeHtml(existing.video_channel || ""),
        thumbnail: existing.video_thumbnail, // URL assumed safe, optionally sanitize
        views: existing.video_views,
        likes: existing.video_likes,
        date: sanitizeHtml(existing.video_date || ""),
      };

      return NextResponse.json({
        transcript: safeTranscript,
        metadata: safeMetadata,
        source: existing.transcript_source,
        message: "Transcript already exists.",
      });
    }

    // No existing transcript found — generate new one
    const metadata = await getYouTubeMetadata(url);
    const { text: transcript, source } = await getTranscriptFromProviders(videoId, url);

    if (!transcript) {
      return NextResponse.json({ error: "Failed to fetch transcript" }, { status: 500 });
    }

    // Sanitize metadata fields
    const safeMetadata = {
      title: sanitizeHtml(metadata.title || ""),
      channel: sanitizeHtml(metadata.channel || ""),
      thumbnail: metadata.thumbnail,
      views: metadata.views,
      date: sanitizeHtml(metadata.date || ""),
    };

    // Sanitize transcript text to strip any HTML tags
    const safeTranscript = sanitizeHtml(transcript, {
      allowedTags: [],
      allowedAttributes: {},
    });

    // Save transcript via utility function with sanitized data
    await saveTranscriptToSupabase({
      userId: user?.id || null,
      guestId: guestId || null,
      videoId,
      url,
      metadata: safeMetadata,
      transcript: safeTranscript,
      source,
    });

    // Return sanitized transcript and metadata
    return NextResponse.json({ transcript: safeTranscript, metadata: safeMetadata, source });
  } catch (error: any) {
    console.error("Transcription failed:", error.message);

    const message = error?.message || "";

    if (message.includes("violates row-level security policy")) {
      return NextResponse.json(
        {
          error:
            "Guest transcript limit reached. To continue transcribing, please create an account or Sign in.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
