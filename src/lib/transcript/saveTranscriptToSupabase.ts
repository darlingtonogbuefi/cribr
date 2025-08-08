// src/lib/transcript/saveTranscriptToSupabase.ts

import { createServerSupabaseClient } from '@/lib/supabaseServer'

type Metadata = {
  title: string
  channel: string
  thumbnail: string
  views: number
  date: string
}

type SaveTranscriptParams = {
  userId: string | null
  guestId?: string | null
  videoId: string
  url: string
  metadata: Metadata
  transcript: string
  source: string
}

export async function saveTranscriptToSupabase({
  userId,
  guestId,
  videoId,
  url,
  metadata,
  transcript,
  source,
}: SaveTranscriptParams) {
  const supabase = createServerSupabaseClient()

  if (userId) {
    const { error } = await supabase.from('transcripts').insert({
      user_id: userId,
      video_id: videoId,
      video_url: url,
      video_title: metadata.title,
      video_channel: metadata.channel,
      video_thumbnail: metadata.thumbnail,
      video_views: metadata.views,
      video_date: metadata.date,
      transcript_text: transcript,
      transcript_source: source,
    })

    if (error) {
      throw new Error('Failed to save transcript: ' + error.message)
    }
  } else {
    if (!guestId) {
      throw new Error('guestId is required when userId is null')
    }

    const { error } = await supabase.from('transcripts').insert({
      guest_id: guestId,
      video_id: videoId,
      video_url: url,
      video_title: metadata.title,
      video_channel: metadata.channel,
      video_thumbnail: metadata.thumbnail,
      video_views: metadata.views,
      video_date: metadata.date,
      transcript_text: transcript,
      transcript_source: source,
    })

    if (error) {
      throw new Error('Failed to save transcript: ' + error.message)
    }
  }
}
