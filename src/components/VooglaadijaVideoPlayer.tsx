import { useEffect, useRef, useState } from 'react';

interface VooglaadijaVideoPlayerProps {
  src: string;
  onEnded?: () => void;
}

export default function VooglaadijaVideoPlayer({ src, onEnded }: VooglaadijaVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onEndedRef = useRef(onEnded);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  onEndedRef.current = onEnded;

  useEffect(() => {
    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string): string | null => {
      const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
        /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    const videoId = getYouTubeVideoId(src);

    if (!videoId) {
      setError('Invalid YouTube URL provided. Expected format: https://www.youtube.com/watch?v=VIDEO_ID');
      return;
    }

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer(videoId);
      };
    } else {
      createPlayer(videoId);
    }

    function createPlayer(videoId: string) {
      if (!containerRef.current) return;

      // Clear any existing content
      containerRef.current.innerHTML = '';

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            controls: 1,
            playsinline: 1,
            fs: 1,
          },
          events: {
            onReady: () => {
              setIsReady(true);
            },
            onError: (event: { data: number }) => {
              let errorMessage = 'YouTube player error';
              switch (event.data) {
                case 2:
                  errorMessage = 'Invalid video ID or URL';
                  break;
                case 5:
                  errorMessage = 'HTML5 player error';
                  break;
                case 100:
                  errorMessage = 'Video not found or private';
                  break;
                case 101:
                case 150:
                  errorMessage = 'Video embedding not allowed';
                  break;
                default:
                  errorMessage = `YouTube player error: ${event.data}`;
              }
              setError(errorMessage);
            },
            onStateChange: (event: { data: number }) => {
              if (event.data === window.YT.PlayerState.ENDED && onEndedRef.current) {
                onEndedRef.current();
              }
            },
          },
        });
    } catch {
      setError('Failed to initialize YouTube player');
    }
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [src]);

  if (error) {
    return (
      <div
        className="relative w-full max-w-[1400px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-8 text-center"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-red-400 mb-4 text-lg font-medium">Video laadimine ebaõnnestus</div>
          <div className="text-slate-400 text-sm mb-4 max-w-md">{error}</div>
          <div className="text-slate-500 text-xs">
            Veenduge, et YouTube URL on õige ja video on avalikult kättesaadav
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1400px] mx-auto" style={{ aspectRatio: '16/9' }}>
      <div
        ref={containerRef}
        className="video-container relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#0f0f0f' }}
      />
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-300 font-medium">Laen YouTube videot...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Add YouTube API types
declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement | string,
        options: Record<string, unknown>
      ) => Record<string, unknown>;
      PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}
