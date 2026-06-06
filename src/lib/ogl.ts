import { Renderer, Camera, type RendererOptions } from 'ogl';

let renderer: Renderer | null = null;
let camera: Camera | null = null;

export function getOGLCanvas(): HTMLCanvasElement | null {
  return renderer?.gl.canvas ?? null;
}

export function getOGLRenderer(options?: Partial<RendererOptions>): Renderer {
  if (!renderer) {
    renderer = new Renderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
      ...options,
    });
  }
  return renderer;
}

export function getOGLCamera(): Camera {
  if (!camera) {
    const gl = getOGLRenderer().gl;
    camera = new Camera(gl);
  }
  return camera;
}

export function getOGLContext() {
  return getOGLRenderer().gl;
}
