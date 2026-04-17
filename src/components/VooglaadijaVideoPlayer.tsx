import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';

interface VooglaadijaVideoPlayerProps {
  src: string;
  onEnded?: () => void;
}

export default function VooglaadijaVideoPlayer({ src, onEnded }: VooglaadijaVideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = document.createElement('video');
    videoElement.className = 'video-js vjs-big-play-centered vjs-theme-custom';
    videoElement.innerHTML = `
      <source src="${src}" type="video/mp4" />
    `;
    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 1, 1.5, 2],
      poster: '/og-image.svg',
    });

    player.on('ready', () => {
      setIsReady(true);
    });

    player.on('ended', () => {
      if (onEnded) {
        onEnded();
      }
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, onEnded]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div
        ref={videoRef}
        className="video-container relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#0f0f0f' }}
      />
      {!isReady && (
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
