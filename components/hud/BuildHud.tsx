"use client";

/**
 * The persistent BUILD% readout — ORIGIN's spine, styled as engineering
 * metadata. Reads `scrollState.progress` each frame for the phase + percentage,
 * and tilts / shines toward the cursor on hover (a premium 3D micro-interaction).
 */

import { useEffect, useRef, useState } from "react";
import { scrollState } from "@/lib/scroll";

const SEGMENTS = 8;

function phaseFor(pct: number): string {
  if (pct >= 100) return "READY";
  if (pct >= 92) return "GROWTH";
  if (pct >= 78) return "LAUNCH";
  if (pct >= 62) return "TESTING";
  if (pct >= 45) return "MATERIALS";
  if (pct >= 25) return "BLUEPRINT";
  if (pct >= 12) return "RESEARCH";
  return "INITIATED";
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[9px] tracking-[0.2em] text-[var(--muted)]/70">{label}</div>
      <div className="mt-0.5 text-[12px] tracking-[0.12em] text-[var(--text)]">{children}</div>
    </div>
  );
}

export default function BuildHud() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setPct(Math.round(scrollState.progress * 100));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // --- hover tilt + shine ---
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (py - 0.5) * -12, ry: (px - 0.5) * 12 });
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  };
  const onLeave = () => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  };

  const done = pct >= 100;
  const filled = Math.round((pct / 100) * SEGMENTS);

  return (
    <div
      className="pointer-events-none fixed right-8 top-[22vh] z-40 hidden w-[150px] select-none font-mono lg:block"
      style={{ perspective: "800px" }}
    >
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={onLeave}
        className="pointer-events-auto relative space-y-4 overflow-hidden rounded-lg border border-white/10 bg-[rgba(6,10,20,0.35)] px-4 py-4 backdrop-blur-md"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: hovering ? "transform 80ms linear" : "transform 500ms ease",
          boxShadow: hovering ? "0 30px 60px -30px rgba(61,123,255,.6)" : "none",
        }}
      >
        {/* cursor-following shine */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glare.o,
            transition: "opacity 300ms ease",
            background: `radial-gradient(220px circle at ${glare.x}% ${glare.y}%, rgba(120,180,255,.18), transparent 55%)`,
          }}
        />

        <Field label="PROJECT">
          <span className="font-semibold tracking-[0.18em]">ORIGIN</span>
        </Field>

        <Field label="STATUS">
          <span className={done ? "text-[var(--green)]" : "text-[var(--blue-2)]"}>
            {done ? "COMPLETE" : "BUILDING"}
          </span>
        </Field>

        <div>
          <div className="text-[9px] tracking-[0.2em] text-[var(--muted)]/70">BUILD PROGRESS</div>
          <div className="mt-1 text-[22px] font-semibold leading-none text-[var(--blue-2)] tabular-nums">
            {pct}%
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-[1px]"
                style={{ background: i < filled ? "var(--blue)" : "rgba(255,255,255,.12)" }}
              />
            ))}
          </div>
        </div>

        <Field label="PHASE">
          <span className="text-[var(--cyan)]">{phaseFor(pct)}</span>
        </Field>

        <Field label="REVISION">001</Field>
      </div>
    </div>
  );
}
