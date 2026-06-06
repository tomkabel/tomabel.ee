import { useEffect, useRef } from 'react';
import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  IcosahedronGeometry,
  TorusKnotGeometry,
  OctahedronGeometry,
  RingGeometry,
  Points,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  AmbientLight,
  DirectionalLight,
  Group,
  Vector2,
} from 'three';
import { getThreeScene, subscribeToRenderLoop, isTablet } from '../lib/three';

export default function CyberpunkScene() {
  const groupRef = useRef<Group | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tablet = typeof window !== 'undefined' && isTablet();
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const enabled = !isMobile;

  useEffect(() => {
    if (!enabled) return;
    const scene = getThreeScene();

    const group = new Group();
    groupRef.current = group;
    scene.add(group);

    // Lighting
    const ambient = new AmbientLight(0x111122, 0.5);
    group.add(ambient);

    const dirLight = new DirectionalLight(0x00d4ff, 0.6);
    dirLight.position.set(5, 10, 5);
    group.add(dirLight);

    // Server racks
    const serverRackPositions: { x: number; y: number; z: number; h: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const w = 0.5 + Math.random() * 0.3;
      const h = 0.8 + Math.random() * 1.2;
      const d = 0.4;
      const geo = new BoxGeometry(w, h, d);
      const edges = new EdgesGeometry(geo);
      const lineMat = new LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.2,
      });
      const rack = new LineSegments(edges, lineMat);
      const x = -2 + i * 1.3 + Math.random() * 0.2;
      const y = -1.5 + Math.random() * 0.3;
      const z = -2 + Math.random() * 0.5;
      rack.position.set(x, y, z);
      serverRackPositions.push({ x, y, z, h });
      group.add(rack);
      geo.dispose();
    }

    // Emissive strip lights (cyan BoxGeometry strips on server racks)
    const strips: Mesh[] = [];
    for (const rack of serverRackPositions) {
      for (let s = 0; s < 2; s++) {
        const stripGeo = new BoxGeometry(0.6, 0.03, 0.01);
        const stripMat = new MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4 });
        const strip = new Mesh(stripGeo, stripMat);
        strip.position.set(rack.x, rack.y - rack.h / 2 + 0.1 + s * rack.h * 0.6, rack.z + 0.21);
        strips.push(strip);
        group.add(strip);
      }
    }

    // Floating wireframe shapes
    const icoGeo = new IcosahedronGeometry(0.3, 1);
    const icoEdges = new EdgesGeometry(icoGeo);
    const icoLine = new LineSegments(icoEdges, new LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: tablet ? 0.3 : 0.5 }));
    icoLine.position.set(1.5, 0.5, -1);
    group.add(icoLine);
    icoGeo.dispose();

    const torusGeo = new TorusKnotGeometry(0.25, 0.1, 32, 8);
    const torusEdges = new EdgesGeometry(torusGeo);
    const torusLine = new LineSegments(torusEdges, new LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: tablet ? 0.25 : 0.4 }));
    torusLine.position.set(-1.2, 1.2, -0.5);
    group.add(torusLine);
    torusGeo.dispose();

    // Emissive accent (disabled on tablet — "wireframe-only")
    let octMesh: Mesh | null = null;
    if (!tablet) {
      const octGeo = new OctahedronGeometry(0.2);
      const octMat = new MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.7 });
      octMesh = new Mesh(octGeo, octMat);
      octMesh.position.set(0, 2, -0.8);
      group.add(octMesh);
    }

    // Scan rings
    const rings: Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeo = new RingGeometry(1.2 + i * 0.4, 1.25 + i * 0.4, 64);
      const ringMat = new MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.1,
        side: 2, // DoubleSide
      });
      const ring = new Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -1.5 + i * 0.3;
      rings.push(ring);
      group.add(ring);
    }

    // Ambient particles
    const particleCount = tablet ? 80 : 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new BufferGeometry();
    particleGeo.setAttribute('position', new BufferAttribute(positions, 3));
    const particleMat = new PointsMaterial({
      color: 0x00d4ff,
      size: 0.02,
      transparent: true,
      opacity: tablet ? 0.15 : 0.3,
    });
    const particleSystem = new Points(particleGeo, particleMat);
    group.add(particleSystem);

    const mouse = new Vector2(0.5, 0.5);
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    if (!isReduced && !tablet) {
      window.addEventListener('mousemove', handleMouse);
    }

    let time = 0;
    const unsub = subscribeToRenderLoop(() => {
      time += tablet ? 0.003 : 0.005;

      // Auto-rotate the group
      if (!isReduced) {
        group.rotation.y = time * (tablet ? 0.06 : 0.1) + (mouse.x - 0.5) * (tablet ? 0 : 0.02);
        group.rotation.x = (mouse.y - 0.5) * (tablet ? 0 : 0.02);
      }

      // Pulse rings
      rings.forEach((ring, i) => {
        const pulse = Math.sin(time * 1.5 + i * 1.5) * 0.5 + 0.5;
        (ring.material as MeshBasicMaterial).opacity = 0.05 + pulse * 0.15;
        ring.scale.setScalar(1 + pulse * 0.1);
      });

      // Pulse strip lights
      strips.forEach((strip, i) => {
        const pulse = Math.sin(time * 2.0 + i * 1.2) * 0.5 + 0.5;
        (strip.material as MeshBasicMaterial).opacity = 0.2 + pulse * 0.4;
      });

      // Rotate floating shapes
      icoLine.rotation.x += tablet ? 0.003 : 0.005;
      icoLine.rotation.y += tablet ? 0.006 : 0.01;
      torusLine.rotation.x += tablet ? 0.005 : 0.008;
      torusLine.rotation.y += tablet ? 0.008 : 0.012;
      if (octMesh) {
        octMesh.rotation.x += 0.01;
        octMesh.rotation.y += 0.015;
      }
    });

    return () => {
      unsub();
      scene.remove(group);
      group.traverse((child) => {
        if (child instanceof Mesh || child instanceof LineSegments || child instanceof Points) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material?.dispose();
        }
      });
      if (!isReduced && !tablet) {
        window.removeEventListener('mousemove', handleMouse);
      }
    };
  }, [enabled, isReduced, tablet]);

  return null;
}
