import { useState, useCallback } from 'react';
import VooglaadijaVideoPlayer from './VooglaadijaVideoPlayer';

export default function VooglaadijaPresentation() {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnded = useCallback(() => {
    setVideoEnded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden animated-bg flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-6">
          <span className="inline-block px-5 py-2.5 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium tracking-wide">
            VOOGLAADIJA
          </span>
        </div>

        <h1 className="font-['Staatliches'] text-4xl md:text-5xl text-white mb-4 tracking-wider text-center">
          Video Esitlus
        </h1>

        <p className="text-base md:text-lg text-slate-300 mb-8 font-medium">
          Vooglaadija 2026
        </p>

        <div className="w-full">
          <VooglaadijaVideoPlayer
            src="/vooglaadija-presentation-1.mp4"
            onEnded={handleVideoEnded}
          />
        </div>

        {videoEnded && (
          <div className="mt-10 text-center animate-fade-in">
            <div className="inline-block px-8 py-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-2xl">
              <p className="text-2xl md:text-3xl font-['Staatliches'] text-green-400 tracking-wider">
                ESITLUS LÄBI!
              </p>
              <p className="mt-2 text-slate-300">
                Aitäh, et vaatasid Vooglaadija esitlust.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-8 pb-6 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Tagasi pealehele
        </a>
      </footer>
    </div>
  );
}
