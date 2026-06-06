import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { RenderTarget, Triangle, Program, Mesh } from 'ogl';
import { getOGLRenderer, getOGLContext } from '../lib/ogl';

const CHARS = '@%#*+=-:. ';
const DEFAULT_DENSITY = 80;
const MOBILE_DENSITY = 40;

const noiseFrag = `
precision highp float;
uniform float uTime;
uniform float uSpeed;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise2(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x   + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float n = snoise2(uv * 4.0 + uTime * uSpeed);
  n = n * 0.5 + 0.7;
  n += snoise2(uv * 8.0 - uTime * uSpeed * 0.5) * 0.25;
  n += snoise2(uv * 16.0 + uTime * uSpeed * 0.3) * 0.125;
  gl_FragColor = vec4(vec3(n), 1.0);
}
`;

const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
  vUv = position * 0.5 + 0.5;
}
`;

export interface ASCIIArtHandle {
  pause: () => void;
  resume: () => void;
  setSpeed: (s: number) => void;
}

interface ASCIIArtProps {
  className?: string;
  density?: number;
  color?: string;
  bgColor?: string;
  speed?: number;
}

const ASCIIArt = forwardRef<ASCIIArtHandle, ASCIIArtProps>(
  ({ className, density = DEFAULT_DENSITY, color = '#00FF41', bgColor = '#000000', speed = 0.5 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef(0);
    const mountRef = useRef(true);
    const speedRef = useRef(speed);
    const pausedRef = useRef(false);
    const resourcesRef = useRef<{
      noiseRT: RenderTarget;
      noiseProg: Program;
      noiseMesh: Mesh;
      pixels: Uint8Array;
      gl: WebGLRenderingContext;
      rows: number;
      texWidth: number;
      texHeight: number;
    } | null>(null);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cols = isMobile ? MOBILE_DENSITY : density;

    useImperativeHandle(ref, () => ({
      pause: () => { pausedRef.current = true; cancelAnimationFrame(rafRef.current); },
      resume: () => { pausedRef.current = false; startFrame(); },
      setSpeed: (s: number) => { speedRef.current = s; },
    }));

    function initResources() {
      // Don't recreate if already initialized
      if (resourcesRef.current) return;

      const gl = getOGLContext();
      const rows = Math.floor(cols * (window.innerHeight / window.innerWidth));
      const texWidth = cols;
      const texHeight = rows;

      const noiseRT = new RenderTarget(gl, {
        width: texWidth,
        height: texHeight,
      });

      const noiseProg = new Program(gl, {
        vertex: vert,
        fragment: noiseFrag,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speedRef.current },
        },
      });

      const noiseMesh = new Mesh(gl, { geometry: new Triangle(gl), program: noiseProg });
      const pixels = new Uint8Array(texWidth * texHeight * 4);

      resourcesRef.current = {
        noiseRT, noiseProg, noiseMesh, pixels,
        gl, rows, texWidth, texHeight,
      };
    }

    function startFrame() {
      if (rafRef.current) return;
      const res = resourcesRef.current;
      if (!res) return;

      const { noiseProg, noiseMesh, noiseRT, gl, pixels, rows, texWidth, texHeight } = res;
      const renderer = getOGLRenderer();
      let time = 0;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ctx = canvasRef.current!.getContext('2d')!;
      const cvs = ctx.canvas;
      const charH = cvs.height / rows;
      const charW = cvs.width / cols;
      ctx.font = `${charH}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      function frame() {
        if (pausedRef.current || !mountRef.current) return;
        time += 0.016;

        noiseProg.uniforms.uTime.value = reducedMotion ? 0 : time;
        noiseProg.uniforms.uSpeed.value = speedRef.current;
        renderer.render({ scene: noiseMesh, target: noiseRT, update: true, sort: false, frustumCull: false });

        gl.readPixels(0, 0, texWidth, texHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = color;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const val = pixels[(y * texWidth + x) * 4] / 255;
            ctx.fillText(CHARS[Math.floor(val * (CHARS.length - 1))], x * charW + charW / 2, y * charH + charH / 2);
          }
        }

        rafRef.current = requestAnimationFrame(frame);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    useEffect(() => {
      mountRef.current = true;
      initResources();
      startFrame();

      const handleVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
          pausedRef.current = true;
        } else {
          pausedRef.current = false;
          startFrame();
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);

      return () => {
        mountRef.current = false;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    }, [cols]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <canvas
        ref={canvasRef}
        className={className}
        aria-hidden="true"
      />
    );
  }
);

ASCIIArt.displayName = 'ASCIIArt';
export default ASCIIArt;
