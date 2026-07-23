"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { scrollState } from "@/lib/scroll";
import HeroFrames from "@/components/scene/HeroFrames";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const ease = [0.22, 1, 0.36, 1] as const;

const PRINCIPLES: [React.ReactNode, string, string][] = [
  [<Crosshair key="s" />, "Engineered", "Strategy"],
  [<Cube key="d" />, "Precision", "Design"],
  [<Layers key="b" />, "Built to", "Scale"],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Feed the pinned hero's local scroll progress (0..1) to scrollState — it
  // drives the frame scrub (HeroFrames) and the BUILD% HUD. The copy is static.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("hp");
    if (forced !== null) {
      scrollState.heroBuild = clamp01(parseFloat(forced));
      return;
    }
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const span = el.offsetHeight - window.innerHeight;
        scrollState.heroBuild = span > 0 ? clamp01(-rect.top / span) : 0;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* robot stage — full-bleed, shifted right so it owns the right half */}
        <div className="absolute inset-0">
          <HeroFrames />
        </div>

        {/* --- color-grade the video into the obsidian environment --- */}
        {/* deepen edges to obsidian (matches the atmosphere vignette) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_62%_36%,transparent_42%,rgba(8,9,11,.6)_100%)]" />
        {/* subtle blueprint-blue unify + shared grain */}
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-[#2d8cff] opacity-[0.05]" />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light" />
        {/* feather the whole lower half into obsidian so the video dissolves
            completely into the environment before the sections (no seam) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(to_bottom,transparent,rgba(8,9,11,0.85)_70%,var(--obsidian)_88%)]" />

        {/* readability wash confined to the left content zone */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#04060d_18%,rgba(4,6,13,0.6)_38%,transparent_56%)]" />

        {/* ---- Left content zone (max 560px, never over the robot) ---- */}
        <div className="container relative z-10 flex h-full items-center">
          <div className="max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-2 font-mono text-[12px] tracking-[0.22em] text-[var(--cyan)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" />
              PROJECT_0001 · ORIGIN
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
              className="mt-6 font-head font-semibold tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px, 3.7vw, 52px)", lineHeight: 1.12 }}
            >
              Every Great Brand
              <br />
              Starts
              <br />
              <span className="grad-text">as a Blueprint.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease }}
              className="mt-9 max-w-[360px] border-l border-white/15 pl-4 text-[15px] leading-relaxed text-[var(--muted)]"
            >
              We engineer digital experiences that are thoughtful, functional and built to
              create real impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="btn btn-primary font-mono !tracking-[0.12em]">
                → INITIALIZE PROJECT
              </a>
              <a href="#work" className="btn btn-ghost font-mono !tracking-[0.12em]">
                VIEW OUR WORK →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
              className="mt-12 flex gap-10"
            >
              {PRINCIPLES.map(([icon, a, b]) => (
                <div key={b} className="flex flex-col gap-3">
                  <span className="text-[var(--blue-2)]">{icon}</span>
                  <span className="font-mono text-[11px] leading-[1.5] tracking-[0.14em]">
                    <span className="text-[var(--blue-2)]">{a.toUpperCase()}</span>
                    <br />
                    <span className="text-[var(--text)]">{b.toUpperCase()}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[var(--muted)]"
        >
          <span className="flex h-6 w-4 items-start justify-center rounded-full border border-white/20 pt-1">
            <span className="h-1.5 w-1 rounded-full bg-[var(--cyan)]" />
          </span>
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </section>
  );
}

/* --- minimal line icons for the principles --- */
function Crosshair() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="7" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}
function Cube() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2 21 7v10l-9 5-9-5V7z" /><path d="M12 12 21 7M12 12v10M12 12 3 7" />
    </svg>
  );
}
function Layers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="M3 13l9 5 9-5" />
    </svg>
  );
}
