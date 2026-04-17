import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type Player from 'video.js/dist/types/player';

interface VooglaadijaVideoPlayerProps {
  src: string;
  onEnded?: () => void;
}

export default function VooglaadijaVideoPlayer({ src, onEnded }: VooglaadijaVideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const onEndedRef = useRef(onEnded);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  onEndedRef.current = onEnded;

  useEffect(() => {
    if (!videoRef.current) return;

    let mounted = true;

    try {
      const videoElement = document.createElement('video');
      videoElement.className = 'video-js vjs-big-play-centered vjs-theme-custom';
      videoElement.innerHTML = `<source src="${src}" type="video/mp4" />`;
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, {
        controls: true,
        autoplay: true,
        preload: 'auto',
        playbackRates: [0.5, 1, 1.5, 2],
        poster: '/og-image.svg',
      });

      player.on('ready', () => {
        if (mounted) setIsReady(true);
      });

      player.on('error', () => {
        if (mounted) {
          const error = player.error();
          setError(error?.message || 'Video failed to load');
        }
      });

      player.on('ended', () => {
        if (onEndedRef.current) onEndedRef.current();
      });

      playerRef.current = player;
    } catch (err) {
      if (mounted) setError(err instanceof Error ? err.message : 'Failed to initialize video');
    }

    return () => {
      mounted = false;
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  if (error) {
    return (
      <div className="relative w-full max-w-[1400px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-8 text-center" style={{ aspectRatio: '16/9' }}>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-red-400 mb-2">Videot ei saa laadida</p>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1400px] mx-auto" style={{ aspectRatio: '16/9' }}>
      <style>{`
        .video-js {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .video-js .vjs-control-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .video-js .vjs-big-play-button {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
      <div
        ref={videoRef}
        className="video-container relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#0f0f0f' }}
      />
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-300 font-medium">Laen videoklippi...</p>
          </div>
        </div>
      )}
    </div>
  );
}
