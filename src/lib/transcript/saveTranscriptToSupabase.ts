// src/lib/transcript/saveTranscriptToSupabase.ts

import { createServerSupabaseClient } from '@/lib/supabaseServer'
import sanitizeHtml from 'sanitize-html'

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

  // Sanitize metadata fields and transcript
  const safeMetadata = {
    title: sanitizeHtml(metadata.title || '', { allowedTags: [], allowedAttributes: {} }),
    channel: sanitizeHtml(metadata.channel || '', { allowedTags: [], allowedAttributes: {} }),
    thumbnail: metadata.thumbnail, // usually a URL, sanitize if needed
    views: metadata.views,
    date: sanitizeHtml(metadata.date || '', { allowedTags: [], allowedAttributes: {} }),
  }

  const safeTranscript = sanitizeHtml(transcript || '', { allowedTags: [], allowedAttributes: {} })

  if (userId) {
    const { error } = await supabase.from('transcripts').insert({
      user_id: userId,
      video_id: videoId,
      video_url: url,
      video_title: safeMetadata.title,
      video_channel: safeMetadata.channel,
      video_thumbnail: safeMetadata.thumbnail,
      video_views: safeMetadata.views,
      video_date: safeMetadata.date,
      transcript_text: safeTranscript,
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
      video_title: safeMetadata.title,
      video_channel: safeMetadata.channel,
      video_thumbnail: safeMetadata.thumbnail,
      video_views: safeMetadata.views,
      video_date: safeMetadata.date,
      transcript_text: safeTranscript,
      transcript_source: source,
    })

    if (error) {
      throw new Error('Failed to save transcript: ' + error.message)
    }
  }
}
