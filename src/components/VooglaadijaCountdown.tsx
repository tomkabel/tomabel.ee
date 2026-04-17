import { useState, useEffect, useCallback, useRef } from 'react';
import VooglaadijaPresentation from './VooglaadijaPresentation';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const TARGET_DATE = new Date('2026-04-17T18:00:00+03:00');

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = TARGET_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const displayValue = value.toString().padStart(2, '0');

  return (
    <div style={{ margin: '10px' }} className="flex flex-col items-center shrink-0">
      <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-sm -z-10" />
        <span className="relative z-10 font-['Staatliches'] text-4xl md:text-5xl text-white tracking-wider flex items-center justify-center w-full h-full">
          {displayValue}
        </span>
      </div>
      <span className="mt-3 text-sm md:text-base text-slate-400 uppercase tracking-widest font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

interface CountdownSeparatorProps {
  visible: boolean;
}

function CountdownSeparator({ visible }: CountdownSeparatorProps) {
  if (!visible) return null;

  return (
    <div className="flex flex-col items-center justify-center h-20 md:h-28 shrink-0 gap-2 px-1 md:px-2">
      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-indigo-500/60 animate-pulse" style={{ animationDelay: '200ms' }} />
      <div className="w-2 h-2 rounded-full bg-indigo-500/30 animate-pulse" style={{ animationDelay: '400ms' }} />
    </div>
  );
}

export default function VooglaadijaCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isVisible, setIsVisible] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const hasStartedRef = useRef(false);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  const isComplete = timeLeft.total <= 0;

  useEffect(() => {
    if (isComplete && !hasStartedRef.current && isVisible) {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        setShowPresentation(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isVisible]);

  if (showPresentation) {
    return <VooglaadijaPresentation />;
  }

  return (
    <div className={`relative min-h-screen w-full overflow-hidden animated-bg flex flex-col items-center justify-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <span className="inline-block px-5 py-2.5 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium tracking-wide">
              TULEMAS PEAGI
            </span>
          </div>

          <h1 className="font-['Staatliches'] text-6xl md:text-7xl lg:text-8xl text-white mb-4 tracking-wider">
            <span className="glitch" data-text="VOOGLAADIJA">VOOGLAADIJA</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 md:mb-12 font-medium">
            Video Esitlus
          </p>

          {isComplete ? (
            <div className="mt-12 animate-fade-in">
              <div className="inline-block px-8 py-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 rounded-2xl">
                <p className="text-2xl md:text-3xl font-['Staatliches'] text-white tracking-wider animate-pulse">
                  VIDEO ALGAB PEAGI!
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 md:mt-12">
              <p className="text-slate-400 text-sm md:text-base mb-8 md:mb-10">
                Avalikustamiseni on jäänud:
              </p>

              <div className="flex items-start justify-center gap-3 md:gap-5">
                <CountdownUnit value={timeLeft.days} label="Päeva" />
                <CountdownSeparator visible={timeLeft.days > 0} />
                <CountdownUnit value={timeLeft.hours} label="Tundi" />
                <CountdownSeparator visible />
                <CountdownUnit value={timeLeft.minutes} label="Minutit" />
                <CountdownSeparator visible />
                <CountdownUnit value={timeLeft.seconds} label="Sekundid" />
              </div>

              <div className="mt-10 md:mt-12 text-slate-500 text-sm">
                <p>
                  Sihtkuupäev: 17. aprill 2026, kell 18:00 (Eesti aeg)
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-auto pt-16 pb-8 text-center">
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
    </div>
  );
}
