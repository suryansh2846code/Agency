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
  const [side, setSide] = useState<"right" | "left">("right");

  useEffect(() => {
    const saved = localStorage.getItem("origin-hud-side");
    if (saved === "left" || saved === "right") setSide(saved);
    let raf = 0;
    const loop = () => {
      setPct(Math.round(scrollState.progress * 100));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggleSide = () =>
    setSide((s) => {
      const next = s === "right" ? "left" : "right";
      localStorage.setItem("origin-hud-side", next);
      return next;
    });

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
  // fade the panel away as we arrive at the footer
  const fade = pct < 88 ? 1 : Math.max(0, 1 - (pct - 88) / 10);

  return (
    <div
      className={`pointer-events-none fixed top-[19vh] z-40 hidden w-[124px] select-none font-mono xl:block ${
        side === "right" ? "right-5" : "left-5"
      }`}
      style={{ perspective: "800px", opacity: fade }}
    >
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={onLeave}
        className="pointer-events-auto relative space-y-3 overflow-hidden rounded-lg border border-white/10 bg-[rgba(6,10,20,0.35)] px-3.5 py-3.5 backdrop-blur-md"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: hovering ? "transform 80ms linear" : "transform 500ms ease",
          boxShadow: hovering ? "0 30px 60px -34px rgba(45,140,255,.5)" : "none",
          pointerEvents: fade < 0.1 ? "none" : undefined,
        }}
      >
        {/* cursor-following shine */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glare.o,
            transition: "opacity 300ms ease",
            background: `radial-gradient(220px circle at ${glare.x}% ${glare.y}%, rgba(76,184,255,.16), transparent 55%)`,
          }}
        />

        {/* move the panel to the other side */}
        <button
          onClick={toggleSide}
          aria-label={`Move panel to the ${side === "right" ? "left" : "right"}`}
          title="Move panel"
          className="absolute right-1.5 top-1.5 z-20 grid h-5 w-5 place-items-center rounded text-[var(--titanium)] transition-colors hover:text-[var(--cyan)]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 7 4 11l4 4M16 7l4 4-4 4M4 11h16" />
          </svg>
        </button>

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
          <div className="mt-1 text-[19px] font-semibold leading-none text-[var(--blue-2)] tabular-nums">
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
