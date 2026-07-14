"use client";

/**
 * ORIGIN hero — the one real-time 3D moment.
 *
 * Timeline (shared Canvas clock, seconds):
 *   0.6–2.2  the blueprint sheet falls flat onto the desk
 *   2.4–6.4  the arm travels across the blueprint; blocks rise from the
 *            footprints as it passes (rigid arm — single fused mesh)
 *   6.4+     arm eases back to its corner rest pose, blocks stay built
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, useGLTF, MeshReflectorMaterial, Edges } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const smooth = (p: number) => p * p * (3 - 2 * p);

// The whole build scrubs off the hero's local scroll progress (0..1):
//   0.00–0.30  blueprint falls flat
//   0.32–1.00  arm travels, blocks rise
const dropP = () => easeInOut(clamp01(scrollState.heroBuild / 0.3));
const buildP = () => clamp01((scrollState.heroBuild - 0.32) / 0.66);

const CORNER = new THREE.Vector3(1.85, 0, -0.35);

/* Blocks that rise from the blueprint footprints, ordered right→left so the
   travelling arm appears to build each one as it passes. */
type Blk = { x: number; z: number; w: number; d: number; h: number; order: number };
const BLOCKS: Blk[] = [
  { x: 1.15, z: 0.95, w: 0.5, d: 0.5, h: 0.34, order: 0 },
  { x: 0.62, z: 0.95, w: 0.5, d: 0.5, h: 0.3, order: 1 },
  { x: 0.55, z: -0.05, w: 0.72, d: 0.58, h: 0.72, order: 2 },
  { x: 0.12, z: 0.95, w: 0.5, d: 0.5, h: 0.32, order: 3 },
  { x: -0.4, z: 0.2, w: 0.5, d: 0.36, h: 0.5, order: 4 },
  { x: -0.8, z: 0.6, w: 0.46, d: 0.46, h: 0.42, order: 5 },
];
const N = BLOCKS.length;

function Block({ b }: { b: Blk }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const build = buildP();
    const start = (b.order / N) * 0.9;
    const rise = smooth(clamp01((build - start) / 0.22));
    g.scale.y = Math.max(0.0001, rise);
    g.position.y = (b.h * rise) / 2;
    const mat = (g.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.12 + (1 - Math.abs(rise - 0.5) * 2) * 0.9; // flash while rising
  });
  return (
    <group ref={ref} position={[b.x + 0.1, 0, b.z]} scale={[1, 0.0001, 1]}>
      <mesh>
        <boxGeometry args={[b.w, b.h, b.d]} />
        <meshStandardMaterial
          color="#0a1226"
          metalness={0.6}
          roughness={0.35}
          emissive="#35e0ff"
          emissiveIntensity={0.12}
        />
        <Edges scale={1.001} threshold={15} color="#4fd0ff" />
      </mesh>
    </group>
  );
}

/* ---- The precision arm (rigid) — travels while building, then rests ---- */
function Arm() {
  const { scene } = useGLTF("/models/arm.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3().copy(CORNER));

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const build = buildP();

    if (build <= 0.001) {
      target.current.copy(CORNER); // rest in the corner before/at the start
    } else {
      // travel across the blueprint, right → left, riding just above the desk
      target.current.set(
        THREE.MathUtils.lerp(1.35, -0.9, build),
        0,
        THREE.MathUtils.lerp(-0.2, 0.4, Math.sin(build * Math.PI))
      );
    }
    g.position.lerp(target.current, 0.12);
    // slight forward lean while working
    g.rotation.x = 0.09 * Math.sin(clamp01(build) * Math.PI);
  });

  return (
    <group ref={ref} rotation={[0, -1.45, 0]} scale={1.95}>
      <primitive object={cloned} />
    </group>
  );
}

/* ---- Blueprint sheet drawn to a canvas texture ---- */
function useBlueprintTexture() {
  return useMemo(() => {
    const w = 1024, h = 768;
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "rgba(8,16,34,0.55)";
    ctx.fillRect(0, 0, w, h);
    const S = w / 400;
    const oy = (h - 260 * S) / 2;
    ctx.translate(0, oy);
    ctx.scale(S, S);
    ctx.strokeStyle = "#7fb2ff";
    ctx.shadowColor = "#35e0ff";
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.4;
    const rect = (x: number, y: number, ww: number, hh: number) => ctx.strokeRect(x, y, ww, hh);
    const line = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    };
    rect(4, 4, 392, 252);
    line(4, 34, 396, 34);
    rect(16, 14, 26, 12);
    line(300, 20, 320, 20); line(332, 20, 352, 20); line(364, 20, 384, 20);
    ctx.lineWidth = 2.6;
    line(24, 70, 190, 70); line(24, 90, 230, 90);
    ctx.lineWidth = 1.4;
    line(24, 118, 150, 118);
    rect(24, 138, 64, 20);
    rect(250, 58, 126, 104);
    ctx.beginPath();
    ctx.moveTo(250, 130); ctx.lineTo(286, 96); ctx.lineTo(312, 118);
    ctx.lineTo(340, 88); ctx.lineTo(376, 120); ctx.stroke();
    rect(24, 192, 104, 48); rect(148, 192, 104, 48); rect(272, 192, 104, 48);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function BlueprintSheet() {
  const tex = useBlueprintTexture();
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = dropP();
    g.rotation.x = THREE.MathUtils.lerp(0.02, -Math.PI / 2, p);
    g.position.y = THREE.MathUtils.lerp(1.4, 0.014, p);
    const mat = (g.children[0] as THREE.Mesh).material as THREE.Material;
    mat.opacity = 0.35 + 0.55 * p;
  });
  return (
    <group ref={group} position={[0.1, 1.4, 0.35]}>
      <mesh>
        <planeGeometry args={[2.7, 2.0]} />
        <meshBasicMaterial map={tex} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ---- Dark reflective drafting desk ---- */
function Desk() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[40, 30]} />
      <MeshReflectorMaterial
        resolution={512}
        blur={[420, 220]}
        mixBlur={1.1}
        mixStrength={3.1}
        roughness={0.85}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#060a14"
        metalness={0.55}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = 0.6 + Math.sin(t * 0.15) * 0.12;
    state.camera.lookAt(0.6, 0.5, 0.1);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0.6, 2.4, 5.2], fov: 40, near: 0.1, far: 100 }}
    >
      <fog attach="fog" args={["#05070f", 9, 26]} />
      <ambientLight intensity={0.5} color="#8db4ff" />
      <directionalLight position={[4, 7, 4]} intensity={1.5} />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#3d7bff" />
      <pointLight position={[0.5, 1.4, 2]} intensity={10} distance={12} color="#35e0ff" />

      <Desk />
      <Grid
        args={[40, 40]}
        position={[0, 0.006, 0]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#12294d"
        sectionSize={2.5}
        sectionThickness={0.9}
        sectionColor="#20487f"
        fadeDistance={16}
        fadeStrength={3}
      />

      <BlueprintSheet />
      {BLOCKS.map((b, i) => (
        <Block key={i} b={b} />
      ))}
      <Arm />

      <Rig />

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.95} luminanceThreshold={0.35} luminanceSmoothing={0.3} />
      </EffectComposer>
    </Canvas>
  );
}

useGLTF.preload("/models/arm.glb");
