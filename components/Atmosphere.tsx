"use client";

/**
 * ORIGIN atmosphere — the page lives inside an inferred industrial design lab,
 * not on empty black. Layered depth (vignette, concrete grain, haze, blueprint
 * grid, hidden engineering marks, a slow scanner beam) that "wakes up" as you
 * scroll: dark studio at the top → full lab by the bottom, mirroring BUILD%.
 *
 * A single rAF writes `--wake` (0..1) on the root so every layer ramps its
 * intensity via calc() with no React re-renders.
 */

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scroll";
import Dust from "@/components/Dust";

// faint concrete grain via inline SVG turbulence
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// engineer's marks scattered in the dark — felt, not read
const MARKS: { t: string; c: string }[] = [
  { t: "ORIGIN · PATENT 00014", c: "left-[6%] top-[16%]" },
  { t: "REV_19", c: "right-[9%] top-[24%] rotate-90" },
  { t: "ASSEMBLY DRAWING", c: "left-[10%] top-[62%]" },
  { t: "CONFIDENTIAL", c: "right-[7%] top-[70%]" },
  { t: "SCALE 1:2", c: "left-[45%] top-[8%]" },
  { t: "PROPERTY OF ORIGIN", c: "left-[38%] bottom-[8%]" },
  { t: "Ø42", c: "right-[22%] top-[46%]" },
  { t: "R23", c: "left-[24%] top-[38%]" },
  { t: "120°", c: "right-[34%] bottom-[26%]" },
  { t: "14.7", c: "left-[62%] top-[54%]" },
  { t: "BUILD SYSTEM", c: "right-[14%] bottom-[46%] rotate-90" },
];

export default function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      ref.current?.style.setProperty("--wake", scrollState.progress.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--wake" as string]: "0", background: "var(--obsidian)" }}
    >
      {/* depth fog — top and bottom fall into black */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B1018_50%,#08090B_100%)]" />

      {/* concrete grain */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "140px 140px", opacity: 0.05 }}
      />

      {/* blueprint grid — faint, wakes with scroll */}
      <div className="bp-grid absolute inset-0" style={{ opacity: "calc(0.05 + var(--wake) * 0.22)" }} />

      {/* ambient blueprint-blue reflections (workbench light spilling into the room) */}
      <div
        className="absolute -left-40 top-[16%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(45,140,255,.12),transparent_70%)] blur-3xl"
        style={{ opacity: "calc(0.5 + var(--wake) * 0.5)" }}
      />
      <div
        className="absolute right-[-14%] top-[55%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(45,140,255,.09),transparent_70%)] blur-3xl"
        style={{ opacity: "calc(0.4 + var(--wake) * 0.6)" }}
      />

      {/* hidden engineering marks — emerge as the room wakes */}
      <div className="absolute inset-0" style={{ opacity: "calc(0.02 + var(--wake) * 0.07)" }}>
        {MARKS.map((m) => (
          <span
            key={m.t}
            className={`absolute whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-[var(--steel)] ${m.c}`}
          >
            {m.t}
          </span>
        ))}
      </div>

      {/* volumetric haze — soft light hanging in the air, thicker as the room wakes */}
      <div
        className="absolute left-1/2 top-[8%] h-[70%] w-[85%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(120,160,210,.06),transparent_60%)] blur-2xl"
        style={{ opacity: "calc(0.5 + var(--wake) * 0.5)" }}
      />

      {/* drifting dust in the light */}
      <Dust />

      {/* slow scanner beam */}
      <div
        className="atmo-scan absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(76,184,255,.5),transparent)]"
        style={{ boxShadow: "0 0 20px rgba(45,140,255,.3)" }}
      />

      {/* vignette — edges darker, center reads brighter */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_45%,rgba(0,0,0,.55)_100%)]" />
    </div>
  );
}
