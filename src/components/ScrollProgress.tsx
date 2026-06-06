import { useEffect, useState } from 'react';
import { onScrollFrame } from '../lib/scroll';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    }
    update();
    return onScrollFrame(update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #00D4FF 0%, #F59E0B 100%)',
          opacity: pct > 1 ? 1 : 0,
        }}
      />
    </div>
  );
}
