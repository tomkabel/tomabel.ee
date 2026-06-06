import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { Vec2, Mesh, Program, Triangle, Texture, Flowmap } from 'ogl';
import { getOGLRenderer, getOGLContext } from '../lib/ogl';

const flowFrag = `
precision highp float;
uniform sampler2D uTexture;
uniform sampler2D uFlowmap;
uniform float uStrength;
uniform float uChromaticStrength;
uniform vec2 uMouseUv;
varying vec2 vUv;

void main() {
  vec2 flow = texture2D(uFlowmap, vUv).rg * 2.0 - 1.0;
  vec2 distortedUv = vUv + flow * uStrength;

  vec2 dir = normalize(vUv - uMouseUv);
  float shift = uChromaticStrength;

  vec4 texR = texture2D(uTexture, distortedUv + dir * shift);
  vec4 texG = texture2D(uTexture, distortedUv);
  vec4 texB = texture2D(uTexture, distortedUv - dir * shift);
  gl_FragColor = vec4(texR.r, texG.g, texB.b, 1.0);
}
`;

const flowVert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
  vUv = position * 0.5 + 0.5;
}
`;

interface FlowmapDistortionProps {
  children: ReactNode;
  strength?: number;
  chromaticShift?: number;
  enabled?: boolean;
  className?: string;
}

export default function FlowmapDistortion({
  children,
  strength = 0.05,
  chromaticShift = 0.02,
  enabled = true,
  className,
}: FlowmapDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active = enabled && !isTouch && !isReduced;

  // Low-end GPU detection: fall back to 128x128 flowmap resolution
  const isLowEnd = typeof window !== 'undefined' &&
    (devicePixelRatio < 2 || (navigator.hardwareConcurrency || 8) <= 4);

  useEffect(() => {
    if (!active || !containerRef.current || !overlayRef.current) return;

    const container = containerRef.current;
    const overlay = overlayRef.current;
    const gl = getOGLContext();
    const renderer = getOGLRenderer();
    const captureCanvas = document.createElement('canvas');
    const ctx = captureCanvas.getContext('2d')!;

    function updateCapture() {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;

      captureCanvas.width = w;
      captureCanvas.height = h;

      const child = container.firstElementChild;
      if (child) {
        const styles = getComputedStyle(child);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = styles.color || '#F1F5F9';
        ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(child.textContent || '', w / 2, h / 2);
      }
    }

    updateCapture();

    const texture = new Texture(gl, {
      image: captureCanvas,
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

    const flowmap = new Flowmap(gl, { size: isLowEnd ? 128 : 256 });

    const program = new Program(gl, {
      vertex: flowVert,
      fragment: flowFrag,
      uniforms: {
        uTexture: { value: texture },
        uFlowmap: { value: flowmap.uniform.value },
        uStrength: { value: strength },
        uChromaticStrength: { value: chromaticShift },
        uMouseUv: { value: new Vec2(0.5, 0.5) },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    overlay.width = overlay.clientWidth || 400;
    overlay.height = overlay.clientHeight || 100;
    const overlayCtx = overlay.getContext('2d')!;
    const oglCanvas = renderer.gl.canvas as HTMLCanvasElement;

    const cursorState = { x: 0.5, y: 0.5 };

    const quickToX = gsap.quickTo(cursorState, 'x', { duration: 0.4, ease: 'power2.out' });
    const quickToY = gsap.quickTo(cursorState, 'y', { duration: 0.4, ease: 'power2.out' });

    const handlePointer = (e: PointerEvent) => {
      const rect = overlay.getBoundingClientRect();
      quickToX((e.clientX - rect.left) / rect.width);
      quickToY(1.0 - (e.clientY - rect.top) / rect.height);
    };

    overlay.addEventListener('pointermove', handlePointer);

    let rafId = 0;

    function frame() {
      flowmap.mouse.x = cursorState.x * flowmap.aspect;
      flowmap.mouse.y = cursorState.y;
      flowmap.velocity.x = (cursorState.x - prev.x) * 5;
      flowmap.velocity.y = (cursorState.y - prev.y) * 5;

      flowmap.update();
      prev.x = cursorState.x;
      prev.y = cursorState.y;

      program.uniforms.uMouseUv.value.set(cursorState.x, cursorState.y);
      renderer.render({ scene: mesh, update: false, sort: false, frustumCull: false });

      // Composite OGL output onto the overlay canvas
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
      overlayCtx.drawImage(oglCanvas, 0, 0, overlay.width, overlay.height);

      rafId = requestAnimationFrame(frame);
    }

    const prev = new Vec2(0.5, 0.5);
    rafId = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      updateCapture();
      texture.image = captureCanvas;
      texture.update();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      overlay.removeEventListener('pointermove', handlePointer);
      ro.disconnect();
    };
  }, [active, strength, chromaticShift, isLowEnd]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      {children}
      {active && (
        <canvas
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
}
