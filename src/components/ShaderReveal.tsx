import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  WebGLRenderer,
  OrthographicCamera,
  Scene,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  TextureLoader,
  Vector2,
} from 'three';

gsap.registerPlugin(ScrollTrigger);

const blockFrag = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uResolution;
uniform float uBlockSize;
uniform float uWarpStrength;
uniform float uChromaticShift;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  vec2 blockUv = floor(uv * uBlockSize) / uBlockSize;
  float noiseVal = hash(blockUv);
  float mask = step(noiseVal, uProgress);

  float warp = 1.0 - abs(uProgress - 0.5) * 2.0;
  vec2 warpedUv = uv + (noiseVal - 0.5) * warp * uWarpStrength;

  float shift = warp * uChromaticShift;
  float r = texture2D(uTexture, warpedUv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, warpedUv).g;
  float b = texture2D(uTexture, warpedUv - vec2(shift, 0.0)).b;
  vec3 color = vec3(r, g, b);

  float reveal = mask * smoothstep(0.0, 0.2, uProgress);
  gl_FragColor = vec4(color, reveal);
}
`;

const dissolveFrag = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uResolution;
uniform float uChromaticShift;
varying vec2 vUv;

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453);
  float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
  float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
  float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  float scale = max(uResolution.x, uResolution.y) / 400.0;
  float n = fbm(uv * scale + 5.0);

  float edgeWidth = 0.08;
  float mask = smoothstep(uProgress - edgeWidth, uProgress + edgeWidth, n);

  float warp = 1.0 - abs(uProgress - 0.5) * 2.0;
  float shift = warp * uChromaticShift;

  float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
  vec3 color = vec3(r, g, b);

  float edge = 1.0 - abs(n - uProgress) / edgeWidth;
  edge = clamp(edge, 0.0, 1.0);
  vec3 glowColor = vec3(0.0, 0.83, 1.0) * edge * 0.5 * warp;

  float reveal = mask * smoothstep(0.0, 0.1, uProgress);
  gl_FragColor = vec4(color + glowColor, reveal);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

type ShaderVariant = 'block' | 'dissolve';

interface ShaderRevealProps {
  src: string;
  width: number;
  height: number;
  variant?: ShaderVariant;
  className?: string;
}

export default function ShaderReveal({ src, width, height, variant = 'block', className }: ShaderRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fallback CSS reveal for mobile / reduced motion
  useEffect(() => {
    if (!(isMobile || isReduced)) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, isReduced]);

  // Full shader reveal (desktop, prefers-motion)
  useEffect(() => {
    const container = containerRef.current!;
    if (!container || isMobile || isReduced) return;

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const loader = new TextureLoader();
    const texture = loader.load(src);
    const fragShader = variant === 'dissolve' ? dissolveFrag : blockFrag;
    const mat = new ShaderMaterial({
      vertexShader: vert,
      fragmentShader: fragShader,
      uniforms: {
        uTexture: { value: texture },
        uProgress: { value: 0 },
        uResolution: { value: new Vector2(width, height) },
        uBlockSize: { value: 20 },
        uWarpStrength: { value: 0.05 },
        uChromaticShift: { value: 0.02 },
      },
      transparent: true,
    });

    // Pixel-space orthographic camera: synced to container dimensions each frame
    const rect = container.getBoundingClientRect();
    let camW = rect.width || width;
    let camH = rect.height || height;
    const camera = new OrthographicCamera(0, camW, camH, 0, 0.1, 100);
    camera.position.z = 1;

    let geo = new PlaneGeometry(camW, camH);
    const mesh = new Mesh(geo, mat);
    mesh.position.set(camW / 2, camH / 2, 0);
    scene.add(mesh);

    function syncCamera() {
      const r = container.getBoundingClientRect();
      const w = r.width || width;
      const h = r.height || height;
      if (w !== camW || h !== camH) {
        camW = w;
        camH = h;
        renderer.setSize(w, h);
        camera.left = 0;
        camera.right = w;
        camera.top = h;
        camera.bottom = 0;
        camera.updateProjectionMatrix();
        scene.remove(mesh);
        geo.dispose();
        geo = new PlaneGeometry(w, h);
        mesh.geometry = geo;
        mesh.position.set(w / 2, h / 2, 0);
        scene.add(mesh);
      }
    }

    let animFrame = 0;
    function animate() {
      animFrame = requestAnimationFrame(animate);
      syncCamera();
      renderer.render(scene, camera);
    }
    animate();

    // GSAP ScrollTrigger: drive uProgress from 0→1 as element scrolls
    // Range: top of element reaches 85% viewport → top of element reaches 30% viewport
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      end: 'top 30%',
      onUpdate: (self) => {
        const eased = 1 - Math.pow(1 - self.progress, 3);
        mat.uniforms.uProgress.value = eased;
      },
    });

    return () => {
      st.kill();
      cancelAnimationFrame(animFrame);
      geo.dispose();
      mat.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [src, width, height, variant, isMobile, isReduced]);

  if (isMobile || isReduced) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: 'relative',
          width,
          height,
          overflow: 'hidden',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width, height, overflow: 'hidden' }}
    />
  );
}
