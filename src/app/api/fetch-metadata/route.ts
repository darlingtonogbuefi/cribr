import { NextResponse } from 'next/server';
import youtubedl from 'youtube-dl-exec';

type VideoInfo = {
  title: string;
  channel?: string;
  thumbnail?: string;
  view_count: number;
  like_count?: number;
  upload_date?: string;
};

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      skipDownload: true,
      executablePath: 'C:/tools/yt-dlp/yt-dlp.exe',
    }) as unknown as VideoInfo;

    const result = {
      title: info.title,
      channel: info.channel ?? '',
      thumbnail: info.thumbnail ?? '',
      views: info.view_count.toLocaleString(),
      likes: info.like_count?.toLocaleString() || '0',
      date: info.upload_date
        ? `${info.upload_date.slice(0, 4)}-${info.upload_date.slice(4, 6)}-${info.upload_date.slice(6)}`
        : '',
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video info' }, { status: 500 });
  }
}
