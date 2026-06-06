import { useEffect, useRef, type ReactNode } from 'react';
import { getThreeRenderer, getThreeCamera, getThreeScene, getComposer, onResize } from '../lib/three';

export default function ThreeProvider({ children }: { children?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = getThreeRenderer();
    const container = containerRef.current;
    if (!container) return;

    container.appendChild(renderer.domElement);

    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';

    // Init scene, camera & composer (bloom pass)
    getThreeScene();
    getThreeCamera();
    getComposer();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>{children}</div>;
}
