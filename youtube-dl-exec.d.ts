// youtube-dl-exec.d.ts
declare module 'youtube-dl-exec' {
  import { ExecOptions } from 'child_process';

  type YoutubeDlExec = (
    url: string,
    options?: Record<string, any>,
    execOptions?: ExecOptions
  ) => Promise<string>;

  const youtubedl: YoutubeDlExec;

  export default youtubedl;
}
