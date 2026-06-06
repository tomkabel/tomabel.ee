import { useEffect, useRef, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: ReactNode;
}

export default function RouteTransition({
  children,
}: RouteTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<'enter' | 'idle' | 'exit'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  const prevPath = useRef(location.pathname);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>();
  const enterTimer = useRef<ReturnType<typeof setTimeout>>();

  const mq = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  const reducedMotion = mq?.matches ?? false;

  useEffect(() => {
    mountedRef.current = true;

    if (reducedMotion) {
      setDisplayChildren(children);
      setPhase('idle');
      return;
    }

    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;

      clearTimeout(exitTimer.current);
      clearTimeout(enterTimer.current);

      // Lock scroll during route transition
      document.documentElement.classList.add('lenis-stopped');

      setPhase('exit');

      exitTimer.current = setTimeout(() => {
        if (!mountedRef.current) return;
        setDisplayChildren(children);
        setPhase('enter');

        enterTimer.current = setTimeout(() => {
          if (!mountedRef.current) return;
          setPhase('idle');
          document.documentElement.classList.remove('lenis-stopped');
        }, 300);
      }, 150);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [location.pathname, children, reducedMotion]);

  const exitDuration = 150;
  const enterDuration = 300;

  const style: React.CSSProperties = reducedMotion
    ? {}
    : {
        opacity: phase === 'exit' ? 0 : phase === 'enter' ? 0 : 1,
        transform:
          phase === 'exit'
            ? 'translateY(-8px)'
            : phase === 'enter'
              ? 'translateY(8px)'
              : 'translateY(0)',
        transition: `opacity ${phase === 'exit' ? exitDuration : phase === 'enter' ? enterDuration : 0}ms ease, transform ${phase === 'exit' ? exitDuration : phase === 'enter' ? enterDuration : 0}ms ease`,
      };

  return (
    <div ref={containerRef} style={style}>
      {displayChildren}
    </div>
  );
}
