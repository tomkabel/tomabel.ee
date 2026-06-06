import { useEffect } from 'react';
import {
  SphereGeometry,
  InstancedMesh,
  MeshStandardMaterial,
  Vector3,
  Object3D,
  Matrix4,
  AdditiveBlending,
} from 'three';
import { getThreeScene, subscribeToRenderLoop } from '../lib/three';

// 3D simplex noise
// Based on Stefan Gustavson's implementation
function grad3(hash: number, x: number, y: number, z: number): number {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

const p = new Uint8Array(512);
const perm = new Uint8Array(512);
let seeded = false;
function seedNoise() {
  for (let i = 0; i < 256; i++) p[i] = Math.random() * 256;
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  seeded = true;
}

function simplex3(x: number, y: number, z: number): number {
  if (!seeded) seedNoise();

  const F3 = 1 / 3;
  const G3 = 1 / 6;

  const s = (x + y + z) * F3;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const k = Math.floor(z + s);

  const t = (i + j + k) * G3;
  const X0 = i - t;
  const Y0 = j - t;
  const Z0 = k - t;
  const x0 = x - X0;
  const y0 = y - Y0;
  const z0 = z - Z0;

  let i1: number, j1: number, k1: number;
  let i2: number, j2: number, k2: number;

  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  }

  const x1 = x0 - i1 + G3;
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2 * G3;
  const y2 = y0 - j2 + 2 * G3;
  const z2 = z0 - k2 + 2 * G3;
  const x3 = x0 - 1 + 3 * G3;
  const y3 = y0 - 1 + 3 * G3;
  const z3 = z0 - 1 + 3 * G3;

  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;

  let n0 = 0, n1 = 0, n2 = 0, n3 = 0;

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * grad3(perm[ii + perm[jj + perm[kk]]], x0, y0, z0); }

  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * grad3(perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]], x1, y1, z1); }

  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * grad3(perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]], x2, y2, z2); }

  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 >= 0) { t3 *= t3; n3 = t3 * t3 * grad3(perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]], x3, y3, z3); }

  return 32 * (n0 + n1 + n2 + n3);
}

function getPerformanceTier() {
  if (typeof window === 'undefined') return 'low';
  const dpr = devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 8;
  if (dpr < 2 || cores <= 4) return 'low';
  if (dpr < 3 || cores <= 8) return 'mid';
  return 'high';
}

const TIER_CONFIG = {
  low: { count: 200, trails: 3 },
  mid: { count: 400, trails: 4 },
  high: { count: 800, trails: 5 },
};

const BOUNDS = 8;

interface Particle {
  pos: Vector3;
  vel: Vector3;
  life: number;
  trails: Vector3[];
}

export default function ParticleTrails() {
  const enabled = typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.innerWidth >= 768;

  useEffect(() => {
    if (!enabled) return;

    const tier = getPerformanceTier();
    const config = TIER_CONFIG[tier];
    const PARTICLE_COUNT = config.count;
    const TRAIL_LENGTH = config.trails;

    const scene = getThreeScene();
    const geo = new SphereGeometry(0.04, 8, 8);
    const mat = new MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.6,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const headMesh = new InstancedMesh(geo, mat, PARTICLE_COUNT);
    const trailMat = new MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.2,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    // Create trail meshes — each segment smaller and more transparent
    const trailMeshes: InstancedMesh[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const m = new InstancedMesh(geo, trailMat.clone(), PARTICLE_COUNT);
      const frac = (TRAIL_LENGTH - i) / TRAIL_LENGTH; // 1 → 1/TRAIL_LENGTH
      m.material.opacity = 0.25 * frac;
      m.material.transparent = true;
      // Scale: newest trail = 85%, oldest = 20%
      const scale = 0.85 - i * (0.65 / Math.max(1, TRAIL_LENGTH - 1));
      m.scale.setScalar(scale);
      trailMeshes.push(m);
      scene.add(m);
    }

    scene.add(headMesh);

    // Init particles
    const particles: Particle[] = [];
    const dummy = new Object3D();
    const matrix = new Matrix4();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new Vector3(
        (Math.random() - 0.5) * BOUNDS,
        (Math.random() - 0.5) * BOUNDS,
        (Math.random() - 0.5) * BOUNDS,
      );
      const trails: Vector3[] = [];
      for (let t = 0; t < TRAIL_LENGTH; t++) {
        trails.push(p.clone());
      }
      particles.push({
        pos: p,
        vel: new Vector3(0, 0, 0),
        life: Math.random(),
        trails,
      });
    }

    // 3D simplex noise flow field
    const flowFreq = 0.5;
    const flowStrength = 2.0;

    function flowForce(p: Vector3, t: number): Vector3 {
      return new Vector3(
        simplex3(p.x * flowFreq, p.y * flowFreq, t),
        simplex3(p.y * flowFreq, p.z * flowFreq, t + 100),
        simplex3(p.z * flowFreq, p.x * flowFreq, t + 200),
      ).multiplyScalar(0.015 * flowStrength);
    }

    let time = 0;

    const unsub = subscribeToRenderLoop(() => {
      time += 0.005;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.life += 0.002;

        if (p.life >= 1 || p.pos.length() > BOUNDS) {
          p.pos.set(
            (Math.random() - 0.5) * BOUNDS,
            (Math.random() - 0.5) * BOUNDS,
            (Math.random() - 0.5) * BOUNDS,
          );
          p.vel.set(0, 0, 0);
          p.life = 0;
          continue;
        }

        const force = flowForce(p.pos, time);
        p.vel.add(force);

        // Shift trail history (pop oldest, push new at front)
        p.trails.pop();
        p.trails.unshift(p.pos.clone());

        p.pos.add(p.vel);
        p.vel.multiplyScalar(0.98);

        // Update head
        dummy.position.copy(p.pos);
        dummy.updateMatrix();
        matrix.copy(dummy.matrix);
        headMesh.setMatrixAt(i, matrix);

        // Update trails
        for (let t = 0; t < TRAIL_LENGTH; t++) {
          dummy.position.copy(p.trails[t]);
          dummy.updateMatrix();
          matrix.copy(dummy.matrix);
          trailMeshes[t].setMatrixAt(i, matrix);
        }
      }

      headMesh.instanceMatrix.needsUpdate = true;
      trailMeshes.forEach((m) => { m.instanceMatrix.needsUpdate = true; });
    });

    return () => {
      unsub();
      scene.remove(headMesh);
      trailMeshes.forEach((m) => scene.remove(m));
      geo.dispose();
      mat.dispose();
      trailMat.dispose();
    };
  }, [enabled]);

  return null;
}
