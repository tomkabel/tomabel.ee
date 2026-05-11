import Lenis from 'lenis';

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!mq.matches) {
  instance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    instance!.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
