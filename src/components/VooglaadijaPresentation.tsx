import { useState, useCallback, memo } from 'react';
import VooglaadijaVideoPlayer from './VooglaadijaVideoPlayer';

const BackLinkArrow = () => (
  <svg
    className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

interface BlobProps {
  position: string;
  color: 'indigo' | 'purple' | 'indigo-dark';
}

const Blob = memo(function Blob({ position, color }: BlobProps) {
  const colorClasses = {
    indigo: 'bg-indigo-500/10',
    purple: 'bg-purple-500/10',
    'indigo-dark': 'bg-indigo-600/5',
  };

  return (
    <div
      className={`absolute ${position} w-96 h-96 ${colorClasses[color]} rounded-full blur-3xl`}
      style={
        position.includes('top-1/4')
          ? { transform: 'translate(-50%, -50%)' }
          : position.includes('bottom-1/4')
          ? { transform: 'translate(50%, 50%)' }
          : { transform: 'translate(-50%, -50%)' }
      }
    />
  );
});

const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <Blob position="top-1/4 left-1/4" color="indigo" />
      <Blob position="bottom-1/4 right-1/4" color="purple" />
      <Blob position="top-1/2 left-1/2" color="indigo-dark" />
    </div>
  );
});

interface BadgeProps {
  children: React.ReactNode;
}

function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-block px-5 py-2.5 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium tracking-wide">
      {children}
    </span>
  );
}

interface VideoContainerProps {
  children: React.ReactNode;
}

function VideoContainer({ children }: VideoContainerProps) {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
      {children}
    </div>
  );
}

function CompletionCard() {
  return (
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
  );
}

export default function VooglaadijaPresentation() {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnded = useCallback(() => {
    setVideoEnded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden animated-bg">
      <AnimatedBackground />

      <main
        role="main"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16"
      >
        <div className="w-full max-w-7xl mx-auto glass-container">
          <div className="mb-6 md:mb-8 text-center">
            <Badge>VOOGLAADIJA</Badge>
          </div>

          <header className="text-center mb-8">
            <h1 className="font-['Staatliches'] text-4xl md:text-5xl lg:text-6xl text-white tracking-wider">
              Video Esitlus
            </h1>
            <p className="text-slate-300 mt-3 font-medium">
              Vooglaadija 2026
            </p>
          </header>

          <section aria-label="Video player">
            <VideoContainer>
              <VooglaadijaVideoPlayer
                src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                onEnded={handleVideoEnded}
              />
            </VideoContainer>
          </section>

          {videoEnded ? (
            <CompletionCard />
          ) : null}
        </div>

        <footer className="mt-12 pb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded-md px-2 py-1"
            aria-label="Tagasi pealehele"
          >
            <BackLinkArrow />
            Tagasi pealehele
          </a>
        </footer>
      </main>
    </div>
  );
}
