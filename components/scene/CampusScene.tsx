"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Edges, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";

/* Deterministic RNG so the campus layout is stable between renders */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type B = { x: number; z: number; w: number; d: number; h: number; hue: number };

function useBuildings(): B[] {
  return useMemo(() => {
    const rng = mulberry32(1337);
    const out: B[] = [];
    // Two rows of towers lining an avenue that recedes into -z
    for (let i = 0; i < 22; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const row = Math.floor(i / 2);
      const x = side * (7 + rng() * 4);
      const z = 8 - row * 9 - rng() * 2;
      const w = 2.4 + rng() * 2.2;
      const d = 2.4 + rng() * 2.2;
      const h = 4 + rng() * 12;
      const hue = 0.58 + rng() * 0.06; // blue → cyan range
      out.push({ x, z, w, d, h, hue });
    }
    return out;
  }, []);
}

function Building({ b }: { b: B }) {
  const windowsCol = useMemo(() => new THREE.Color().setHSL(b.hue, 0.9, 0.6), [b.hue]);
  return (
    <group position={[b.x, b.h / 2, b.z]}>
      <mesh castShadow>
        <boxGeometry args={[b.w, b.h, b.d]} />
        <meshStandardMaterial
          color="#0a1122"
          roughness={0.35}
          metalness={0.7}
          emissive={windowsCol}
          emissiveIntensity={0.14}
        />
        {/* Glowing edges give the futuristic wireframe read */}
        <Edges scale={1.001} threshold={15} color={windowsCol.getStyle()} />
      </mesh>
      {/* A bright rooftop beacon */}
      <mesh position={[0, b.h / 2 + 0.15, 0]}>
        <boxGeometry args={[0.18, 0.3, 0.18]} />
        <meshStandardMaterial color={windowsCol} emissive={windowsCol} emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Particles({ count = 900 }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 90;
      pos[i * 3 + 1] = Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 140 - 40;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.09} color="#7fb2ff" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Drone() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.x = Math.sin(t * 0.3) * 6;
      ref.current.position.z = 2 + Math.cos(t * 0.3) * 4;
      ref.current.position.y = 12 + Math.sin(t * 0.8) * 0.4;
      ref.current.rotation.y = t * 0.3;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.5, 0.14, 0.5]} />
        <meshStandardMaterial color="#0b1226" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#ff8a4c" emissive="#ff8a4c" emissiveIntensity={4} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Moves the camera down the avenue as the page scrolls + subtle mouse parallax */
function CameraRig() {
  const target = useRef(new THREE.Vector3());
  useFrame((state) => {
    const p = scrollState.progress; // 0..1
    const cam = state.camera;

    // Travel forward through the campus
    const z = 24 - p * 62;
    const y = 6.5 - p * 1.5;
    const baseX = Math.sin(p * Math.PI) * 2.5; // gentle S-curve down the avenue

    // Ease toward target with pointer parallax
    const px = baseX + scrollState.pointerX * 1.6;
    const py = y + -scrollState.pointerY * 0.8;
    cam.position.x += (px - cam.position.x) * 0.06;
    cam.position.y += (py - cam.position.y) * 0.06;
    cam.position.z += (z - cam.position.z) * 0.06;

    target.current.set(baseX * 0.4, 4 - p * 1.2, z - 18);
    cam.lookAt(target.current);
  });
  return null;
}

export default function CampusScene() {
  const buildings = useBuildings();
  return (
    <Canvas
      className="!fixed inset-0 -z-10"
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 6.5, 24], fov: 50, near: 0.1, far: 200 }}
    >
      <color attach="background" args={["#05070f"]} />
      <fog attach="fog" args={["#05070f", 28, 90]} />

      <ambientLight intensity={0.35} color="#5b7bd6" />
      <directionalLight position={[10, 20, 10]} intensity={0.6} color="#8db4ff" />
      <pointLight position={[0, 8, -20]} intensity={120} distance={80} color="#3d7bff" />
      <pointLight position={[-12, 4, -40]} intensity={90} distance={70} color="#35e0ff" />

      {/* Reflective ground grid — the "digital campus" floor */}
      <Grid
        args={[220, 220]}
        position={[0, 0, -30]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#1b3a6b"
        sectionSize={10}
        sectionThickness={1.1}
        sectionColor="#3d7bff"
        fadeDistance={95}
        fadeStrength={2}
        infiniteGrid
      />

      {buildings.map((b, i) => (
        <Building key={i} b={b} />
      ))}

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <Drone />
      </Float>

      <Particles />
      <CameraRig />

      <EffectComposer>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.25} luminanceSmoothing={0.3} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
