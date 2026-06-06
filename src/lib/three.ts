import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector2,
  ACESFilmicToneMapping,
  type WebGLRendererParameters,
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window.innerWidth;
  return w >= 768 && w < 1024;
}

export function isLowEnd(): boolean {
  if (typeof window === 'undefined') return true;
  const dpr = devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 8;
  return dpr < 2 || cores <= 4;
}

const chromaticAberrationShader = {
  name: 'ChromaticAberration',
  uniforms: {
    tDiffuse: { value: null },
    uOffset: { value: new Vector2(0.002, 0.002) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uOffset;
    varying vec2 vUv;

    void main() {
      vec2 dir = vUv - 0.5;
      float dist = length(dir);
      vec2 offset = uOffset * dist;

      float r = texture2D(tDiffuse, vUv + offset).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - offset).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
};

let renderer: WebGLRenderer | null = null;
let scene: Scene | null = null;
let camera: PerspectiveCamera | null = null;
let composer: EffectComposer | null = null;

const subscribers = new Set<() => void>();
let animFrameId = 0;

export function getThreeRenderer(params?: WebGLRendererParameters): WebGLRenderer {
  if (!renderer) {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
      ...params,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
  }
  return renderer;
}

export function getThreeScene(): Scene {
  if (!scene) {
    scene = new Scene();
  }
  return scene;
}

export function getThreeCamera(): PerspectiveCamera {
  if (!camera) {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
  }
  return camera;
}

export function getComposer(): EffectComposer {
  if (!composer) {
    const r = getThreeRenderer();
    const s = getThreeScene();
    const c = getThreeCamera();

    composer = new EffectComposer(r);
    composer.addPass(new RenderPass(s, c));

    const bloom = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      0.4,
      0.3,
      0.1,
    );
    composer.addPass(bloom);

    // Performance tier: reduce bloom resolution on low-end and tablet
    if (isLowEnd() || isTablet()) {
      bloom.resolution.set(0.5, 0.5);
    }

    // Chromatic aberration pass (disabled on low-end)
    if (!isLowEnd()) {
      const caPass = new ShaderPass(chromaticAberrationShader);
      composer.addPass(caPass);
    }

    composer.addPass(new OutputPass());
  }
  return composer;
}

export function subscribeToRenderLoop(fn: () => void) {
  subscribers.add(fn);
  startLoop();
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) stopLoop();
  };
}

function startLoop() {
  if (animFrameId) return;
  function loop() {
    animFrameId = requestAnimationFrame(loop);
    subscribers.forEach((fn) => fn());
    if (composer) {
      composer.render();
    } else if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }
  loop();
}

function stopLoop() {
  cancelAnimationFrame(animFrameId);
  animFrameId = 0;
}

export function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (camera) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  if (renderer) {
    renderer.setSize(w, h);
  }
  if (composer) {
    composer.setSize(w, h);
  }
}
