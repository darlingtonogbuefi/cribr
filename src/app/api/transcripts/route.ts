//  src\app\api\transcripts\route.ts


// src/app/api/transcripts/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '../../../../supabase/server';
import { extractVideoId } from '@/lib/transcript/extractVideoId';
import { getYouTubeMetadata } from '@/lib/fetchYouTubeMetadata';
import { getTranscriptFromProviders } from '@/lib/transcript/getTranscriptFromProviders';
import { saveTranscriptToSupabase } from '@/lib/transcript/saveTranscriptToSupabase';
import type { Database } from '@/types/supabase';

type Transcript = Database['public']['Tables']['transcripts']['Row'];

export async function POST(request: Request) {
  try {
    const { url, guestId } = await request.json();

    if (
      !url ||
      typeof url !== 'string' ||
      (!url.includes('youtube.com') && !url.includes('youtu.be'))
    ) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const videoId = extractVideoId(url);

    // Check if transcript already exists
    let existingArray;
    if (user?.id) {
      const { data } = await supabase
        .from('transcripts')
        .select('*')
        .eq('user_id', user.id)
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });
      existingArray = data;
    } else if (guestId) {
      const { data } = await supabase
        .from('transcripts')
        .select('*')
        .eq('guest_id', guestId)
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });
      existingArray = data;
    } else {
      existingArray = [];
    }

    const existing = existingArray?.[0];

    if (existing) {
      return NextResponse.json({
        transcript: existing.transcript_text,
        metadata: {
          title: existing.video_title,
          channel: existing.video_channel,
          thumbnail: existing.video_thumbnail,
          views: existing.video_views,
          date: existing.video_date,
        },
        source: existing.transcript_source,
        message: 'Transcript already exists.',
      });
    }

    // No existing transcript found — generate new one
    const metadata = await getYouTubeMetadata(url);
    const { text: transcript, source } = await getTranscriptFromProviders(videoId, url);

    if (!transcript) {
      return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 });
    }

    // Save transcript via utility function
    await saveTranscriptToSupabase({
      userId: user?.id || null,
      guestId: guestId || null,
      videoId,
      url,
      metadata,
      transcript,
      source,
    });

    return NextResponse.json({ transcript, metadata, source });
  } catch (error: any) {
    console.error('Transcription failed:', error.message);

    const message = error?.message || '';

    if (message.includes('violates row-level security policy')) {
      return NextResponse.json(
        {
          error: 'Guest transcript limit reached. To continue transcribing, please create an account or Sign in.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
