// src/app/api/transcripts/download/route.ts


import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const format = searchParams.get("format") || "txt";

  const allowedFormats = ["txt", "json", "srt", "vtt", "md", "csv"];
  if (!allowedFormats.includes(format)) {
    return NextResponse.json(
      {
        error: `Invalid format '${format}'. Allowed formats: ${allowedFormats.join(", ")}`,
      },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "Missing required parameter: id" },
      { status: 400 }
    );
  }

  // Fetch transcript owned by the authenticated user
  const { data, error } = await supabase
    .from("transcripts")
    .select("transcript_text, video_title")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Transcript not found" }, { status: 404 });
  }

  const { transcript_text, video_title } = data;
  const baseFilename = (video_title || "transcript").replace(/[^\w\d]/g, "_");

  let content = transcript_text;
  let mime = "text/plain";

  switch (format) {
    case "json":
      content = JSON.stringify({ transcript: transcript_text }, null, 2);
      mime = "application/json";
      break;
    case "srt":
      content = textToSRT(transcript_text);
      mime = "application/x-subrip";
      break;
    case "vtt":
      content = textToVTT(transcript_text);
      mime = "text/vtt";
      break;
    case "md":
      content = `## Transcript\n\n${transcript_text}`;
      mime = "text/markdown";
      break;
    case "csv":
      content = `line\n"${transcript_text.replace(/\n/g, '"\n"')}"`;
      mime = "text/csv";
      break;
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename="${baseFilename}.${format}"`,
    },
  });
}

function textToSRT(text: string): string {
  const lines = text.split("\n").filter(Boolean);
  return lines
    .map((line, i) => {
      const start = formatTime(i * 3);
      const end = formatTime(i * 3 + 2);
      return `${i + 1}\n${start} --> ${end}\n${line}\n`;
    })
    .join("\n");
}

function textToVTT(text: string): string {
  return "WEBVTT\n\n" + textToSRT(text);
}

function formatTime(seconds: number): string {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  const millis = "000";
  return `${hrs}:${mins}:${secs},${millis}`;
}
