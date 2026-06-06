type ScrollCallback = () => void;

let ticking = false;
const listeners = new Set<ScrollCallback>();

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      listeners.forEach((fn) => fn());
      ticking = false;
    });
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

export function onScrollFrame(fn: ScrollCallback): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
